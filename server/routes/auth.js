/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

// Gracias a la desestructuración no necesitamos la 2nda línea de abajo
const { Router } = require('express');
// const router = express.Router
const router = Router();
const { check } = require('express-validator');

const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/jwt-validator');


router.post(
    '/new',
    // middlewares 
    [
        check('name', 'el nombre es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'el password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validateFields
    ] , 
    createUser );
    

router.post(
    '/',
    [
        check('email', 'ingresa un email adecuado').isEmail(),
        check('password', 'ingresa una contraseña adecuada').not().isEmpty(),
        validateFields
    ], 
    loginUser );

router.get('/renew', validateJWT, revalidateToken );






module.exports = router;