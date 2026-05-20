// ══════════════════════════════════════════════════════════════
//  RECRUITING DAY — app.js v4
//  Geração Tech · novo layout com pódio, certificado, overlay
// ══════════════════════════════════════════════════════════════

const socket = io();

const state = {
  me: null,
  questions: [],
  qIndex: 0,
  correctCount: 0,
  scenarios: [],
  challenge: null,
  timerId: null,
  selected: null,
  answered: false,
  autoAdvanceTimer: null,
  startedAt: null,
  quizScore: 0,
  codeScore: 0,
  answers: [], // histórico de respostas
};

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const SCREENS = ["register", "form", "quiz", "ia", "code", "final"];

// ──────────────────────────────────────────────────────────────
// TEMA
// ──────────────────────────────────────────────────────────────
(function initTheme() {
  applyTheme(localStorage.getItem("rd-theme") || "dark");
})();

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const btn = $("#themeToggle");
  if (btn) btn.textContent = theme === "dark" ? "🌙" : "☀️";
  localStorage.setItem("rd-theme", theme);
}

$("#themeToggle").addEventListener("click", () => {
  const cur = document.documentElement.getAttribute("data-theme") || "dark";
  applyTheme(cur === "dark" ? "light" : "dark");
  showToast(cur === "dark" ? "☀️ Modo claro" : "🌙 Modo escuro", "info", 2000);
});

// ──────────────────────────────────────────────────────────────
// TOAST
// ──────────────────────────────────────────────────────────────
function showToast(msg, type = "info", duration = 3000) {
  const c = $("#toastContainer");
  if (!c) return;
  const icons = { success: "✅", error: "❌", info: "ℹ️", warning: "⚠️" };
  const t = document.createElement("div");
  t.className = `toast ${type}`;
  t.innerHTML = `<span>${icons[type] || "•"}</span><span>${msg}</span>`;
  c.appendChild(t);
  setTimeout(() => {
    t.style.animation = "toastIn .25s reverse both";
    setTimeout(() => t.remove(), 280);
  }, duration);
}

// ──────────────────────────────────────────────────────────────
// CONFETTI
// ──────────────────────────────────────────────────────────────
function launchConfetti() {
  const wrap = $("#confettiWrap");
  if (!wrap) return;
  wrap.classList.remove("hidden");
  const colors = [
    "#f5c84b",
    "#3B9EFF",
    "#10D9A0",
    "#FF5A6E",
    "#A78BFA",
    "#22D3EE",
    "#fff",
  ];
  for (let i = 0; i < 130; i++) {
    const p = document.createElement("div");
    p.className = "cp";
    const r = Math.random() > 0.5;
    p.style.cssText = `
      --c:${colors[Math.floor(Math.random() * colors.length)]};
      --w:${r ? 6 + Math.random() * 6 : 4 + Math.random() * 4}px;
      --h:${r ? 3 + Math.random() * 5 : 4 + Math.random() * 4}px;
      --br:${r ? "2px" : "50%"};
      --dx:${(Math.random() - 0.5) * 620}px;
      --dur:${2.2 + Math.random() * 2}s;
      --delay:${Math.random() * 1.5}s;
      --rot:${360 + Math.random() * 720}deg;
      left:${10 + Math.random() * 80}%;
    `;
    wrap.appendChild(p);
  }
  setTimeout(() => {
    wrap.classList.add("hidden");
    wrap.innerHTML = "";
  }, 6500);
}

// ──────────────────────────────────────────────────────────────
// NAVEGAÇÃO
// ──────────────────────────────────────────────────────────────
function show(name) {
  SCREENS.forEach((s) => {
    const el = $(`#screen-${s}`);
    if (!el) return;
    if (s === name) {
      el.classList.remove("hidden");
      el.classList.add("active");
    } else {
      el.classList.add("hidden");
      el.classList.remove("active");
    }
  });
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Pills
  $$("#stageIndicator .pill").forEach((p) => p.classList.remove("active"));
  const stageMap = { quiz: "1", ia: "2", code: "3" };
  if (stageMap[name])
    $(`#stageIndicator .pill[data-stage="${stageMap[name]}"]`)?.classList.add(
      "active",
    );

  // Header user info
  const showUser = ["quiz", "ia", "code", "final"].includes(name);
  $("#headerUser")?.classList.toggle("hidden", !showUser);
}

// ──────────────────────────────────────────────────────────────
// TELA HERO → FORMULÁRIO
// ──────────────────────────────────────────────────────────────
$("#startBtn").addEventListener("click", () => {
  const name = $("#nameInput").value.trim();
  if (!name) {
    $("#registerError").textContent = "⚠ Informe seu nome.";
    $("#nameInput").focus();
    return;
  }
  if (name.length < 2) {
    $("#registerError").textContent = "⚠ Nome muito curto.";
    return;
  }
  // Copia o nome para o campo do formulário e vai direto registrar
  $("#nameInputForm").value = name;
  show("form");
  setTimeout(() => $("#nameInputForm")?.focus(), 300);
});

$("#nameInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") $("#startBtn").click();
});

$("#backToHeroBtn").addEventListener("click", () => show("register"));

// Botão no formulário
$("#startBtnForm").addEventListener("click", () =>
  doRegister("#nameInputForm", "#registerErrorForm", "#startBtnForm"),
);
$("#nameInputForm").addEventListener("keydown", (e) => {
  if (e.key === "Enter") $("#startBtnForm").click();
});

async function doRegister(inputSel, errSel, btnSel) {
  const name = ($(inputSel)?.value || "").trim();
  const errEl = $(errSel);
  if (!name) {
    if (errEl) errEl.textContent = "⚠ Informe seu nome.";
    return;
  }
  if (name.length < 2) {
    if (errEl) errEl.textContent = "⚠ Nome muito curto.";
    return;
  }
  if (errEl) errEl.textContent = "";

  const btn = $(btnSel);
  if (btn) {
    btn.textContent = "Entrando...";
    btn.disabled = true;
  }

  const r = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  })
    .then((r) => r.json())
    .catch(() => null);

  if (btn) {
    btn.textContent = "Confirmar e Iniciar →";
    btn.disabled = false;
  }

  if (!r || r.error) {
    if (errEl) errEl.textContent = r?.error || "Erro ao conectar.";
    return;
  }

  state.me = r;
  state.startedAt = Date.now();

  // Atualiza header
  const hn = $("#headerUserName");
  if (hn) hn.textContent = r.name;

  showToast(`Bem-vindo(a), ${r.name}! 🚀`, "success");
  await startQuiz();
}

// ──────────────────────────────────────────────────────────────
// QUIZ
// ──────────────────────────────────────────────────────────────
async function startQuiz() {
  state.questions = await fetch("/api/questions").then((r) => r.json());
  state.qIndex = 0;
  state.correctCount = 0;
  state.answers = [];
  show("quiz");
  renderQuestion();
}

// Categorias para o topo do card
const CATEGORIES = {
  facil: [
    "Fundamentos Web",
    "Lógica de Programação",
    "Conceitos Básicos",
    "Git & Versionamento",
  ],
  medio: [
    "Banco de Dados",
    "APIs REST",
    "JavaScript Avançado",
    "Docker & DevOps",
  ],
  dificil: ["Algoritmos", "Segurança Web", "Arquitetura de Software"],
};

function renderQuestion() {
  state.selected = null;
  state.answered = false;
  clearAutoAdvance();

  const q = state.questions[state.qIndex];
  const total = state.questions.length;

  // Barra de progresso
  $("#quizProgress").style.width = `${(state.qIndex / total) * 100}%`;

  // Sub-header
  $("#qCurrentNum").textContent = state.qIndex + 1;
  const badge = $("#qLevel");
  badge.textContent =
    q.level === "facil" ? "FÁCIL" : q.level === "medio" ? "MÉDIO" : "DIFÍCIL";
  badge.className = `quiz-difficulty-badge ${q.level}`;

  // Categoria aleatória do nível
  const cats = CATEGORIES[q.level] || ["Tecnologia"];
  $("#qCategory").textContent = cats[state.qIndex % cats.length];

  // Texto
  $("#qText").textContent = q.question;

  // Opções
  const ops = $("#options");
  ops.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.dataset.idx = i;
    btn.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + i)}</span><span>${opt}</span>`;
    btn.addEventListener("click", () => selectAnswer(i, btn));
    ops.appendChild(btn);
  });

  // Botão confirmar desabilitado
  const confirmBtn = $("#confirmBtn");
  confirmBtn.disabled = true;
  confirmBtn.onclick = null;

  startTimer(90);
}

function selectAnswer(i, btn) {
  if (state.answered) return;
  $$("#options .option").forEach((o) => o.classList.remove("selected"));
  btn.classList.add("selected");
  state.selected = i;

  // Habilita botão confirmar
  const confirmBtn = $("#confirmBtn");
  confirmBtn.disabled = false;
  confirmBtn.onclick = () => submitAnswer(false);
}

// ──────────────────────────────────────────────────────────────
// TIMER
// ──────────────────────────────────────────────────────────────
function startTimer(seconds) {
  clearInterval(state.timerId);
  let left = seconds;
  const clockEl = $("#clock");
  const timerBar = $("#timerBar");

  function render() {
    const m = String(Math.floor(left / 60)).padStart(2, "0");
    const s = String(left % 60).padStart(2, "0");
    if (clockEl) {
      clockEl.textContent = `${m}:${s}`;
      clockEl.className = `clock ${left <= 10 ? "danger" : left <= 30 ? "warn" : ""}`;
    }
    if (timerBar) {
      timerBar.style.width = `${(left / seconds) * 100}%`;
      timerBar.className = `timer-bar ${left <= 10 ? "danger" : left <= 30 ? "warn" : ""}`;
    }
  }

  render();
  state.timerId = setInterval(() => {
    left--;
    render();
    if (left <= 0) {
      clearInterval(state.timerId);
      if (!state.answered) submitAnswer(true);
    }
  }, 1000);
}

// ──────────────────────────────────────────────────────────────
// SUBMETER RESPOSTA
// ──────────────────────────────────────────────────────────────
async function submitAnswer(timedOut) {
  if (state.answered) return;
  state.answered = true;
  clearInterval(state.timerId);

  const q = state.questions[state.qIndex];
  const r = await fetch("/api/quiz/answer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      participantId: state.me.id,
      questionId: q.id,
      optionIndex: state.selected,
      timedOut,
    }),
  }).then((r) => r.json());

  // Salva no histórico
  state.answers.push({
    question: q.question,
    chosen: state.selected !== null ? q.options[state.selected] : null,
    correct: q.options[r.correctIndex],
    isCorrect: r.correct,
    explanation: r.explanation,
  });

  if (r.correct) state.correctCount++;
  state.quizScore = (state.quizScore || 0) + (r.earned || 0);

  // Atualiza pts no header
  const hpts = $("#headerUserPts");
  if (hpts) hpts.textContent = `${state.quizScore} pts`;

  // Destaca opções
  $$("#options .option").forEach((o, idx) => {
    o.style.pointerEvents = "none";
    if (idx === r.correctIndex) o.classList.add("correct");
    if (state.selected === idx && idx !== r.correctIndex)
      o.classList.add("wrong");
  });
  $("#confirmBtn").disabled = true;

  // Exibe overlay de feedback (estilo imagens 3/4)
  showFeedbackOverlay(r, timedOut);
}

function showFeedbackOverlay(r, timedOut) {
  const overlay = $("#feedbackOverlay");
  const header = $("#fbHeader");
  const icon = $("#fbIcon");
  const title = $("#fbTitle");
  const subtitle = $("#fbSubtitle");
  const pts = $("#fbPts");
  const correctBox = $("#fbCorrectBox");
  const correctVal = $("#fbCorrectValue");
  const explanation = $("#fbExplanation");

  // Header correto/incorreto
  header.className = `fb-modal-header ${r.correct ? "correct" : "wrong"}`;
  icon.textContent = r.correct ? "✓" : "✗";

  if (r.correct) {
    title.textContent = "Resposta Correta!";
    subtitle.textContent = `+${r.earned} pontos adicionados ao seu placar!`;
    pts.classList.remove("hidden");
    pts.textContent = `+${r.earned}`;
  } else {
    title.textContent = timedOut ? "Tempo Esgotado" : "Resposta Incorreta";
    subtitle.textContent = "";
    pts.classList.add("hidden");
  }

  // Box resposta correta (só quando errou)
  if (!r.correct) {
    correctBox.classList.remove("hidden");
    correctVal.textContent = r.correctText;
  } else {
    correctBox.classList.add("hidden");
  }

  explanation.textContent = r.explanation;

  overlay.classList.remove("hidden");

  // Countdown
  let countdown = 5;
  const cdEl = $("#fbCountdown");
  if (cdEl) cdEl.textContent = countdown;

  clearAutoAdvance();
  state.autoAdvanceTimer = setInterval(() => {
    countdown--;
    if (cdEl) cdEl.textContent = countdown;
    if (countdown <= 0) {
      clearAutoAdvance();
      hideFeedbackAndAdvance();
    }
  }, 1000);

  $("#nextBtn").onclick = () => {
    clearAutoAdvance();
    hideFeedbackAndAdvance();
  };
}

function hideFeedbackAndAdvance() {
  $("#feedbackOverlay")?.classList.add("hidden");
  nextQuestion();
}

function clearAutoAdvance() {
  clearInterval(state.autoAdvanceTimer);
}

function nextQuestion() {
  state.qIndex++;
  if (state.qIndex >= state.questions.length) {
    showToast("Quiz concluído! Partindo para a Etapa 2 🎯", "success", 3000);
    setTimeout(() => startIA(), 800);
  } else {
    renderQuestion();
  }
}

// ──────────────────────────────────────────────────────────────
// ETAPA 2 — IA
// ──────────────────────────────────────────────────────────────
async function startIA() {
  show("ia");
  state.scenarios = await fetch("/api/scenarios").then((r) => r.json());
  const wrap = $("#scenariosList");
  wrap.innerHTML = "";
  state.scenarios.forEach((s, i) => {
    const div = document.createElement("div");
    div.style.marginBottom = "28px";
    div.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
        <span class="badge medio">Cenário ${i + 1}</span>
        <strong>${escapeHtml(s.title)}</strong>
        <span style="margin-left:auto;font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-3);">até ${s.maxPoints} pts</span>
      </div>
      <p style="color:var(--text-2);margin:0 0 10px;font-size:14px;line-height:1.65;padding:12px 16px;background:var(--surface);border-radius:var(--r);border-left:3px solid var(--accent);">${escapeHtml(s.scenario)}</p>
      <textarea class="input" data-sid="${s.id}" placeholder="Digite sua resposta aqui..." style="min-height:100px;"></textarea>
    `;
    wrap.appendChild(div);
  });
}

$("#submitIaBtn").addEventListener("click", async () => {
  const answers = [...$$("#scenariosList textarea")].map((t) => ({
    scenarioId: Number(t.dataset.sid),
    text: t.value,
  }));
  if (answers.some((a) => !a.text.trim())) {
    showToast("⚠ Responda todos os cenários.", "warning");
    return;
  }

  const btn = $("#submitIaBtn");
  btn.textContent = "Enviando...";
  btn.disabled = true;

  const r = await fetch("/api/ia/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ participantId: state.me.id, answers }),
  }).then((r) => r.json());

  btn.textContent = "Enviar respostas →";
  btn.disabled = false;

  const box = $("#iaResult");
  box.classList.remove("hidden");
  box.innerHTML = `
    <h4 style="color:var(--emerald);margin-bottom:6px;">✓ Respostas enviadas!</h4>
    <p style="color:var(--text-2);font-size:14px;">Pontuação automática: <strong>${r.total} pts</strong> — pode ser ajustada pelo recrutador.</p>
    <button class="btn primary btn-lg" id="goCodeBtn" style="margin-top:14px;">Ir para Etapa 3 — Código →</button>
  `;
  $("#goCodeBtn").onclick = startCode;
  showToast(`Etapa 2 concluída! ${r.total} pts 🎯`, "success");
});

// ──────────────────────────────────────────────────────────────
// ETAPA 3 — CÓDIGO
// ──────────────────────────────────────────────────────────────
async function startCode() {
  show("code");
  state.challenge = await fetch("/api/challenge").then((r) => r.json());

  $("#codeTitle").textContent = state.challenge.title;
  $("#codeDescription").textContent = state.challenge.description;
  $("#codeEditor").value = state.challenge.starterCode;
  $("#testResultsSummary").classList.add("hidden");

  // Exemplo de uso
  $("#codeExample").innerHTML = `
<span class="ce-k">function</span> <span class="ce-f">parOuImpar</span>(numero) {<br>
&nbsp; <span class="ce-k">if</span> (numero % <span class="ce-s">2</span> === <span class="ce-s">0</span>) {<br>
&nbsp; &nbsp; <span class="ce-k">return</span> <span class="ce-s">'par'</span>;<br>
&nbsp; } <span class="ce-k">else</span> {<br>
&nbsp; &nbsp; <span class="ce-k">return</span> <span class="ce-s">'impar'</span>;<br>
&nbsp; }<br>
}
  `;

  const testList = $("#testList");
  testList.innerHTML = "";
  state.challenge.tests.forEach((test, i) => {
    const div = document.createElement("div");
    div.className = "test-item";
    div.id = `test-item-${i}`;
    div.innerHTML = `
      <div class="test-status pending" id="test-status-${i}">?</div>
      <div class="test-name" id="test-name-${i}">${escapeHtml(test.name)}</div>
    `;
    testList.appendChild(div);
  });

  $("#resetCodeBtn").onclick = () => {
    if (confirm("Resetar seu código?")) {
      $("#codeEditor").value = state.challenge.starterCode;
      $("#testResultsSummary").classList.add("hidden");
      state.challenge.tests.forEach((_, i) => {
        const s = $(`#test-status-${i}`);
        const n = $(`#test-name-${i}`);
        if (s) {
          s.className = "test-status pending";
          s.textContent = "?";
        }
        if (n) {
          n.className = "test-name";
        }
      });
      showToast("Código resetado.", "info", 2000);
    }
  };

  $("#runCodeBtn").onclick = runTests;

  $("#finishCodeBtn").onclick = async () => {
    await runTests();
    setTimeout(() => goFinal(), 400);
  };

  $("#codeEditor").addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const el = e.target,
        s = el.selectionStart;
      el.value =
        el.value.substring(0, s) + "  " + el.value.substring(el.selectionEnd);
      el.selectionStart = el.selectionEnd = s + 2;
    }
  });
} // ← fecha startCode

// ──────────────────────────────────────────────────────────────
// EXECUTAR TESTES
// ──────────────────────────────────────────────────────────────
async function runTests() {
  const code = $("#codeEditor").value;
  const btn = $("#runCodeBtn");
  btn.disabled = true;
  btn.textContent = "⏳ Executando...";

  const r = await fetch("/api/code/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ participantId: state.me.id, code }),
  })
    .then((r) => r.json())
    .catch(() => ({ compileError: "Erro de conexão com o servidor." }));

  btn.disabled = false;
  btn.textContent = "▶ Executar Testes";

  const summary = $("#testResultsSummary");

  if (r.compileError) {
    state.challenge.tests.forEach((_, i) => {
      const s = $(`#test-status-${i}`);
      const n = $(`#test-name-${i}`);
      if (s) {
        s.className = "test-status fail";
        s.textContent = "✗";
      }
      if (n) {
        n.className = "test-name fail";
      }
    });
    summary.classList.remove("hidden");
    summary.style.cssText =
      "color:var(--gt-danger);border:1px solid rgba(220,38,38,.3);border-radius:var(--r);padding:12px;text-align:center;font-weight:600;font-size:13px;";
    summary.textContent = `⚠ Erro: ${r.compileError}`;
    showToast("Erro no código. Verifique e tente novamente.", "error");
    return r;
  }

  const passed = r.results.filter((t) => t.passed).length;
  r.results.forEach((t, i) => {
    const s = $(`#test-status-${i}`);
    const n = $(`#test-name-${i}`);
    if (s) {
      s.className = `test-status ${t.passed ? "pass" : "fail"}`;
      s.textContent = t.passed ? "✓" : "✗";
    }
    if (n) {
      n.className = `test-name ${t.passed ? "pass" : "fail"}`;
    }
  });

  state.codeScore = r.earned;

  summary.classList.remove("hidden");
  if (passed === r.results.length) {
    summary.style.cssText =
      "color:var(--gt-success);border:1px solid rgba(10,135,90,.3);border-radius:var(--r);padding:12px;text-align:center;font-weight:600;font-size:13px;";
    summary.textContent = `🎉 ${passed}/${r.results.length} testes passaram — ${r.earned} pts!`;
    showToast("Todos os testes passaram! 🎉", "success", 4000);
  } else {
    summary.style.cssText =
      "color:var(--gt-warning);border:1px solid rgba(245,158,11,.3);border-radius:var(--r);padding:12px;text-align:center;font-weight:600;font-size:13px;";
    summary.textContent = `⚠ ${passed}/${r.results.length} testes passaram — ${r.earned} pts`;
    showToast(`${passed}/${r.results.length} testes passaram.`, "info");
  }

  return r;
}
// ──────────────────────────────────────────────────────────────
// TELA FINAL
// ──────────────────────────────────────────────────────────────
function goFinal() {
  show("final");
  const elapsed = Math.round((Date.now() - state.startedAt) / 1000);
  const min = Math.floor(elapsed / 60),
    sec = elapsed % 60;

  // Nome
  $("#finalPlayerName").textContent = state.me.name;
  $("#fsTempo").textContent = `${min}m ${sec}s`;
  $("#fsAcertos").textContent = `${state.correctCount}/10`;
  $("#fsCodigo").textContent = state.codeScore;

  // Certificado
  const total = state.quizScore + state.codeScore;
  let level, sub, icon;
  if (total >= 1200) {
    level = "Master";
    sub = "Desempenho excepcional!";
    icon = "🚀";
  } else if (total >= 900) {
    level = "Avançado";
    sub = "Excelente resultado!";
    icon = "⭐";
  } else if (total >= 500) {
    level = "Intermediário";
    sub = "Bom trabalho!";
    icon = "⭐";
  } else {
    level = "Iniciante";
    sub = "Continue praticando!";
    icon = "🌱";
  }

  $("#certIcon").textContent = icon;
  $("#certLevel").textContent = level;
  $("#certSub").textContent = sub;
  $("#certName").textContent = state.me.name;
  $("#certInfo").textContent = `${total} pontos · Recruiting Day 2026`;

  launchConfetti();

  // Histórico
  $("#historyToggle").onclick = () => {
    const panel = $("#historyPanel");
    panel.classList.toggle("hidden");
    if (!panel.classList.contains("hidden")) buildHistory(panel);
  };

  // Compartilhar
  $("#shareBtn").onclick = () => {
    const text = `Participei do Recruiting Day 2026 e fiz ${total} pontos! 🚀 #GeracaoTech #RecruitingDay`;
    if (navigator.share) navigator.share({ text });
    else {
      navigator.clipboard.writeText(text);
      showToast("Copiado para a área de transferência!", "success");
    }
  };

  // Reiniciar
  $("#restartBtn").onclick = () => {
    Object.assign(state, {
      me: null,
      questions: [],
      qIndex: 0,
      correctCount: 0,
      scenarios: [],
      challenge: null,
      timerId: null,
      selected: null,
      answered: false,
      autoAdvanceTimer: null,
      startedAt: null,
      quizScore: 0,
      codeScore: 0,
      answers: [],
    });
    $("#nameInput").value = "";
    $("#nameInputForm").value = "";
    show("register");
  };
}

function buildHistory(panel) {
  panel.innerHTML = `
    <div class="card" style="margin-top:8px;">
      <h3 style="margin-bottom:14px;font-size:1rem;">Histórico de Respostas</h3>
      ${state.answers
        .map(
          (a, i) => `
        <div style="padding:12px 0;border-bottom:1px solid var(--border);${i === state.answers.length - 1 ? "border:none" : ""}">
          <div style="font-size:13px;font-weight:600;margin-bottom:6px;display:flex;gap:8px;align-items:flex-start;">
            <span style="color:${a.isCorrect ? "var(--emerald)" : "var(--rose)"};flex-shrink:0;">${a.isCorrect ? "✓" : "✗"}</span>
            <span style="color:var(--text);">${escapeHtml(a.question)}</span>
          </div>
          ${
            !a.isCorrect
              ? `
            <div style="font-size:12px;color:var(--text-3);margin-left:20px;">
              Sua resposta: <span style="color:var(--rose);">${escapeHtml(a.chosen || "—")}</span>
              · Correta: <span style="color:var(--emerald);">${escapeHtml(a.correct)}</span>
            </div>
          `
              : ""
          }
        </div>
      `,
        )
        .join("")}
    </div>
  `;
}

// ──────────────────────────────────────────────────────────────
// RANKING — WebSocket
// ──────────────────────────────────────────────────────────────
socket.on("ranking:update", (ranking) => {
  renderRanking("#rankingList", ranking.slice(0, 12));

  if ($("#screen-final") && !$("#screen-final").classList.contains("hidden")) {
    renderFinalRanking(ranking);
  }
});

socket.on("admin:reset", () =>
  showToast("O evento foi resetado.", "warning", 5000),
);
socket.on("stage:advanced", ({ stage, keep }) =>
  showToast(`Etapa ${stage} encerrada — Top ${keep} avançaram!`, "info", 4000),
);

function renderRanking(sel, ranking) {
  const list = document.querySelector(sel);
  if (!list) return;
  list.innerHTML = "";
  ranking.forEach((p, i) => {
    const row = document.createElement("div");
    let cls = "rank-row";
    if (i === 0) cls += " gold";
    else if (i === 1) cls += " silver";
    else if (i === 2) cls += " bronze";
    if (state.me && p.id === state.me.id) cls += " me";
    if (p.eliminated) cls += " eliminated";
    row.className = cls;
    row.style.animationDelay = `${Math.min(i * 0.04, 0.5)}s`;
    row.innerHTML = `
      <div class="rank-pos">#${i + 1}</div>
      <div class="rank-name">${escapeHtml(p.name)}${state.me && p.id === state.me.id ? ' <small style="color:var(--accent-2);font-size:10px;">(você)</small>' : ""}</div>
      <div class="rank-score">${p.totalScore}</div>
    `;
    list.appendChild(row);
  });
}

function renderFinalRanking(ranking) {
  // Pódio top 3
  const podium = $("#podiumWrap");
  if (podium) {
    const medals = ["🥇", "🥈", "🥉"];
    const posLabels = ["1º Lugar", "2º Lugar", "3º Lugar"];
    const top3 = ranking.slice(0, 3);

    // Reordenar: 2º, 1º, 3º para visual de pódio
    const order = top3.length >= 3 ? [top3[1], top3[0], top3[2]] : top3;
    const orderClass = ["second", "first", "third"];

    podium.innerHTML = order
      .map((p, vi) => {
        if (!p) return "";
        const origIdx = top3.indexOf(p);
        const isMe = state.me && p.id === state.me.id;
        return `
        <div class="podium-card ${vi === 1 ? "first" : ""}">
          <span class="podium-medal">${medals[origIdx]}</span>
          <div class="podium-pos-label">${posLabels[origIdx]}</div>
          <div class="podium-name">${escapeHtml(p.name)}${isMe ? ` <span class="you">(você)</span>` : ""}</div>
          <div class="podium-pts">${p.totalScore}</div>
          <div class="podium-pts-label">pontos</div>
        </div>
      `;
      })
      .join("");

    // Atualiza o subtítulo com posição do jogador
    if (state.me) {
      const myPos = ranking.findIndex((p) => p.id === state.me.id) + 1;
      const me = ranking.find((p) => p.id === state.me.id);
      if (me) {
        $("#finalSubtitle").innerHTML =
          `Você ficou em <strong>${myPos}º lugar</strong> com <strong style="color:var(--gold);">${me.totalScore} pontos</strong> no total`;
      }
    }
  }

  // Ranking completo
  renderRanking("#finalRanking", ranking);
}

// ──────────────────────────────────────────────────────────────
// UTILS
// ──────────────────────────────────────────────────────────────
function escapeHtml(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
