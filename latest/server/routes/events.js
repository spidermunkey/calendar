const express = require('express');
const router = express.Router();


const  { MongoClient } = require('mongodb');
// const { CONNECTION_STRING } = require('../.config/env');
const CONNECTION_STRING = 'mongodb://localhost:27017'

router.get('/:id', function getEvent(){

});
router.delete('/:id', function deleteEvent(){

});

router.put('/:id', async function editEvent(){
    
});

router.get('/', async function getEvents(request,response){
  const client = new MongoClient(CONNECTION_STRING)
  const connection = await client.connect()
  const db = client.db('Events')
  const collection = db.collection('all')
  const events = await collection.find().toArray();
  response.json(events)
});

router.post('/', async function addEvent(request,response) {
    try {
    const data = request.body;
    if (data){
      const client = new MongoClient(CONNECTION_STRING)
      const connection = await client.connect()
      const db = client.db('Events')
      const collection = db.collection('all')
      await collection.insertOne(data)
    }
      response.json(data);

  } catch(error){
    console.log(error)
  }
})

module.exports = router;
