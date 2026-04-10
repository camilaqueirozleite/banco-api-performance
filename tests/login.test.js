import http from 'k6/http';
import { sleep, check } from 'k6';
import { pegarBaseURL } from '../utils/variaveis';

// Carrega o JSON com os dados do login
const postLogin = JSON.parse(open('../fixtures/postLogin.json'));

export const options = {
  iterations: 1,
  thresholds: {
    http_req_duration: ['p(90)<3000', 'max<5000'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const url = pegarBaseURL + 'login';

  // Ajusta o username antes de enviar
  postLogin.username = "julio.lima";
  postLogin.senha = "123456";

  const payload = JSON.stringify(postLogin);

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Executa a requisição
  const res = http.post(url, payload, params);
  console.log("STATUS:", res.status);
  console.log("BODY:", res.body);

  // Validações
  check(res, {
    'Status é 200': (r) => r.status === 200,
    'Token é string': (r) => typeof r.json().token === 'string',
  });

  sleep(1);
}
