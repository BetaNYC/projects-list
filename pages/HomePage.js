var React = require('react/addons');
var {PropTypes} = React;
var RepoStore = require('stores/RepoStore');
var createStoreMixin = require('mixins/createStoreMixin');
var isEqual = require('lodash/lang/isEqual');
var Holder = require("holderjs");
var {Link} = require('react-router');

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

    return (<div>
      <div className='jumbotron'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-8'>
              <h1 style={{textTransform: 'uppercase'}}> Civic Tech Project Finder </h1>
              <p>
                Simply send us <a href="mailto: spocksplanet@gmail.com" target='_blank'>an email</a> to add your project to this list.
              </p>
              <p>
                Want to help out? Check out the collections below.
              </p>
            </div>
            <div className='col-lg-4 text-center'>
              <img src={require('images/city.svg')} style={{width:280,marginTop:30}}/>
              <small style={{margin:'10px 0 34px 0', paddingBottom:6,borderBottom: 'solid 1px #ccc', display: 'block'}}>
                a <a href='http://beta.nyc'><img src = "https://cloud.githubusercontent.com/assets/94735/6129864/4562ab74-b10f-11e4-83bf-2cc54a1e102c.png"  style={{margin: '0 -7px 0 -7px', maxWidth: 30}}/>etaNYC</a> project
              </small>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-2'>
            <Link to="searchPage" query={{category: 'data-journalism'}}>
              <img data-src="holder.js/100%x200/font:Helvetica/sky/text:Civic Hacking 101"/>
            </Link>
          </div>
          <div className='col-lg-6'>
            <Link to="searchPage" query={{category: 'education'}}>
              <img data-src="holder.js/100%x200/font:Helvetica/gray/text:Education Apps"/>
            </Link>
          </div>
          <div className='col-lg-4 text-center'>
            <Link to="searchPage" query={{category: 'crime-data'}}>
              <img data-src="holder.js/100%x200/font:Helvetica/social/text:Crime data"/>
            </Link>
          </div>
        </div>
        <div className='row' style={{marginTop: 20}}>
          <div className='col-lg-4'>
            <Link to="searchPage" query={{category: 'transportation'}}>
              <img data-src="holder.js/100%x200/font:Helvetica/gray/text:Transportation hacks"/>
            </Link>
          </div>
          <div className='col-lg-3'>
            <Link to="searchPage" query={{category: 'parks'}}>
              <img data-src="holder.js/100%x200/font:Helvetica/sky/text:Parks"/>
            </Link>
          </div>
          <div className='col-lg-5 text-center'>
            <Link to="searchPage" query={{category: 'data-journalism'}}>
              <img data-src="holder.js/100%x200/font:Helvetica/gray/text:Data Journalism"/>
            </Link>
          </div>
        </div>
        <div className='row' style={{marginTop: 20, marginBottom: 20}}>
          <div className='col-lg-12'>
            <Link to="searchPage" query={{category: '311-hacks'}}>
              <img data-src="holder.js/100%x200/font:Helvetica/gray/text:311 hacks"/>
            </Link>
          </div>
        </div>
        <div className='row' style={{marginTop: 20, marginBottom: 20}}>
          <div className='col-lg-4'>
            <Link to="searchPage" query={{category: 'poverty'}}>
              <img data-src="holder.js/100%x200/font:Helvetica/social/text:Poverty"/>
            </Link>
          </div>
          <div className='col-lg-8'>
            <Link to="searchPage" query={{category: 'tools'}}>
              <img data-src="holder.js/100%x200/font:Helvetica/gray/text:Tools for Hackers"/>
            </Link>
          </div>
        </div>
      </div>
    </div>)
  }
});

