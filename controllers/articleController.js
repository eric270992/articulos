'use strict'

//Importem el validador
var validator = require('validator');
//Importem el model Article per crear objectes
var Article = require('../models/article');

var controller = {
    //Rutas Test
    datosCurso:(req,res) =>{
        var mensaje = req.body.mensaje;
         return res.status(200).send({
             curso:'Master frameworks JS',
             autor:'Eric',
             url:'miweb.com',
             mensaje
         });
    },

    test: function(req,res){
        return res.status(200).send({
            mensaje: "Hola des de ArticleController metodo test"
        });
    },

    //Rutas Utiles
    save: function(req,res){
        //Recoger parametros por post
        var params = req.body;

        //Variables d'elements a validar
        var validate_title=false;
        var validate_content=false;

        //Validar datos (validator)
        try {
            //Mirem que no estigui buit el parametre title 
             validate_title= !validator.isEmpty(params.title);
            //Mirem que no estigui buit el parametre content
             validate_content = !validator.isEmpty(params.content);
            
        } catch (error) {
            return res.status(200).send({
                mensaje:"Datos incorrectos o faltan datos"
            });
        }

        if(validate_title && validate_content){

            //Crear el objeto a guardar

            //Assignar valores al objeto

            //Guardar el objeto(articulo)

            //Devolver una respuesta
            return res.status(200).send({
                mensaje: "Soy la funcion save de articleController"
            });

        }
        //Si no retornem un missatge d'error
        else{
            return res.status(400).send({
                mensaje:"Datos incorrectos"
            });
        }

    }
};

module.exports = controller;