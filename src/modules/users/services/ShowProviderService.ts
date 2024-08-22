import { injectable, inject } from "tsyringe";
import type IUserRepository from "../repositories/IUsersRepository";
import User from "../infra/typeorm/entities/User";
import AppError from "../../../shared/errors/AppError";

@injectable()
class ShowProviderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute(except_user_id: string): Promise<User[]> {
    const providers = await this.usersRepository.getAllProviders(except_user_id);

    return providers;
  }
};

export default ShowProviderService;
