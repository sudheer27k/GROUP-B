var express = require('express');
var router = express.Router();
const eventController = require("../models/controller/event")
const {authenticateUser} = require("../middleware/authenticate")





router.post('/add',authenticateUser, eventController.addEvent)
router.get('/allEvents',authenticateUser,  eventController.getAllEvents)
router.delete('/deleteEvent/:id',authenticateUser, eventController.deleteEvent)
router.put("/update/:id",authenticateUser,  eventController.updateEvent)



module.exports = router;
