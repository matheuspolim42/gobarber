import type UserToken from "../infra/typeorm/entities/UserToken";

export default interface IUserTokenRepository {
	generate(user_id: string): Promise<UserToken>;
	findByToken(token: string): Promise<UserToken>;
	delete(token: string): Promise<void>;
}
