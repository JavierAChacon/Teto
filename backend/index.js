import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

const app = express()

app.use(express.json())

dotenv.config()

connectDB()

// configure cors
const whitelist = [process.env.FRONTEND_URL]

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Cors Error'))
    }
  }
}

app.use(cors(corsOptions))

app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/tasks', taskRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Running on port ${PORT}...`))
