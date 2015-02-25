var React = require('react/addons');
var NavBarComponent;
module.exports = NavBarComponent = React.createClass({
  render: function() {
    return <header className='navbar navbar-default navbar-inverse navbar-static navbar-top' style={{marginBottom:0}}>
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
  }
});

