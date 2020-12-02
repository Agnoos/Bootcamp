const { response } = require('express');
const express = require('express');

const app = express();

//get observa qual parametro da hospedagem queremos observar
// ela recebe uma funcao, que recebe 2 parametros, a requisicao e a resposta.
app.get('/projects1', (request, response) => {
  // O retorno sempre será o response, appendado com algum outro meio, download,
  // json, imagem, send que é texto etc...
  return response.send('Hello Word2')
})

//apenas com a barra, pode ser buscado apenas com o localhost 
app.get('/', (request, response) => {

  // por default, nunca enviamos string e sim um json.
  // ele sempre retorna um array ou um objeto.
  return response.json({message: 'Hello Word2'})
})





/**
 * 
 * Métodos HTTP:
 *  GET: Buscar informações do back-end 
 *  POST: Registrar uma informação no back-end 
 *  DELETE: Deletar uma infformação do back-end
 *  PUT: Atualiza uma informação do back-end
 */

app.post('/projects', (request, response) =>{
  return response.json([
    'Projeto 1',
    'Projeto 2',
    'Projeto 3',
    'Projeto 4',
  ])
})

app.get('/projects', (request, response) =>{
  return response.json([
    'Projeto 1',
    'Projeto 2',
    'Projeto 3',
  ])
})

app.put('/projects/:id', (request, response) =>{
  return response.json([
    'Projeto 4',
    'Projeto 2',
    'Projeto 3',
  ])
})

app.delete('/projects/:id', (request, response) =>{
  return response.json([
    'Projeto 2',
    'Projeto 3',
  ])
})







// listen pode recer uma outra funcao que ativa automaticamente
// 
app.listen(3333, () =>{
  console.log('🚀 Back-end started!')
});

