import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserTokenRepository from '../infra/typeorm/repositories/fakes/FakeUserTokenRepository';
import ResetPasswordService from './ResetPasswordService';
import AppError from '../../../shared/errors/AppError';

describe('ResetPassword', () => {
  it('should be able to reset the user password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeUserTokenRepository = new FakeUserTokenRepository();
    const fakeHashProvider = new FakeHashProvider();
    
    const resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeUserTokenRepository,
    );

    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'hashGenerate');

    await resetPasswordService.execute({
      password: '654321',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);
    
    expect(generateHash).toHaveBeenCalledWith('654321');
    expect(updatedUser?.password).toBe('654321');
  });

  it('should be able to expire reset password request if passed 2 hours', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeUserTokenRepository = new FakeUserTokenRepository();
    const fakeHashProvider = new FakeHashProvider();
     
    const resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeUserTokenRepository,
    );

    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);
    
    const generateHash = jest.spyOn(fakeHashProvider, 'hashGenerate');

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(resetPasswordService.execute({
      password: '654321',
      token,
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the user password without user token.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeUserTokenRepository = new FakeUserTokenRepository();
    const fakeHashProvider = new FakeHashProvider();
    
    const resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeUserTokenRepository,
    );

    expect(resetPasswordService.execute({
      password: '654321',
      token: 'non-existing-token',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the user password without a user.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeUserTokenRepository = new FakeUserTokenRepository();
    const fakeHashProvider = new FakeHashProvider();
    
    const resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeUserTokenRepository,
    );

    const { token } = await fakeUserTokenRepository.generate('non-existing-user');
    
    expect(resetPasswordService.execute({
      password: '654321',
      token,
    })).rejects.toBeInstanceOf(AppError);
  });
});