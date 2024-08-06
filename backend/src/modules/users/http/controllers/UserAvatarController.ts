import { Request, Response } from "express";
import { container } from "tsyringe";
import UpdateUserAvatarService from "../../services/UpdateUserAvatarService";

class UpdateAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({ user_id: req.user.id, avatarFileName: req.file.filename } );

    return res.json(user);
  }
}

export default UpdateAvatarController;
