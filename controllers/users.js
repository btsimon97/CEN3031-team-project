import User from '../models/user.js'
import {signToken} from '../authHelperFunctions.js'

export default {
    // list users
    index: async (req, res) => {
        try {
            console.log('here!')
            const users = await User.find({});
            res.json(users);
        } catch(err) {
            alert(err);
        }
    },

    // get one user
    show: async (req, res) => {
        console.log("Current User:");
        console.log(req.user);

        try {
            const user = await User.findById(req.params.id);
            res.json(user);
        } catch(err) {
            alert(err);
        }
    },

    // creates new user
    create: async (req, res) => {
        console.log('create')
        try{
            console.log(req.body)
            const user = await User.create(req.body);
            const token = await signToken(user);

            res.json({success: true, message: "User created with token", token});
        } catch(err) {
            res.json({success: false, code: err.code});
        }
    },

    // update a user
    update: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            Object.assign(user, req.body);
            await user.save();

            res.json({success: true, message: "User updated", user});
        } catch(err) {
            res.json({success: false, code: err.code});
        }
    },

    // delete a user
    destroy: async (req, res) => {
        try {
            const user = await User.findByIdAndRemove(req.params.id);
            res.json({success: true, message: "User deleted", user});
        } catch(err) {
            res.json({success: false, code: err.code});
        }
    },

    
    
    authenticate: async (req, res) => {
        try {
            console.log("authenticating credentials: ", req.body)
            const user = await User.findOne({email: req.body.email});
            console.log("user", user)
            if(!user || !user.validPassword(req.body.password)) {
                console.log("invalid user")
                return res.json({success: false, message: "Invalid Login"});
            }
            const token = signToken(user);
            console.log("token", token)
            res.json({success: true, message: "Token attached", token});
            
        } catch (err) {
            res.json({success: false, code: err.code});
        }
        
    }
};