// Etapa 2 — IA Generativa & Soft Skills

module.exports = [
  {
    id: 1,
    title: 'Prompt Engineering Avançado em Equipe',

    scenario: `
Sua equipe atua no time de desenvolvimento e inovação de uma Tech Company.

Um cliente premium de um projeto de software ficou insatisfeito devido a um atraso crucial na entrega de uma feature. O gestor de contas pediu que o time técnico utilize IA Generativa para redigir a resposta. No entanto, o prompt inicial gerado pelo estagiário faliu em trazer um resultado profissional.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ PROMPT ORIGINAL (Iniciante / Sem técnicas de IA):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"faz um email pra cliente sobre atraso"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👥 DINÂMICA DE FLUIDEZ EM EQUIPE (Papéis):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Para simular um ambiente ágil real, dividam-se rapidamente nestas funções:
1. Prompt Engineer (Foca na estrutura técnica da IA, variáveis e delimitadores)
2. Business Analyst / Product Owner (Garante o tom corporativo, empatia e contexto do negócio)
3. QA / Reviewer (Valida se o prompt não vai gerar alucinações e se cumpre todas as constraints)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✏️ SUA TAREFA TÉCNICA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reescrevam o prompt aplicando técnicas reais de Engenharia de Prompts. 
O prompt final de vocês DEVE conter obrigatoriamente:

1. DEFINIÇÃO DE PERSONA (Atuação / Role da IA)
   → Ex: "Atue como um Diretor de Tecnologia sênior..."

2. TÉCNICA DE DELIMITADORES
   → Uso de tags como ### Contexto ###, [Instruções] ou XML (<dados>) para isolar as variáveis e evitar vazamento de prompt.

3. REGRAS DE CONSTRAINTS (Restrições Negativas)
   → Dizer explicitamente o que a IA NÃO pode fazer (ex: "Não use jargões excessivamente técnicos", "Não prometa prazos impossíveis").

4. FEW-SHOT PROMPTING (Opcional, mas pontua mais!)
   → Fornecer um pequeno exemplo de estrutura ou padrão de escrita esperado dentro do prompt.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧠 JUSTIFICATIVA TÉCNICA (O Desafio Extra):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ao final do prompt, a equipe deve anexar uma rápida nota técnica respondendo:
- Quais conceitos de IA Generativa vocês aplicaram para evitar "alucinações" do modelo?
- Como a soft skill de "Negociação e Empatia" (Business Analyst) se traduziu nas instruções que vocês deram para a IA?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏆 CRITÉRIOS DE PONTUAÇÃO (Max: 100):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✔ [25 pts] Técnicas de IA Aplicadas: Uso correto de Personas, Delimitadores e Constraints.
✔ [20 pts] Contexto e Variáveis: Se o prompt entrega dados ricos (novo prazo, causa, próximos passos).
✔ [15 pts] Estrutura e Formatação do Output: Comandos claros de como a IA deve formatar a resposta.
✔ [15 pts] Justificativa Técnica: Uso correto dos termos de IA no relatório da equipe.
✔ [15 pts] Soft Skills / Tom do E-mail: Equilíbrio perfeito entre profissionalismo e empatia.
✔ [10 pts] Colaboração Dinâmica: Divisão clara dos papéis e fluidez na apresentação da solução.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏱ TEMPO DE SPRINT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

12 minutos
    `.trim(),

    keywords: [
      'prompt engineering',
      'persona',
      'delimitadores',
      'constraints',
      'restrições',
      'alucinação',
      'few-shot',
      'contexto',
      'tom',
      'formal',
      'empático',
      'profissional',
      'atraso',
      'prazo',
      'solução',
      'estrutura',
      'projeto',
      'entrega',
      'instrução',
      'específico',
      'output',
      'variáveis',
      'comunicação',
      'colaboração',
      'equipe',
      'justificativa',
      'soft skills',
      'qa',
      'business analyst'
    ],

    minLength: 350,

    evaluationCriteria: {
      tecnicas_ia: 25,
      contexto_variaveis: 20,
      estrutura_output: 15,
      justificativa_tecnica: 15,
      soft_skills_tom: 15,
      colaboracao_equipe: 10
    },

    maxPoints: 100
  }
];