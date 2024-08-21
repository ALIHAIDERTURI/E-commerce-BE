const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
mongoDB_URL = process.env.MONGODB_URL

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${mongoDB_URL}`)
        console.log({message:`MongoDB connected..! ${connectionInstance.connections[0].name}`});
        
        
    } catch (error) {
        console.log({Error: `MongoDB Connection Error.`, error});
        process.exit(1)
    }
}

module.exports = connectDB