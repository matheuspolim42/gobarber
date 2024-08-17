import { inject, injectable } from "tsyringe";
import IUserRepository from "../repositories/IUsersRepository";
import IMailProvider from "../../../shared/providers/MailProvider/models/IMailProvider";

interface IRequest {
  email: string;
};

@injectable()
class SendForgotPasswordByEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {};

  public async execute({ email }: IRequest): Promise<void> {
    this.mailProvider.sendMail(
      email,
      "Pedido de redefinicao de senha recebido",
    );
  };
};

export default SendForgotPasswordByEmailService;