// Etapa 2 — IA Generativa & Soft Skills

module.exports = [
  {
    id: 1,
    title: 'Prompt Engineering em Equipe',

    scenario: `
Sua equipe trabalha em uma empresa de tecnologia.

Um cliente importante ficou insatisfeito porque houve atraso
na entrega de um projeto.

O gestor pediu que vocês utilizassem IA Generativa para criar
um e-mail profissional para esse cliente.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ PROMPT ORIGINAL (ruim):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"faz um email pra cliente sobre atraso"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👥 DESAFIO EM EQUIPE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Vocês devem trabalhar juntos para:

1. Identificar os problemas do prompt original
2. Melhorar o prompt de forma profissional
3. Garantir que a IA gere uma resposta clara e útil
4. Explicar rapidamente as decisões tomadas pela equipe

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✏️ SUA TAREFA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reescreva o prompt de forma clara, completa e profissional.

O novo prompt deve orientar a IA a gerar um e-mail:

- profissional
- organizado
- empático
- objetivo
- adequado para um cliente real

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 O QUE O PROMPT DEVE CONTER:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. CONTEXTO
→ Quem está escrevendo?
→ Quem vai receber?
→ Qual é o projeto?
→ Qual foi o problema?

2. TOM
→ Formal?
→ Empático?
→ Profissional?

3. OBJETIVO
→ Pedir desculpas
→ Explicar o atraso
→ Informar novo prazo
→ Manter boa relação com o cliente

4. ESTRUTURA
→ Saudação
→ Explicação
→ Solução
→ Encerramento

5. DETALHES IMPORTANTES
→ Novo prazo
→ Próximos passos
→ Disponibilidade para dúvidas

6. FORMATO
→ Exemplo:
"Responda apenas com o e-mail final, sem comentários extras"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧠 DESAFIO EXTRA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Depois de criar o prompt, a equipe deve responder:

- O que estava ruim no prompt original?
- O que vocês melhoraram?
- Por que essas melhorias ajudam a IA?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏆 PONTUAÇÃO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A equipe ganhará mais pontos se:

✔ O prompt for claro e específico
✔ O texto estiver bem organizado
✔ A comunicação for profissional
✔ A equipe demonstrar colaboração
✔ A solução parecer realista
✔ As melhorias forem bem justificadas

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏱ TEMPO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

10 minutos
    `.trim(),

    keywords: [
      'contexto',
      'tom',
      'formal',
      'empático',
      'profissional',
      'cliente',
      'atraso',
      'prazo',
      'solução',
      'objetivo',
      'estrutura',
      'saudação',
      'encerramento',
      'projeto',
      'entrega',
      'desculpas',
      'explicação',
      'instrução',
      'específico',
      'claro',
      'útil',
      'detalhado',
      'organizado',
      'próximos passos',
      'e-mail',
      'resposta',
      'comunicação',
      'colaboração',
      'equipe',
      'justificativa',
      'profissionalismo'
    ],

    minLength: 250,

    evaluationCriteria: {
      clareza: 20,
      contexto: 20,
      estrutura: 15,
      profissionalismo: 15,
      criatividade: 10,
      colaboração: 10,
      justificativa: 10
    },

    maxPoints: 100
  }
];