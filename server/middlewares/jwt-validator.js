const { response, request } = require('express')
const jwt = require('jsonwebtoken');

const validateJWT = ( req = request, resp = response, next ) => {

    // x-token headers
    const token = req.header('x-token');

    if( !token ) {
        return resp.status(401).json({
            ok: false,
            msg: 'No token in request'
        });
    }

    try {
// verify() verifica que el token sea valido y vigente
// Decodifica el token y te da el payload

        const payload = jwt.verify( 
            token, 
            process.env.SECRET_JWT_SEED 
        );

        req.uid = payload.uid;
        req.name = payload.name;
        
    } catch (error) {
        return resp.status(401).json({
            ok: false,
            msg: 'Invalid token'
        })
    }   
    next();
}

module.exports = {
    validateJWT
}