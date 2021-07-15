# Conversor de AFD (Autômato Finito Determinístico) para GR (Gramática Regular)
Trabalho de Teoria da Computação 2020.2

## Configuração do projeto para executar localmente
Para executar o projeto localmente, é necessário ter instalado uma versão recente do [Node.js](https://nodejs.org/en/).

Dentro da pasta do projeto, temos o algoritmo desenvolvido e temos também a pasta `afd-2-rg` que contém o projeto web, que utiliza este mesmo algoritmo e nos dá uma interface para facilitar o uso da ferramenta.

Na pasta `afd-2-rg`, execute no terminal o comando
```
npm install
```
para instalar todas as dependências necessárias para rodar o projeto localmente.

Em seguida, podemos iniciar o projeto executando o comando
```
npm start
```
que abrirá um janela do navegador.

Com o projeto executando, basta selecionar os parâmetros de entrada, bem como definir o autômato através da tabela e fazer a conversão clicando no botão **Converter para GR**.

## Versão online
A versão atual do projeto também está disponível na URL [https://wenderson.dev/dfa-2-rg/](https://wenderson.dev/dfa-2-rg/) para facilitar nos testes.