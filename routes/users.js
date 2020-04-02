import express from 'express'
import userController from '../controllers/users.js'
import {verifyToken} from '../authHelperFunctions.js'

let userRouter = new express.Router()

userRouter.route('/').get(userController.index).post(userController.create);

userRouter.post('/authenticate', userController.authenticate);

userRouter.use(verifyToken);
userRouter.route('/:id').get(userController.show).patch(userController.update).delete(userController.destroy);

export default userRouter;