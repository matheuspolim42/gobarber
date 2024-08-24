import { container } from "tsyringe";
import UserTokensRepository from "../../infra/typeorm/repositories/UserTokensRepository";
import type IUserTokenRepository from "../../repositories/IUserTokenRepository";
import HashProvider from "./HashProvider/implementations/HashProvider";
import type IHashProvider from "./HashProvider/models/IHashProvider";

container.registerSingleton<IHashProvider>("HashProvider", HashProvider);

container.registerSingleton<IUserTokenRepository>(
	"UserTokensRepository",
	UserTokensRepository,
);
