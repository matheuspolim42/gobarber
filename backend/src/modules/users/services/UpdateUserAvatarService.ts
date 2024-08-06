import IUserRepository from "../repositories/IUsersRepository";
import User from "../infra/typeorm/entities/User";
import uploadConfig from "../../../config/uploadConfig";
import path from 'path';
import fs from 'fs';

interface IRequest {
  user_id: string,
  avatarFileName: string,
}

class UpdateUserAvatarService {
  constructor(
    private userRepository: IUserRepository
  ) {};

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new Error("User doesn't exist.");
    }

    if (user.avatar) {
      const avatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const verifyFilePathExists = await fs.promises.stat(avatarFilePath);

      if (verifyFilePathExists) {
        fs.promises.unlink(avatarFileName);
      }
    }

    user.avatar = avatarFileName;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
