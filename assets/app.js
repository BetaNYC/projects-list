'use strict';
require('./app.scss')
require('font-awesome-webpack')

var React = require('react');

var ServiceSelector = React.createClass({
  render(){
    return (
      <div className='form-group'>
        <div className='col-lg-12'>
          <label>Please select a service</label>
          <select className='form-control'>
            <option>New Applicant</option>
            <option>New Applicant with ASL Interpreter</option>
            <option>Second Submission</option>
          </select>
        </div>
      </div>
    )
  }
});
var BoroSelector = React.createClass({
  render(){
    return (
      <div className='form-group'>
        <div className='col-lg-12'>
          <label>Please select a boro</label>
          <select className='form-control'>
            <option>All</option>
            <option>Queens</option>
            <option>Brooklyn</option>
            <option>Manhattan</option>
            <option>Staten Island</option>
            <option>The Bronx</option>
          </select>
        </div>
      </div>
    )
  }
});



var DateSelector = React.createClass({
  render(){
    return (
      <div className='form-group'>
        <div className='col-lg-12'>
          <label>Show me available slots after</label>

          <input type='date' className='form-control' />
          <p className='help-block bg-warning' style={{padding:"5px 10px", marginTop:10}}>
            The data is <b>10</b> minutes old. Actual dates may be different.
          </p>
        </div>
      </div>
    )
  }
});

var Location = React.createClass({

  render(){
    // <p>
    //   <b>Instructions:</b> We cannot take your appointment from this site. Please visit the official IdNYC Site. Select "Apply as a New Applicant",  and then select the date and time shown above.
    // </p>
    // <h3>
    //   March 21st, 2:00PM
    // </h3>

    // TODO: create a modal components and serve the content above inside the modal body
    return (<div style={{marginBottom:30}}>
      <Map />
      <h2>Brooklyn Center for Sports</h2>


      <p>
        <a className='btn btn-success btn-lg' href='https://idnyc.appointment-plus.com' target='_blank'>Make an appointment</a>
      </p>
    </div>)
  }

});
var LocationList = React.createClass({

  render(){
    return (
      <div className='well' >
        <Location />
        <Location />
        <Location />
      </div>
    )
  }
});


var Map = React.createClass({
  componentDidMount: function() {

  },
  render(){
    return (
      <img id='map' className='img-rounded' style={{minHeight: 200, width: '100%'}} src="https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=530x200&maptype=roadmap
        &markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318
        &markers=color:red%7Clabel:C%7C40.718217,-73.998284"/>
    )
  }


});
var App = React.createClass({
  render() {
    return (
      <div>
        <header className='navbar navbar-default navbar-static navbar-top'>
          <div className='container-fluid'>
            <div className='navbar-header'>
              <a className='navbar-brand' href='/'>
                <b>MyIdNYC</b> - a BetaNYC project</a>
            </div>
          </div>
        </header>
        <div className='container-fluid'>
          <div className="alert alert-info">
            <a className="close"  data-dismiss="alert">&times;</a>
            <b>Why this site?</b>
            <p>
              IdNYC, the initiative give all New Yorkers an official city id, has been very successful. So much so that finding an open slot to is difficult, if not impossible. We think it could be easier to find an appointment, and this is out attempt to reimagine IdNYC.
            </p>
          </div>
          <div className='row'>
            <div className='col-lg-3'>
              <div className='clearfix'><ServiceSelector /></div>
              <div className='clearfix'><BoroSelector /></div>
              <div className='clearfix'><DateSelector /></div>
            </div>
            <div className='col-lg-4'>
              <h5 style={{marginTop:0}}>Available slots</h5>
              <div className='list-group'>
                <div className='list-group-item disabled'>
                  March 22nd, 2015
                </div>
                <a href='javascript:;' className='list-group-item active'>
                  2:00PM
                  <span className='fa fa-map-marker pull-right'/>
                  <span className='fa fa-map-marker pull-right'/>
                  <span className='fa fa-map-marker pull-right'/>
                </a>
                <a href='javascript:;' className='list-group-item'>
                  3:00PM

                  <span className='fa fa-map-marker pull-right'/>
                </a>
                <a href='javascript:;' className='list-group-item'>
                  4:00PM

                  <span className='fa fa-map-marker pull-right'/>
                  <span className='fa fa-map-marker pull-right'/>
                  <span className='fa fa-map-marker pull-right'/>
                </a>
                <a href='javascript:;' className='list-group-item'>
                  5:00PM

                  <span className='fa fa-map-marker pull-right'/>
                </a>
                <div className='list-group-item disabled'>
                  March 23rd, 2015
                </div>
                <a href='javascript:;' className='list-group-item'>
                  3:00PM

                  <span className='fa fa-map-marker pull-right'/>
                </a>
                <a href='javascript:;' className='list-group-item'>
                  4:00PM

                  <span className='fa fa-map-marker pull-right'/>
                  <span className='fa fa-map-marker pull-right'/>
                  <span className='fa fa-map-marker pull-right'/>
                </a>
                <a href='javascript:;' className='list-group-item'>
                  5:00PM

                  <span className='fa fa-map-marker pull-right'/>
                </a>
              </div>
            </div>
            <div className='col-lg-5'>
              <h5 style={{marginTop:0}}>Details</h5>
              <LocationList/>
            </div>
          </div>

        </div>
      </div>
    );
  }
});

module.exports = App;