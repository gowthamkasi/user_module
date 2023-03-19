import { Router } from 'express';
import { createUser, deleteUser, getUser, updateUser } from './controller';

const router = Router();

router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
