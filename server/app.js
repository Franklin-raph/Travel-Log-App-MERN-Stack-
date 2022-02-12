const express = require('express')
const morgan = require('morgan')
const { connectionMethod } = require('./config/db')
const authRoutes = require('./routes/auth/signIn')
const userRoutes = require('./routes/auth/signUp')
const signOutRoutes = require('./routes/auth/signOut')
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleware/auth')

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
app.use('/api/signout', signOutRoutes)
app.use('/api/signup', userRoutes)

// applying check middleware to every get request
app.get('*', checkUser)


app.get('/', (req, res) => {
    res.send("Home Page")
})

app.get('/places', requireAuth, (req, res) => {
    res.send("This is places route")
})