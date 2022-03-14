const express = require('express')
const router = express.Router()
const { requireAuth, checkUser } = require('../../middleware/auth')
const user = require('../../model/User')
const travel = require('../../model/Travel')


// Get all users travel experiences
router.get('/allexp', async (req, res) => {
    try {
        const allTravelExp = await travel.find().sort({ createdAt: -1 }).populate('user', ['name'])
        res.json(allTravelExp)
    } catch (err) {
        console.log(err)
        res.status(500).send("Internal Server error")
    }
})


// Add a travel experience
router.post('/add', requireAuth, checkUser, async (req, res) => {
    let user = res.locals.user
    try {
        const { location, cost, heritage, places, communityAccess } = req.body
        const newTravelExp = new travel ({
            location, cost, heritage, places, communityAccess, user
        })
        await newTravelExp.save()
        res.status(200).json({ newTravelExp })
    } catch (err) {
        console.log(err)
        res.status(500).send("Internal server error")
    }
})


// Get a single users travel experience
// Route   'http://127.0.0.1:9000/travel/exps/userTravel/:travel_id'
router.get('/userTravel/:travel_id', async (req, res) => {
    try {
        const userTravelExp = await travel.findOne({ _id: req.params.travel_id }).populate('user', ['name', 'email'])

        if(!userTravelExp){
            return res.status(400).send({ msg: "No travel experience found for this user "})
        }
        res.json({userTravelExp});
    } catch (err) {
        console.log(err)
        res.status(500).send("Internal server error")
    }
})

// Delete a travel experience
// Route 'http://127.0.0.1:9000/travel/exps/deleteTravel/:travel_id'
router.delete('/deleteTravel/:travel_id', requireAuth, checkUser, async (req, res) =>{
    try {
        // the logged in user id
        let currentUser = res.locals.user
        let loggedInUserId = currentUser._id.toString()
        console.log(`The current logged in user id is -> ${loggedInUserId}`)

        // The id of the user who made the post
        let postUser = await travel.findOne({_id: req.params.travel_id})
        let userExpId = postUser.user.toString()
        console.log(`This post was made by this user with an id of -> ${userExpId}`)

        if(loggedInUserId === userExpId){
            await travel.findByIdAndDelete({  _id: req.params.travel_id })
            res.send("Users travel experience deleted successfully")
        }else{
            return res.status(403).send("You are not authorized to delete this post")
        }
        
    } catch (err) {
        console.log(err)
        res.status(500).send("Internal server error")
    }
})


// Delete a travel experience
// Route 'http://127.0.0.1:9000/travel/exps/edit/:travel_id'
router.put('/edit/:travel_id', requireAuth, checkUser, async (req, res) =>{
    try {
        // the logged in user id
        let currentUser = res.locals.user
        let loggedInUserId = currentUser._id.toString()
        console.log(`The current logged in user id is -> ${loggedInUserId}`)

        // The id of the user who made the post
        let postUser = await travel.findOne({_id: req.params.travel_id})
        let userExpId = postUser.user.toString()
        console.log(`This post was made by this user with an id of -> ${userExpId}`)

        if(loggedInUserId === userExpId){

            travel.findById({ _id: req.params.travel_id })
                .then(result => {
                    result.location = req.body.location;
                    result.cost = req.body.cost;
                    result.heritage = req.body.heritage;
                    result.places = req.body.places;
                    result.communityAccess = req.body.communityAccess;

                    result.save()
                    res.json({ result })
                })

        }else{
            return res.status(403).send("You are not authorized to Edit this post")
        }
        
    } catch (err) {
        console.log(err)
        res.status(500).send("Internal server error")
    }
})


// TEST
router.get('/test/:id', requireAuth, checkUser, async (req, res) => {
    

    // the user who made the post id
    let postUser = await travel.findOne({_id: req.params.id})
    // let userExpId = postUser.user.toString()
    console.log(postUser.user)

    // the logged in user id
    let currentUser = res.locals.user
    res.send(`current logged in user is -> ${currentUser._id}`)
    let loggedInUserId = currentUser._id.toString()
    console.log(loggedInUserId)

    if(loggedInUserId === userExpId){
        console.log("Equal id")
    }else{
        console.log("Id not equal")
    }


})

module.exports = router