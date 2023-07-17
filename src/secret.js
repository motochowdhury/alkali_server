require('dotenv').config();

// port server
const serverPort = process.env.SERVER_PORT || 5001

// mongoDb URL
const mongoDbUrl = process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/alkaliDB"

// profile Image path
const profileImage = process.env.USER_PROFILE || "public/images/users/default.png";

// jwt activation key
const jwtSecurityKey = process.env.JWT_KEY || '@@@jbhuHAUIG#%najabajachjah';

// app userName
const smtpUserName = process.env.SMTP_USERNAME || ''

// app password
const smtpPassword = process.env.SMTP_PASSWORD || ''

// client url
const clientUrl = process.env.CLIENT_URL

// export module
module.exports = {
    serverPort, 
    mongoDbUrl, 
    profileImage,
    jwtSecurityKey,
    smtpUserName,
    smtpPassword,
    clientUrl
}
