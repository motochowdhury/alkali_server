const createError = require('http-errors')
const Users = require('../models/users');
const { successResponse } = require('./responseController');
const { default: mongoose } = require('mongoose');

// To get all users
const getUsers = async (req,res,nex)=>{
    try {
        const search = req.query.search || '';
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
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

        if(!users) {throw createError(300, 'Data not found')};

        // Response return
        return successResponse(res, {
            statusCode: req.status,
            message: 'users were returned',
            palyload: {
                users,
            pagination: {
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                prevPage: page - 1 > 0 ? page-1 : null,
                nextPage: page + 1 <  Math.ceil(count / limit) ? page + 1 : null
            }
            }
        })
    } catch (error) {
        next()
    }
}

// To get single user
const getUser = async (req,res, next) => {
    try {
        // To recieve id from params
        const id = req.params.id;
        // Avoiding Password
        const option = {password : 0}; 
        // find user byId
        const user = await Users.findById(id, option)
        // if empty user
        if(!user) {throw createError('404', "user doesn't exist")};
        // response sending
        return successResponse(res, {
            statusCode: 200,
            message: "user were returned",
            palyload: {
                user
            }
        })
    } catch (error) {
        // mongoDb error handling
        if(error instanceof mongoose.Error) {
            next(createError('500', 'invalid user id'))
            return;
        }
        next(error)
    }
}

module.exports = {getUsers, getUser};