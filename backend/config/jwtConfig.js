const jwt = require('jsonwebtoken')
const crypto = require('crypto')


const secretKey = crypto.randomBytes(64).toString('hex')

const generateToken = (payload) => {
    const options = {
        expiresIn: '1hr'
    }

    const token = jwt.sign(payload, secretKey, options)
    return token

}

module.exports = generateToken