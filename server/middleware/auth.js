const jwt = require('jsonwebtoken')
const User = require('../model/User')

const requuireAuth = (req, res, next) => {
    // Get token
    const token = req.cookies.jwt
}