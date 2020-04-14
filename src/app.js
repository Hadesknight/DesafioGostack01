const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const repository = { id:uuid(), title, url, likes:0, techs}

  repositories.push(repository)


  return response.json(repository)

});

app.put("/repositories/:id", (request, response) => {
  const {title, techs, url} = request.body
  const {id} = request.params

  const repositoryIndex = repositories.findIndex(rep => rep.id === id)

  if(repositoryIndex < 0){
    return response.status(400).json({error: "Project not found"})
  }

  const repositoryLikes = repositories.find(rep => rep.id === id)



  const repository = {
    id,
    title, 
    url,
    likes: repositoryLikes.likes,
    techs
  }

  repositories[repositoryIndex] = repository


  return response.json(repository)


});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(rep => rep.id === id)

  if(repositoryIndex < 0){
    return response.status(400).json({error: "Project not found"})
  }


  repositories.splice(repositoryIndex,1)


  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const repository = repositories.find(rep => rep.id === id)

  if(!repository){
    return response.status(400).json({error: "Repository not found"})
  }

  const newRepo = {
    ...repository,
    likes: repository.likes++

  }

  return response.json(repository)

});





module.exports = app;
