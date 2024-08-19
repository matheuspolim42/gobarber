import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUsersRepository';
import SendForgotPasswordByEmailService from './SendForgotPasswordByEmailService';
import FakeMailProvider from '../../../shared/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '../../../shared/errors/AppError';
import FakeUserTokenRepository from '../infra/typeorm/repositories/fakes/FakeUserTokenRepository';

describe('SendForgotPasswordByEmail', () => {
  it('should be able to receive the email recover password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();
    const fakeUserTokenRepository = new FakeUserTokenRepository();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordByEmail = new SendForgotPasswordByEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
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

  it('should not recover an non-existing user password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();
    const fakeUserTokenRepository = new FakeUserTokenRepository();

    const sendForgotPasswordByEmail = new SendForgotPasswordByEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    );

    await expect(sendForgotPasswordByEmail.execute({
      email: "johndoe@example.com",
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to generate a recover password token', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();
    const fakeUserTokenRepository = new FakeUserTokenRepository();

    const generate = jest.spyOn(fakeUserTokenRepository, 'generate');

    const sendForgotPasswordByEmail = new SendForgotPasswordByEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    );

    await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456example",
    });

    await sendForgotPasswordByEmail.execute({
       email: "johndoe@example.com",
    });

    expect(generate).toHaveBeenCalled();
  }); 

  it(`should not be able to generate a recover password token
  if does not exist the user`, async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();
    const fakeUserTokenRepository = new FakeUserTokenRepository();

    const sendForgotPasswordByEmail = new SendForgotPasswordByEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    );
    
    await expect(sendForgotPasswordByEmail.execute({
      email: "johndoe@example.com",
    })).rejects.toBeInstanceOf(AppError);
  }); 
});