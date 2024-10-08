import { v4 as uuid } from "uuid";
import AppError from "../../../shared/errors/AppError";
import type ICreateUserDTO from "../dtos/ICreateUserDTO";
import User from "../infra/typeorm/entities/User";
import type IUserRepository from "../repositories/IUsersRepository";

class FakeUsersRepository implements IUserRepository {
	private users: User[] = [];

	public async findById(id: string): Promise<User | undefined> {
		const findUser = this.users.find((user) => user.id === id);

		return findUser;
	}

	public async getAllProviders(except_user_id?: string): Promise<User[]> {
		return [new User()];
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		const findUser = this.users.find((user) => user.email === email);

		return findUser;
	}

	public async create(userData: ICreateUserDTO): Promise<User> {
		const user = new User();
		Object.assign(user, { id: uuid(), ...userData });
		this.users.push(user);
		return user;
	}

	public async save(user: User): Promise<User> {
		const findIndex = this.users.findIndex(
			(findUser) => findUser.id === user.id,
		);

		this.users[findIndex] = user;

		return user;
	}
}

export default FakeUsersRepository;
