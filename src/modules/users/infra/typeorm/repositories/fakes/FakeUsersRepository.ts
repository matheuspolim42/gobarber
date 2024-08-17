import IUserRepository from "../../../../repositories/IUsersRepository";
import { v4 as uuid } from "uuid";
import ICreateUserDTO from "../../../../dtos/ICreateUserDTO";
import User from "../../entities/User";
import AppError from "../../../../../../shared/errors/AppError";

class FakeUsersRepository implements IUserRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid(), ...userData });
    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    if (!findIndex) {
      throw new AppError(404, "The user hasn't been found");
    }

    this.users[findIndex] = user;

    return user;
  }
};

export default FakeUsersRepository;
