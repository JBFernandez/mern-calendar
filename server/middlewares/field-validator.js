const { validationResult } = require('express-validator')
//importamos para que nos ayude el IDE
const { response } = require('express');

// next es un callback
const validateFields = ( req, resp = response, next ) => {

    // manejo de errores
    const errors = validationResult( req );
    if( !errors.isEmpty() ) {
        return resp.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    next();
}

module.exports = {
    validateFields
}