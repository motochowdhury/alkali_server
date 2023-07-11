const jwt = require('jsonwebtoken')
const JWTToken = (palyload, secretKey, expireTime) => {
    if(typeof palyload !== 'object' || !palyload) {
        throw new Error('Payload must be provide')
    }
    try {
        const token = jwt.sign(palyload, secretKey, {expiresIn: expireTime});
        return token;
    } catch (error) {
        
    }
}

module.exports = {JWTToken}