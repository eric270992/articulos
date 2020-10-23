'use strict'

//Importem express per fer rutes
var express = require('express');
//Importem el controlador per cridrar els mètodes
var articleController = require('../controllers/articleController');

//Definim el router de express
var router = express.Router();

//Definim les rutes i el mètode que criden del controlador
    //Rutes Test
router.post('/datos-curso', articleController.datosCurso);
router.get('/test-controlador-article/:opcional?', articleController.test);
    //Rutes Utils
router.post('/save',articleController.save);
router.get('/articles/:last?',articleController.list);

//Exportem el router
module.exports = router;