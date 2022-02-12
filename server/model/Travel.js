const mongoose = require('mongoose')

const TravelSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    location: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    cost: {
        type: String,
        required:true
    },
    heritage: {
        type: String,
    },
    places: {
        type: String
    },
    communityAccess: {
        type: String
    }
})

module.exports = mongoose.model('travel', TravelSchema)