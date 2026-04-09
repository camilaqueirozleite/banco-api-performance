import http from 'k6/http';
import { check, sleep } from 'k6';
import { obterToken } from '../helpers/autenticacao.js';

export const options = {
    iterations: 1,
    thresholds: {
        http_req_duration: ['p(90)<3000', 'max<5000'],
        http_req_failed: ['rate<0.01'],
    },
};

export default function () {
    const token = obterToken();

    const url = 'http://localhost:3000/transferencias';

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    };

        let res = http.post(url, payload, params);

   
    check(res, {
        'status é 201': (r) => r.status === 201,
    });

    sleep(1);
}
