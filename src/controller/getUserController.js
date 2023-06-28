const createError = require('http-errors')
const Users = require('../models/users')
const getUser = async (req,res,nex)=>{
    try {
        const search = req.query.search || '';
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 1;
        const searchRegEx = RegExp('.*' + search + '.*', 'i');
        const filter = {
            isAdmin: {$ne: true},
            $or: [
                {name: {$regex: searchRegEx}},
                {email: {$regex: searchRegEx}},
                {phone: {$regex: searchRegEx}},
            ],
        }
        const options = {
            password: 0
        }
        const users = await Users.find(filter,options).limit(limit).skip((page -1) * limit);
        const count = await Users.find(filter).countDocuments()

        if(!users) throw createError(300, 'Data not found');
        return res.status(200).send({
            message: 'users were returned',
            users,
            pagination: {
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                prevPage: page - 1 > 0 ? page-1 : null,
                nextPage: page + 1 <  Math.ceil(count / limit) ? page + 1 : null
            }
        })
    } catch (error) {
        
    }
}

module.exports = getUser;