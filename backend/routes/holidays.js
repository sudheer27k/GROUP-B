var express = require('express');
var router = express.Router();
const holidaysController = require("../models/controller/holidays")
const {authenticateUser} = require("../middleware/authenticate")






router.get("/",authenticateUser, holidaysController.getAllHolidays)

module.exports = router;