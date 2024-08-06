import IUserRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import { sign } from 'jsonwebtoken'
import { compare } from 'bcryptjs';

interface IRequest {
  email: string;
  password: string;
};

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  constructor(
    private userRepository: IUserRepository
  ) {};

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Incorrect email combination.");
    }

    const correctPassword = await compare( password, user.password );

    if (!correctPassword) {
      throw new Error("Incorrect password combination.");
    }

    const token = sign({}, '7423d0509ec2c4f379f9dd9988f7cdc3', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export default CreateSessionService;
