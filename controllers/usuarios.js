// Los controladores tienen la función de definir las acciones que se van a realziar en cada endpoint que se carge dentro de cada página.



const { response } = require('express');




const usuariosGet = (req, res = response ) => {
    res.json({
        msg: 'get API - Controlador'
  })}



  const usuariosPost = (req, res = response ) => {
    
    const body = req.body;

    
    res.json({
        msg: 'put API - Controlador',
        body
  })}

  const usuariosPut = (req, res = response ) => {

    const id = req.params.id;

    res.status(201).json({
        msg: 'put API - Controlador',
        id
  })};

 const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API - Controlador'
  })}

const usuariosDelete =  (req, res = response) => {
    res.json({
        msg: 'delete API - controlador'
  })}



  module.exports = {

    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete


  }