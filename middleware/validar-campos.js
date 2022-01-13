//configuración de los campos. Middleware es una tercera función que se agrega cuando lasacciones pasas

const { validationResult } = require('express-validator');



const validarCampos = (req, res, next) => {

    const errors = validationResult(req);
    if ( !errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next(); 

}



module.exports = {
    validarCampos
}