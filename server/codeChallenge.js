module.exports = {
  title: 'Par ou Ímpar',

  description: `Implemente a função parOuImpar(numero) que recebe um número inteiro e retorna uma string indicando se ele é par ou ímpar.

📥 ENTRADA:
Um número inteiro (positivo, negativo ou zero)

📤 SAÍDA:
A string "par" se o número for divisível por 2, ou "impar" caso contrário

📌 REGRAS:
1. O zero é considerado par
2. Funciona para números negativos também
3. Retorne sempre em letras minúsculas: "par" ou "impar" (sem acento)

💡 DICAS:
- O operador % (resto da divisão) é seu melhor amigo aqui
- numero % 2 === 0 → o número é par
- numero % 2 !== 0 → o número é ímpar
- Tanto 4 % 2 quanto -4 % 2 resultam em 0

✏️ EXEMPLO:
Entrada: 4   → Saída: "par"
Entrada: 7   → Saída: "impar"
Entrada: 0   → Saída: "par"
Entrada: -3  → Saída: "impar"`.trim(),

  starterCode: `function parOuImpar(numero) {
  // Digite seu código aqui

}
`,

  tests: [
    {
      name: 'Número par positivo',
      input: 4,
      expected: 'par'
    }
  ],

  pointsPerTest: 100

};