import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    stages: [
        { duration: '10s', target: 20 },
        { duration: '20s', target: 50 },
        { duration: '20s', target: 100 },
        { duration: '10s', target: 0 }, 
    ],
};

export default function () {
    const idAleatorio = Math.floor(Math.random() * 462) + 1;
    
    const url = `http://localhost:8081/api/consumidor/${idAleatorio}`;
    
    const params = {
        headers: { 'Content-Type': 'application/json' },
    };

    const res = http.get(url, params);

    check(res, {
        'status foi 200': (r) => r.status === 200,
    });

    sleep(1);
}