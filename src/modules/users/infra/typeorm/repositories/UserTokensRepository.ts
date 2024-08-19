import { Repository } from "typeorm";
import UserToken from "../entities/UserToken";
import dataSource from "../../../../../shared/infra/typeorm";
import IUserTokenRepository from "../../../repositories/IUserTokenRepository";

class UserTokensRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = dataSource.getRepository(UserToken);
  };

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  };

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  };
};

export default UserTokensRepository;
