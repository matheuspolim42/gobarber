import { inject, injectable } from "tsyringe";
import IUserRepository from "../repositories/IUsersRepository";
import IMailProvider from "../../../shared/providers/MailProvider/models/IMailProvider";
import AppError from "../../../shared/errors/AppError";
import IUserTokenRepository from "../repositories/IUserTokenRepository";

import path from 'path';

interface IRequest {
  email: string;
};

@injectable()
class SendForgotPasswordByEmailService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {};

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(401, "This user doesn't exist.");
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views','forgot_password.hbs');

    if (!token) {
      throw new AppError(401, 'This token is undefined.');
    }

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GoBarber] Recuperacao de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}}`,
        },
      },
    });
  };
};

export default SendForgotPasswordByEmailService;