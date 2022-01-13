// Los controladores tienen la función de definir las acciones que se van a realziar en cada endpoint que se carge dentro de cada página.
const { check } = require('express-validator');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { emailExiste } = require('../helpers/db-validators');


const usuariosGet = async (req, res = response ) => {

  //const { q, nombre = "No name", apikey, page = 1, limit } = req.query;
  
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true}
  
  //const total = await Usuario.countDocuments(query);
  //const usuarios = await Usuario.find( query )
   // .limit(limite)
  //.skip(desde)

  const [total, usuarios ] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find( query )
        .limit(limite)
        .skip(desde)
  ])

    res.json({
      total,
      usuarios
  })
};

const usuariosPost = async (req, res = response ) => {
    
  //aqui estaba la matriz de los errores. Ahora esta como un middleware independiente
  
    const { nombre, correo, password, rol } = req.body;
    //console.log(rol);
    const usuario = new Usuario( {nombre, correo, password, rol} );
    //console.log(rol);    

    // Verificar si el correo existe
    //check('correo').custom( emailExiste );
    //const existeEmail = await Usuario.findOne( {correo });
    //if ( existeEmail ) {
      //return res.status(400).json({
       // msg: "Ese correo ya está registrado"
      //})}
 
    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //Guardar en BD
    await usuario.save();
    
    res.json({
        msg: 'post API - Controlador',
        usuario
  })
}

  const usuariosPut = async (req, res = response ) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    //Se desestructura lo que no se quiere modificar

    // TODO validar contra base de datos
    if ( password ) {
      const salt = bcrypt.genSaltSync();
      resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id , resto );

   res.status(201).json(usuario); 
  };

 const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API - Controlador'
  })}

const usuariosDelete =  async (req, res = response) => {
    
  const { id } = req.params;

  //Borrado fisicamente

  //const usuario = await Usuario.findByIdAndDelete( id );

  // Actualización de estado para false.
  const usuario = await Usuario.findByIdAndUpdate( id, {estado : false })


    res.json({
     usuario
  })}



  module.exports = {

    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete 
  
  }