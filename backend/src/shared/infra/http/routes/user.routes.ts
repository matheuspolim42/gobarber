import { Router } from 'express';
import CreateUserService from '../../../../modules/users/services/CreateUserService';
import multer from 'multer';
import evanueAuthentication from '../middlewares/evanueAuthentication';
import uploadConfig from '../../../../config/uploadConfig';
import UpdateUserAvatarService from '../../../../modules/users/services/UpdateUserAvatarService';

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUserService = new CreateUserService();

  const user = await createUserService.execute({
    name,
    email,
    password
  });

  delete user.password;

  return res.json(user);
})

userRouter.patch('/avatar', evanueAuthentication, upload.single('avatar'), async (request, response) => {
  const updateUserAvatar = new UpdateUserAvatarService();

  const user = await updateUserAvatar.execute({ user_id: request.user.id, avatarFileName: request.file.filename } );

  return response.json(user);
});

export default userRouter;
