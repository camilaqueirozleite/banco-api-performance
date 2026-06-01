# Plano de Testes de Performance

## Objetivo

Avaliar a estabilidade e o tempo de resposta da Banco API em fluxos criticos de autenticacao e transferencias bancarias.

## Escopo

- Login de usuario e geracao de token JWT.
- Transferencia bancaria autenticada.
- Validacao de status code, token, mensagem de sucesso e taxa de falhas.
- Coleta de metricas de tempo de resposta, requisicoes falhadas e checks.

## Fora de Escopo

- Testes de seguranca.
- Testes visuais ou funcionais de interface web.
- Testes de volume em base produtiva.

## Ambiente

- API local: `http://localhost:3000`
- Ferramenta: k6
- Linguagem: JavaScript
- Execucao configuravel por variaveis de ambiente.

## Massa de Dados

As credenciais e dados de transferencia devem ser informados por variaveis de ambiente:

- `BANK_API_USERNAME`
- `BANK_API_PASSWORD`
- `BANK_SOURCE_ACCOUNT_ID`
- `BANK_TARGET_ACCOUNT_ID`
- `BANK_TRANSFER_AMOUNT`

## Cenarios Automatizados

| Cenario | Objetivo | Script |
| --- | --- | --- |
| Login | Validar autenticacao e emissao de token | `tests/login.test.js` |
| Transferencias | Validar transferencia autenticada sob carga controlada | `tests/transferencias.test.js` |

## Thresholds

| Metrica | Criterio |
| --- | --- |
| `http_req_failed` | Menor que 1% |
| `checks` | Maior que 99% |
| Login `http_req_duration` | p95 abaixo de 1000 ms e max abaixo de 3000 ms |
| Transferencias `http_req_duration` | p95 abaixo de 1500 ms e max abaixo de 4000 ms |

## Riscos e Observacoes

- Os testes de transferencia alteram saldo e geram registros na API.
- A carga deve ser aumentada gradualmente para evitar impacto em ambiente compartilhado.
- Credenciais reais nao devem ser versionadas no repositorio.
