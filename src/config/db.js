const mongoose = require("mongoose");
const { mongoDbUrl } = require("../secret");

const connectDb = async (options = {}) => {
try {
    await mongoose.connect(mongoDbUrl, options);
    console.log("DB connection is established")
    mongoose.connection.on("error", (error)=>{
        console.error("DB connection error:", error)
    })
} catch (error) {
    console.error("could'nt connect to DB:", error.toString())
}
}

module.exports = connectDb;