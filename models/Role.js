const { Schema, model } = require('mongoose');

const RoleSchema = Schema( {

    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});


module.exports = model( 'Rol', RoleSchema);

//La colección de mongo está definida en la función MOdel.