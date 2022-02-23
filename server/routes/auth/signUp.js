const express = require('express')
const { check, validationResult } = require('express-validator')
const router = express.Router()
const User = require('../../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

/*                      USER REGISTERATION                   */

// Route   POST api/users
// Access  Public
router.post('/', [
    check('name', 'Name field is required').not().isEmpty(),
    check('email', 'Enter a valid email address').isEmail(),
    check('password', 'Password must have a minimum length of 6 characters').isLength({ min: 6 })
],
 async (req, res) =>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body

    try {
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({ errors: [{msg: "user already exists"}]})
        }

        user = new User ({
            name, email, password
        })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        await user.save()

        const createToken = (id) => {
            return jwt.sign({ id }, config.get('jwtSecret'), {
                expiresIn: 60*60*1000*24*3
            })
        }

        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge:60*60*1000*24*3})
        res.status(200).json({ user:user._id, token})

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error")
    }
})

module.exports = router