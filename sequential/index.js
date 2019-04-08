
/* Este es un ejemplo de como trabajar con asyc await, no teine nada que ver con el REST API */
const fetch = require('node-fetch');

async function getNombre(username) {
  const url = `https://api.github.com/users/${username}`;
  const respuesta = await fetch(url);
  const json = await respuesta.json();
  
  if(!json.id) throw  Error('El usuario no existe');

  return json.name;
}

 getNombre('rickitan')
  .then(name => console.log('el nombre ', name))
  .catch(e => console.log(`${e}`))

