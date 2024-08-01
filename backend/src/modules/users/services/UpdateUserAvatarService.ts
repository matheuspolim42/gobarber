import dataSource from "../../../shared/database";
import User from "../entities/User";
import uploadConfig from "../../../config/uploadConfig";
import path from 'path';
import fs from 'fs';

interface Request {
  user_id: string,
  avatarFileName: string,
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const userRepository = dataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: {id: user_id},
    });

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

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
