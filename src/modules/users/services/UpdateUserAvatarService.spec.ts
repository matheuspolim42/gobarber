import AppError from "../../../shared/errors/AppError";
import FakeUsersRepository from "../fakes/FakeUsersRepository";
import FakeStorageProvider from "../../../shared/providers/StorageProvider/fakes/FakeStorageProvider";
import UpdateUserAvatarService from "./UpdateUserAvatarService";

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;

let updateUserAvatar: UpdateUserAvatarService;

describe("UpdateUser", () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeStorageProvider = new FakeStorageProvider();

		updateUserAvatar = new UpdateUserAvatarService(
			fakeUsersRepository,
			fakeStorageProvider,
		);
	});

	it("should be able to update user avatar", async () => {
		const user = await fakeUsersRepository.create({
			name: "John Doe",
			email: "johndoe@example.com",
			password: "123456",
		});

		await updateUserAvatar.execute({
			user_id: user.id,
			avatarFileName: "avatar.jpg",
		});

		expect(user.avatar).toBe("avatar.jpg");
	});

	it("should not be able to update avatar from non existing user", async () => {
		expect(
			updateUserAvatar.execute({
				user_id: "non-existing-user",
				avatarFileName: "avatar.jpg",
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it("should be able to delete the avatar when updating new one", async () => {
		const deleteFile = jest.spyOn(fakeStorageProvider, "delFile");

		const user = await fakeUsersRepository.create({
			name: "john doe",
			email: "johndoe@example.com",
			password: "123456",
		});

		await updateUserAvatar.execute({
			user_id: user.id,
			avatarFileName: "avatar1.jpg",
		});

		await updateUserAvatar.execute({
			user_id: user.id,
			avatarFileName: "avatar2.jpg",
		});

		expect(deleteFile).toHaveBeenCalledWith("avatar1.jpg");
		expect(user.avatar).toBe("avatar2.jpg");
	});
});
