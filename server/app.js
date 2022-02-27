const express = require('express')
const morgan = require('morgan')
const { connectionMethod } = require('./config/db')
const authRoutes = require('./routes/auth/signIn')
const userRoutes = require('./routes/auth/signUp')
const signOutRoutes = require('./routes/auth/signOut')
const travelRoutes = require('./routes/travelExperience/travel')
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
app.use('/auth/signin', authRoutes)
app.use('/auth/signout', signOutRoutes)
app.use('/auth/signup', userRoutes)
app.use('/travel/exps', travelRoutes)

app.get('/', (req, res) => {
    res.send("Home Page")
})
