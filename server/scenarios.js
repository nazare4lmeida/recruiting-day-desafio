// Etapa 2 — IA Generativa & Soft Skills
module.exports = [
  {
    id: 1,
    title: 'Prompt Engineering',
    scenario: `
Você recebeu a tarefa de melhorar um prompt antes de enviá-lo para uma IA.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌  PROMPT ORIGINAL (ruim):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"faz um email pra cliente sobre atraso"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✏️  SUA TAREFA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reescreva esse prompt de forma clara, completa e profissional,
para que a IA consiga gerar um e-mail realmente útil.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡  DICAS — inclua esses elementos no seu prompt:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  1. CONTEXTO    → quem está escrevendo, para quem e sobre qual projeto
  2. TOM         → formal, empático ou direto?
  3. OBJETIVO    → pedir desculpas, propor solução, informar novo prazo?
  4. ESTRUTURA   → peça saudação, corpo do texto e encerramento
  5. DETALHES    → mencione prazo, solução proposta e próximos passos
  6. FORMATO     → ex: "responda apenas com o e-mail, sem comentários"

Quanto mais específico e bem estruturado for o seu prompt,
maior será a sua pontuação.
    `.trim(),

    keywords: [
      'contexto', 'tom', 'formal', 'empático', 'direto', 'agradeço', 
      'cliente', 'profissional', 'atraso', 'desculpe', 'prazo',
      'solução', 'objetivo', 'formato', 'estrutura', 'saudação', 'agradecimento',
      'encerramento', 'próximos passos', 'projeto', 'entrega', 'desculpas', 'explicação',
      'instrução', 'específico', 'sem comentários', 'completo', 'claro', 'útil'
    ],
    minLength: 120,
    maxPoints: 100
  }
];