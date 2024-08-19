import IUserRepository from "../repositories/IUsersRepository";
import User from "../infra/typeorm/entities/User";
import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import type IHashProvider from "../container/providers/HashProvider/models/IHashProvider";

interface IRequest {
  name: string,
  email: string,
  password: string,
};

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {};

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if ( checkUserExists ) {
      throw new AppError(404, 'Email address already used');
    }

    const hashedPassword = await this.hashProvider.hashGenerate(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
