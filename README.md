# 🚧  Fórum 🚧 

## Server-side do projeto de um fórum voltado para desenvolvedores.
- [Client-side do projeto](https://github.com/jfirme-sys/client-forum)

### Pré-requisitos

* Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
* Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).
* Também é necessário ter instalado o [Docker](https://www.docker.com/) e o [Docker Compose](https://docs.docker.com/compose/) para gerenciar os containers ddo Docker.

### 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
git clone https://github.com/jfirme-sys/api-forum.git

# Acesse a pasta do projeto no terminal/cmd
cd api-forum

# Instale as dependências
npm install

# Suba os containers da aplicação
docker-compose up -d

# Execute a aplicação em modo de desenvolvimento
npm run dev

# O servidor inciará na porta:8080
```

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/#/)
