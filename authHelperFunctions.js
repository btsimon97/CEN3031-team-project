import jwt from 'jsonwebtoken'
import User from './models/user.js'

const jwt_secret = process.env.SECRET;

// import require from '../config/config.js'

// function to create tokens
export function signToken(user) {
    const userData = user.toObject();
    delete userData.password;
    return jwt.sign(userData, jwt_secret)
}

// function to verify tokens
export function verifyToken(req, res, next) {
    console.log(req.token)
    const token = req.get('token') || req.body.token || req.query.token;
    // const token = signToken(req.body)
    console.log("token", token);
    // reject user if no token
    if(!token) return res.json({success: false, message: "No token provided"});

    // try to verify token
    jwt.verify(token, jwt_secret, (err, decodedData) => {
        // error check
        if(err) return res.json({success: false, message: "Error with token"});

        // find user associated with token
        User.findById(decodedData._id, (err, user) => {
            // reject token if no user
            if(!user) return res.json({success: false, message: "Error with token"});

            req.user = user;
            next();
        })
    })
}

// export default {
//     signToken,
//     verifyToken
// };