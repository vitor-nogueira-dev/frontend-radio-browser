# Frontend Radio Browser

Uma aplicação frontend que permite aos usuários reviverem a nostalgia do rádio, construída com as mais modernas tecnologias web.

---

- Acesse a aplicação em: [Frontend Radio Browser](https://frontend-radio-browser.vercel.app/)

---

<details>

<summary>Screenshot da Aplicação (Desktop)</summary>

![Application](/public/screenshot-desktop.png)

</details>

---

<details>

<summary>Screenshot da Aplicação (Mobile)</summary>

![Application](/public/screenshot-mobile.png)

</details>

--- 

<details>
  <summary><strong>🛠 Tecnologias Utilizadas</strong></summary>

  - **Linguagens:** JavaScript, TypeScript
  - **Framework:** Next.js, React
  - **Testes:** Cypress
  - **Estilização:** Tailwind CSS
  - **Gerenciamento de Estado:** React Query, Context API
  - **Outras Bibliotecas:** Axios, Shadcn/ui, Lucide React, Hls, Sonner

</details>

---

<details>
<summary><strong>🚀 Instalação</strong></summary>

- **Pré-requisitos:** Certifique-se de ter o [Node.js](https://nodejs.org/) e o npm instalados em sua máquina.

Para instalar o projeto, siga os passos abaixo:

1. **Clone o repositório:**
```bash
git clone https://github.com/vitor-nogueira-dev/frontend-radio-browser.git
cd frontend-radio-browser
```

1. **Instale as dependências:**
```bash
npm install
```
</details>

---

<details>
<summary><strong>🔧 Rodando sem Docker</strong></summary>

- É necessário ter concluído a instalação (passo 1 e 2).

- **Para iniciar o projeto:**
```bash
npm run dev
```

- **Para construir o projeto:**
```bash
npm run build
```

- **Para iniciar a versão em produção:**
```bash
npm start
```

- **Para rodar os testes:**
```bash
npm test
```

</details>

---

<details> 
<summary><strong>📸 Rodando com Docker</strong></summary>

- **Pré-requisitos:** Certifique-se de ter o [Docker](https://www.docker.com/get-started/) e o [Docker Compose](https://docs.docker.com/compose/install/) instalados e funcionando em sua máquina.

- É necessário ter concluído a instalação (passo 1 e 2).

**Para usar o Docker:**
- Para subir o contêiner:
 ```bash
 npm run docker:up
 ```
- Para parar o contêiner:
 ```bash
 npm run docker:down
 ```
- Para visualizar os logs:
 ```bash
 npm run docker:logs
 ```
- Para reiniciar o contêiner:
 ```bash
 npm run docker:restart
 ```

</details>

---

## Desafios e Aprendizados

#### Nesta seção, compartilho os principais desafios que enfrentei durante o desenvolvimento da aplicação, junto com as soluções que implementei e os aprendizados que obtive ao longo do processo.

- **Reprodução de Rádios HLS:** Enfrentei um desafio ao garantir a reprodução das rádios HLS em diversos dispositivos. Para resolver, implementei a biblioteca [`hls.js`](https://nochev.github.io/hls.js/docs/html/), o que melhorou significativamente a experiência do usuário.

- **Gerenciamento de Requisições com React Query:** Usei o [`React Query`](https://www.npmjs.com/package/react-query) para gerenciar requisições, garantindo que fossem feitas apenas uma vez e que os dados se atualizassem automaticamente. Isso tornou a experiência do usuário muito mais fluida.

- **Estilização com Shadcn/UI:** A biblioteca [`shadcn/ui`](https://ui.shadcn.com/docs) foi fundamental para estilizar os componentes de forma moderna e prática. Isso não só deixou a interface mais atraente, mas também melhorou a usabilidade.

- **Feedback visual com Sonner:** Com a biblioteca [`sonner`](https://sonner.emilkowal.ski/), adicionei notificações sonoras para alertar o usuário sobre ações como reprodução, adição, edição e exclusão de rádios. Isso enriqueceu a interação com a aplicação.

- **Context API:** Para gerenciar o estado, implementei o `Context API` com Providers para favoritos e interface do usuário. Isso simplificou o compartilhamento de dados entre componentes e organizou o código.

- **Hooks personalizados:** Desenvolvi quatro hooks personalizados (`useDebounce`, `useLocalStorage`, `useMediaQuery`, `useRadioAPI`) para encapsular lógicas reutilizáveis, tornando a implementação e manutenção do código mais fáceis.

- **Testes End-to-End com Cypress:** Implementei testes end-to-end com o [`Cypress`](https://www.cypress.io/), garantindo que a aplicação funcionasse corretamente em diferentes cenários, especialmente na reprodução das rádios e na funcionalidade de favoritos.

- **Ambiente com Docker:** Criei um ambiente `Docker` para facilitar a execução do projeto, permitindo que qualquer pessoa rode a aplicação sem instalar dependências adicionais.ias adicionais, tornando o processo mais simples e acessível.

- **Deploy com Vercel:** Realizei o deploy da aplicação na [`Vercel`](https://vercel.com/docs), garantindo que a aplicação estivesse disponível para acesso público. Isso me permitiu compartilhar o projeto com outras pessoas e receber feedbacks valiosos.

---

### Readme Challenge

- [Challenge](./CHALLENGE-README.md)

--- 

### 📋 Observação
This is a challenge by [Coodesh](https://coodesh.com/)