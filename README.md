# IAPP Starter Test [PT-BR]

Contruir uma aplicação do tipo chat em tempo real, contendo back-end e front-end. No front-end desenvolver uma tela de login e uma tela interna para o chat

## Autores

- [@FelippeRibeiro](https://www.github.com/FelippeRibeiro)

### Referência

- [Descrição e Requisitos](https://wonderful-ziconium-780.notion.site/Desafio-Vaga-Dev-Iniciante-65e17cee2dd14a25beae4c07cc4aa586)

## Stack utilizada

**Front-end:** Next.js, TailwindCSS, Socket.io Client.

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

No diretorio raiz do projeto entre na pasta /server e instale.

```bash
  cd server
  npm install
  npm run build
  npm start
```

Apos instalar e iniciar o server, **em outro terminal** entre na pasta /client e instale.

```bash
  cd client
  npm install
  npm run build
  npm start
```

# Documentação da API

#### Cadastrar

##### Cadastrar um usuario no banco de dados

```http
  POST /api/auth/singup
```

##### Request Data

| Parâmetro  | Tipo     | Descrição        |
| :--------- | :------- | :--------------- |
| `name`     | `string` | Nome do usuario  |
| `document` | `string` | CPF do usuario   |
| `password` | `string` | Senha do usuario |

##### **Response Data example**

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJfaWQiOiI2NDcwMjY2YTFmYzMyYTVjODU0YTRhNWUiLCJuYW1lI
    MDcxNDY2LCJleHAiOjE2ODUwNzUwNjZ9.r1o7QLaUI6sD2ZOZ0HO
    ",
    "user": {
        "name": "Felipe Ribeiro"
    }
}
```

##

#### Login

##### Fazer login com um usuario cadastrado

```http
  POST /api/auth/login
```

##### Request Data

| Parâmetro  | Tipo     | Descrição        |
| :--------- | :------- | :--------------- |
| `document` | `string` | CPF do usuario   |
| `password` | `string` | Senha do usuario |

##### **Response Data example**

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJfaWQiOiI2NDZkNGFhMjBkODAyOTJhYjk4NzYwMjIiLCJu
   33sJ03-eqhBjThQKcrPaASs9XURYExogSaP6R03T4",
    "user": {
        "name": "Felipe Ribeiro"
    }
}
```

##

#### Valide

##### Validar sessão de usuario

```http
  GET /api/user/valide
```

##### Header

| Key             | Value          | Descrição                                                       |
| :-------------- | :------------- | :-------------------------------------------------------------- |
| `Authorization` | Bearer `Token` | Token do usuario fornecido ao fazer se cadastrar ou fazer login |

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

Whatsapp `557193277415`

## Implementações futuras

- [x] Logout
- [ ] Sistema de notificações
- [ ] Chat em grupo com todos usuarios logados
- [ ] Alterar de dados da contas
