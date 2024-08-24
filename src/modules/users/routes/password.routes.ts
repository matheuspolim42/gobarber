import { Router } from "express";
import ForgotPasswordController from "../infra/http/controllers/ForgotPasswordController";
import ResetPasswordController from "../infra/http/controllers/ResetPasswordController";

const passwordRouter = Router();
const forgotPasswordEmail = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post("/forgot", forgotPasswordEmail.create);
passwordRouter.post("/reset", resetPasswordController.create);

export default passwordRouter;
