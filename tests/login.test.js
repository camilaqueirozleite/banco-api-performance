import http from 'k6/http';
import { check, sleep } from 'k6';
import { obterCredenciais, pegarBaseURL } from '../utils/variaveis.js';

export const options = {
  vus: Number(__ENV.VUS || 1),
  iterations: Number(__ENV.ITERATIONS || 1),
  thresholds: {
    http_req_duration: ['p(95)<1000', 'max<3000'],
    http_req_failed: ['rate<0.01'],
    checks: ['rate>0.99']
  }
};

export default function () {
  const url = `${pegarBaseURL()}/login`;
  const { username, password } = obterCredenciais();

  const payload = JSON.stringify({
    username,
    senha: password
  });

  const params = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status e 200': (response) => response.status === 200,
    'token e string': (response) => typeof response.json('token') === 'string'
  });

  sleep(1);
}
