require('dotenv').config();

const serverPort = process.env.SERVER_PORT || 5001
const mongoDbUrl = process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/alkaliDB"

module.exports = {serverPort, mongoDbUrl}
