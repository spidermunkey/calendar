const express = require('express');
const router = express.Router();

const  { MongoClient } = require('mongodb');
const { CONNECTION_STRING } = require('../.config/env');

router.get('/:id', function getTimer(){

});
router.delete('/:id', function deleteTimer(){

});

router.put('/:id', async function editTimer(){
    
});

router.get('/', async function getTimers(request,response){
  const client = new MongoClient(CONNECTION_STRING)
  const connection = await client.connect()
  const db = client.db('Timers')
  const collection = db.collection('all')
  const timers = await collection.find().toArray();
  response.json(timers)
});

router.post('/', async function addTimer(request,response) {
  try {
    const {data} = request.body;

    if (data){
      const client = new MongoClient(CONNECTION_STRING)
      const connection = await client.connect()
      const db = client.db('Timers')
      const collection = db.collection('all')
      await collection.insertOne(data)
    }
    response.json(data);
  } catch(error){
    console.log(error)
  }

})

module.exports = router;
