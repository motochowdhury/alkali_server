require('dotenv').config();

// port server
const serverPort = process.env.SERVER_PORT || 5001
// mongoDb URL
const mongoDbUrl = process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/alkaliDB"
// profile Image path
const profileImage = process.env.USER_PROFILE || "public/images/users/default.png";

// export module
module.exports = {
    serverPort, 
    mongoDbUrl, 
    profileImage
}
