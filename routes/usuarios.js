const { Router } = require('express');
const { check } = require('express-validator');
const Rol = require('../models/Role');
const { esRoleValido, emailExiste, existeUsuarioporId } = require('../helpers/db-validators');

const { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');

const { validarCampos } = require('../middleware/validar-campos');


const router = Router();

router.get('/', usuariosGet);


router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id'). custom( existeUsuarioporId),
    check('rol').custom( esRoleValido ),
    validarCampos
],usuariosPut);
//Cuando se instala em Express-validation, es posible hacer validaciones con la forma de Middlewares. El sgundo argumento de routes, son los middlewares, en el caso que no sea necesario usar middlewares, se puede usar el controlador como segundo argumento

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    check('password', 'El password es obligatorio y mas de 6 letras').isLength( {min: 6}),
    //check('rol', 'Es necesario que defina un rol').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos
    ], usuariosPost);

router.patch('/', usuariosPatch)

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id'). custom( existeUsuarioporId),
    validarCampos
] , usuariosDelete);



module.exports = router;