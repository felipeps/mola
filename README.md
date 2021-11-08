# mola

## Stack utilizada:
  * [Node](https://nodejs.org/en/) v14.16.1
  * [Yarn](https://yarnpkg.com/) v1.22.17
  * [Docker Postgres](https://hub.docker.com/_/postgres)
  
## Passos para executar o projeto:
  * **Execute:**
        <p>$ yarn
        
  * **Crie o banco de dados postgre na porta 5432. Pelo docker, execute:**
        <p>$ docker run -p 5432:5432 --name molas-db -e POSTGRES_PASSWORD=root -d postgres
        
  * **Crie uma database chamada molas-test:**
        <p>CREATE DATABASE molas-teste;
		
  * **Execute:**
		<p>$ yarn start
        
        
## Rotas:
  #### GET localhost:3000/api/order/find/:id
    Retorna uma order pelo id. Necessário enviar JWT por Bearer nos headers.
    
  #### POST localhost:3000/api/process
    Processa um arquivo CSV enviado por multipart form. Necessário enviar JWT por Bearer nos headers.
    
  #### POST localhost:3000/api/login
    Efetua o login, retornando conta e JWT válido por 1d.
    Params:
      {
	      "login": "login",
	      "password": "password"
      }
      
  #### POST localhost:3000/api/signup
    Cria uma nova conta. Retorna erro se login já existente.
    Params:
      {
	      "login": "zazaza",
	      "password": "123",
	      "passwordConfirmation": "123"
      }

