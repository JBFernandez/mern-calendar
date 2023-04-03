const jwt = require('jsonwebtoken');

                //  Payload del JWT  
const generateJWT = ( uid, name ) => {
    
    return new Promise( (resolve, reject) => {

        const payload = { uid, name };
// sign usa 4 argumentos el payload, una secret key aleatoria que creamos muy complicada, 
// signOptions p.e en cuanto tiempo expira y un callback que se dispara con un error
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {

            if( err ) {
                console.log(err);
                reject('The token could not be generated')
            }

            resolve( token )

        });

    })
}

module.exports = {
    generateJWT
}