import IHashProvider from "../models/IHashProvider";

class FakeHashProvider implements IHashProvider {
  public async hashPassword(payload: string): Promise<string> {
    return payload;
  };

  public async comparePassword(firstPassword: string, secondPassword: string): Promise<boolean> {
    return firstPassword === secondPassword;
  };
};
