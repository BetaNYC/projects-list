var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var express = require('express');
var pg = require('pg');
var conString = process.env.DATABASE_URL || 'postgres://postgres:@localhost:5432/idnyc';


var Service = sequelize.define('Service',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        created_at: {
          type: DataTypes.DATE
        },
        updated_at: {
          type: DataTypes.DATE
        }
      })
  , Site = sequelize.define('Site',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      created_at: {
        type: DataTypes.DATE
      },
      updated_at: {
        type: DataTypes.DATE
      }
    })
  , Slot = sequelize.define('Slot',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        created_at: {
          type: DataTypes.DATE
        },
        updated_at: {
          type: DataTypes.DATE
        }
      });


Service.hasMany(Site)
Site.hasMany(Service)

sequelize
  .sync({ force: true })
  .complete(function(err) {
    // Even if we didn't define any foreign key or something else,
    // Sequelize will create a table ServiceSites.
  })



if(process.env.NODE_ENV === 'production'){

}else{
  var server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true
    // // webpack-dev-server options
    // contentBase: "/assets",
    // webpack-dev-middleware options
    // , quiet: false,
    // noInfo: false,
    // watchDelay: 300,
    , headers: { "X-Custom-Header": "yes" }
    , stats: { colors: true }

  });

  server.listen(3000, 'localhost', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Listening at localhost:3000');
  });
}

// API server
var api = express();

api.get('/appointments',function(req,res) {
  console.log(req.query);


  // TODO: default case is to return the available slots at all locations starting from today.




  res.status(200).send({type: 'success', message: 'hey.'});
});


api.listen(process.env.API_PORT || 3001, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }


  console.log('Listening at localhost:3001');
});
