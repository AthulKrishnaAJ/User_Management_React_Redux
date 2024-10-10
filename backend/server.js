const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path')


const connectDatabase = require('./config/db')
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')

dotenv.config();
const app = express();

connectDatabase();

const port = process.env.PORT || 4000

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use('/images', express.static(path.join(__dirname, '/assets')))


app.use('/', userRoute)
app.use('/admin', adminRoute)


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
