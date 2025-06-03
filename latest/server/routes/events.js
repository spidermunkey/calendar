const express = require('express');
const router = express.Router();
const { connection, local_connection } = require('../db/connect');

router.get('/:id', function getEvent(){

});

router.delete('/:id', function deleteEvent(){

});

router.put('/:id', async function editEvent(){
    
});

// / day / d="isoString"
// / week / d="isoString"
// / month / d="isoString" 
router.get('/day', async function getDay(request,response){

})

router.get('/', async function getEvents(request,response){
  // const client = new MongoClient(CONNECTION_STRING)
  const local_client = await local_connection();
  if (!local_client){
    response.json({})
  }
  const db = local_client.db('Events')
  const collection = db.collection('all')
  const events = await collection.find().toArray();
  response.json(events)
});

router.post('/', async function addEvent(request,response) {
    try {
    const data = request.body;
    if (data){
      const local_client = await local_connection();
        if (!local_client){
          response.json({})
        }
      const db = local_client.db('Events')
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
