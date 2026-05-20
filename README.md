# Recruiting Day — Geração Tech

Plataforma web interativa desenvolvida para o Recruiting Day do Geração Tech, focada em desafios técnicos, avaliação de participantes e acompanhamento em tempo real.

O sistema permite que candidatos participem de etapas técnicas gamificadas enquanto a equipe organizadora acompanha rankings, progresso e desempenho através de um painel administrativo.

## Funcionalidades

### Área do Participante

* Quiz técnico interativo
* Desafio de código
* Ranking em tempo real
* Interface moderna e responsiva
* Feedback visual durante as etapas
* Atualizações em tempo real com Socket.IO

### Área Administrativa

* Painel de controle
* Monitoramento dos participantes
* Estatísticas em tempo real
* Controle de etapas e rankings
* Visualização de desempenho

## Tecnologias Utilizadas

### Frontend

* HTML5
* CSS3
* JavaScript Vanilla

### Backend

* Node.js
* Express
* Socket.IO

## Estrutura do Projeto

```bash
recruiting-day/
├── public/
│   ├── index.html
│   ├── admin.html
│   ├── app.js
│   └── styles.css
│
├── server/
│   ├── index.js
│   ├── questions.js
│   ├── scenarios.js
│   └── codeChallenge.js
│
├── package.json
└── README.md
```

## Como Executar o Projeto

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

### 2. Acesse a pasta do projeto

```bash
cd rd-final
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute o projeto

```bash
npm start
```

ou

```bash
npm run dev
```

### 5. Acesse no navegador

```bash
http://localhost:3000
```

## Objetivo do Projeto

O projeto foi desenvolvido para tornar processos seletivos mais dinâmicos, técnicos e interativos, permitindo avaliar candidatos de forma prática durante eventos de recrutamento e seleção.

## Diferenciais

* Experiência gamificada
* Comunicação em tempo real
* Interface moderna
* Fluxo de avaliação dinâmica
* Estrutura simples e escalável

## Melhorias Futuras

* Persistência de dados com banco de dados
* Sistema de autenticação
* Exportação de rankings
* Dashboard avançado
* Histórico de participantes
* Cronômetro por etapa

## Scripts Disponíveis

```bash
npm start
```

Inicia o servidor.

```bash
npm run dev
```

Executa o projeto em modo de desenvolvimento.

## Autor

Projeto desenvolvido por Nazaré Almeida para o Recruiting Day — Geração Tech.
