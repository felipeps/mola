# mola
Stack utilizada:
  yarn: v1.22.17 (https://yarnpkg.com/)
  node: v14.16.1 (https://nodejs.org/en/)
  postgres (https://hub.docker.com/_/postgres)
  
Passos para executar o projeto:
  1 - Execute:
        yarn
        
  2 - Crie o banco de dados postgre na porta 5432. Pelo docker, execute:
        docker run -p 5432:5432 --name molas-db -e POSTGRES_PASSWORD=root -d postgres
        
  3 - Crie uma database chamada molas-test:
        CREATE DATABASE molas-teste;
        
        
Rotas:
  GET localhost:3000/api/order/find/:id
    Retorna uma order pelo id. Necessário enviar JWT por Bearer nos headers.
    
  POST localhost:3000/api/process
    Processa um arquivo CSV enviado por multipart form. Necessário enviar JWT por Bearer nos headers.
    
  POST localhost:3000/api/login
    Efetua o login, retornando conta e JWT válido por 1d.
    Params:
      {
	      "login": "login",
	      "password": "password"
      }
      
  POST localhost:3000/api/signup
    Cria uma nova conta. Retorna erro se login já existente.
    Params:
      {
	      "login": "zazaza",
	      "password": "123",
	      "passwordConfirmation": "123"
      }

