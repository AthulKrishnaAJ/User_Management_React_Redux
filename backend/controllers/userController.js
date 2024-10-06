const bcrypt = require('bcryptjs')
const User = require('../schema/userSchema')


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

module.exports = {
    signupPost
}