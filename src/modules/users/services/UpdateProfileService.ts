import { injectable, inject } from "tsyringe";
import type IUserRepository from "../repositories/IUsersRepository";
import AppError from "../../../shared/errors/AppError";

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password: string;
  old_password: string;
};

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute(data: IRequest): Promise<void> {
    let user = await this.usersRepository.findById(data.user_id);

    if (!user) {
      throw new AppError(401, "User doesn't exists");
    };

    user = {
      id: data.user_id,
      email: data.email,
      name: data.name,
      password: data.password,
    };

    delete user.password;

    this.usersRepository.save(user);
  }
};

export default UpdateProfileService;
