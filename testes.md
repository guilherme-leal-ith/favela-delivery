## Testes de Carga

### 1ª Fase de Testes

### Teste de escrita (Post)

##### Metodologia e Ferramentas
A avaliação de desempenho e resiliência das APIs do ecossistema FavelaFood foi conduzida por meio de testes de carga estruturados em um cenário unificado de rampa progressiva até o patamar máximo de estresse de 100 Usuários Virtuais simultâneos (VUs). A metodologia consiste em isolar a operação de gravação (`POST /api/consumidor`) em ambiente local (*localhost*) para mensurar o impacto direto da carga concorrente sobre a regra de negócio. Como ferramenta principal de injeção de carga, foi utilizado o k6 (Grafana Labs).

* **Arquivos envolvidos:** `ConsumidorController.java`, `ConsumidorService.java`, `ConsumidorMapper.java`, `ConsumidorRepository.java`, `Consumidor.java`, `Usuario.java`
* **Arquivo de teste k6:** [teste_insercao.js](https://github.com/guilherme-leal-ith/favela-delivery/blob/consumidor-endereco/testes/teste_insercao.js)
* **Data da medição:** 04/06/2026 

##### Resultados no terminal

<img width="1035" height="651" alt="image" src="https://github.com/user-attachments/assets/07b8edeb-1b62-4f98-b6bf-e78f846b1eb4" />


* **Resultados Testes de carga (SLA):**
    * **Latência:** Média de 6.45s, saltando para 11.99s no percentil 95% (P95) e atingindo o pico máximo de 17.68s sob estresse máximo.
    * **Vazão:** O k6 reportou uma vazão média de 6.8 req/s considerando toda a duração da execução (67.9 s). A análise dos registros de requisições concluídas resultou em uma vazão efetiva de 7.34 req/s durante a janela ativa de processamento (63.0 s).
    * **Concorrência (Limite de requisições simultâneas):** O sistema tolerou a rampa progressiva até o limite de 100 Usuários Virtuais (VUs) simultâneos mantendo 99.78% de estabilidade operacional, registrando apenas 1 falha por timeout em toda a execução.
    * **Taxa de erro:** 0.21% (1 de 463 requisições).

##### Representação visual das métricas

<img width="3017" height="1641" alt="grafico_concorrencia" src="https://github.com/user-attachments/assets/3becc447-7855-4fd7-98f4-465a0a7caa23" />

<img width="3070" height="1642" alt="grafico_latencia" src="https://github.com/user-attachments/assets/dd60b730-e9fc-4ada-b91c-0c11afa549ce" />


<img width="2992" height="1640" alt="grafico_vazao" src="https://github.com/user-attachments/assets/a33089e6-7dd7-41a7-9bbd-4f9e6f080d21" />


---

### Teste de Leitura (Get)

##### Metodologia e Ferramentas
A avaliação de desempenho e eficiência das consultas no ecossistema FavelaFood foi conduzida isolando a operação de leitura (`GET /api/consumidor/{id}`) em ambiente local (*localhost*). 

A metodologia consiste em realizar buscas síncronas aleatórias indexadas por chave primária para mensurar a velocidade de resposta do mapeamento objeto-relacional (JPA/Hibernate) e avaliar o comportamento e o limite de concorrência do pool de conexões (HikariCP) do sistema sob alta carga.

* **Arquivos envolvidos:** `ConsumidorController.java`, `ConsumidorRepository.java`, `Consumidor.java`, `Usuario.java`
* **Arquivo de teste k6:** [teste_leitura.js](https://github.com/guilherme-leal-ith/favela-delivery/blob/consumidor-endereco/testes/teste_leitura.js)
* **Data da medição:** 04/06/2026

##### Resultados no terminal

<img width="1142" height="630" alt="image" src="https://github.com/user-attachments/assets/31ea028f-9ae9-4d74-9fb6-a5042baa0691" />


* **Resultados Testes de carga (SLA):**
    * **Latência:** Média de 72.89 ms, saltando para 364.55 ms no percentil 95% (P95) e atingindo o pico máximo de 2.15s sob estresse máximo.
    * **Vazão:** O k6 reportou uma vazão média de 41.9 req/s considerando toda a duração da execução (60.8 s). A análise dos registros de requisições concluídas resultou em uma vazão efetiva de 43.69 req/s durante a janela ativa de processamento (58.27 s).
    * **Concorrência (Limite de requisições simultâneas):** A concorrência máxima atingida foi de 99 requisições simultâneas (100 VUs configurados).
    * **Taxa de erro:** 0%.

##### Representação visual das métricas

<img width="3017" height="1640" alt="leitura_concorrencia" src="https://github.com/user-attachments/assets/175cd1d5-a4e8-4a7e-81de-42298e173ffe" />

<img width="3017" height="1642" alt="leitura_latencia" src="https://github.com/user-attachments/assets/c83e9050-3ebf-4c39-a9a4-d5c4fcd9de9d" />

<img width="3018" height="1640" alt="leitura_vazao" src="https://github.com/user-attachments/assets/84da6bf0-3503-4803-a67e-ebf0c742b12d" />

### Levantamento de Hipóteses dos Potenciais Gargalos

A partir dos comportamentos observados nas métricas coletadas na primeira fase, foram levantadas as seguintes hipóteses técnicas sobre os gargalos físicos e lógicos do ecossistema:

| Potencial Gargalo | Justificativa | Solução Proposta |
| :--- | :--- | :--- |
| **Degradação sob alta concorrência (Escrita)** | Concorrência por locks de gravação simultâneos nas tabelas pai/filha do MySQL. | Ajustar o tamanho máximo do pool de conexões (HikariCP) e otimizar as transações da API |
| **Bloqueio de rede local / Handshake TCP (200 VUs)** | Aumento súbito nas métricas de tempo de conexão (http_req_blocked e http_req_connecting) por saturação de sockets do sistema operacional. | Aumentar o limite de conexões simultâneas do servidor embutido |
| **Sobrecarga e disputa por recursos locais (Localhost)** | API, Banco de Dados e k6 rodando na mesma máquina, gerando concorrência física por CPU e lentidão de E/S de disco. | Migrar os testes para uma máquina dedicada com maior capacidade de núcleos de CPU e isolamento de processos. |
| **Latência inicial no cadastro de consumidor** | Alto consumo de CPU pelo algoritmo de criptografia síncrona (BCrypt) ao gerar o hash da senha | Reduzir o custo do log do BCrypt ou processar a encriptação de forma assíncrona. |

## 2ª Fase de Testes

### Ajustes e Otimizações Aplicadas
Antes da realização da segunda fase de testes de carga, foram aplicadas otimizações arquiteturais e corretivas cruciais tanto na lógica de execução da aplicação quanto nas configurações de infraestrutura do ambiente. No backend, o processo síncrono de geração de hash de senhas (`PasswordEncoder`) foi movido para fora do bloco transacional (`@Transactional`) no método de salvamento de usuários, eliminando a retenção prematura e ociosa de conexões com o banco de dados durante o processamento intensivo de CPU. 

Adicionalmente, no arquivo `application.properties`, as propriedades de exibição e formatação de consultas SQL no console foram desativadas para mitigar o severo overhead de I/O de disco sob estresse. Por fim, expandiu-se a capacidade volumétrica do sistema por meio do redimensionamento do pool do HikariCP para até 50 conexões máximas e do ajuste do servidor embutido Apache Tomcat para gerir até 250 threads de trabalho simultâneas e 2500 conexões TCP estáveis, eliminando os problemas de recusa de conexão e gargalos de rede identificados na primeira fase.

<br>
<br>

[IMAGEM - Gráficos de Desempenho e Concorrência da 2ª Fase]

<br>
<br>

## Resultados Comparativos

Abaixo é apresentada a comparação detalhada e direta das métricas de Latência (Tempo de Resposta), Vazão (*Throughput*) e Taxa de Erro entre os testes originais (1ª Fase) e os testes otimizados (2ª Fase), evidenciando a evolução de desempenho obtida através das refatorações arquiteturais.

### Tabela Comparativa Geral

| Cenário / Métrica | 1ª Fase (Antigo) | 2ª Fase (Novo) | Variação (%) |
| :--- | :---: | :---: | :---: |
| **Inserção: Média Latência** | 6,45 s | 4,2s | **-34,92%** |
| **Inserção: Throughput (Vazão)** | 7,34 req/s | 10,08 req/s | **+37,33%** |
| **Inserção: Taxa de Erro** | 0,21% | 0,34% | **+0,13%** |
| | | | |
| **Leitura: Média Latência** | 72,89 ms | 24,26 ms | **-66,72%** |
| **Leitura: Throughput (Vazão)** | 43,69 req/s | 46,05 req/s | **+5,40%** |
| **Leitura: Taxa de Erro** | 0,00% | 0,00% | **0,00% (Estável)** |

<br>
<br>

<img width="960" height="720" alt="comparativo_insercao_latencia" src="https://github.com/user-attachments/assets/a576fce6-9ced-4837-94b9-02b6ba90f22a" />

<img width="960" height="720" alt="comparativo_insercao_vazao" src="https://github.com/user-attachments/assets/27f5af18-e2b9-4e3a-8b48-a092ad5bf1d7" />

<img width="960" height="720" alt="comparativo_leitura_latencia" src="https://github.com/user-attachments/assets/a2e42596-590b-43c4-bb88-f4d21c8f4f07" />

<img width="960" height="720" alt="comparativo_leitura_vazao" src="https://github.com/user-attachments/assets/616d33bb-bd40-4b64-a9c5-790544223ccd" />




<br>
<br>

## Conclusão dos Testes

Os testes de carga comprovam que o sistema atende satisfatoriamente aos requisitos de desempenho e resiliência sob alta concorrência (100 VUs), operando com estabilidade e taxas de erro praticamente nulas (máximo de 0,34%). A segunda fase validou a eficácia das otimizações, com a latência de leitura caindo para excelentes 24,26 ms e o tempo de inserção reduzido para 4203,89 ms. 

Como melhorias futuras para suportar a expansão da plataforma FavelaFood, recomenda-se a implementação de processamento assíncrono no cadastro de consumidores (isolando totalmente o gargalo de CPU do BCrypt), a introdução de uma camada de cache (como Redis) para otimizar as consultas recorrentes de estabelecimentos e produtos, e a execução de testes sem limitadores de tempo (*sleep*) para determinar o limite absoluto de vazão do ecossistema.
| **Sobrecarga e disputa por recursos locais (Localhost)** | API, Banco de Dados e k6 rodando na mesma máquina, gerando concorrência física por CPU e lentidão de E/S de disco. | Migrar os testes para uma máquina dedicada com maior capacidade de núcleos de CPU e isolamento de processos. |
| **Latência inicial no cadastro de consumidor** | Alto consumo de CPU pelo algoritmo de criptografia síncrona (BCrypt) ao gerar o hash da senha | Reduzir o custo do log do BCrypt ou processar a encriptação de forma assíncrona. |

