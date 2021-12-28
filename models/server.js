const express = require('express');
const cors = require('cors');


class Server {

    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.usuariosRouter = '/api/usuarios';

        //Middleware


        this.middleware();

        
        //Rutas

        this.routes();
    }

    middleware() {


        //CORS

        this.app.use( cors());
        // Directorio publico
        this.app.use(express.static('public'));

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


