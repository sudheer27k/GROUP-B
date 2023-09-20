var express = require('express');
var router = express.Router();
const userController = require("../models/controller/user")
const {authenticateUser} = require("../middleware/authenticate")







router.post('/add',authenticateUser,userController.addUser)
router.get("/allusers",authenticateUser, userController.getAllUsers)
router.delete("/deleteUser/:id",authenticateUser, userController.deleteUser)
router.put('/update/:id',authenticateUser, userController.updateUser)
router.get("/:id",authenticateUser, userController.loginUser)
module.exports = router;
