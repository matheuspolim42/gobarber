import AppError from "../../../shared/errors/AppError";
import IUserTokenRepository from "../repositories/IUserTokenRepository";
import UserToken from "../infra/typeorm/entities/UserToken";
import { v4 as uuid } from "uuid";

class FakeUserTokenRepository implements IUserTokenRepository {
	private usersTokens: UserToken[] = [];

	public async generate(user_id: string): Promise<UserToken> {
		const userToken = new UserToken();

		Object.assign(
			userToken,
			{ id: uuid() },
			{ token: uuid() },
			{ user_id },
			{ created_at: new Date() },
			{ updated_at: new Date() },
		);

		this.usersTokens.push(userToken);

		return userToken;
	}

	public async findByToken(token: string): Promise<UserToken> {
		const userToken = this.usersTokens.find(
			(findToken) => findToken.token === token,
		);

		return userToken;
	}

	public async delete(token: string): Promise<void> {
		const userToken = await this.findByToken(token);

		const index = this.usersTokens.findIndex(
			(findUserToken) => userToken.id === findUserToken.id,
		);

		this.usersTokens.splice(index, 1);
	}
}

export default FakeUserTokenRepository;
