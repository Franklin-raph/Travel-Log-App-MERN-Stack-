const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    console.log("Cookie storage cleared");
    return res.send('User is signed out')
})

module.exports = router;