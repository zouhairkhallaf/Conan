'use strict'

module.exports = [
  {
    path: '/spectre/{messageId}',
    method: 'GET',
    config: require('./spectre')
  }
]
