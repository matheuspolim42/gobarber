import { Router } from 'express';
import appointments from '../../../../modules/appointments/http/routes/appointment.routes';
import users from '../../../../modules/users/http/routes/user.routes';
import sessionRouter from '../../../../modules/users/http/routes/session.routes';
import passwordRouter from '../../../../modules/users/http/routes/password.routes';

const router = Router();
router.use('/appointments', appointments);
router.use('/users', users);
router.use('/sessions', sessionRouter);
router.use('/password', passwordRouter);

export default router;
