import IHashProvider from "../models/IHashProvider";

class FakeHashProvider implements IHashProvider {
	public async hashGenerate(payload: string): Promise<string> {
		return payload;
	}

	public async compareHash(
		firstString: string,
		secondString: string,
	): Promise<boolean> {
		return firstString === secondString;
	}
}

export default FakeHashProvider;
