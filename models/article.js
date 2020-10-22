'use strict'

var mongoose = require('mongoose');

//Variable que ens servirà per definir models
var Schema = mongoose.Schema;

//definim el model Article
var ArticleSchema = Schema({
    title: String,
    content: String,
    /*
        Data que indiquem que serà de tipis Date però que per defecte
        agafi el valor de date.now
    */
    date:{ type:Date, default:Date.now},
    //Guardara la ruta(path) fins la imatge
    image:String
});

/*
    Generem el model amb mongoose.model('NomModelQueVolem',SchemaQueElDefiniex)
    Exportem el model amb module.exports.
*/
module.exports = mongoose.model('Article',ArticleSchema);