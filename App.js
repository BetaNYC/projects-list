'use strict';

// App specific styles
require('./app.less');

// Global libraries
var React = require('react/addons');
var { PropTypes } = React;
window.Zepto = window.$ = require('zeptojs');
require('lib/fittext?this=window');

// Components
var NavBarComponent = require('./components/NavBarComponent');
var HomePage = require('pages/HomePage');
var DocumentTitle = require('react-document-title');
var { RouteHandler } = require('react-router');
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');


var App;
module.exports = App = React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  render() {
    var {router} = this.context;
    var name = router.getCurrentPath();

    let transitionName='fade';
    // if(router.isActive('projectPage')){
    //   transitionName='moveUp';
    // }

    return (
      <DocumentTitle title='BetaNYC Projects - Building a better tomorrow'>
        <div className='App'>
          <NavBarComponent/>

          <TransitionGroup component="div" transitionName={transitionName} className='App'>
            <RouteHandler {...this.props} key={name} />
          </TransitionGroup>


        </div>
      </DocumentTitle>
    );
  }
});

