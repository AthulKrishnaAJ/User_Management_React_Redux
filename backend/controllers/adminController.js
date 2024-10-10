const Admin = require('../schema/adminSchema')
const User = require('../schema/userSchema')
const bcrypt = require('bcryptjs')
const generateToken = require('../config/jwtConfig')


const adminLogin = async (req, res) => {
    try{
        const { email, password } = req.body
        const findAdmin = await Admin.findOne({email: email})
        if (findAdmin) {
            console.log('Admin data is : ', findAdmin)
            const adminPassword = await bcrypt.compare(password, findAdmin.password)

            if (adminPassword) {
                const token = await generateToken({email: email})
                const userData = await User.find({})
                console.log('Token: =====> ', token)
                console.log('Users datas: =====> ', userData)
                res.json({status: "Success", token: token, userData: userData})
            } else {
                console.log('Incorrect password')
                res.json({status: "Incorrect password"})
            }
        } else {
            console.log('Invalid email')
            res.json({status: 'Incorrect email'})
        }
    }catch(error){
        console.log('Error in admin login: ', error.message)
        res.json({status: "Request failed please try again"})
    }
}


const blockUnblock = async (req, res) => {
    try {
        const {userId} = req.body

        let user = await User.findById(userId)
        console.log('Before updation',user)

        let userAction
        if (user.isBlocked) {
            userAction = await User.updateOne(
                {_id: userId},
                {
                    isBlocked: false
                }
            )
        } else {
            userAction = await User.updateOne(
                {_id: userId},
                {
                    isBlocked: true
                }
            )
        }

    res.json(userAction) 

    } catch (error) {
        console.log('Block and Unblock error: ', error.message)
    }
}


const deleteUser = async (req, res) => {
    try {
        const userId = req.body.userId
        const deleteAction = await User.deleteOne({_id: userId})
        res.json(deleteAction)
    } catch (error) {
        console.log('Error in user deletion: ', error.message)
    }
}

const getUsers = async (req, res) => {
    try {
        const data = await User.find({})
        res.json({data: data})
    } catch (error) {
        console.log('Error in fetching users: ', error.message)
    }
}

const editUser = async (req, res) => {
    try{
        const {userId, name, email, mobile} = req.body
        console.log(userId, name, email, mobile)
        const updateUser = await User.updateOne(
            {_id: userId},
            {
                name: name,
                email: email,
                mobile: mobile
            }
        );

        res.json({updateUser: updateUser, status: 'success'})
    } catch(error) {
        console.log('Error in editing user: ', error.message)
        res.json({status: 'failed'})
    }
}

module.exports = {
    adminLogin,
    blockUnblock,
    deleteUser,
    getUsers,
    editUser
}
