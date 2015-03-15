/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /votos              ->  index
 * POST    /votos              ->  create
 * GET     /votos/:id          ->  show
 * PUT     /votos/:id          ->  update
 * DELETE  /votos/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Voto = require('./voto.model');

// Get list of votos
exports.index = function(req, res) {
  Voto.find(function (err, votos) {
    if(err) { return handleError(res, err); }
    return res.json(200, votos);
  });
};

// Get a single voto
exports.show = function(req, res) {
  Voto.findById(req.params.id, function (err, voto) {
    if(err) { return handleError(res, err); }
    if(!voto) { return res.send(404); }
    return res.json(voto);
  });
};

// Creates a new voto in the DB.
exports.create = function(req, res) {
  Voto.create(req.body, function(err, voto) {
    if(err) { return handleError(res, err); }
    return res.json(201, voto);
  });
};

// Updates an existing voto in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Voto.findById(req.params.id, function (err, voto) {
    if (err) { return handleError(res, err); }
    if(!voto) { return res.send(404); }
    var updated = _.merge(voto, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, voto);
    });
  });
};

// Deletes a voto from the DB.
exports.destroy = function(req, res) {
  Voto.findById(req.params.id, function (err, voto) {
    if(err) { return handleError(res, err); }
    if(!voto) { return res.send(404); }
    voto.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}