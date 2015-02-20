'use strict';

// App specific styles
require('./app.less');


var React = require('react'),
    NavBarComponent = require('./components/NavBarComponent'),
    HomePage = require('pages/HomePage'),
    DocumentTitle = require('react-document-title'),
    { RouteHandler } = require('react-router'),
    { PropTypes } = React;

var App = React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  },

  render() {
    return (
      <DocumentTitle title='BetaNYC Projects - Building a better tomorrow'>
        <div className='App'>
          <NavBarComponent/>
          <RouteHandler {...this.props} />
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = App;