const express = require('express')

const adminController = require('../controllers/adminController')

const route = express.Router()

route.post('/login', adminController.adminLogin)
route.get('/getUsers', adminController.getUsers)
route.post('/editUser', adminController.editUser)
route.post('/blockUnblock', adminController.blockUnblock)
route.post('/delete', adminController.deleteUser)



module.exports = route