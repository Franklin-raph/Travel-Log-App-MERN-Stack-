const mongoose = require('mongoose')
const config = require('config')
const dbConnection = config.get('dbConnectionString')

const connectionMethod = async () => {
    try {
        mongoose.connect(dbConnection)
        console.log("Mongo database connected");
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports ={ connectionMethod }