import express from 'express'
import 'dotenv/config'
import authRoute from './auth/authRoutes.js'
import productRoute from './products/productsRoutes.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())


app.use('/auth', authRoute)
app.use('/products', productRoute)

app.listen( PORT ,() => {
    console.log(`Server Running on ${PORT}`)
})