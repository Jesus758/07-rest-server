const mongoose = require('mongoose');


const dbConnection = async() =>  {

    try {

        mongoose.connect( process.env.MONGODB_ATLAS, { serverSelectionTimeoutMS: 5000 }, (err, res) => {
 
            if (err) throw err;             
            console.log('Base de Datos ONLINE');
        });
        


    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');


    }




}


module.exports = {
    dbConnection
}
