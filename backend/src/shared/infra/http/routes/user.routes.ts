import { Router } from 'express';
import CreateUserService from '../../../../modules/users/services/CreateUserService';
import multer from 'multer';
import evanueAuthentication from '../middlewares/evanueAuthentication';
import uploadConfig from '../../../../config/uploadConfig';
import UpdateUserAvatarService from '../../../../modules/users/services/UpdateUserAvatarService';
import UsersRepository from '../../../../modules/users/infra/typeorm/repositories/UsersRepository';


const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const userRepository = new UsersRepository();
  const createUserService = new CreateUserService(userRepository);

  const user = await createUserService.execute({
    name,
    email,
    password
  });

  delete user.password;

  return res.json(user);
})

userRouter.patch('/avatar', evanueAuthentication, upload.single('avatar'), async (request, response) => {
  const userRepository = new UsersRepository();
  const updateUserAvatar = new UpdateUserAvatarService(userRepository);

  const user = await updateUserAvatar.execute({ user_id: request.user.id, avatarFileName: request.file.filename } );

  return response.json(user);
});

export default userRouter;
