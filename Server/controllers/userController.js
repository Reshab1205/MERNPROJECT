require("dotenv").config({ path: "./variables.env" });
const jwt = require("jsonwebtoken");
const debug = require("../helpers/debugger");
const userService = require("../services/usersServices");
const allFunctions = require("../helpers/otp");

exports.registerUser = async (req, res) => {
    req.assert("email", "email cannot be empty. ").notEmpty();
    var errors = req.validationErrors();
    if(errors) {
        return res.send({ status_code: 400, status: "failure", message: errors });
    } else {
        try {
            var inputData = req.body;
            console.log("=========user-registered====");
            let otp = await allFunctions.generateOtp(4);
            let createData = {...inputData, otp};
            let activeUser = await userService.findByEmail(inputData.email);
            if(activeUser) {
                res.status(200).json({
                    status_code: 405,
                    status: "failure",
                    message: "user with email already exists",
                });
            } else {
                let user_details = await userService.registerUser(createData);
                res.status(200).json({
                    status_code: 500,
                    status: "success",
                    message: "user added",
                    test_otp: otp,
                    user_details
                })
            }
        } catch (err) {
            await debug.addRouteDebug({
                route_name: "registerUser",
                debug_details: err.stack,
            });
            res
               .status(500)
               .json({ status_code: 500, status: "failure", message: err.stack });
        }
    }
};

exports.userLogin = async (req,res) => {
    req.assert('email', 'email cannot be empty.').notEmpty();
    req.assert('otp', 'otp cannot be empty.').notEmpty();
    var errors = req.validationErrors();
    if(errors) {
        return res.send({ status_code: 400, status: 'failure', message: errors })
    } else {
        try {
            var inputData = req.body;
            let user = await userService.findUserByEmailForLogin(inputData.email);
            if(user != null) {
                if(user.otp == inputData.otp) {
                    let token_session = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION_TIME });
                    await userService.updateUserLoginDetails(user._id, token_session);
                    res.status(200).json({ status_code: 200, status: 'success', message: 'user logged in', token_session: token_session, user_id: user._id });
                } else {
                    res.status(200).json({ status_code: 405, status: 'failure', message: 'invalid credentials' });
                }
            } else {
                res.status(200).json({ status_code: 405, status: 'failure', message: 'user not found' });
            }
        } catch (err) {
            await debug.addRouteDebug({route_name: "userLogin", debug_details: err.stack });
            res.status(500).json({ status_code: 500, status: 'failure', message: err.stack });
        }
    }
}

exports.updateUser  = async (req,res) => {
    req.assert('_id', '_id cannot be empty.').notEmpty();
    req.assert('email','email cannot be empty.').notEmpty();
    var errors = req.validationErrors();
    if(errors ){
        return res.send({ status_code: 400, status: 'failure', message: errors})
    } else {
        try {
            var inputData = req.body;
            let userDetails = await userService.findOneUserById(inputData._id);
            if(userDetails != null) {
                let updateDetails = {email: inputData.email}
                let updatedetails1 = await userService.updateData(userDetails._id,updateDetails)
                res.status(200).json({ status_code: 200, status: 'success', message: 'user details updated'});
            } else {
                res.status(200).json({ status_code: 204, status: 'failure', message: ' user details not updated'});  
            }
        } catch (err) {
            await debug.addRouteDebug({route_name: "updateUser", debug_details: err.stack });
            res.status(500).json({ status_code: 500, status: 'failure', message: err.stack });
        }
    }
}

exports.deleteUser = async (req,res) => {
    req.assert('_id', '_id cannot be empty.').notEmpty();
    var errors = req.validationErrors();
    if(errors) {
        return res.send({status_code: 400, status: 'failure', message: errors})
    } else {
        try {
            var inputData = req.body;
            let userDetails = await userService.findOneUserById(inputData._id);
            if(userDetails != null) {
                let deleteDetails = {status: "deleted"}
                let deleteData = await userService.deleteUserById(inputData._id, deleteDetails);
                res.status(200).json({ status_code: 200, status: 'success', message: 'user details deleted'});
            } else {
                res.status(200).json({ status_code: 204, status: 'failure', message: ' user Details not deleted'});
            }
        } catch (err) {
            await debug.addRouteDebug({route_name: "deleteUser", debug_details: err.stack });
            res.status(500).json({ status_code: 500, status: 'failure', message: err.stack });
        }
    }
}

exports.getAllUser = async (req,res) => {
    try {
        const user = await userService.getAllUser();
        if(!user) {
            return res.send({ status_code: 400, status: 'failure', message: errors})
        } else {
            console.log(user, "user")
            return res.status(200).json({ status_code: 200, status: 'success', message: 'get all user details ', user});
        }
    } catch (err) {
        await debug.addRouteDebug({route_name: "getAllUser", debug_details: err.stack });
        res.status(500).json({ status_code: 500, status: 'failure', message: err.stack });
    }
}