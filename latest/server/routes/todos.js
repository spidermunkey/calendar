const express = require('express');
const router = express.Router();
const { connection, local_connection } = require('../db/connect');

router.get('/:id', function getTodo(){

});

router.delete('/:id', function deleteTodo(){

});

router.put('/:id', async function editTodo(){
    
});

router.get('/', async function getTodos(request,response){
  // const client = new MongoClient(CONNECTION_STRING)
  const local_client = await local_connection();
  if (!local_client){
    response.json({})
  }
  const db = local_client.db('Todos')
  const collection = db.collection('all')
  const todos = await collection.find().toArray();
  response.json(todos)
});

router.post('/', async function addTodo(request,response) {
    try {
    const data = request.body;
    if (data){
      const local_client = await local_connection();
        if (!local_client){
          response.json({success: false, message: 'no connection'})
        }
      if (!data.title){
        response.json({success: false,message:'title required'})
        return;
      }
      const db = local_client.db('Todos')
      const collection = db.collection('all')
      await collection.insertOne(data)
    }
      response.json(data);

  } catch(error){
    console.log(error)
    response.json({})

  }
})

module.exports = router;
