const configLocal = JSON.parse(open('../config/config.local.json'));

export function pegarBaseURL() {
  const baseUrl = __ENV.BASE_URL || configLocal.baseUrl || 'http://localhost:3000';

  return baseUrl.replace(/\/$/, '');
}

export function obterCredenciais() {
  const username = __ENV.BANK_API_USERNAME;
  const password = __ENV.BANK_API_PASSWORD;

  if (!username || !password) {
    throw new Error(
      'Defina BANK_API_USERNAME e BANK_API_PASSWORD antes de executar os testes.'
    );
  }

  return {
    username,
    password
  };
}

export function obterDadosTransferencia() {
  const transferenciaPadrao = configLocal.transfer || {};

  return {
    contaOrigem: Number(
      __ENV.BANK_SOURCE_ACCOUNT_ID || transferenciaPadrao.contaOrigem || 1
    ),
    contaDestino: Number(
      __ENV.BANK_TARGET_ACCOUNT_ID || transferenciaPadrao.contaDestino || 2
    ),
    valor: Number(__ENV.BANK_TRANSFER_AMOUNT || transferenciaPadrao.valor || 100)
  };
}
