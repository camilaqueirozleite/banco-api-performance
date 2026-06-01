import http from 'k6/http';
import { check, sleep } from 'k6';
import { obterToken } from '../helpers/autenticacao.js';
import { obterDadosTransferencia, pegarBaseURL } from '../utils/variaveis.js';

export const options = {
  vus: Number(__ENV.VUS || 1),
  iterations: Number(__ENV.ITERATIONS || 1),
  thresholds: {
    http_req_duration: ['p(95)<1500', 'max<4000'],
    http_req_failed: ['rate<0.01'],
    checks: ['rate>0.99']
  }
};

export function setup() {
  const token = obterToken();

  return { token };
}

export default function (data) {
  const url = `${pegarBaseURL()}/transferencias`;
  const payload = JSON.stringify(obterDadosTransferencia());

  const params = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.token}`
    }
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status e 201': (response) => response.status === 201,
    'mensagem de sucesso retornada': (response) => {
      const message = response.json('message') || '';

      return message.includes('sucesso');
    }
  });

  sleep(1);
}
