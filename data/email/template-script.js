'use strict'

const handlebars = require('handlebars')
const config = require('config')

var templateScript = {
  "key": config.mandrill.key,
  "name": config.mandrill.templates.oneToManyError,
  "from_email": config.mandrill.fromEmail,
  "from_name": config.mandrill.fromName,
  "subject": "HPS Bulk Order Error",
  "code": "<div mc:edit=\"editable\"><ul><li>orderNumber: {{orderNumber}}</li><li>errorID: {{errorID}}</li><li>errorMessage: {{errorMessage}}</li></ul></div>"
}

exports.templateScript = templateScript
