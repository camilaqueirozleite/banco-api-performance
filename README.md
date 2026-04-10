📘 Testes de Performance com JavaScript e k6

![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=black)
![k6](https://img.shields.io/badge/k6-Performance%20Testing-7D64FF?logo=k6&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-2088FF?logo=githubactions&logoColor=white)


🧩 Introdução
Este repositório contém testes de performance desenvolvidos em JavaScript utilizando o k6, com o objetivo de validar a estabilidade, velocidade e resiliência da API do projeto Banco API sob diferentes níveis de carga.

🛠️ Tecnologias Utilizadas
k6 – Testes de performance

JavaScript (ES6+) – Linguagem dos cenários

Node.js – Scripts auxiliares

Git / GitHub – Versionamento

HTML Report – Exportação de relatórios visuais

📁 Estrutura do Repositório
bash
banco-api-performance/
│
├── config/                 # Configurações locais
├── fixtures/               # Massa de dados para os testes
├── helpers/                # Funções utilitárias (login, tokens, headers)
├── tests/                  # Arquivos de testes de performance
│   ├── login.test.js
│   ├── transferencias.test.js
│   └── ...
│
├── utils/                  # Variáveis e funções auxiliares
├── html-report.html        # Relatório exportado (opcional)
├── package.json            # Scripts e dependências
├── .gitignore
└── README.md

🎯 Objetivo de Cada Grupo de Arquivos
config/
Armazena configurações locais, como URLs e parâmetros de ambiente.

fixtures/
Contém dados estáticos usados nos testes (payloads, usuários, contas, valores).

helpers/
Funções auxiliares que facilitam a escrita dos testes:

login

geração de tokens

criação de headers

manipulação de dados

tests/
Cenários de performance escritos em JavaScript:

login.test.js → valida autenticação

transferencias.test.js → simula operações bancárias

utils/
Variáveis e funções compartilhadas entre diferentes testes.

⚙️ Modo de Instalação
1. Clone o repositório
bash
git clone https://github.com/camilaqueirozleite/banco-api-performance.git
cd banco-api-performance
2. Instale o k6
Windows (Chocolatey):

bash
choco install k6
Linux (apt):

bash
sudo apt install k6
MacOS (Homebrew):

bash
brew install k6
3. (Opcional) Instale dependências Node
bash
npm install
🚀 Modo de Execução do Projeto
🔧 Variável de ambiente obrigatória
Todos os testes utilizam:

bash
BASE_URL
Exemplo:

bash
k6 run tests/transferencias.test.js -e BASE_URL=http://localhost:3000
📊 Execução com Relatório em Tempo Real
bash
k6 run tests/login.test.js -e BASE_URL=http://localhost:3000
O terminal exibirá:

métricas

percentis

thresholds

erros

tempo de resposta

📤 Exportação de Relatório HTML
1. Execute o teste exportando JSON:
bash
k6 run tests/transferencias.test.js -e BASE_URL=http://localhost:3000 --out json=resultado.json
2. Converta para HTML:
bash
npx k6-reporter resultado.json html-report.html
O arquivo html-report.html será criado na raiz do projeto.
