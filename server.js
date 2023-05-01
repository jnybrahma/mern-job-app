import express from 'express'
import 'express-async-errors'
import morgan from 'morgan';

const app = express()
import dotenv from 'dotenv'
dotenv.config()
    // db and authenticate User
import connectDB from './db/connect.js'

// routers

import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js';
// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js';


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

// routers

//app.get('/', (req, res) => {
//throw new Error('error')/
//    res.json({ msg: 'Welcome!' })
//})

//app.get('/api/v1', (req, res) => {
//throw new Error('error')
//    res.json({ msg: 'Welcome ! Test API!' })/
///})
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}
app.use(express.json())
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

// middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

//app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`)
//})

///console.log('Server running ...')

const start = async() => {

    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
    } catch (error) {

        console.log(error)

    }
}
start()