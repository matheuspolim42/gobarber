import { inject, injectable } from "tsyringe";
import IUserRepository from "../repositories/IUsersRepository";
import IMailProvider from "../../../shared/providers/MailProvider/models/IMailProvider";
import AppError from "../../../shared/errors/AppError";
import IUserTokenRepository from "../repositories/IUserTokenRepository";

interface IRequest {
  email: string;
};

@injectable()
class SendForgotPasswordByEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {};

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(401, "This user doesn't exist.");
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    if (!token) {
      throw new AppError(401, 'This token is undefined.');
    }

    this.mailProvider.sendMail(
      email,
      "Pedido de redefinicao de senha recebido",
    );
  };
};

export default SendForgotPasswordByEmailService;