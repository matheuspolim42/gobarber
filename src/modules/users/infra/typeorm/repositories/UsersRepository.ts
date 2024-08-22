import { Repository, Not } from "typeorm";
import IUserRepository from "../../../repositories/IUsersRepository";
import User from "../entities/User";
import dataSource from "../../../../../shared/infra/typeorm";
import ICreateUserDTO from "../../../dtos/ICreateUserDTO";

class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = dataSource.getRepository(User);
  }

  public async getAllProviders(except_user_id?: string): Promise<User[]> {
    const users = await this.ormRepository.find({
      where: {
        id: Not(except_user_id),
       },
    });

    return users;
  };

  public async findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      where: { id }
    });

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
};

export default UsersRepository;
