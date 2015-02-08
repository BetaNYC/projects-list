'use strict';
require('./app.scss')

var React = require('react');

var BoroSelector = React.createClass({
  render(){
    return (
      <div className='form-group'>
        <div className='col-lg-12'>
          <label>Please select a boro</label>
          <select className='form-control'>
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
var DatePicker = require('react-date-picker');
require('react-date-picker/index.css');
require('react-date-picker');
var date = Date.now()

function onChange(moment, dateString){
  console.log(moment);
}


var DateSelector = React.createClass({
  render(){
    return (
      <div className='form-group'>
        <div className='col-lg-12'>
          <label>Show me available slots after</label>
          <DatePicker
              minDate={Date.now()}
              maxDate='2020-10-10'
              date={date}
              onChange={onChange}
              className='date-picker center-block'
          />
        </div>
      </div>
    )
  }
});

var SelectedDate = React.createClass({

  render(){
    return (
      <div>
        <Map />
        <h2>Brooklyn Center for Sports</h2>
        <h3>
          March 21st, 2:00PM
        </h3>
        <p>
          <b>Instructions:</b> We cannot take your appointment from this site. Please visit the official IdNYC Site. Select "Apply as a New Applicant",  and then select the date and time shown above.
        </p>
        <p>
          <a className='btn btn-success btn-lg' href='https://idnyc.appointment-plus.com' target='_blank'>Make an appointment</a>
        </p>

      </div>
    )
  }
});
var Map = React.createClass({
  componentDidMount: function() {

  },
  render(){
    return (
      <img id='map' style={{minHeight: 200, width: '100%'}} src="https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=530x200&maptype=roadmap
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
              <a className='navbar-brand'>
                <b>MyIdNYC</b> - a BetaNYC project</a>
            </div>
          </div>
        </header>
        <div className='container-fluid'>
          <div className="alert alert-info">
            <a className="close"  data-dismiss="alert">&times;</a>
            <b>Why this site?</b>
            <p>
              IdNYC, the initiative give all New Yorkers an official city id, has been very successful. Finding an open slot to is difficult, if not impossible for all New Yorkers. The IdNYC appointment site is hard to use; we think it could be better, and this is out attempt to reimagine IdNYC.
            </p>
          </div>
          <div className='row'>
            <div className='col-lg-3'>
              <BoroSelector />
              <div style={{height:70}}/>
              <DateSelector />
            </div>
            <div className='col-lg-4'>
              <h5 style={{marginTop:0}}>Available slots</h5>
              <div className='list-group'>
                <a className='list-group-item active'>March 22nd, 2015, 2:00PM</a>
                <a className='list-group-item'>March 22nd, 2015, 3:00PM</a>
                <a className='list-group-item'>March 22nd, 2015, 4:00PM</a>
                <a className='list-group-item'>March 22nd, 2015, 5:00PM</a>
              </div>
            </div>
            <div className='col-lg-5'>
              <h5 style={{marginTop:0}}>Details</h5>
              <div className='well'>

                <SelectedDate/>

              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
});

module.exports = App;