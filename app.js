'use strict'

//Cargar modulos de node para el servidor
    //Carreguem express
var express = require('express');
    //Body parser per convertir les peticions a JSON
var bodyParser = require('body-parser');
const { json } = require('body-parser');

//Ejectuar express (http)
    //Carreguem express dins una variable
var app = express();
//Cargar ficheros rutas
var articleRoutes = require('./routes/article');
//Middlewares (quelcom que s'executa abns de resoldre la ruta)
    //Carreguem el bodyParser a express
app.use(bodyParser.urlencoded({extended:false}));
    //Convertim les peticions a JSON
app.use(bodyParser.json());

//CORS
 
//Añadir prefijos a rutas / Cargar rutas
    //Indiquem que ens carregui el fitxer de rutes i quines rutes a de carregar
app.use('/api',articleRoutes);

//Rutas per el API REST de TEST, després les posem al Controller les bones
app.get('/test',(request,response)=>{
    let jsonTest = {
        name:"App Node Express",
        ruta:"/test",
        status:"200"
    }
    //Retornar status OK i una plantilla HTML
    return response.status(200).send(jsonTest);
});

app.post('/saludar',(request,response)=>{
    //Agafem el paramatre mensaje del body que ens envien amb el request
    var mensaje = request.body.mensaje;

    //Tornem com a resposta el mensaje
    return response.status(200).send({
        respuesta: mensaje
    });
});

//Exportar el modulo que es el fichero actual para poderlo ejecutar donde queramos
    /*
    Exportem la nostre variable app per poder-la fer servir
    que és el servei/variable express carregada i configurada.
    */
module.exports = app;