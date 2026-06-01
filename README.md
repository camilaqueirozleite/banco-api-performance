# Banco API Performance

Projeto de testes de performance para uma API bancaria, desenvolvido com JavaScript e k6.

O objetivo deste repositorio e demonstrar uma abordagem pratica de Quality Assurance para validar estabilidade, tempo de resposta e comportamento de endpoints criticos em uma API de transferencias bancarias.

![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=black)
![k6](https://img.shields.io/badge/k6-Performance%20Testing-7D64FF?logo=k6&logoColor=white)
![QA](https://img.shields.io/badge/QA-Performance%20Testing-0E8A16)

## Escopo dos Testes

- Login de usuario e validacao de token JWT.
- Transferencia bancaria autenticada.
- Validacao de status code e resposta da API.
- Monitoramento de tempo de resposta, taxa de falhas e checks.
- Exportacao de sumarios de execucao para a pasta `reports/`.

## Tecnologias

- k6
- JavaScript
- API REST
- Git e GitHub
- Testes de performance
- Testes de API

## Estrutura

```text
banco-api-performance/
|-- config/
|   `-- config.local.json
|-- docs/
|   `-- PERFORMANCE_PLAN.md
|-- helpers/
|   `-- autenticacao.js
|-- reports/
|   `-- .gitkeep
|-- tests/
|   |-- login.test.js
|   `-- transferencias.test.js
|-- utils/
|   `-- variaveis.js
|-- .env.example
|-- .gitignore
|-- package.json
`-- README.md
```

## Pre-requisitos

- Node.js instalado.
- k6 instalado.
- Banco API rodando localmente em `http://localhost:3000`.

Instalacao do k6:

```bash
# Windows com Chocolatey
choco install k6

# macOS com Homebrew
brew install k6

# Linux
sudo apt install k6
```

## Configuracao

Crie as variaveis de ambiente antes da execucao.

Exemplo no PowerShell:

```powershell
$env:BASE_URL="http://localhost:3000"
$env:BANK_API_USERNAME="your-username"
$env:BANK_API_PASSWORD="your-password"
$env:BANK_SOURCE_ACCOUNT_ID="1"
$env:BANK_TARGET_ACCOUNT_ID="2"
$env:BANK_TRANSFER_AMOUNT="100"
$env:VUS="1"
$env:ITERATIONS="1"
```

Tambem existe um arquivo `.env.example` como referencia dos campos necessarios. Credenciais reais nao devem ser versionadas.

## Como Executar

Teste de login:

```bash
npm run test:login
```

Teste de transferencias:

```bash
npm run test:transfers
```

Executar os dois fluxos:

```bash
npm test
```

Gerar sumario JSON do login:

```bash
npm run test:login:summary
```

Gerar sumario JSON de transferencias:

```bash
npm run test:transfers:summary
```

Gerar os dois sumarios:

```bash
npm run test:summary
```

Os arquivos exportados ficam na pasta `reports/`.

## Thresholds

| Teste | Criterio |
| --- | --- |
| Login | p95 abaixo de 1000 ms e max abaixo de 3000 ms |
| Transferencias | p95 abaixo de 1500 ms e max abaixo de 4000 ms |
| Falhas HTTP | Menor que 1% |
| Checks | Maior que 99% |

## Observacoes de QA

- Os testes de transferencia criam movimentacoes reais no ambiente local da API.
- A carga pode ser ajustada com `VUS` e `ITERATIONS`.
- O plano de performance esta documentado em `docs/PERFORMANCE_PLAN.md`.
- As credenciais foram removidas do codigo e devem ser passadas por variaveis de ambiente.

## Autor

Camila Leite  
Junior QA Engineer | QA Automation | API Testing | Performance Testing
