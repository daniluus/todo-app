import express from 'express'
import cors from 'cors'
import todoRoutes from './routes.js'

const app = express()
app.use(express.json())

app.use(cors())


app.use('/todos', todoRoutes)


app.listen({
    port: 3000
})