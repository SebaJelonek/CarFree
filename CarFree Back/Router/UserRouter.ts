import { Router } from 'express';
import { login, register } from '../Controller/UserController';

const UserRouter = Router();

UserRouter.post('/api/user/new', register);
UserRouter.post('/api/user/login', login);

export default UserRouter;
