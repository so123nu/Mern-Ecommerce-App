const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { token } = require('morgan');
const { validationResult } = require('express-validator');


const registerUser = async (req, res) => {
    const { name, email, password, confirmPassword, mobile } = req.body;


    try {

        userExists = await UserModel.findOne({ email });

        if (userExists) {
            errors = [
                {
                    "errors": [{ msg: "Email already registered.!" }]
                }
            ];
            req.flash('errors', errors);
            res.redirect('/front/myaccount');
        }

        if (password != confirmPassword) {
            errors = [
                {
                    "errors": [{ msg: "Password and Confirm Password do not match.!" }]
                }
            ];
            req.flash('errors', errors);
            res.redirect('/front/myaccount');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await UserModel.create({
            name,
            email,
            mobile,
            password: hashedPassword,
        })

        if (user) {
            req.flash('message', 'Registration Successfull.Login To Proceed!');
            res.redirect('/front/myaccount');
        }


    } catch (error) {
        if (error.name === 'ValidationError') {
            let errors = [];

            Object.keys(error.errors).forEach((key) => {

                errors.push(errors[key] = error.errors[key].message);
            });


            req.flash('errors', errors);
            res.redirect('/front/myaccount');

        }

    }



}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {

        let user = await UserModel.findOne({ email: email });

        if (user) {

            if (await bcrypt.compare(password, user.password)) {
                let token = generateToken(user._id);
                req.session.user = user;
                res.cookie('express_session', token, { httpOnly: true });
                res.redirect('/');

            } else {
                errors = [
                    {
                        "errors": [{ msg: "Invalid Email or password.!" }]
                    }
                ];
                req.flash('errors', errors);
                res.redirect('/front/myaccount');
            }


        } else {
            errors = [
                {
                    "errors": [{ msg: "User Does not Exists.!" }]
                }
            ];
            req.flash('errors', errors);
            res.redirect('/front/myaccount');
        }

    } catch (error) {
        console.log(error)
    }
}

const loginUserModal = async (req, res) => {
    const { email, password } = req.body;

    try {

        let user = await UserModel.findOne({ email: email });

        if (user) {

            if (await bcrypt.compare(password, user.password)) {
                let token = generateToken(user._id);
                req.session.user = user;
                res.cookie('express_session', token, { httpOnly: true });


                res.status(200).json({ msg: 'Login Successful.!' })



            } else {
                res.status(401).json({ msg: 'Invalid Email or Password.!' })
            }


        } else {
            res.status(401).json({ msg: 'User Not Found.!' })
        }

    } catch (error) {
        console.log(error)
    }
}

const logoutUser = (req, res) => {
    res.clearCookie("express_session");
    req.session.destroy();
    res.redirect('/front/myaccount');
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

const getUserSession = (req, res) => {
    return req.session.user;
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    loginUserModal,
    getUserSession
}