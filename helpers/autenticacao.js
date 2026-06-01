import http from 'k6/http';
import { check } from 'k6';
import { obterCredenciais, pegarBaseURL } from '../utils/variaveis.js';

export function obterToken() {
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
    'login retornou status 200': (response) => response.status === 200,
    'login retornou token': (response) => Boolean(response.json('token'))
  });

  const token = res.json('token');

  if (!token) {
    throw new Error('Nao foi possivel obter token de autenticacao.');
  }

  return token;
}
