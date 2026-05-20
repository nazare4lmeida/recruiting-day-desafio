const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const vm = require('vm');

const QUESTIONS = require('./questions');
const SCENARIOS = require('./scenarios');
const CHALLENGE = require('./codeChallenge');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json({ limit: '1mb' }));

// ---------------- ADMIN AUTH ----------------
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'troque-esta-senha';

function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, encoded] = header.split(' ');
  if (scheme === 'Basic' && encoded) {
    const [user, pass] = Buffer.from(encoded, 'base64').toString().split(':');
    if (user === ADMIN_USER && pass === ADMIN_PASSWORD) return next();
  }
  res.set('WWW-Authenticate', 'Basic realm="Recruiting Day Admin"');
  return res.status(401).send('Autenticação necessária');
}

// IMPORTANTE: proteger ANTES do express.static
app.get('/admin.html', requireAdmin);
app.use('/api/admin', requireAdmin);

app.use(express.static(path.join(__dirname, '..', 'public')));

// ---------------- ESTADO (em memória) ----------------
const state = {
  participants: new Map(),
  cutoff: { stage1: 20, stage2: 10, stage3: 5 },
};

function publicParticipant(p) {
  return {
    id: p.id, name: p.name, stage: p.stage, eliminated: p.eliminated,
    quizScore: p.quizScore || 0, iaScore: p.iaScore || 0, codeScore: p.codeScore || 0,
    totalScore: (p.quizScore||0)+(p.iaScore||0)+(p.codeScore||0),
    elapsedMs: p.finishedAt ? (p.finishedAt - p.startedAt) : (p.startedAt ? Date.now() - p.startedAt : 0)
  };
}

function ranking() {
  return [...state.participants.values()]
    .map(publicParticipant)
    .sort((a,b) => b.totalScore - a.totalScore || a.elapsedMs - b.elapsedMs);
}

function broadcastRanking() {
  io.emit('ranking:update', ranking());
}

// ---------------- API ----------------
app.get('/api/questions', (req, res) => {
  res.json(QUESTIONS.map(q => ({
    id: q.id, level: q.level, points: q.points,
    question: q.question, options: q.options
  })));
});

app.get('/api/scenarios', (req, res) => res.json(SCENARIOS.map(s => ({
  id: s.id, title: s.title, scenario: s.scenario, maxPoints: s.maxPoints
}))));

app.get('/api/challenge', (req, res) => res.json({
  title: CHALLENGE.title,
  description: CHALLENGE.description,
  starterCode: CHALLENGE.starterCode,
  tests: CHALLENGE.tests.map(t => ({ name: t.name })),
  pointsPerTest: CHALLENGE.pointsPerTest
}));

app.post('/api/register', (req, res) => {
  const name = (req.body.name || '').trim();
  if (!name) return res.status(400).json({ error: 'Nome obrigatório' });
  if (name.length > 60) return res.status(400).json({ error: 'Nome muito longo' });
  const id = 'p_' + Date.now() + '_' + Math.random().toString(36).slice(2,8);
  const participant = {
    id, name, stage: 1, eliminated: false,
    quizScore: 0, quizAnswers: [],
    iaScore: 0, iaAnswers: [],
    codeScore: 0, codeResults: [],
    startedAt: Date.now(), finishedAt: null
  };
  state.participants.set(id, participant);
  broadcastRanking();
  res.json({ id, name });
});

app.post('/api/quiz/answer', (req, res) => {
  const { participantId, questionId, optionIndex, timedOut } = req.body;
  const p = state.participants.get(participantId);
  if (!p) return res.status(404).json({ error: 'Participante não encontrado' });
  const q = QUESTIONS.find(q => q.id === questionId);
  if (!q) return res.status(404).json({ error: 'Pergunta inexistente' });
  if (p.quizAnswers.find(a => a.questionId === questionId))
    return res.status(400).json({ error: 'Já respondeu esta pergunta' });

  const correct = !timedOut && optionIndex === q.correct;
  const earned = correct ? q.points : 0;
  p.quizScore += earned;
  p.quizAnswers.push({ questionId, optionIndex, correct, earned, timedOut: !!timedOut });
  broadcastRanking();
  res.json({
    correct, earned,
    correctIndex: q.correct,
    correctText: q.options[q.correct],
    explanation: q.explanation,
    totalQuiz: p.quizScore
  });
});

app.post('/api/ia/submit', (req, res) => {
  const { participantId, answers } = req.body;
  const p = state.participants.get(participantId);
  if (!p) return res.status(404).json({ error: 'Participante não encontrado' });

  let total = 0;
  const detailed = [];
  for (const s of SCENARIOS) {
    const a = (answers || []).find(x => x.scenarioId === s.id);
    const text = (a?.text || '').toLowerCase().trim();
    let score = 0;
    if (text.length >= s.minLength) score += s.maxPoints * 0.4;
    const hits = s.keywords.filter(k => text.includes(k.toLowerCase())).length;
    const kwRatio = Math.min(1, hits / Math.min(s.keywords.length, 4));
    score += s.maxPoints * 0.6 * kwRatio;
    score = Math.round(score);
    total += score;
    detailed.push({ scenarioId: s.id, score, hits, length: text.length });
  }
  p.iaScore = total;
  p.iaAnswers = answers || [];
  broadcastRanking();
  res.json({ total, detailed });
});

app.post('/api/code/submit', (req, res) => {
  const { participantId, code } = req.body;
  const p = state.participants.get(participantId);
  if (!p) return res.status(404).json({ error: 'Participante não encontrado' });
  if (typeof code !== 'string' || code.length > 20000)
    return res.status(400).json({ error: 'Código inválido' });

  const results = [];
  let passed = 0;
  let userFn;
  try {
    const sandbox = { module: {}, exports: {} };
    const ctx = vm.createContext(sandbox);
    const wrapped = `${code}\n; module.exports = (typeof parOuImpar === 'function') ? parOuImpar : null;`;
    vm.runInContext(wrapped, ctx, { timeout: 1500 });
    userFn = sandbox.module.exports;
    if (typeof userFn !== 'function') throw new Error("Função 'parOuImpar' não encontrada.");
  } catch (e) {
    return res.json({
      compileError: e.message,
      results: CHALLENGE.tests.map(t => ({ name: t.name, passed: false, error: 'Código não executou' })),
      earned: 0, totalCode: p.codeScore
    });
  }

  for (const t of CHALLENGE.tests) {
    try {
      const inputCopy = JSON.parse(JSON.stringify(t.input));
      const out = userFn(inputCopy);
      const ok = JSON.stringify(out) === JSON.stringify(t.expected);
      results.push({ name: t.name, passed: ok, expected: t.expected, got: out });
      if (ok) passed++;
    } catch (e) {
      results.push({ name: t.name, passed: false, error: e.message });
    }
  }

  const earned = passed * CHALLENGE.pointsPerTest;
  if (earned > p.codeScore) p.codeScore = earned;
  p.finishedAt = Date.now();
  broadcastRanking();
  res.json({ results, earned, totalCode: p.codeScore, finished: true });
});

// ---------------- ADMIN (protegido por requireAdmin acima) ----------------
app.get('/api/admin/state', (req, res) => {
  res.json({
    cutoff: state.cutoff,
    participants: [...state.participants.values()].map(p => ({
      ...publicParticipant(p),
      quizAnswers: p.quizAnswers,
      iaAnswers: p.iaAnswers,
      codeResults: p.codeResults
    }))
  });
});

app.post('/api/admin/advance', (req, res) => {
  const { stage } = req.body;
  const cutoffs = { 1: state.cutoff.stage1, 2: state.cutoff.stage2, 3: state.cutoff.stage3 };
  const keep = cutoffs[stage];
  if (!keep) return res.status(400).json({ error: 'Etapa inválida' });

  const ranked = ranking().filter(p => !state.participants.get(p.id).eliminated);
  ranked.forEach((rp, idx) => {
    const p = state.participants.get(rp.id);
    if (idx >= keep) p.eliminated = true;
    else if (stage < 3) p.stage = stage + 1;
  });
  io.emit('stage:advanced', { stage, keep });
  broadcastRanking();
  res.json({ ok: true, advanced: Math.min(keep, ranked.length) });
});

app.post('/api/admin/ia-override', (req, res) => {
  const { participantId, score } = req.body;
  const p = state.participants.get(participantId);
  if (!p) return res.status(404).json({ error: 'Não encontrado' });
  p.iaScore = Math.max(0, Math.min(100, Number(score)||0));
  broadcastRanking();
  res.json({ ok: true });
});

app.get('/api/admin/export.csv', (req, res) => {
  const rows = [['nome','etapa','eliminado','quiz','ia','codigo','total','tempo_ms']];
  for (const p of state.participants.values()) {
    const pub = publicParticipant(p);
    rows.push([p.name, p.stage, p.eliminated, pub.quizScore, pub.iaScore, pub.codeScore, pub.totalScore, pub.elapsedMs]);
  }
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="recruiting-day.csv"');
  res.send(rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n'));
});

app.post('/api/admin/reset', (req, res) => {
  state.participants.clear();
  broadcastRanking();
  io.emit('admin:reset');
  res.json({ ok: true });
});

// ---------------- SOCKET ----------------
io.on('connection', (socket) => {
  socket.emit('ranking:update', ranking());
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`\n🚀 Recruiting Day rodando em http://localhost:${PORT}`);
  console.log(`   • Participante: http://localhost:${PORT}/`);
  console.log(`   • Painel Admin: http://localhost:${PORT}/admin.html`);
  console.log(`   • Admin user: ${ADMIN_USER} (defina ADMIN_PASSWORD no .env)\n`);
});
