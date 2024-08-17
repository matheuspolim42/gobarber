import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUsersRepository';
import SendForgotPasswordByEmailService from './SendForgotPasswordByEmailService';
import FakeMailProvider from '../../../shared/providers/MailProvider/fakes/FakeMailProvider';

describe('SendForgotPasswordByEmail', () => {
  it('should be able to change the password with email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordByEmail = new SendForgotPasswordByEmailService(
      fakeUsersRepository,
      fakeMailProvider
    );

    await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456example",
    });

    await sendForgotPasswordByEmail.execute({
      email: "johndoe@example.com",
    });

    expect(sendMail).toHaveBeenCalled();
  });
});