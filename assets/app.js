'use strict';
// require('./app.less')
require('font-awesome-webpack')

var React = require('react');

var App = React.createClass({
  render() {
    return (
      <div>
        <header className='navbar navbar-default navbar-static navbar-top'>
          <div className='container-fluid'>
            <div className='container'>
              <ul className='navbar-nav nav'>
                <li><a href='http://meetup.com/betanyc' target="_blank" >Events</a></li>
                <li><a href='/' >Discussion Groups</a></li>
                <li><a href='/' target="_blank" className='active'>Project</a></li>
                <li><a href='http://data.beta.nyc' target="_blank" >Community Data</a></li>
              </ul>
            </div>
          </div>
        </header>
        <div className='container'>
          <div id= "headerText" className='clearfix'>
            <img src = "https://cloud.githubusercontent.com/assets/94735/6129864/4562ab74-b10f-11e4-83bf-2cc54a1e102c.png" width="100" className='pull-left' style={{marginTop: 8}}/>
            <div className='pull-left'>
              <h2>BetaNYC Project List</h2>
              <p>
                Civic Tech Projects Currently being developed by the NYC civic tech community.
              </p>
              <p>
                Working on a civic tech project? Add a <a href="https://github.com/BetaNYC/civic.json">civic.json</a> file to your project and email <strong>projects@betaNYC.us</strong> with your project Github URL
              </p>
            </div>
          </div>
          <hr/>
          <div className='row'>
            <div className='col-lg-4'>
            </div>
            <div className='col-lg-4'>
            </div>
            <div className='col-lg-4'>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;