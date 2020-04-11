import User from "../models/user.js";
import { signToken } from "../authHelperFunctions.js";

export default {
  // list users
  index: async (req, res) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      alert(err);
    }
  },

  // get one user
  show: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (err) {
      alert(err);
    }
  },

  // creates new user
  create: async (req, res) => {
    try {
      const user = await User.create(req.body);
      const token = await signToken(user);

      res.json({ success: true, message: "User created with token", token });
    } catch (err) {
      res.json({ success: false, code: err.code });
    }
  },

  // update a user
  update: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      Object.assign(user, req.body);
      await user.save();

      res.json({ success: true, message: "User updated", user });
    } catch (err) {
      res.json({ success: false, code: err.code , error: err});
    }
  },

  // delete a user
  destroy: async (req, res) => {
    try {
        console.log(req.params.id)
        const user  = await User.findByIdAndRemove(req.params.id);
        return res.status(200).json({
          success: true,
          count: User.length
        });
      } catch (err) {
        return res.status(500).json({
          success: false,
          error: "Server Error attempting to delete", 
          err
        });
      }
  },

  authenticate: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user || !user.validPassword(req.body.password)) {
        console.log("auth failed")
        return res.json({ success: false, message: "Invalid Login" });
      }
      const token = signToken(user);
      res.json({ success: true, message: "Token attached", token });
    } catch (err) {
      res.json({ success: false, code: err.code });
    }
  }
};
