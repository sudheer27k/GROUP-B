var express = require('express');
var router = express.Router();
const projectController = require("../models/controller/project")
const {authenticateUser} = require("../middleware/authenticate")




router.post('/add',authenticateUser, projectController.addProject)
router.get('/all' ,authenticateUser,  projectController.getAllProjects)


module.exports = router;