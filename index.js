'use strict'

//Carreguem mongoose per getionar la BD
var mongoose = require('mongoose');

//Importem express que hem declarat a app.js
var app = require('./app');
//Port que farem servir
var port = 3900;

/*
    Cridem el mètode connect, que té dos paràmetres
    la URL de connexió i les opcions.
    Això torna una promise, amb then idiquem
    que si es connecta execturi quelcom, en aquest cas una 
    funció de callback
    mongoose.set('useFindAndModify',false) desactiva els mètodes vells
    mongoose.Promise estableix el ús normal de Promises

    URL: url del servidor/nomBD si no existeix la BD la crea
    options: newUrlParser:true indica que farem servir les opcions noves de mongoose.
*/
mongoose.set('useFindAndModify',false);
mongoose.Promise = global.Promise;
var url = "mongodb://localhost:27017/api_rest_blog";
var options = {
    useNewUrlParser: true
}
mongoose.connect(url,options).then(
    //Funció que exectuem si connect.
    ()=>{
        //codi funció
        console.log("La connexion a la base de datos se ha realizdo correctamente!");

        //Crear servidor i escoltar peticions http
        app.listen(port, () => {
            console.log("Servidor iniciado http://localhost:"+port);
        });

    }
);