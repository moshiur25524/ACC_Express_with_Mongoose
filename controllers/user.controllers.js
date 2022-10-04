const { signupService } = require("../services/user.service")


exports.signup = async(req, res) =>{
    try {
        const user = await signupService(req.body)
        res.status(200).json({
            status: 'success',
            message: 'User SignUp successfully',
            
        })
    } catch (error) {
        res.status(500).json({
            status:'fail',
            error: error.message
        })
    }
}