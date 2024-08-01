import dataSource from '../../../shared/database';
import User from '../entities/User';
import { sign } from 'jsonwebtoken'
import { compare } from 'bcryptjs';

interface Request {
  email: string;
  password: string;
};

interface Response {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = dataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { email }
    })

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
