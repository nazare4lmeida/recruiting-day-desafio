module.exports = {
  title: "Par, Ímpar ou Inválido",

  description: `
Implemente a função parOuImpar(numero) que recebe um valor
e retorna uma string indicando se ele é:

- "par"
- "impar"
- "invalido"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📥 ENTRADA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A função pode receber:

✔ números positivos
✔ números negativos
✔ zero
✔ valores inválidos

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📤 SAÍDA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A função deve retornar:

- "par"       → se o número for divisível por 2
- "impar"     → se não for divisível por 2
- "invalido"  → se o valor não for um número inteiro válido

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 REGRAS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. O zero é considerado par
2. Números negativos funcionam normalmente
3. Retorne sempre em letras minúsculas
4. NÃO use acentos
5. Valores inválidos devem retornar "invalido"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ CONSIDERE COMO INVÁLIDO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- texto
- null
- NaN
- arrays
- objetos
- números decimais

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 DICAS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- typeof pode ajudar
- Number.isInteger() pode ser útil
- O operador % retorna o resto da divisão

Exemplo:
4 % 2 === 0

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✏️ EXEMPLOS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Entrada: 4
Saída: "par"

Entrada: 7
Saída: "impar"

Entrada: 0
Saída: "par"

Entrada: -3
Saída: "impar"

Entrada: 2.5
Saída: "invalido"

Entrada: "10"
Saída: "invalido"

Entrada: null
Saída: "invalido"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏆 DESAFIO EXTRA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tente escrever uma solução:

✔ clara
✔ organizada
✔ fácil de ler
✔ com poucos condicionais desnecessários

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧠 O QUE SERÁ AVALIADO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Funcionamento correto
- Tratamento de erros
- Organização do código
- Clareza da lógica
- Legibilidade
  `.trim(),

  starterCode: `function parOuImpar(numero) {

  // Verifica se é um número inteiro válido


  // Verifica se é par ou ímpar


}
`,

  tests: [
    {
      name: "Número par positivo",
      input: 4,
      expected: "par",
    },

    {
      name: "Número ímpar positivo",
      input: 7,
      expected: "impar",
    },

    {
      name: "Zero",
      input: 0,
      expected: "par",
    },

    {
      name: "Número negativo par",
      input: -8,
      expected: "par",
    },

    {
      name: "Número negativo ímpar",
      input: -3,
      expected: "impar",
    },

    {
      name: "Número decimal",
      input: 2.5,
      expected: "invalido",
    },

    {
      name: "Texto",
      input: "10",
      expected: "invalido",
    },

    {
      name: "Null",
      input: null,
      expected: "invalido",
    },
    {
      name: "NaN",
      input: NaN,
      expected: "invalido",
    },
  ],

  pointsPerTest: 10,
};
