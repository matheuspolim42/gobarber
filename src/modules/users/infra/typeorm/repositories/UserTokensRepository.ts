import type { Repository } from "typeorm";
import dataSource from "../../../../../shared/infra/typeorm";
import type IUserTokenRepository from "../../../repositories/IUserTokenRepository";
import UserToken from "../entities/UserToken";

class UserTokensRepository implements IUserTokenRepository {
	private ormRepository: Repository<UserToken>;

	constructor() {
		this.ormRepository = dataSource.getRepository(UserToken);
	}

	public async findByToken(token: string): Promise<UserToken | undefined> {
		const userToken = this.ormRepository.findOne({
			where: { token },
		});

		return userToken;
	}

	public async generate(user_id: string): Promise<UserToken> {
		const userToken = this.ormRepository.create({
			user_id,
		});

		await this.ormRepository.save(userToken);

		return userToken;
	}

	public async delete(token: string): Promise<void> {
		const userToken = await this.findByToken(token);

		this.ormRepository.delete(userToken.id);
	}
}

export default UserTokensRepository;
