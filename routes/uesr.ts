import express from 'express';
import { insertUser, login, inssertRole, insertPermission, getRoles, getUsers } from '../controllers/user.js';
import { auth } from '../middleware/auth/auth.js';

const router = express.Router();

// POST /api/users
router.post('/', async (req, res) => {
    try {
        await insertUser(req.body);
        res.status(201).send();
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// POST /api/users/role
router.post('/role', async (req, res) => {
    try {
        const data = await inssertRole(req.body);
        res.status(201).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// POST /api/users/permission
router.post('/permission', async (req, res) => {
    try {
        const data = await insertPermission(req.body);
        res.status(201).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const data = await login(email, password);
        res.send(data);
    } catch (error) {
        res.status(401).send(error);
    }
});

// GET /api/users/roles
router.get('/roles', auth, async (req, res) => {
    try {
        const roles = await getRoles();
        res.send(roles);
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong");
    }
});

// GET /api/users
router.get('/', auth, async (req, res) => {
    try {
        const data = await getUsers();
        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(404).send(error);
    }
});

export default router;
