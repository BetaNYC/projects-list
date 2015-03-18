var React = require('react/addons');
var {PropTypes} = React;
var RepoStore = require('stores/RepoStore');
var createStoreMixin = require('mixins/createStoreMixin');
var isEqual = require('lodash/lang/isEqual');
var Holder = require("holderjs");
var {Link} = require('react-router');
var SearchFieldComponent = require('components/SearchFieldComponent');

var HomePage;
module.exports = HomePage = React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  },
  mixins: [
    createStoreMixin( RepoStore )
  ],

  getStateFromStores(props: mixed): mixed{
    return {
    }
  },

  componentDidMount() {
    Holder.run()
    this.queryDidChange(this.props);
    $('.brick-text').fitText()
  },

  parseQuery(props: mixed): mixed {
    props = props || this.props;
    return props.query;
  },

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.parseQuery(nextProps), this.parseQuery(this.props))) {
      this.setState(this.getStateFromStores(nextProps));
      this.queryDidChange(nextProps);
    }
  },

  queryDidChange(props) {
    var query = this.parseQuery(props);
  },

  render(){
    // <img data-src="holder.js/100%x200/font:Helvetica/gray/text:Education Apps"/>
    return (<div>
      <div className='jumbotron'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-8'>
              <h1 style={{textTransform: 'uppercase'}}> Civic Tech Project Finder </h1>
              <p>
                Simply send us <a href="mailto: spocksplanet@gmail.com" target='_blank'>an email</a> to add your project to this list.
              </p>
            </div>
            <div className='col-lg-4 text-center'>
              <img src={require('images/city.svg')} style={{width:280,marginTop:30}}/>
              <small style={{margin:'10px 0 34px 0', paddingBottom:6, display: 'block'}}>
                a <a href='http://beta.nyc'><img src = "https://cloud.githubusercontent.com/assets/94735/6129864/4562ab74-b10f-11e4-83bf-2cc54a1e102c.png"  style={{margin: '0 -7px 0 -7px', maxWidth: 30}}/>etaNYC</a> project
              </small>
            </div>
          </div>
        </div>
        <div className='row' style={{marginBottom: -30}}>
          <div className='col-lg-4 col-lg-offset-4'>
            <Link to='searchPage' className='btn btn-lg btn-default search-btn' style={{display: 'block'}}>Search</Link>
          </div>
        </div>
      </div>
      <div className='container-fluid showcase-links'>
        <div className='row'>
          <div className='col-lg-2'>
            <Link to="searchPage"  className='brick' query={{category: 'data-journalism'}}>
              <div className='brick-icon'>
                <img src={require('../images/hacker.svg')}/>
              </div>
              <div className='brick-text'> Civic Hacking 101</div>
            </Link>
          </div>
          <div className='col-lg-6'>
            <Link to="searchPage"  className='brick' query={{category: 'education'}}>
              <div className='brick-icon'>
                <img src={require('../images/education.svg')}/>
              </div>
              <div className='brick-text'> Education Apps</div>
            </Link>
          </div>
          <div className='col-lg-4 text-center'>
            <Link to="searchPage"  className='brick' query={{category: 'crime-data'}}>
              <div className='brick-icon'>
                <img src={require('../images/crime.svg')}/>
              </div>
              <div className='brick-text'> Crime data</div>
            </Link>
          </div>
        </div>
        <div className='row' style={{marginTop: 20}}>
          <div className='col-lg-4'>
            <Link to="searchPage"  className='brick' query={{category: 'transportation'}}>
              <div className='brick-icon'>
                <img src={require('../images/bicycle.svg')}/>
              </div>
              <div className='brick-text'> Transportation</div>
            </Link>
          </div>
          <div className='col-lg-3'>
            <Link to="searchPage"  className='brick' query={{category: 'parks'}}>
              <div className='brick-icon'>
                <img src={require('../images/parks.svg')}/>
              </div>
              <div className='brick-text'>Parks</div>
            </Link>
          </div>
          <div className='col-lg-5 text-center'>
            <Link to="searchPage"  className='brick' query={{category: 'elections'}}>
              <div className='brick-icon'>
                <img src={require('../images/elections.svg')}/>
              </div>
              <div className='brick-text'>Elections</div>
            </Link>
          </div>
        </div>
        <div className='row' style={{marginTop: 20, marginBottom: 20}}>
          <div className='col-lg-12'>
            <Link to="searchPage"  className='brick' query={{category: '311'}}>
              <div className='brick-icon'>
                <img src={require('../images/service.svg')}/>
              </div>
              <div className='brick-text'>311</div>
            </Link>
          </div>
        </div>
        <div className='row' style={{marginTop: 20, marginBottom: 20}}>
          <div className='col-lg-4'>
            <Link to="searchPage"  className='brick' query={{category: 'health'}}>
              <div className='brick-icon'>
                <img src={require('../images/health.svg')}/>
              </div>
              <div className='brick-text'>Health</div>
            </Link>
          </div>
          <div className='col-lg-8'>
            <Link to="searchPage"  className='brick' query={{category: 'housing'}}>
              <div className='brick-icon'>
                <img src={require('../images/housing.svg')}/>
              </div>
              <div className='brick-text'>Housing</div>
            </Link>
          </div>
        </div>
      </div>
    </div>)
  }
});

