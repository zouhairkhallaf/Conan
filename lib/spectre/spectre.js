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
    var db = request.server.getMongoSpectre()
    db.collection('messages').aggregate([
      {   $match  : { "_id" : ObjectId(`${request.params.messageId}`)}},
      {   $project: { "expiresAt":0, "modifiedAt":0, "createdAt":0, "owner": 0 , "creator": 0}},
      {   $lookup : { from: "orders",
                      localField: "order.id",
                      foreignField: "_id",
                      as: "ORDER"}},
      {   $lookup : { from: "drafts",
                      localField: "draft.id",
                      foreignField: "_id",
                      as: "DRAFT"}},
      {   $project: { "DRAFT.modifiedAt":0, "DRAFT.createdAt":0, "DRAFT.owner": 0 , "DRAFT.creator": 0, "DRAFT.__v": 0, "DRAFT.order": 0}},
      {   $lookup : { from: "products",
                      localField: "product.id",
                      foreignField: "_id",
                      as: "PRODUCT" }},
      {   $project: { "PRODUCT.modifiedAt":0, "PRODUCT.createdAt":0, "PRODUCT.tags": 0 , "PRODUCT.owner": 0, "PRODUCT.__v": 0, "PRODUCT.creator": 0}},
      {   $lookup : { from: "handwritingRenders",
                      localField: "DRAFT.handwritingRenders.envelope.front.id",
                      foreignField: "_id",
                      as: "ENVELOPE-RENDER"}},
      {   $project: { "ENVELOPE-RENDER.modifiedAt":0, "ENVELOPE-RENDER.createdAt":0, "ENVELOPE-RENDER.owner": 0 , "ENVELOPE-RENDER.creator": 0, "ENVELOPE-RENDER.__v": 0, "DRAFT.order": 0}},
      {   $lookup : { from: "handwritingRenders",
                      localField: "DRAFT.handwritingRenders.stationery.front.id",
                      foreignField: "_id",
                      as: "MESSAGE-RENDER"}},
      {   $project: { "MESSAGE-RENDER.modifiedAt":0, "MESSAGE-RENDER.createdAt":0, "MESSAGE-RENDER.owner": 0 , "MESSAGE-RENDER.creator": 0, "MESSAGE-RENDER.__v": 0}},
      {   $lookup : { from: "components",
                      localField: "DRAFT.envelope.id",
                      foreignField: "_id",
                      as: "ENVELOPE"}},
      {   $project: { "ENVELOPE.modifiedAt":0, "ENVELOPE.createdAt":0, "ENVELOPE.owner": 0 , "ENVELOPE.creator": 0, "ENVELOPE.__v": 0}},
      {   $lookup : { from: "components",
                      localField: "ENVELOPE.seal.id",
                      foreignField: "_id",
                      as: "SEAL"}},
      {   $project: { "SEAL.modifiedAt":0, "SEAL.createdAt":0, "SEAL.owner": 0 , "SEAL.creator": 0, "SEAL.__v": 0}},
      {   $lookup : { from: "components",
                      localField: "ENVELOPE.stamp.id",
                      foreignField: "_id",
                      as: "STAMP"}},
      {   $project: { "STAMP.modifiedAt":0, "STAMP.createdAt":0, "STAMP.owner": 0 , "STAMP.creator": 0, "STAMP.__v": 0}},
      {   $lookup : { from: "components",
                      localField: "ENVELOPE.design.id",
                      foreignField: "_id",
                      as: "DESIGN"}},
      {   $project: { "DESIGN.modifiedAt":0, "DESIGN.createdAt":0, "DESIGN.owner": 0 , "DESIGN.creator": 0, "DESIGN.__v": 0}},
      {   $lookup : { from: "components",
                      localField: "ENVELOPE.paper.id",
                      foreignField: "_id",
                      as: "PAPER"}},
      {   $project: { "PAPER.modifiedAt":0, "PAPER.createdAt":0, "PAPER.owner": 0 , "PAPER.creator": 0, "PAPER.__v": 0}},
      {   $lookup : { from: "designRenders",
                      localField: "ENVELOPE.designRender.id",
                      foreignField: "_id",
                      as: "DESIGN-RENDER"}},
      {   $project: { "DESIGN-RENDER.modifiedAt":0, "DESIGN-RENDER.createdAt":0, "DESIGN-RENDER.owner": 0 , "DESIGN-RENDER.creator": 0, "DESIGN-RENDER.__v": 0, "DESIGN-RENDER.design": 0}},
      {   $lookup : { from: "tags",
                      localField: "ENVELOPE.tags.id",
                      foreignField: "_id",
                      as: "TAG"}},
      {   $project: { "TAG.modifiedAt":0, "TAG.createdAt":0, "TAG.owner": 0 , "TAG.creator": 0, "TAG.__v": 0}},
      {   $lookup : { from: "components",
                      localField: "DRAFT.stationery.id",
                      foreignField: "_id",
                      as: "STATIONERY"}},
      {   $project: { "STATIONERY.modifiedAt":0, "STATIONERY.createdAt":0, "STATIONERY.owner": 0 , "STATIONERY.creator": 0, "STATIONERY.__v": 0}},
      {   $lookup : { from: "contactMethods",
                      localField: "DRAFT.senderAddress.id",
                      foreignField: "_id",
                      as: "SENDER-ADDRESS"}},
      {   $project: { "SENDER-ADDRESS.modifiedAt":0, "SENDER-ADDRESS.createdAt":0, "SENDER-ADDRESS.owner": 0 , "SENDER-ADDRESS.creator": 0, "SENDER-ADDRESS.__v": 0, "SENDER-ADDRESS.contact": 0}},
      {   $lookup : { from: "contactMethods",
                      localField: "DRAFT.recipientAddress.id",
                      foreignField: "_id",
                      as: "RECIPIENT-ADDRESS"}},
      {   $project: { "RECIPIENT-ADDRESS.modifiedAt":0, "RECIPIENT-ADDRESS.createdAt":0, "RECIPIENT-ADDRESS.owner": 0 , "RECIPIENT-ADDRESS.creator": 0, "RECIPIENT-ADDRESS.__v": 0, "RECIPIENT-ADDRESS.contact": 0}},
      {   $lookup : { from: "handwritingStyles",
                      localField: "ENVELOPE-RENDER.handwritingStyle.id",
                      foreignField: "_id",
                      as: "HANDWRITING-STYLE"}},
      {   $project: { "HANDWRITING-STYLE.modifiedAt":0, "HANDWRITING-STYLE.createdAt":0, "HANDWRITING-STYLE.owner": 0 , "HANDWRITING-STYLE.creator": 0, "HANDWRITING-STYLE.__v": 0}},
      {   $project: { "draft":0,"invoice":0,"product":0,"ENVELOPE-RENDER.handwritingStyle":0,"ENVELOPE-RENDER.textRegions._id":0, "MESSAGE-RENDER.handwritingStyle":0,"MESSAGE-RENDER.textRegions._id":0,"MESSAGE-RENDER.textRegions.messageUnicodeMap":0,"ENVELOPE-RENDER.textRegions.messageUnicodeMap":0 ,"STATIONERY.designRender" : 0, "STATIONERY.design":0, "STATIONERY.paper":0, "STATIONERY.tags":0, "DESIGN.tags": 0, "STAMP.tags": 0, "SEAL.tags": 0, "ENVELOPE.tags": 0, "ENVELOPE.paper":0, "ENVELOPE.design":0, "ENVELOPE.designRender":0, "ENVELOPE.stamp":0, "ENVELOPE.seal":0}},
      {   $lookup : { from: "hpsImports",
                      localField: "order.id",
                      foreignField: "_id",
                      as: "HPS-IMPORTS"}},
      {   $lookup : { from: "cpsImports",
                      localField: "order.id",
                      foreignField: "_id",
                      as: "CPS-IMPORTS"}}
  ], function (err, results){
    if(err){
      return reply("ERROR: ", err)
    }
      assert.equal(err, null);
      return reply(null, results)
  })
}

module.exports = {
  description: 'Spectre Interface',
  validate: validate,
  handler: handler
}