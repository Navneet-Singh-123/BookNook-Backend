const User = require('../modals/user')
const {errorHandler} = require('../helpers/dbErrorHandler');
const jwt = require('jsonwebtoken') // To generate Signed token
const expressJWT = require('express-jwt') // For Authorization check

exports.signup = (req, res)=>{
    const user = new User(req.body);
    user.save((err, user)=>{
        if(err){
            return res.status(400).json({
                err: errorHandler(err)
            })
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        })
    })
}

exports.signin = (req, res)=>{
    // Find the user based on Email
    const {email, password} = req.body;
    User.findOne({email}, (err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error: 'User with that email does not exist. Please Signup'
            })
        }

        // If found make sure the email and password match

        // Create authenticate method in user model
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and Password do not Match"
            })
        }

        // Generate a signed token with user id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

        // Persist the token as 't' in cookie with expiry date
        res.cookie('t', token, {expire: new Date() + 9999});

        // return response with user and token to front end client
        const {_id, name, email, role} = user;
        return res.json({
            token, 
            user: {_id, email, name, role}
        })
    }) 
}

exports.signout = (req, res)=>{
    res.clearCookie('t');
    res.json({
        message: "Signout Success"
    })
}