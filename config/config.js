
var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , templatePath = path.normalize(__dirname + '/../app/mailer/templates')
  , notifier = {
      APN: false,
      email: false, // true
      actions: ['comment'],
      tplPath: templatePath,
      postmarkKey: 'POSTMARK_KEY',
      parseAppId: 'PARSE_APP_ID',
      parseApiKey: 'PARSE_MASTER_KEY'
    }

module.exports = {
  development: {
    db: 'mongodb://localhost/ngff-dev',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'ngProjects - Development'
    }
  },
  test: {
    db: 'mongodb://localhost/ngff-test',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'ngProjects - Test'
    }
  },
  production: {
    db: 'mongodb://mainadmin:password123@alex.mongohq.com:10058/app21233314',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'ngProjects - Production'
    }
  }
}
