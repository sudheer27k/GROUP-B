var express = require('express');
var router = express.Router();
const loginController = require("../models/controller/login")


router.post('/',loginController.login)
module.exports = router;