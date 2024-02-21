const express = require('express');
const router = express.Router();
const fs = require('fs')

const json_peliculas=fs.readFileSync('./src/peliculas.json','utf-8')
let peliculas = JSON.parse(json_peliculas)

function sobrescribir_json (peliculas){
  peliculas=JSON.stringify(peliculas)
  fs.writeFileSync('./src/peliculas.json',peliculas,"utf-8")
  return JSON.parse(peliculas)
}
function buscar_objeto(peliculas,id){
  let objeto=peliculas.find(e=>e.id==id)
  return objeto
}

router.get('/', (req, res, next)=>{
  res.json(peliculas)
});
router.get('/:id', (req, res, next)=>{
  let objeto=buscar_objeto(peliculas,req.params.id)
  if (objeto){
    res.json(objeto)
  }else{
    res.status(404).send('No se ha encontrado un objeto con esa id')
  }
});

router.post('/', (req, res, next)=>{
  let objeto=buscar_objeto(peliculas,req.body.id)
  if (objeto){
    res.status(409).send('Ya existe un objeto con esa id')
  }else{
    peliculas.push(req.body)
    peliculas = sobrescribir_json(peliculas)
    res.json(peliculas)
  }
  
});
router.delete('/:id', (req, res, next)=>{
  let objeto=buscar_objeto(peliculas,req.params.id)
  if (objeto){
    peliculas = peliculas.filter(e=>e.id!=req.params.id)
    peliculas = sobrescribir_json(peliculas)
    res.json(peliculas)
  }else{
    res.status(404).send('No se ha encontrado un objeto con esa id')
  }
  
});
router.put('/:id', (req, res, next)=>{
  let objeto=buscar_objeto(peliculas,req.params.id)
  if (objeto){
    console.log(objeto)
    objeto.name=req.body.name
    objeto.descripcion=req.body.descripcion
    peliculas=sobrescribir_json(peliculas)
    res.json(peliculas)
  }else{
    res.status(404).send('No se ha encontrado un objeto con esa id')
  }
});


module.exports = router;
