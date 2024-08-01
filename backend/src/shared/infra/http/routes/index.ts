import { Router } from 'express';
import appointments from './appointment.routes';
import users from './user.routes';
import sessions from './session.routes';

const router = Router();
router.use('/appointments', appointments);
router.use('/users', users);
router.use('/sessions', sessions);

export default router;
