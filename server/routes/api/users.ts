import { Router } from 'express';
import { validateRegister } from '../validation/validators';
import { RegisterData } from '../types';

const router = Router();

// @route	POST api/users/regsiter
// @desc	Example registration (doesn't actually register)
// @access	Public
router.post('/register', async (req, resp) => {
    const reqBody = req.body as RegisterData;
    const { isValid, errors } = await validateRegister(reqBody);

    if (!isValid) return resp.status(400).json({ errors });
    else return resp.status(200).json({ msg: 'Oh yeah' });
});

// @route	GET api/users/regsiter
// @desc	Funny resp
// @access	Public
router.get('/register', async (_req, resp) => {
    return resp.send('Idiot');
});

export default router;
