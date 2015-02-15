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
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-nav">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="http://betanyc.us/">
                  <img src='http://betanyc.us/images/betanyc_white_sm.png' height='99%'/>
                </a>
              </div>
              <div className='collapse navbar-collapse' id='main-nav'>
                <ul className='navbar-nav nav'>
                  <li><a href='http://meetup.com/betanyc' target="_blank" >Events</a></li>
                  <li><a href='http://talk.beta.nyc'>Discussion Groups</a></li>
                  <li className='active'><a href='/'>Projects</a></li>
                  <li><a href='http://data.beta.nyc'>Community Data</a></li>
                </ul>
              </div>
            </div>
          </div>
        </header>
        <div className='jumbotron'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-8'>
                <h1>
                  Civic Tech
                </h1>
                <p>
                  Simply add a <a href="https://github.com/BetaNYC/civic.json">civic.json</a> file to your Github repo to add your project to this list.
                </p>
                <p  >
                  Want to help out? Check out the projects below.
                </p>

              </div>
              <div className='col-lg-4 text-center'>
                <img src={require('./city.svg')} style={{width:280,marginTop:30}}/>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-8'>
              <div className='input-group'>
                <input type='search' className='form-control input-lg' placeholder='Search' name='q' />
                <div className='input-group-addon'>
                  <a className='btn '>
                    <span className='fa fa-search'/>
                  </a>
                </div>
              </div>
              <div className='' style={{padding: '15px 0 0', border: 'none'}}>
                <b className='text-muted'>Filters </b>
                <a className='label label-warning'>
                  Help wanted <span className='fa fa-times'/>
                </a>
              </div>
            </div>
            <div className='col-lg-4 text-center'>
              <small style={{margin:'10px 0 0 0', paddingBottom:6,borderBottom: 'solid 1px #ccc', display: 'block'}}>
                a <a href='http://beta.nyc'><img src = "https://cloud.githubusercontent.com/assets/94735/6129864/4562ab74-b10f-11e4-83bf-2cc54a1e102c.png"  style={{margin: '0 -7px 0 -7px', maxWidth: 30}}/>etaNYC</a> project
              </small>
            </div>
          </div>

          <RepoList/>

        </div>
      </div>
    );
  }
});

module.exports = App;