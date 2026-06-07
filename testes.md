## 10. Testes de Carga

### 10.1 1ª Fase de Testes

#### Teste de escrita (Post)

##### Metodologia e Ferramentas
[cite_start]A avaliação de desempenho e resiliência das APIs do ecossistema FavelaFood foi conduzida por meio de testes de carga estruturados em um cenário unificado de rampa progressiva até o patamar máximo de estresse de 100 Usuários Virtuais simultâneos (VUs)[cite: 813]. 

[cite_start]A metodologia consiste em isolar a operação de gravação (`POST /api/consumidor`) em ambiente local (*localhost*) para mensurar o impacto direto da carga concorrente sobre a regra de negócio[cite: 814]. [cite_start]Como ferramenta principal de injeção de carga, foi utilizado o k6 (Grafana Labs)[cite: 815].

* [cite_start]**Arquivos envolvidos:** `ConsumidorController.java`, `ConsumidorService.java`, `ConsumidorMapper.java`, `ConsumidorRepository.java`, `Consumidor.java`, `Usuario.java` [cite: 816]
* [cite_start]**Arquivo de teste k6:** LINK [cite: 817]
* [cite_start]**Data da medição:** 04/06/2026 [cite: 818]

##### Resultados no terminal

[Imagem]

* **Resultados Testes de carga (SLA):**
    * [cite_start]**Latência:** Média de 6.45s, saltando para 11.99s no percentil 95% (P95) e atingindo o pico máximo de 17.68s sob estresse máximo[cite: 858].
    * [cite_start]**Vazão:** O k6 reportou uma vazão média de 6.8 req/s considerando toda a duração da execução (67.9 s)[cite: 859]. [cite_start]A análise dos registros de requisições concluídas resultou em uma vazão efetiva de 7.34 req/s durante a janela ativa de processamento (63.0 s)[cite: 860, 909].
    * [cite_start]**Concorrência (Limite de requisições simultâneas):** O sistema tolerou a rampa progressiva até o limite de 100 Usuários Virtuais (VUs) simultâneos mantendo 99.78% de estabilidade operacional, registrando apenas 1 falha por timeout em toda a execução[cite: 861].
    * [cite_start]**Taxa de erro:** 0.21% (1 de 463 requisições)[cite: 862].

##### Representação visual das métricas

[Imagem]

<br>

[Imagem]

---

#### Teste de Leitura (Get)

##### Metodologia e Ferramentas
[cite_start]A avaliação de desempenho e eficiência das consultas no ecossistema FavelaFood foi conduzida isolando a operação de leitura (`GET /api/consumidor/{id}`) em ambiente local (*localhost*)[cite: 920]. 

[cite_start]A metodologia consiste em realizar buscas síncronas aleatórias indexadas por chave primária para mensurar a velocidade de resposta do mapeamento objeto-relacional (JPA/Hibernate) e avaliar o comportamento e o limite de concorrência do pool de conexões (HikariCP) do sistema sob alta carga[cite: 921].

* [cite_start]**Arquivos envolvidos:** `ConsumidorController.java`, `ConsumidorRepository.java`, `Consumidor.java`, `Usuario.java` [cite: 922]
* [cite_start]**Arquivo de teste k6:** LINK [cite: 923]
* [cite_start]**Data da medição:** 04/06/2026 [cite: 924]

##### Resultados no terminal

[Imagem]

* **Resultados Testes de carga (SLA):**
    * [cite_start]**Latência:** Média de 72.89 ms, saltando para 364.55 ms no percentil 95% (P95) e atingindo o pico máximo de 2.15s sob estresse máximo[cite: 964].
    * [cite_start]**Vazão:** O k6 reportou uma vazão média de 41.9 req/s considerando toda a duração da execução (60.8 s)[cite: 965]. [cite_start]A análise dos registros de requisições concluídas resultou em uma vazão efetiva de 43.69 req/s durante a janela ativa de processamento (58.27 s)[cite: 966].
    * [cite_start]**Concorrência (Limite de requisições simultâneas):** A concorrência máxima atingida foi de 99 requisições simultâneas (100 VUs configurados)[cite: 967].
    * [cite_start]**Taxa de erro:** 0%[cite: 968].

##### Representação visual das métricas

[Imagem]

<br>

[Imagem]
