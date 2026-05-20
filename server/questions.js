// Banco de questões do Quiz - 4 fáceis (10pts), 4 médias (20pts), 2 difíceis (35pts)
module.exports = [
  {
    id: 1, level: 'facil', points: 10,
    question: 'Qual linguagem é considerada a base do desenvolvimento web no navegador?',
    options: ['Python', 'JavaScript', 'Ruby', 'Go'],
    correct: 1,
    explanation: 'JavaScript é a única linguagem nativamente executada por todos os navegadores modernos. Python, Ruby e Go rodam no servidor.'
  },
  {
    id: 2, level: 'facil', points: 10,
    question: 'O que significa a sigla HTML?',
    options: ['HyperText Markup Language', 'High Transfer Machine Language', 'Hyperlink Text Module Language', 'Home Tool Markup Language'],
    correct: 0,
    explanation: 'HTML = HyperText Markup Language. É a linguagem de marcação que estrutura todo conteúdo da web.'
  },
  {
    id: 3, level: 'facil', points: 10,
    question: 'Em Git, qual comando cria uma cópia local de um repositório remoto?',
    options: ['git pull', 'git fork', 'git clone', 'git copy'],
    correct: 2,
    explanation: 'git clone <url> baixa o repositório completo, incluindo histórico. git pull apenas atualiza um repositório já clonado.'
  },
  {
    id: 4, level: 'facil', points: 10,
    question: 'Qual estrutura de dados segue o princípio LIFO (Last In, First Out)?',
    options: ['Fila (Queue)', 'Lista ligada', 'Pilha (Stack)', 'Árvore'],
    correct: 2,
    explanation: 'A Pilha (Stack) funciona como uma pilha de pratos: o último item adicionado é o primeiro a ser retirado.'
  },
  {
    id: 5, level: 'medio', points: 20,
    question: 'Qual código HTTP indica que o recurso foi criado com sucesso após um POST?',
    options: ['200 OK', '201 Created', '204 No Content', '301 Moved Permanently'],
    correct: 1,
    explanation: '201 Created é o status semanticamente correto para indicar criação de novo recurso. 200 é genérico para sucesso.'
  },
  {
    id: 6, level: 'medio', points: 20,
    question: 'Em SQL, qual cláusula filtra resultados APÓS uma agregação com GROUP BY?',
    options: ['WHERE', 'HAVING', 'FILTER', 'ORDER BY'],
    correct: 1,
    explanation: 'WHERE filtra linhas antes do GROUP BY. HAVING filtra grupos após a agregação, permitindo usar funções como COUNT() e SUM().'
  },
  {
    id: 7, level: 'medio', points: 20,
    question: 'Em JavaScript, qual a diferença entre == e ===?',
    options: [
      'Não há diferença, são sinônimos',
      '== compara valor e tipo; === compara apenas valor',
      '=== compara valor e tipo; == faz coerção de tipo',
      '=== é usado apenas em arrays'
    ],
    correct: 2,
    explanation: '=== (igualdade estrita) compara valor E tipo sem conversão. == faz coerção: 0 == "0" é true, mas 0 === "0" é false.'
  },
  {
    id: 8, level: 'medio', points: 20,
    question: 'Qual o propósito principal do Docker em uma stack de desenvolvimento?',
    options: [
      'Compilar código mais rápido',
      'Empacotar aplicações em containers isolados e portáveis',
      'Substituir o sistema operacional',
      'Criar interfaces gráficas'
    ],
    correct: 1,
    explanation: 'Docker empacota app + dependências em containers leves e isolados, garantindo que rode igual em qualquer ambiente.'
  },
  {
    id: 9, level: 'dificil', points: 35,
    question: 'Em segurança web, o que caracteriza um ataque de SQL Injection?',
    options: [
      'Sobrecarga de requisições ao servidor',
      'Injeção de scripts maliciosos no HTML',
      'Inserção de comandos SQL via entradas não sanitizadas',
      'Interceptação de pacotes de rede'
    ],
    correct: 2,
    explanation: 'SQL Injection ocorre quando entradas do usuário são concatenadas diretamente em queries SQL. A defesa é usar prepared statements / parâmetros vinculados.'
  },
  {
    id: 10, level: 'dificil', points: 35,
    question: 'Qual a complexidade de tempo média da busca binária em um array ordenado de N elementos?',
    options: ['O(N)', 'O(N log N)', 'O(log N)', 'O(1)'],
    correct: 2,
    explanation: 'A busca binária divide o espaço de busca pela metade a cada passo, resultando em O(log N). Por isso é tão eficiente em arrays ordenados.'
  }
];
