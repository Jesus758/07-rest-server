const Role = require('../models/Role');
const Usuario = require('../models/usuario');


 const esRoleValido = async (rol = '') => {

    const existeRol = await Role.findOne( { rol } );
    console.log(existeRol);
    
    if ( !existeRol ) {
        throw new Error(`El rol ${rol} no está registrado en la base de datos`);
    }
}

const emailExiste = async (correo ='uno@dos.com') => {

    const existeEmail = await Usuario.findOne( { correo });
    if ( existeEmail ) {
        throw new Error(`El rol ${correo} ya se encuentra registrado en la BD`);
        }};

const existeUsuarioporId = async (id) => {

            const existeUsuarioporId = await Usuario.findById(id);
            if ( !existeUsuarioporId ) {
                throw new Error(`El usuario con id ${id} no existe en la base de datos`);
                }}
        





module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioporId
}