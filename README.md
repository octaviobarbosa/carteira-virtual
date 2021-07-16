# Carteira Virtual

Gerenciamento de carteira virtual.

Frontend para auxílio pode ser baixado/clonado através do repositório [octaviobarbosa/carteira-virtual-fe](https://github.com/octaviobarbosa/carteira-virtual-fe)

## Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- TypeScript
- PostgreSQL

## Como executar

No diretório do projeto, para instalar as dependências execute:

`npm install` ou `yarn`

No arquivo ormconfig.json configure as credenciais para acesso ao banco de dados.

Crie o banco de dados com o nome `carteira-virtual` ou o nome de sua preferencia, lembrando de alterar o nome do banco de dados no arquivo ormconfig.json

Execute as migrations com o comando:

`npm run typeorm migration:run` ou `yarn typeorm migration:run`

Agora você ja deve ser capaz de rodar o backend, utilize o comando:

`npm run dev` or `yarn dev`
