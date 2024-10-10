const express = require('express')

const userController = require('../controllers/userController')
const upload = require('../utils/multer')
const router = express.Router()



router.post('/signup', userController.signupPost)
router.post('/login', userController.loginPost)
router.post('/addImage', upload.single('file'), userController.addImage)
router.post('/updateProfile', userController.updateUserDetils)
router.post('/getData', userController.getData)

module.exports = router