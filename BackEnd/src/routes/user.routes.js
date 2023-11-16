import { Router } from 'express';
import { register } from '../controllers/auth.controllers.js'; // Importa 'register'
import {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/user.controllers.js';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', register); // Usa 'register' para la creación de usuarios
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;