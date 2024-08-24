import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import type User from "../infra/typeorm/entities/User";
import type IUserRepository from "../repositories/IUsersRepository";

@injectable()
class ShowProviderService {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUserRepository,
	) {}

	public async execute(except_user_id: string): Promise<User[]> {
		const providers = await this.usersRepository.getAllProviders(except_user_id);

		return providers;
	}
}

export default ShowProviderService;
