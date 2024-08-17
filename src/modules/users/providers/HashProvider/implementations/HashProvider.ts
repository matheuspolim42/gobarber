import IHashProvider from "../models/IHashProvider";
import { compare, hash } from "bcryptjs";

class HashProvider implements IHashProvider {
  public async comparePassword(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  };

  public async hashPassword(payload: string): Promise<string> {
    return hash(payload, 8);
  }
};

export default HashProvider;
