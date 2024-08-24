import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import type IUserRepository from "../repositories/IUsersRepository";

interface IRequest {
	user_id: string;
	name: string;
	email: string;
	password: string;
	old_password: string;
}

@injectable()
class UpdateProfileService {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUserRepository,
	) {}

	public async execute(data: IRequest): Promise<void> {
		let user = await this.usersRepository.findById(data.user_id);

		if (!user) {
			throw new AppError(401, "User doesn't exists");
		}

		user = {
			id: data.user_id,
			email: data.email,
			name: data.name,
			password: data.password,
		};

		// biome-ignore lint/performance/noDelete: <explanation>
		delete user.password;

		this.usersRepository.save(user);
	}
}

export default UpdateProfileService;
