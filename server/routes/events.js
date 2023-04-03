/*  CRUD
    Event Routes / events
    host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validateFields } = require('../middlewares/field-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validateJWT } = require('../middlewares/jwt-validator');

const router = Router();

//Todas tienen que pasar por la validación del JWT
router.use( validateJWT );

// Get events
router.get('/', getEvents );


// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'The title is required' ).not().isEmpty(),
        check('start', 'Start date is required' ).custom( isDate ),
        check('end', 'End date is required' ).custom( isDate ),
        validateFields
    ], 
    createEvent 
);

// actualizar un nuevo evento
router.put(
    '/:id',
    [
        check('title', 'The title is required' ).not().isEmpty(),
        check('start', 'Start date is required' ).custom( isDate ),
        check('end', 'End date is required' ).custom( isDate ),
        validateFields
    ],  
    updateEvent );

// borrar evento
router.delete('/:id', deleteEvent );

module.exports = router;
