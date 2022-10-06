const User = require("../models/User")


exports.signupService = async(data) =>{
    const user = await User.create(data)
    return user
}

exports.findUserByEmailService = async(email) =>{
    return await User.findOne({email})
}