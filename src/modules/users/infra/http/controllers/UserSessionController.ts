import { container } from "tsyringe";
import { Request, Response } from "express";
import CreateSessionService from "../../../services/CreateSessionService";

class UserSessionController {
	public async create(req: Request, res: Response): Promise<Response> {
		const { email, password } = req.body;

		const createSession = container.resolve(CreateSessionService);

		const { user, token } = await createSession.execute({
			email,
			password,
		});

		delete user.password;

		return res.json({ user, token });
	}
}

export default UserSessionController;
