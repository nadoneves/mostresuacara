'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VotoSchema = new Schema({
  id_votado: Number
});

module.exports = mongoose.model('Voto', VotoSchema);