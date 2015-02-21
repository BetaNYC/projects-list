'use strict';

var { create: createRouter, HistoryLocation, HashLocation } = require('react-router'),
    routes = require('./routes');

var router = createRouter({
  location: __PRERELEASE__ ? HashLocation : HistoryLocation,
  routes: routes
});

module.exports = router;