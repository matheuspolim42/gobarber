import { Router } from 'express';
import multer from 'multer';
import evanueAuthentication from '../../../../shared/infra/http/middlewares/evanueAuthentication';
import uploadConfig from '../../../../config/uploadConfig';
import UsersController from '../controllers/UsersController';
import UpdateAvatarController from '../controllers/UserAvatarController';

const userRouter = Router();
const usersController = new UsersController();
const updateAvatarController = new UpdateAvatarController();
const upload = multer(uploadConfig);

userRouter.post('/', usersController.create)

userRouter.patch('/avatar', evanueAuthentication, upload.single('avatar'), updateAvatarController.update);

export default userRouter;
