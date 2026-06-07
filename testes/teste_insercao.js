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

function gerarCPFValido() {
    const random = (n) => Math.floor(Math.random() * n);
    let n1 = random(9), n2 = random(9), n3 = random(9),
        n4 = random(9), n5 = random(9), n6 = random(9),
        n7 = random(9), n8 = random(9), n9 = random(9);
    
    let d1 = n9*2 + n8*3 + n7*4 + n6*5 + n5*6 + n4*7 + n3*8 + n2*9 + n1*10;
    d1 = 11 - (d1 % 11);
    if (d1 >= 10) d1 = 0;
    
    let d2 = d1*2 + n9*3 + n8*4 + n7*5 + n6*6 + n5*7 + n4*8 + n3*9 + n2*10 + n1*11;
    d2 = 11 - (d2 % 11);
    if (d2 >= 10) d2 = 0;
    
    return `${n1}${n2}${n3}.${n4}${n5}${n6}.${n7}${n8}${n9}-${d1}${d2}`;
}

export default function () {
    const idUnico = Date.now() + Math.floor(Math.random() * 100000);
    const url = 'http://localhost:8081/api/consumidor';
    
    const payload = JSON.stringify({
        nome: `Consumidor VU ${idUnico}`,
        email: `user${idUnico}@favelafood.com`,
        senha: 'senhaSegura123',
        cpf: gerarCPFValido()
    });

    const params = {
        headers: { 'Content-Type': 'application/json' },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'cadastro retornou 201': (r) => r.status === 201,
    });

    sleep(1);
}