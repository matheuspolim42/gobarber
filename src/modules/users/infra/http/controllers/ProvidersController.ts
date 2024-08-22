import { Request, Response } from "express";
import { container } from "tsyringe";
import ShowProviderService from "../../../services/ShowProviderService";

class ProvidersController {
  public async index(req: Request, res: Response) {
    const user_id = req.user.id;
    const showProviderService = container.resolve(ShowProviderService);

    const providers = await showProviderService.execute(user_id);

    return res.json(providers);
  };
};

export default ProvidersController;
