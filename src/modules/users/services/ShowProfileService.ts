import { inject, injectable } from "tsyringe";
import type IUserRepository from "../repositories/IUsersRepository";
import type User from "../infra/typeorm/entities/User";

interface IRequest {

}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute(user_id: string): Promise<User> {
    const user = this.usersRepository.findById(user_id);

    return user;
  }
};

export default ShowProfileService;
