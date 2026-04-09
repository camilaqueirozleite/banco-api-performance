const postLogin = {
    username: "julio.lima",
    password: "123456"
};

import http from 'k6/http';
import { check, sleep } from 'k6';
import { token } from '../helpers/autenticacao.js';
cao.js

export const options = {
    iterations: 1,
    thresholds: {
        http_req_duration: ['p(90)<3000', 'max<5000'],
        http_req_failed: ['rate<0.01'],
    },
};

export default function () {
    const url = 'http://localhost:3000/transferencias';

    const params = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    const payload = JSON.stringify({
        origem: "12345-6",
        destino: "98765-4",
        valor: 100,
        descricao: "Transferência automática"
    });

    const res = http.post(url, payload, params);

    check(res, {
        'Status é 201': (r) => r.status === 201,
    });

    sleep(1);
}
