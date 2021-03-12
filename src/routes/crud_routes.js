/*utilizamos librerias previamente cargadas con npm, las cuales podemos ver en el archivo de configuracion package.json*/
const express = require('express');
const router = express.Router();
/*Se importa el modelo, el cual tiene el modelado de los datos que entraran a la base de datos echa en Mongo*/
const nombre = require('../models/crud_model');

/*metodo get que dice q ira al servidor en ejecucion y hara un get, que traera todos los datos*/
router.get('/',async (req, resp)=>{

    const name = await nombre.find();

    resp.json({
        response: name,
        status: true,
        msj: 'data'
    });
});

/*metodo get que dice q ira al servidor en ejecucion y hara un get, solo obtiene los datos por id*/
router.get('/:id',async (req, resp)=>{

    const name = await nombre.findById(req.params.id);

    resp.json({
        response: name,
        status: true,
        msj: 'data by id'
    });
});

/*metodo post hara un insert a nuestra BD en Mongo*/
router.post('/', async (req, resp) => {
    const { name, apellido } = req.body;

    const obj = new nombre({name,apellido});
    await obj.save();
    resp.json({
        msj: 'Valor Guardado',
        status: true
    });
});

/*metodo get que dice q ira al servidor en ejecucion y recivira un id por metodo put, y hara un update a nuestra BD en Mongo*/
router.put('/:id', async (req, resp) => {
    const { name, apellido } = req.body;
    const newName = { name, apellido };

    await nombre.findByIdAndUpdate(req.params.id, newName);

    resp.json({
        msj: 'Actualizado',
        status: true
    });

});

/*metodo get que dice q ira al servidor en ejecucion y recivira un id por metodo delete, y eliminara el valor correspondiente en la BD*/
router.delete('/:id', async (req, resp) => {
    await nombre.findByIdAndRemove(req.params.id);

    resp.json({
        msj: 'Eliminado',
        status: true
    });
});

module.exports = router;