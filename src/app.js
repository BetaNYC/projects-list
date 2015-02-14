'use strict';

require('./app.less');
require('font-awesome-webpack');

var React = require('react');
var RepoList = require('./RepoList.js');

var App = React.createClass({
  render() {
    return (
      <div>
        <header className='navbar navbar-default navbar-inverse navbar-static navbar-top' style={{marginBottom:0}}>
          <div className='container-fluid'>
            <div className='container'>
              <ul className='navbar-nav nav'>
                <li><a href='http://meetup.com/betanyc' target="_blank" >Events</a></li>
                <li><a href='http://talk.beta.nyc' >Discussion Groups</a></li>
                <li className='active'><a href='/' target="_blank">Projects</a></li>
                <li><a href='http://data.beta.nyc' target="_blank" >Community Data</a></li>
              </ul>
            </div>
          </div>
        </header>
        <div className='jumbotron'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-3'>
                <img src = "https://cloud.githubusercontent.com/assets/94735/6129864/4562ab74-b10f-11e4-83bf-2cc54a1e102c.png"  style={{marginTop: -15}} className='img-responsive' />
              </div>
              <div className='col-lg-9'>
                <h2>BetaNYC Project List</h2>
                <p>
                  Civic Tech Projects Currently being developed by the NYC civic tech community.
                </p>
                <p>
                  Would you like to list your civic tech project on this site? Simply add a <a href="https://github.com/BetaNYC/civic.json">civic.json</a> file to your Github project.
                </p>
                <p>
                  Want to help out to a civic project? Check out the projects below.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>

          <RepoList/>
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