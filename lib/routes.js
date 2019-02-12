'use strict'

const _ = require('lodash')
const Spectre = require('./spectre')
const Penstation = require('./penstation')

module.exports = _.flatten([
  Spectre.routes,
  Penstation.routes
])
