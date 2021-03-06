const express = require('express')
const morgan = require('morgan')
const { connectionMethod } = require('./config/db')
const authRoutes = require('./routes/auth/signIn')
const userRoutes = require('./routes/auth/signUp')
const signOutRoutes = require('./routes/auth/signOut')
const travelRoutes = require('./routes/travelExperience/travel')
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleware/auth')
const cors = require('cors')

const app = express()

// PORT declaration
const port = process.env.PORT || 9000

// App listening on port 9000
app.listen(port, ()=> {
    console.log(`Server is running at port ${port}`);
    connectionMethod()
})

// middle-wares
// app.use(cors({
//     origin: 'http://127.0.0.1:3006'
//     })
// );

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit:'50mb', extended: true }))
app.use(morgan('dev'))
app.use(cookieParser())
app.use('/auth/signin', authRoutes)
app.use('/auth/signout', signOutRoutes)
app.use('/auth/signup', userRoutes)
app.use('/travel/exps', travelRoutes)

app.get('/', (req, res) => {
    res.send("Home Page")
})
