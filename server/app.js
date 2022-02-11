const express = require('express')
const morgan = require('morgan')
const { connectionMethod } = require('./config/db')
const authRoutes = require('./routes/api/signIn')
const userRoutes = require('./routes/api/signUp')
const cookieParser = require('cookie-parser')

const app = express()

// PORT declaration
const port = process.env.PORT || 9000

// App listening on port 9000
app.listen(port, ()=> {
    console.log(`Server is running at port ${port}`);
    connectionMethod()
})

// middle-wares
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use('/api/signin', authRoutes)
app.use('/api/signup', userRoutes)


app.get('/', (req, res) => {
    res.send("Home Page")
})