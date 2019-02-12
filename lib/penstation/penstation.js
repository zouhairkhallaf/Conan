'use strict'

const Joi = require('joi')
const ObjectId = require('mongodb').ObjectID
const assert = require('assert');

const validate = {
  params: {
    messageId: Joi.string()
  }
}

function handler (request, reply) {
    var db = request.server.getMongoPenstation()
    db.collection('messages').aggregate([
      {   $match  : { "_id" : ObjectId(`${request.params.messageId}`)}},
      {   $project: { "expiresAt":0, "modifiedAt":0, "createdAt":0, "owner": 0 , "creator": 0}},
      {   $lookup : { from: "batches",
                      localField: "batchId",
                      foreignField: "_id",
                      as: "BATCH"}}
  ], function (err, results){
    if(err){
      return reply("ERROR: ", err)
    }
      assert.equal(err, null);
      return reply(null, results)
  })
}

module.exports = {
  description: 'Penstation Interface',
  validate: validate,
  handler: handler
}