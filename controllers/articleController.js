'use strict'

//Importem el validador
var validator = require('validator');
//Importem el model Article per crear objectes
var Article = require('../models/article');
const { param } = require('../routes/article');

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
        //Recogemos los parametros de la URL
        var params = req.params;
        //Miramos si tiene parametro opcional
        if(params.opcional){
            return res.status(200).send({
                mensaje: "Hola des de ArticleController metodo test con parametro opcional",
                opcional: params.opcional
            });
        }else{
            return res.status(200).send({
                mensaje: "Hola des de ArticleController metodo test"
            });
        }

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

        //Creem una query bàsica que retorna tota la llista
        var query = Article.find();

        //Mirem si rebem el paràmetre opcional last
        var last = req.params.last;

        //Si tenim el last o és diferent a undefined
        if(last || last!=undefined){
            query = query.limit(3);
        }

        //Executem la query modificada i que ens ordeni per ID
        query.sort('-date').exec((err,articles)=>{
            //Si error, retornem missatge d'error
            if(err){
                return res.status(400).send({
                    status: "Error",
                    mensaje: "Error al devolver los articulos"
                });
            }
            //Si no tenim articles a tornar tornem missatge
            if(!articles){
                return res.status(200).send({
                    status: "Success",
                    mensaje: "No hay articulos para mostrar"
                });
            }
            //Si tot està OK retornem els articles.
            return res.status(200).send({
                status:"Succes",
                articles
            });
        });
    },

    getArticle: function(req,res){
        //Recollir el id de la URL
        var id = req.params.id;
        //Comprovar que existeix i no es null o undefined
        if(id || id!=null){
            //Buscar l'article
            Article.findById(id, (err,articleTrobat)=>{
                //Si surt error al recuperar l'article
                if(err){
                    return res.status(500).send({
                        status: "Error",
                        mensaje: "Error al devolver los datos"
                    }); 
                }

                //Si no troba l'article retornem error 404
                if(!articleTrobat){
                    return res.status(404).send({
                        status: "Error",
                        mensaje: "Error no existe el articulo"
                    }); 
                }

                //Si tot va bé retornem l'article
                return res.status(200).send({
                    status: "Success",
                    articleTrobat
                }); 
            });
        }
        //Si no tenim id o és null
        else{
            return res.status(404).send({
                status: "Error",
                mensaje: "Error en la ruta"
            }); 
        }
    },

    update: (req,res) =>{

        //Recollir id del article a actualtizar que arriba per la URL
        console.log(req.params);
        var id = req.params.id;
        if(!id || id==undefined){
            return res.status(500).send({
                status:"Error",
                mensaje:"Error problemas al recibir el id"
            });
        }
        //Recollir les dades noves que arribaran en el body ja que serà una resposta de formulari
        var dades = req.body;
        //Validar les dades
        try {
            var validated_title = !validator.isEmpty(dades.title);
            var validated_content = !validator.isEmpty(dades.content);
        } catch (error) {
            return res.status(500).send({
                status:"Error",
                mensaje:"Error validando los datos"
            });
        }

        //Si tot es vàlid
        if(validated_title && validated_content){
            /*
            Fem ús del findOneAndUpdate
            Indiquem el id de l'objecte a buscar i actualitzar
            Les dades que volem actualitzar, en aquest cas son les que rebem per la request.body
            Posem que ens retorni l'article nou, no el vell
            La funció de Callback on rebem un err si hi ha i l'article actualtizat.
            */
            Article.findOneAndUpdate({_id:id},dades,{new:true},(err,articleUpdated)=>{
                //Si passa algun error tornem error
                if(err){
                    return res.status(500).send({
                        status:"Error",
                        mensaje:"Error validando los datos"
                    });
                }

                //Si tot va bé tornem l'objecte actualitzat
                return res.status(500).send({
                    status:"Success",
                    articleUpdated
                });
            });
            
        }

    },

    delete: (req,res)=>{
        //Recollir el id que ens arriba per la url
        var id = req.params.id;
        //Validar el id
        if(!id || id==undefined){
            return res.status(500).send({
                status:"Error",
                mensaje:"No se ha recibido ningún id"
            })
        }
        else{
            Article.findOneAndDelete({_id:id}, (err,articleRemoved)=>{
                //Si passa algun error tornem error
                if(err){
                    return res.status(500).send({
                        status:"Error",
                        mensaje:"Error validando los datos"
                    });
                }

                if(!articleRemoved){
                    return res.status(500).send({
                        status:"Error",
                        mensaje:"No se ha podido borrar el articulo"
                    });
                }

                //si no entra a cap if retornar article borrat
                return res.status(200).send({
                    status:"Success",
                    articleRemoved
                });

            });
        }
    }
};

module.exports = controller;