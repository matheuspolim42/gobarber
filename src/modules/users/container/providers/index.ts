import { container } from 'tsyringe';
import HashProvider from './HashProvider/implementations/HashProvider';
import IHashProvider from './HashProvider/models/IHashProvider';
import IUserTokenRepository from '../../repositories/IUserTokenRepository';
import UserTokensRepository from '../../infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IHashProvider>(
  'HashProvider',
  HashProvider
)

container.registerSingleton<IUserTokenRepository>(
  'UserTokensRepository',
  UserTokensRepository
)