import { compare, hash } from "bcryptjs";
import type IHashProvider from "../models/IHashProvider";

class HashProvider implements IHashProvider {
	public async compareHash(payload: string, hashed: string): Promise<boolean> {
		return compare(payload, hashed);
	}

	public async hashGenerate(payload: string): Promise<string> {
		return hash(payload, 8);
	}
}

export default HashProvider;
