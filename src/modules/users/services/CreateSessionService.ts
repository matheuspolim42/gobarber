import { inject, injectable } from 'tsyringe';
import IUserRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import { sign } from 'jsonwebtoken'
import IHashProvider from '../container/providers/HashProvider/models/IHashProvider';
import AppError from '../../../shared/errors/AppError';
import authConfig from '../../../config/authConfig';

interface IRequest {
  email: string;
  password: string;
};

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {};

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(401, "Incorrect email combination.");
    }

    const passwordMatched = await this.hashProvider.compareHash(password, user.password);

    if (!passwordMatched) {
      throw new AppError(401, "Incorrect password combination.");
    };

    const { secretKey, expiresIn } = authConfig.jwt;

    const token = sign({}, secretKey, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionService;
