import { Router } from 'express';
import appointments from '../../../../modules/appointments/http/routes/appointment.routes';
import users from '../../../../modules/users/http/routes/user.routes';
import sessions from '../../../../modules/users/http/routes/session.routes';

const router = Router();
router.use('/appointments', appointments);
router.use('/users', users);
router.use('/sessions', sessions);

export default router;
