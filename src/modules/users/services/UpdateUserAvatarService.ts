import IUserRepository from "../repositories/IUsersRepository";
import { inject, injectable } from 'tsyringe';
import User from "../infra/typeorm/entities/User";
import IStorageProvider from "../../../shared/providers/StorageProvider/models/IStorageProvider";
import AppError from "../../../shared/errors/AppError";

interface IRequest {
  user_id: string,
  avatarFileName: string,
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,


    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {};

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError(401, "User doesn't exist.");
    }

    if (user.avatar) {
      this.storageProvider.delFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = filename;

    return user;
  }
}

export default UpdateUserAvatarService;
