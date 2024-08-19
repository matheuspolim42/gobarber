import { inject, injectable } from "tsyringe";
import IUserRepository from "../repositories/IUsersRepository";
import IUserTokenRepository from "../repositories/IUserTokenRepository";
import IHashProvider from "../container/providers/HashProvider/models/IHashProvider";
import { addHours, isAfter } from "date-fns";
import AppError from "../../../shared/errors/AppError";

interface Request {
  password: string;
  token: string;
};

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {};

  public async execute({ password, token }: Request): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError(401, 'User token does not exist.');
    };

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError(401, 'User does not exist.');
    };

    const endIn = addHours(userToken.created_at, 2);

    if (isAfter(Date.now(), endIn)) {
      throw new AppError(401, 'Token Expired.');
    };

    user.password = await this.hashProvider.hashGenerate(password);

    await this.userRepository.save(user);
  };
};

export default ResetPasswordService;