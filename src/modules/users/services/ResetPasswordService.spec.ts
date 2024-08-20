import FakeUsersRepository from "../fakes/FakeUsersRepository";
import FakeHashProvider from '../container/providers/HashProvider/fakes/FakeHashProvider';
import FakeUserTokenRepository from "../fakes/FakeUserTokenRepository";
import ResetPasswordService from './ResetPasswordService';
import AppError from '../../../shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeUserTokenRepository,
    );
  });

  it('should be able to reset the user password', async () => {
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