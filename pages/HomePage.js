var React = require('react/addons');
var {PropTypes} = React;
var isEqual = require('lodash/lang/isEqual');

// Stores
var RepoStore = require('stores/RepoStore');

// Mixins
var createStoreMixin = require('mixins/createStoreMixin');

// Components
var {Link} = require('react-router');
var SearchFieldComponent = require('components/SearchFieldComponent');
var Ink = require('react-ink');
var Brick = require('components/Brick');

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
    return (<div>
      <div className='jumbotron homePage-intro' style={{ position: "relative" }}>
        <Ink />
        <div className='container' style={{position: 'relative'}}>
          <div className='row'>
            <div className='masonry-cell col-lg-8'>
              <h1 style={{textTransform: 'uppercase'}}> Civic Tech
                <span style={{display:'block'}}/>
                Project Finder </h1>
              <p>
                Simply send us <a href="mailto: spocksplanet@gmail.com" target='_blank'>an email</a> to add your project to this list.
              </p>
            </div>
            <div className='masonry-cell col-lg-4 text-center'>
              <img src={require('images/city.svg')} style={{width:280,marginTop:30}}/>
              <small style={{margin:'10px 0 34px 0', paddingBottom:6, display: 'block'}}>
                a <a href='http://beta.nyc'><img src = "https://cloud.githubusercontent.com/assets/94735/6129864/4562ab74-b10f-11e4-83bf-2cc54a1e102c.png"  style={{margin: '0 -7px 0 -7px', maxWidth: 30}}/>etaNYC</a> project
              </small>
            </div>
          </div>

        </div>
        <div className='row' style={{marginBottom: -30}}>
          <div className='masonry-cell col-lg-4 col-lg-offset-4'>


            <Link to='searchPage' className='btn btn-lg btn-default search-btn' style={{display: 'block'}}>

              Search</Link>
          </div>
        </div>

      </div>
      <div className='showcase-links'>
        <div className='showcase-links-row'>
          <Link to="searchPage"  query={{category: 'civic-hacking'}} style={{flex: '2 0'}}>
            <Brick text=' Civic Hacking 101' icon='hacker'/>
          </Link>
          <Link to="searchPage"  query={{category: 'education'}} style={{flex: '6 0'}}>
            <Brick text=' Education' icon='education'/>
          </Link>
          <Link to="searchPage"  query={{category: 'crime'}} style={{flex: '3 0'}}>
            <Brick text=' Crime data' icon='crime'/>
          </Link>
        </div>
        <div className='showcase-links-row'>
          <Link to="searchPage"  query={{category: 'transportation'}} style={{flex: '4 0'}}>
            <Brick text=' Transportation' icon='bicycle'/>
          </Link>
          <Link to="searchPage"  query={{category: 'parks'}} style={{flex: '2 0'}}>
            <Brick text='Parks' icon='parks'/>
          </Link>
          <Link to="searchPage"  query={{category: 'elections'}} style={{flex: '4 0'}}>
            <Brick text='Elections' icon='elections'/>
          </Link>
        </div>

        <div className='showcase-links-row'>
          <Link to="searchPage"  query={{category: 'health'}} style={{flex: '2 0'}}>
            <Brick text='Health' icon='health'/>
          </Link>
          <Link to="searchPage"  query={{category: 'housing'}} style={{flex: '4 0'}}>
            <Brick text='Housing' icon='housing'/>
          </Link>
          <Link to="showcasePage"  params={{name: '311'}} style={{flex: '2 0'}}>
            <Brick text='311' icon='service'/>
          </Link>
        </div>
      </div>
    </div>)
  }
});

