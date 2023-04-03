const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');



// /new -> POST
const createUser = async(req, resp = response ) => {

    const { name, email, password } = req.body;
    
    try {

        let user = await User.findOne({ email: email });
        console.log(user);
        if( user ) {
            return resp.status(400).json({
                ok: false,
                msg: 'User already exists with that email'
            });
        }

        user = new User( req.body );

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        //guardar usuario con mongoose en mongoDB
        await user.save();

        //Generar JWT
        const token = await generateJWT( user._id, user.name );
    
        resp.status(201).json({
            ok: true,
            uid: user._id,
            name: user.name,
            token: token
            // name,
            // email,
            // password,
        });
        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Please contact the admin'
        })
    }
   
}

// / -> POST
const loginUser = async(req, resp = response ) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email: email });
        if( !user ) {
            return resp.status(400).json({
                ok: false,
                msg: 'User with that email does not exist'
            });
        }

        // confirmar los passwords encriptados
        const validPassword = bcrypt.compareSync( password, user.password );

        if( !validPassword ) {
            return resp.status(400).json({
                ok: false,
                msg: 'Password is incorrect'
            });
        }

        //Generar JWT
        const token = await generateJWT( user._id, user.name );

        resp.json({
            ok: true,
            uid: user._id,
            name: user.name,
            token
        });
        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Please talk to the admin'
        })
    }

    
}

// /renew -> GET
const revalidateToken = async(req, resp = response ) => {

    const { uid, name } = req;
    
    const token = await generateJWT( uid, name );

    resp.json({
        ok: true,
        uid,
        name,
        token
    })
}



module.exports = {
    createUser,
    loginUser,
    revalidateToken
}