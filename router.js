'use strict';

var { create: createRouter, HistoryLocation, HashLocation } = require('react-router'),
    routes = require('./routes');

var router = createRouter({
  location: HashLocation,
  routes: routes
});

module.exports = router;