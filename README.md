# Carteira Virtual

Gerenciamento de carteira virtual.

Frontend para auxílio pode ser baixado/clonado através do repositório [octaviobarbosa/carteira-virtual-fe](https://github.com/octaviobarbosa/carteira-virtual-fe)

## Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- TypeScript
- PostgreSQL

## Como executar

Após baixar/clonar o projeto para instalar as dependências necessárias, no diretório do projeto execute:

```bash
npm install
# ou
yarn
```

No arquivo ormconfig.json configure as credenciais para acesso ao banco de dados.

Crie o banco de dados com o nome `carteira-virtual` ou o nome de sua preferência, lembrando de alterar o nome do banco de dados no arquivo ormconfig.json

Execute as migrations com o comando:

```bash
npm run typeorm migration:run
# ou
yarn typeorm migration:run
```

Agora você já deve ser capaz de rodar o backend, utilize o comando:

```bash
npm run dev
# ou
yarn dev
```

Por padrão o backend estará sendo executado na porta `3333` para acessar utilize [http://localhost:3333](http://localhost:3333)

## Documentação

O projeto possui uma documentação swagger, para acessá-la, com o backend sendo executado, acesse no browser o endereço [http://localhost:3333/api-docs](http://localhost:3333/api-docs)

---

Feito com ♥ by Octávio Barbosa [Linkedin](https://www.linkedin.com/in/octaviobarbosa/) | [Github](https://github.com/octaviobarbosa)
