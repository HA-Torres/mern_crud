/*utilizamos librerias previamente cargadas con npm, las cuales podemos ver en el archivo de configuracion package.json*/
const express = require('express');
const router = express.Router();
/*Se importa el modelo, el cual tiene el modelado de los datos que entraran a la base de datos echa en Mongo*/
const user_model = require('../models/user_model');

/*metodo get que dice q ira al servidor en ejecucion y hara un get, que traera todos los datos*/
router.get('/',async (req, resp)=>{

    const users = await user_model.find()
        .then(users => resp.json({
            response: users,
            status: true,
            msj: 'get users true'
        }))
        .catch(err => resp.status(400).json('Error ' + err));
});

/*metodo get que dice q ira al servidor en ejecucion y hara un get, solo obtiene los datos por id*/
router.get('/:id',async (req, resp)=>{

    const user = await user_model.findById(req.params.id)
        .then(user => resp.json({
            response: user,
            status: true,
            msj: 'get user by id'
        }))
        .catch(err => resp.status(400).json('Error ' + err))
});

/*metodo get que dice q ira al servidor en ejecucion y obtendra los datos por metodo post, y hara un insert a nuestra BD en Mongo*/
router.post('/', async (req, resp) => {
    const { name, last_name, username, email, password } = req.body;

    const obj = new user_model({name, last_name, username, email, password});

    await obj.save()
        .then(() => resp.json({
        status: true,
        msj: 'Value Saved'
    }))
        .catch(err => resp.status(400).json('Error ' + err))
});

/*metodo get que dice q ira al servidor en ejecucion y recivira un id por metodo put, y hara un update a nuestra BD en Mongo*/
router.put('/:id', async (req, resp) => {
    const { name, last_name, username, email} = req.body;
    const newName = { name, last_name, username, email };

    await user_model.findByIdAndUpdate(req.params.id, newName)
        .then(()=> resp.json({
            status: true,
            msj : 'Usuario Actualizado'
        }))
        .catch(err => resp.status(400).json('Error ' + err));
});

/*metodo get que dice q ira al servidor en ejecucion y recivira un id por metodo delete, y eliminara el valor correspondiente en la BD*/
router.delete('/:id', async (req, resp) => {
    await nombre.findByIdAndRemove(req.params.id)
        .then(resp.json({
            status : true,
            msj : 'Usuario Eliminado'
        }))
        .catch(err => resp.status(400).json('Erros ' + err));
});

module.exports = router;