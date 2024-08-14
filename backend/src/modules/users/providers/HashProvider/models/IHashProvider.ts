interface IHashProvider {
  comparePassword(firstPassword: string, secondPassword: string): Promise<boolean>;
  hashPassword(payload: string): Promise<string>;
};

export default IHashProvider;
