const express = require('express')
const { validationResult, check } = require('express-validator')
const router = express.Router()
const User = require('../../model/User')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')

router.get('/', (req, res) =>{
    res.send("Auth Page")
})

// Route   POST api/signin
// Access  Public
router.post('/', [
    check('email', 'Enter a valid email address').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res)=> {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() })
    }

    const { email, password } = req.body

    try {
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({ errors: [{ msg: "Invalid credentials" }]})
        }

        let isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }]})
        }

        const createToken = (id) => {
            return jwt.sign({ id }, config.get('jwtSecret'), {
                expiresIn: 60 * 60 * 1000 * 24 * 3
            })
        }

        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge:60*60*60*3*1000*24})
        return res.status(200).json({ user: user._id, token })
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error")
    }
})

module.exports = router