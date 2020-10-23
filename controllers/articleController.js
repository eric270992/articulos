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
                status: "Error",
                mensaje:"Datos incorrectos o faltan datos durante la validacion"
            });
        }

        if(validate_title && validate_content){

            //Crear el objeto a guardar
            var article = new Article();

            //Assignar valores al objeto
            article.title = params.title;
            article.content = params.content;
            article.image = null;

            //Guardar el objeto(articulo) utilizamos el metodo save que es proprocionado por Schema de Mongoose
            article.save((err,articleStored) => {

                //Si hay error o no hay articulo a guardar
                if(err || !articleStored){
                    return res.status(400).send({
                        status:"Error",
                        mensaje: "Articulo no guardado"
                    })
                }

                //Devolver una respuesta cuando se ha guardado
                return res.status(200).send({
                    status: "Success",
                    article: articleStored
                });

            });

        }
    },

    list: function(req,res){
        //Recuperar los articulos
        Article.find().exec((err,articles)=>{
            if(err){
                return res.status(400).send({
                    status: "Error",
                    mensaje: "Error al devolver los articulos"
                });
            }
            if(!articles){
                return res.status(200).send({
                    status: "Success",
                    mensaje: "No hay articulos para mostrar"
                });
            }
            return res.status(200).send({
                status:"Succes",
                articles
            });
        });
    }
};

module.exports = controller;