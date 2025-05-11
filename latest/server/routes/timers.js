const services = require('../controllers/timers.js');
const express = require('express');
const router = express.Router();

router.get('/:id', function getTimer(){

});
router.delete('/:id', function deleteTimer(){

});

router.put('/:id', async function editTimer(req,res,next){
    
});

router.get('/', function getTimers(){

});

router.post('/', function addTimer() {

})

module.exports = router;
