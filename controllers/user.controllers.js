const { signupService, findUserByEmailService } = require("../services/user.service")
const bcrypt = require('bcryptjs')
const { generateToken } = require("../utils/token")


exports.signup = async (req, res) => {
    try {
        const user = await signupService(req.body)
        res.status(200).json({
            status: 'success',
            message: 'User SignUp successfully',

        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error: error.message
        })
    }
}

/*
Steps to make a login
1. Check email and password are given
2. Load user with Email
3. if not user send res
4. compare password
5. if not password send res
6. check is user is active
7. if not active send res
8. generate token
9. send User and token
*/

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                status: ' fail',
                error: 'Please Provide your credentials'
            })
        }

        const user = await findUserByEmailService(email)

        if (!user) {
            return res.status(401).json({
                status: 'fail',
                error: 'No user found. Please create a valid user'
            })
        }

        const isPasswordValid = user.comparePassword(password, user.password)

        if (!isPasswordValid) {
            return res.status(403).json({
                status: 'fail',
                error: 'Password is not correct'
            })
        }

        if (user.status != 'active') {
            return res.status(401).json({
                status: 'fail',
                error: 'Your Account isnot active yet'
            })
        }

        const token = generateToken(user)

        const { password: pwt, ...others } = user.toObject()

        res.status(200).json({
            status: 'success',
            message: 'User logIn successfully',
            data: {
                user: others,
                token
            }

        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error: error.message
        })
    }
}

exports.getMe = async (req, res) => {
    try {
       const user = await findUserByEmailService(req.user?.email)

       res.status(200).json({
        status: 'success',
        data: user
       })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error: error.message
        })}
}
