const config = require('config')
const glue = require('glue')
const corsHeaders = require('hapi-cors-headers')
const MongoClient = require('mongodb').MongoClient

const manifest = {
  server: {
    debug: {
      log: ['error']
    }
  },
  connections: [
    {
      port: 8000,
      routes: {
        timeout: {
          server: 30000
        }
      },
      labels: [
        'proxy-server',
        'http'
      ]
    }
  ],
  registrations: [
    {
      plugin: {
        register: 'blipp',
        options: {}
      }
    },
    {
      plugin: {
        register: 'good',
        options: {
          ops: {
            interval: 3000
          },
          reporters: {
            console: [
              {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ log: '*', response: '*', error: '*'}]
              }, {
                module: 'good-console'
              },
              'stdout'
            ]
          }
        }
      }
    },
    {
      'plugin': {
        'register': './lib',
        'options': {}
      }
    }
  ]
}

if (require.main === module) {
  glue.compose(manifest, { relativeTo: __dirname }, (err, server) => {
    if (err) {
      return console.log(err)
    }

    server.ext('onPreResponse', corsHeaders)


    MongoClient.connect(config.Database.spectreUrl, function(err, spectreDb) {
      if(err) {
        server.log("HPS can't connect to Spectre Database: ", err);
        process.exit(0);
        return;
      }
      MongoClient.connect(config.Database.penstationUrl, function(err, penstationDb) {
        if(err) {
          server.log("HPS can't connect to Penstation Database: ", err);
          process.exit(0);
          return;
        }
        server.decorate('server', 'getMongoSpectre', function () { //Making MongoDB Connection accessible to the entire application
          return spectreDb;
        });
        server.decorate('server', 'getMongoPenstation', function () { //Making MongoDB Connection accessible to the entire application
          return penstationDb;
        });
        server.route({
          path: '/status',
          method: 'GET',
          config: {
            description: 'Provides health status of running server',
            auth: false,
            cache: false
          },
          handler: function(request, reply) {
            return reply({'status': 'Checked'})
          }
        })
        server.start( (err) => {
          if (err) {
            console.error(err)
            server.log('error', `Can\'t start ${config.HamiltonProxy.name}`)
            throw err
          }
          console.log(`${config.HamiltonProxy.name} server url : ${server.info.uri}`   )
          console.log(`${config.HamiltonProxy.name} points to  : ${config.spectre.url}`)
          console.log(`${config.HamiltonProxy.name} environment: ${config.Environment}`)
          console.log("MongoDb connection established successfully \n ")
        })
      })
    })

    process.on('SIGINT', function () {
      console.log('\n\nClosing MongoDb Connections ...')
      server.getMongoSpectre().close();
      server.getMongoPenstation().close();
      console.log('MongoDb connections killed successfully\n')
      console.log('Stopping HPS server ...')
      server.stop({ timeout: 10000 }).then(function (err) {
        console.log('CONAN server stopped successfully\n')
        process.exit((err) ? 1 : 0)
      })
    })
  })
}

module.exports = {
  manifest: manifest
}
