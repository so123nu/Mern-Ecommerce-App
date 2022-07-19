const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')

const auth = async (req, res, next) => {

    let token;

    try {

        var user_session = req.session.user;

        // Get user from the token

        req.find_user = await UserModel.findById(user_session._id).select('-password')

        next();

    } catch (error) {
        console.log(error)
        res.redirect('/front/myaccount');

    }

}

module.exports = auth