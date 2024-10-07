const bcrypt = require('bcryptjs')
const User = require('../schema/userSchema')
const generateToken = require('../config/jwtConfig')


const securePassword = async (password) => {
    try {
        const hashPassword = await bcrypt.hash(password, 10)
        if (hashPassword) {
            return hashPassword
        }
    } catch (error) {
        console.log(`Error in hashing password: ${error.message}`)
    }
}

const signupPost = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body

        const emailExist = await User.findOne({email: email});

        if (emailExist) {
            console.log('Email exist')
            return res.json({ status: 'emailExists' });
        } 
            const hashPassword = await securePassword(password);
            console.log('Hashed password: ', hashPassword)

            if (hashPassword) {
                const newUser = new User ({
                    name: name,
                    email: email,
                    mobile: mobile,
                    password: hashPassword

                });
                await newUser.save()
                console.log('User created')
                res.status(201).json({status: "success"})
            }
        
    } catch (error) {
        console.log(`Error in creating a user: ${error.message}`)
        res.status(500).json({status: 'internalServerError'})
    }

}

const loginPost = async (req, res) => {
    try {
        console.log('enter login')
        const {email, password} = req.body
        const findUser = await User.findOne({email: email})

     if (findUser) {
        const passwordMatch = await bcrypt.compare(password, findUser.password)
        if (passwordMatch) {
            if (findUser.isBlocked === false) {
                const token = await generateToken({id: findUser._id})

                const data = {}

                for(let key in findUser.toObject()){
                    if(key !== 'password'){
                        data[key] = findUser[key]
                    }
                }
                console.log(data)   
                console.log(token)   
                res.status(200).json({
                    userData: data,
                    token: token
                })
            } else {
                res.json({status: 'User is blocked'})
            }
        } else {
            res.json({status: "Password doesn't match"})
        }
     } else  {
        res.json({status: 'User not found'})
     }
    } catch (error) {
        console.log('Login error: ', error.message)
        res.status(500).json({status: 'Request Failed please try again'})
    }
}



const addImage = async (req, res) => {
    try{
        const image = req.file.filename
        const id = req.body.userId
        
        const userFind = await User.findByIdAndUpdate(
            {_id: id},
            {image: image}
        )
        const data = {}
    
        if (userFind) {
            const userData = await User.findOne({_id: id})
    
            for(let key in userData.toObject()){
                if(key !== 'password'){
                    data[key] = userData[key]
                }
            }
        }  
        res.json({userData: data}) 

    }catch(error) {
        console.log('Error in uploading profile image: ', error.message)
    }
}



const updateUserDetils = async (req, res) => {
    try {
       const {formData, userId} = req.body
       console.log(formData)
       const { name, email, mobile } = formData
        const userUpdated = await User.findByIdAndUpdate(
            userId,
            { name: name, email: email, mobile: mobile}
        )
        const data = {}
        if (userUpdated) {
            const userData = await User.findOne({_id: userId})
            for(let key in userData){
                if(key !== 'password'){
                    data[key] = userData[key]
                }
            }
            res.json({userData: data, status: 'success'})
        }
    } catch (error) {
        console.log('Error in updating profile: ', error.message)
        res.json({status: 'failed'})
    }
}
module.exports = {
    signupPost,
    loginPost,
    addImage,
    updateUserDetils
}