const createError = require("http-errors");
const Users = require("../models/users");
const { successResponse } = require("./responseController");
const { findItemById } = require("../services/findItem");
const { deleteImage } = require("../helper/deleteImage");
const { JWTToken } = require("../helper/jsonwebtoken");
const { jwtSecurityKey, clientUrl } = require("../secret");
const emailWithNodeMailer = require("../helper/email");
const jwt = require("jsonwebtoken");

// To get all users
const getUsers = async (req, res, nex) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const searchRegEx = RegExp(".*" + search + ".*", "i");
    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegEx } },
        { email: { $regex: searchRegEx } },
        { phone: { $regex: searchRegEx } },
      ],
    };
    const options = {
      password: 0,
    };
    const users = await Users.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);
    const count = await Users.find(filter).countDocuments();

    if (!users) {
      throw createError(300, "Data not found");
    }

    // Response return
    return successResponse(res, {
      statusCode: req.status,
      message: "users were returned",
      palyload: {
        users,
        pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          prevPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 < Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next();
  }
};

// To get single user
const getUser = async (req, res, next) => {
  try {
    // To recieve id from params
    const id = req.params.id;
    // Avoiding Password
    const options = { password: 0 };
    const user = await findItemById(Users, id, options);
    // response sending
    return successResponse(res, {
      statusCode: 200,
      message: "user were returned",
      palyload: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

// To delete single user
const deleteUser = async (req, res, next) => {
  try {
    // To recieve id from params
    const id = req.params.id;
    const user = await findItemById(Users, id);
    // delete user
    await Users.deleteOne({ _id: id, isAdmin: false });
    // image path
    const defaultPath = user?.image;
    // delete image
    deleteImage(defaultPath);
    // response sending
    return successResponse(res, {
      statusCode: 200,
      message: "user was deleted",
    });
  } catch (error) {
    next(error);
  }
};

// To create user
const createUser = async (req, res, next) => {
  try {
    const { name, email, phone, address } = req.body;

    // Checking is user exist or not
    const userExist = await Users.exists({ email: email });
    if (userExist) {
      throw createError(409, "user already exist, please sign in");
    }

    // new user
    const newUser = {
      name,
      email,
      phone,
      address,
    };
    // JWT token
    const token = JWTToken(newUser, jwtSecurityKey, "10m");

    // email data
    const emailData = {
      email,
      subject: "Account Activation Email",
      html: `
        <div>
        <h2>Hello ${name}!</h2>
        <p>Please click this <a href="${clientUrl}/api/users/activation/${token}" target='_blank'>Activation link</a> To activate your account</p>
        </div>
        `,
    };

    try {
      await emailWithNodeMailer(emailData);
    } catch (error) {
      next(createError(500, "Cannot send email deu to error"));
      return;
    }

    return successResponse(res, {
      statusCode: 200,
      message: `user created successfully, please check ${email}`,
      palyload: { token },
    });
  } catch (error) {
    next(error);
  }
};
// To create user
const verifyUser = async (req, res, next) => {
  try {
    // body token
    const token = req.body.token;
    if (!token) {
      throw createError(404, "Token doesn't fount");
    }

    try {
      const decoded = jwt.verify(token, jwtSecurityKey);
      if (!decoded) {
        throw createError(409, "user can not verify");
      }

      // Checking is user exist or not
      const userExist = await Users.exists({ email: decoded.email });
      if (userExist) {
        throw createError(409, "user already exist, please sign in");
      }

      await Users.create(decoded);
      return successResponse(res, {
        statusCode: 200,
        message: `user created successfully`,
      });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw createError(401, "token has expired");
      } else if (error.name === "JsonWebTokenError") {
        throw createError(401, "Invalid token");
      } else {
        throw error;
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, getUser, deleteUser, createUser, verifyUser };
