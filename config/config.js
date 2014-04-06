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
    db: process.env.MONGOHQ_URI || ENV['MONGOHQ_URI'],
    root: rootPath,
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'BetaNYC Projects - Development'
    }
  },
  test: {
    db: 'mongodb://localhost/ngff-test',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'BetaNYC Projects - Test'
    }
  },
  production: {
    db: process.env.MONGOHQ_URI || ENV['MONGOHQ_URI'],
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'BetaNYC Projects'
    }
  }
}
