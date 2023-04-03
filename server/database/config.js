
const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
// url de conexión guardada en las varibles de entorno .env
       await mongoose.connect(process.env.DB_CONN);

        console.log('DB Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error when trying to initialize DB');
    }

}

module.exports = {
    dbConnection
}