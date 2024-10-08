import type ICreateUserDTO from "../dtos/ICreateUserDTO";
import type User from "../infra/typeorm/entities/User";

export default interface IUserRepository {
	getAllProviders(except_user_id?: string): Promise<User[]>;
	findById(id: string): Promise<User | undefined>;
	findByEmail(email: string): Promise<User | undefined>;
	create(user: ICreateUserDTO): Promise<User>;
	save(user: User): Promise<User>;
}
