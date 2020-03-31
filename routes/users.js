import express from 'express'
import userController from '../controllers/users.js'
import helper from '../authHelperFunctions'

userRouter = new express.Router()

verifyToken = helper.verifyToken;

userRouter.route('/').get(userController.index).post(userController.create);

userRouter.post('/authenticate', userController.authenticate);

userRouter.use(verifyToken);
userRouter.route('/:id').get(userController.show).patch(userController.update).delete(userController.destroy);

module.exports = userRouter;