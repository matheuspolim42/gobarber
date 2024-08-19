import AppError from "../../../shared/errors/AppError";
import FakeUsersRepository from "../fakes/FakeUsersRepository";
import CreateUserService from "./CreateUserService";
import HashProvider from "../container/providers/HashProvider/implementations/HashProvider";

describe("CreateUser", () => {
  it("should be able to create a new user", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const hashProvider = new HashProvider();
    const createUser = new CreateUserService(fakeUsersRepository, hashProvider);

    const user = await createUser.execute({ name: "John Doe",
      email: "example@hotmail.com",
      password: "example123"
    });

    expect(user).toHaveProperty('id');
  });

  it("shouldn't be able to create a new user with the same email from another", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const hashProvider = new HashProvider();
    const createUser = new CreateUserService(fakeUsersRepository, hashProvider);

    await createUser.execute({
      name: "John Doe",
      email: "example@hotmail.com",
      password: "example123"
    });

    expect(createUser.execute({
      name: "John Doe",
      email: "example@hotmail.com",
      password: "example123"
    })).rejects.toBeInstanceOf(AppError);
  });
})
