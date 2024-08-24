import { Router } from "express";
import appointments from "../../../../modules/appointments/http/routes/appointment.routes";
import userRouter from "../../../../modules/users/routes/user.routes";
import sessionRouter from "../../../../modules/users/routes/session.routes";
import passwordRouter from "../../../../modules/users/routes/password.routes";
import profileRouter from "../../../../modules/users/routes/profile.routes";
import providerRouter from "../../../../modules/users/routes/providers.routes";

const router = Router();
router.use("/appointments", appointments);
router.use("/users", userRouter);
router.use("/sessions", sessionRouter);
router.use("/password", passwordRouter);
router.use("/profile", profileRouter);
router.use("/providers", providerRouter);

export default router;
