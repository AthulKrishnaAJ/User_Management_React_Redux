const mongoose = require('mongoose')
const monogodb = require('mongodb')
const dotenv = require('dotenv')

dotenv.config()

const mongoUrl = process.env.MONGO_URL


const connectDatabase = async () => {
    try {
        await mongoose.connect(mongoUrl).then(() => {
            console.log('Database is connected');
        }).catch((error) => {
            console.log('Connection failed some reasons: ', error)
        })

    } catch (error) {
        console.error(`Database not connect: ${error.message}`)
        process.exit(1)
    }
}


module.exports = connectDatabase