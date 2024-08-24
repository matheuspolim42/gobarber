interface IHashProvider {
	compareHash(firstPassword: string, secondPassword: string): Promise<boolean>;
	hashGenerate(payload: string): Promise<string>;
}

export default IHashProvider;
