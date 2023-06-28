# IAPP Starter Test [PT-BR]

Teste pratico desenvolvido para vaga de estagio de desenvolvedor iniciante.

Contruir uma aplicação do tipo chat em tempo real, contendo back-end e front-end. No front-end desenvolver uma tela de login e uma tela interna para o chat

[![wakatime](https://wakatime.com/badge/user/2f348d83-96c0-482b-ae6c-a687ad5fa937/project/2ce39e8a-228a-48e9-8304-8223482c9b7a.svg)](https://wakatime.com/badge/user/2f348d83-96c0-482b-ae6c-a687ad5fa937/project/2ce39e8a-228a-48e9-8304-8223482c9b7a)

## Autores

- [@FelippeRibeiro](https://www.github.com/FelippeRibeiro)

### Referência

- [Descrição e Requisitos](https://wonderful-ziconium-780.notion.site/Desafio-Vaga-Dev-Iniciante-65e17cee2dd14a25beae4c07cc4aa586)

## Stack utilizada

**Front-end:** Next.js, TailwindCSS, Socket.io Client, DaisyUi.

**Back-end:** TypeScript, Node, Express, Socket.io, Mongoose, JWT, Bcrypt, Passport.

**DataBase:** MongoDB.

`OBS`: A nova [Documentação do React](https://react.dev/learn/start-a-new-react-project) recomenda que utize uma framework desde o inicio para o desenvolvimento de aplicações React, por isso a utilização de Next.Js 13

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu **/server/.env**

`PORT`=3000

`NODE_ENV`=development

`JWT_SECRET`=8255

`MONGO_URI`=mongodb://127.0.0.1:27017/nome_sobrenome

## Instalação

**Importante iniciar o server antes de iniciar client**

**Certifique-se de que não há nenhum serviço rodando na porta 3000 e 3001**

No diretorio raiz do projeto entre na pasta /server e instale.

```bash
  cd server
  npm install
  npm start
```

Apos instalar e iniciar o server, **em outro terminal** entre na pasta /client e instale.

```bash
  cd client
  npm install
  npm start
```

# Documentação da API

#### Cadastrar

##### Cadastrar um usuários no banco de dados

```http
  POST /api/auth/singup
```

##### Request Data

| Parâmetro  | Tipo     | Descrição         |
| :--------- | :------- | :---------------- |
| `name`     | `string` | Nome do usuários  |
| `document` | `string` | CPF do usuários   |
| `password` | `string` | Senha do usuários |

##### **Response Data example**

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJfaWQiOiI2NDcwMjY2YTFmYzMyYTVjODU0YTUiLCJuYW1lIMDcxNDY2LCJleHAiOjE2ODUwNzUwNjZ9.r1o7QLaUI6sD2ZOZ0HO
    ",
    "user": {
        "name": "Felipe Ribeiro"
    }
}
```

##

#### Login

##### Fazer login com um usuários cadastrado

```http
  POST /api/auth/login
```

##### Request Data

| Parâmetro  | Tipo     | Descrição         |
| :--------- | :------- | :---------------- |
| `document` | `string` | CPF do usuários   |
| `password` | `string` | Senha do usuários |

##### **Response Data example**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9yJfaWQiOiI2NDZkNGFhMjBkODAyOTJhY4NzYwMjIiLCJu33sJ03-eqhBjThQKcrPaASs9XURYExogSaP6R03T4",
  "user": {
    "name": "Felipe Ribeiro"
  }
}
```

##

#### Valide

##### Validar sessão de usuários

```http
  GET /api/user/validate
```

##### Header

| Key             | Value          | Descrição                                                        |
| :-------------- | :------------- | :--------------------------------------------------------------- |
| `Authorization` | Bearer `Token` | Token do usuários fornecido ao fazer se cadastrar ou fazer login |

##### **Response Data example**

```
{
    "name": "Felipe Ribeiro"
}
```

##

## Feedback

#### Se você tiver algum feedback, por favor me deixe saber pelos contatos abaixo

Email: `felipper43@gmail.com`

## Implementações futuras

- [x] Logout
- [ ] Sistema de notificações
- [ ] Chat em grupo com todos usuárioss logados
- [ ] Alteração dos dados de usuárioss
