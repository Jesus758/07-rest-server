const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.usuariosRouter = '/api/usuarios';

        //Conectar con la base de datos
        this.ConectarDB();

        //Middleware
        this.middleware();
        
        //Rutas
        this.routes();
    }

    async ConectarDB() {
        await dbConnection();
    }

    middleware() {


        //CORS

        this.app.use( cors());
        // Directorio publico
        this.app.use(express.static('Public'));

        // lectura y parseo del Body
        this.app.use( express.json() );
    }
    
    
    routes() {

        this.app.use(this.usuariosRouter, require('../routes/usuarios'));
     
    }

    listen() {

        this.app.listen(this.PORT, () => {
            console.log('Servidor Corriendo en el puerto', this.PORT);
        });
        
    }
}


module.exports = Server;


