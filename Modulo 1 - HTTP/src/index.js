const { response } = require('express')
const express = require('express')
const {uuid} = require('uuidv4')
const app = express()
//Explicar pro express, que nossa api responde e identifica
//informações em JSON

//falar pra todas as rotas passarem no app.use primeiro
// que nesse contexto vai converter as chamadas a json
//usando esta funcao do express
app.use(express.json())


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

/**
 * TIpos de parâmetros:
 * 
 * Query Params: Filtros e Paginação /projects?title=React&owner=Diego
 * Route Params: Identificar recursos (Atualizar/Deletar)
 * Request Body: COnteúdo na hora de criar ou editar um recurso (JSON)
 */


const projects = []

app.get('/projects', (request, response) =>{
  
  // /projects?title=React&owner=Diego
  // const {title, owner} = request.query
  // console.log(owner)
  // console.log(title)

  return response.json(projects)
  
})

app.post('/projects', (request, response) =>{

  const {nome, idade, Universidade} = request.body
  const project = { id: uuid(), nome, idade, Universidade}

  projects.push(project)

  return response.json(project)

})



app.put('/projects/:id', (request, response) =>{

  // http://localhost:3333/projects/1
  const { id } = request.params
  const { nome, idade, Universidade} = request.body

  // Buscando o indice do projeto recebido pelo parametro
  const projectIndex = projects.findIndex(project => project.id == id)

  //tratando erro se o projeto nao existir e alterando o codigo http
  if (projectIndex < 0){
    return response.status(400).json({error : "Project not found"})
  }

  const project = {
    id,
    nome,
    idade,
    Universidade,
  }

  projects[projectIndex] = project

  return response.json(project)

})

app.delete('/projects/:id', (request, response) =>{

   // http://localhost:3333/projects/1
  const { id } = request.params

  // Buscando o indice do projeto recebido pelo parametro
  const projectIndex = projects.findIndex(project => project.id == id)

  //tratando erro se o projeto nao existir e alterando o codigo http
  if (projectIndex < 0){
    return response.status(400).json({error : "Project not found"})
  }

  //excluindo de dentro do array de projects o indice encontrado
  projects.splice(projectIndex, 1);

  // Sem mensagem de resposta e com codigo 204, pq é vazia
  return response.status(204).send();

})

app.get('/projects/:id', (request, response) =>{
  
  const {id} = request.params

  const projectIndex = projects.findIndex(project => project.id == id)

  //tratando erro se o projeto nao existir e alterando o codigo http
  if (projectIndex < 0){
    return response.status(400).json({error : "Project not found"})
  }

  const project = projects[projectIndex]

  return response.json(project)
  
})

app.get('/projects-filtro', (request, response) =>{
  
  const {nome} = request.query
  console.log(nome)
  const result = nome
   ? projects.filter(project => project.nome.includes(nome))
   : projects

  return response.json(result)
  
})


// listen pode recer uma outra funcao que ativa automaticamente
// 
app.listen(3333, () =>{
  console.log('🚀 Back-end started!')
})

