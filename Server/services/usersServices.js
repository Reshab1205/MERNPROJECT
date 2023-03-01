const mongoose = require('mongoose');
const User = require("../model/Users")

exports.registerUser = async (UserData) => {
    return await User.create(UserData);
}

exports.findByEmail = async (email) => {
    return await User.findOne({ 'email': email }).select('_id').lean();
}

exports.findUserByEmailForLogin = async (email) => {
    return await User.findOne({ 'email': email }).select('otp').lean();
}

exports.updateUserLoginDetails = async (id, token_session) => {
    return await User.findByIdAndUpdate(id, {$set: {'last_logged_in_date': new Date(), 'token_session': token_session }})
}

exports.findOneUserById = async (id) => {
    return await User.findOne({ _id: id})
    .select("email")
    .lean();
}

exports.updateData = async (_id,email) => {
    return await User.findByIdAndUpdate(
        _id, {$set : email}, {safe: true, upsert: false, new: true }
    )
}

exports.deleteUserById = async(id, deleteDetails) => {
    return await User.findByIdAndUpdate(
        id, {
            $set: deleteDetails
        }, {safe: true, upsert: false, new: true }
    )
}

exports.getAllUser = async () => {
    return await User.aggregate([{
        "$match" : {"status": "active"}
    }])
}