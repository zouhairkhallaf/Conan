'use strict'

const Spectre = require('./spectre')
const Penstation = require('./penstation')
const routes = require('./routes')


function register (server, config, next) {
  server.route(routes)
  next()
}

register.attributes = {
  name: 'hps'
}

module.exports = {
  register: register,
  Spectre: Spectre,
  Penstation: Penstation
}
