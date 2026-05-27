// Banco de questões do Quiz - 3 fáceis (10pts), 4 médias (20pts), 3 difíceis (35pts)
module.exports = [
  {
    id: 1,
    level: "facil",
    points: 10,
    question:
      'Qual dos seguintes componentes de hardware é considerado o "cérebro" do computador, responsável por processar as instruções dos programas?',
    options: [
      "Memória RAM",
      "Placa de Vídeo (GPU)",
      "Unidade Central de Processamento (CPU)",
      "Disco Rígido (HD/SSD)",
    ],
    correct: 2,
    explanation:
      "A CPU (Central Processing Unit) lê e executa as instruções do sistema operacional e dos softwares instalados, atuando como o núcleo de processamento.",
  },
  {
    id: 2,
    level: "facil",
    points: 10,
    question: "O que significa a sigla HTML?",
    options: [
      "HyperText Markup Language",
      "High Transfer Machine Language",
      "Hyperlink Text Module Language",
      "Home Tool Markup Language",
    ],
    correct: 0,
    explanation:
      "HTML = HyperText Markup Language. É a linguagem de marcação que estrutura todo conteúdo da web.",
  },
  {
    id: 3,
    level: "facil",
    points: 10,
    question:
      "Em Git, qual comando cria uma cópia local de um repositório remoto?",
    options: ["git pull", "git fork", "git clone", "git copy"],
    correct: 2,
    explanation:
      "git clone <url> baixa o repositório completo, incluindo histórico. git pull apenas atualiza um repositório já clonado.",
  },
  {
    id: 4,
    level: "medio",
    points: 20,
    question:
      "Qual o nome do tipo de software responsável por fazer a ponte direta entre o sistema operacional e um hardware específico (como uma impressora ou placa de vídeo)?",
    options: ["Firmware", "Driver", "Kernel", "Compilador"],
    correct: 1,
    explanation:
      "Os drivers são programas que permitem ao sistema operacional comunicar-se de forma correta e eficiente com os dispositivos físicos de hardware.",
  },
  {
    id: 5,
    level: "medio",
    points: 20,
    question:
      "Qual código HTTP indica que o recurso foi criado com sucesso após um POST?",
    options: [
      "200 OK",
      "201 Created",
      "204 No Content",
      "301 Moved Permanently",
    ],
    correct: 1,
    explanation:
      "201 Created é o status semanticamente correto para indicar criação de novo recurso. 200 é genérico para sucesso.",
  },
  {
    id: 6,
    level: "medio",
    points: 20,
    question:
      "No contexto de inteligência artificial, o que define a tecnologia dos Grandes Modelos de Linguagem (LLMs), como o ChatGPT?",
    options: [
      "Sistemas baseados em regras rígidas criadas por programadores",
      "Algoritmos baseados em Redes Neurais que preveem a próxima palavra mais provável em um texto",
      "Softwares capazes de sentir emoções humanas e tomar decisões autônomas",
      "Bancos de dados estruturados que apenas buscam respostas exatas na internet",
    ],
    correct: 1,
    explanation:
      "As LLMs utilizam arquiteturas de Aprendizado Profundo (como Transformers) treinadas em volumes massivos de dados para calcular probabilidades estatísticas e gerar textos coerentes.",
  },
  {
    id: 7,
    level: "medio",
    points: 20,
    question: "Em JavaScript, qual a diferença entre == e ===?",
    options: [
      "Não há diferença, são sinônimos",
      "== compara valor e tipo; === compara apenas valor",
      "=== compara valor e tipo; == faz coerção de tipo",
      "=== é usado apenas em arrays",
    ],
    correct: 2,
    explanation:
      '=== (igualdade estrita) compara valor E tipo sem conversão. == faz coerção: 0 == "0" é true, mas 0 === "0" é false.',
  },
  {
    id: 8,
    level: "medio",
    points: 20,
    question:
      "No mercado de tecnologia, qual soft skill é descrita como a capacidade de se adaptar rapidamente a novas metodologias, mudanças de escopo e novas ferramentas?",
    options: [
      "Resiliência e Flexibilidade cognitiva",
      "Comunicação Assertiva",
      "Liderança Técnico",
      "Gestão de Tempo",
    ],
    correct: 0,
    explanation:
      "A flexibilidade cognitiva e a resiliência permitem ao profissional lidar bem com a volatilidade da tecnologia, encarando mudanças como oportunidades de aprendizado.",
  },
  {
    id: 9,
    level: "dificil",
    points: 35,
    question:
      "Qual das seguintes opções descreve corretamente uma diferença fundamental de baixo nível entre memórias do tipo RAM e memórias do tipo Armazenamento Não-Volátil (como SSDs)?",
    options: [
      "A RAM armazena dados em trilhas magnéticas, enquanto o SSD utiliza circuitos ópticos de laser.",
      "A RAM retém os dados através de transistores que necessitam de corrente elétrica contínua (volátil), enquanto SSDs utilizam células de memória Flash que retêm carga mesmo sem energia.",
      "SSDs se comunicam diretamente com os registradores da CPU sem passar pelo barramento do sistema, ao contrário da RAM.",
      "A RAM serve unicamente para armazenar o código do Kernel do Sistema Operacional, enquanto o SSD armazena os dados do usuário.",
    ],
    correct: 1,
    explanation:
      "A memória RAM perde seus dados ao desligar o aparelho porque depende de capacitores/transistores energizados, enquanto as memórias Flash dos SSDs utilizam portas lógicas flutuantes para manter os dados permanentemente.",
  },
  {
    id: 10,
    level: "dificil",
    points: 35,
    question:
      "Ao criar um repositório vazio no GitHub, qual é a sequência correta de comandos no terminal para inicializar um projeto local existente e vinculá-lo a esse repositório remoto pela primeira vez?",
    options: [
      'git clone <url> -> git add . -> git commit -m "first commit"',
      'git init -> git add . -> git commit -m "first commit" -> git remote add origin <url> -> git push -u origin main',
      "git remote add origin <url> -> git push -u origin main -> git init",
      "git init -> git remote add origin <url> -> git pull origin main -> git add .",
    ],
    correct: 1,
    explanation:
      'Para subir um projeto local novo, primeiro inicializamos o Git (git init), adicionamos e buildamos o primeiro commit, depois mapeamos o servidor remoto com "git remote add origin <url>" e, finalmente, enviamos os arquivos com o push.',
  },
];
