var React = require('react');
var {PropTypes} = React;
var RepoSearchStore = require('stores/RepoSearchStore');
var RepoStore = require('stores/RepoStore');
var RepoActionCreators = require('actions/RepoActionCreators');
var ResultListComponent = require('components/ResultListComponent');
var ResultSearchFieldComponent = require('components/ResultSearchFieldComponent');
var createStoreMixin = require('mixins/createStoreMixin');
var isEqual = require('lodash/lang/isEqual');
var AppDispatcher = require('dispatchers/AppDispatcher');

var count = 0;
module.exports = React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  },
  mixins: [
    createStoreMixin( RepoSearchStore, RepoStore )
  ],

  getStateFromStores(props: mixed): mixed{
    return {
      seeds: RepoStore.getAll()
    }
  },

  componentDidMount() {
    RepoActionCreators.requestRepoNames();
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
    RepoActionCreators.requestRepoSearch(query);
  },

  render(){
    // <div className='panel panel-default'>
    //   <div className='panel-heading'>
    //     <h5 className='panel-title'>Community News</h5>
    //   </div>
    //   <div className='panel-body'>
    //   </div>
    // </div>

    return (<div>
      <div className='jumbotron'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-8'>
              <h1 style={{textTransform: 'uppercase'}}> Civic Tech Project Finder </h1>
              <p>
                Simply add a <a href="http://codefordc.org/resources/builder.html" target='_blank'>civic.json</a> file to your Github repo, and <a href='https://github.com/BetaNYC/betanyc-project-repos/edit/master/REPOS' target='_blank'>open a pull request</a> to add your project to this list.
              </p>
              <p>
                Want to help out? Check out the projects below.
              </p>
            </div>
            <div className='col-lg-4 text-center'>
              <img src={require('images/city.svg')} style={{width:280,marginTop:30}}/>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8'>

            <ResultSearchFieldComponent {...this.props}/>
            <ResultListComponent/>

          </div>
          <div className='col-lg-4 text-center'>
            <small style={{margin:'10px 0 34px 0', paddingBottom:6,borderBottom: 'solid 1px #ccc', display: 'block'}}>
              a <a href='http://beta.nyc'><img src = "https://cloud.githubusercontent.com/assets/94735/6129864/4562ab74-b10f-11e4-83bf-2cc54a1e102c.png"  style={{margin: '0 -7px 0 -7px', maxWidth: 30}}/>etaNYC</a> project
            </small>
            <div className='panel panel-default'>
              <div className='panel-heading'>
                <h5 className='panel-title'>Promoted projects</h5>
              </div>
              <ul className='list-group'>
                <li className='list-group-item'>
                  <a href='https://github.com/codeforamerica/civic-tech-patterns' target='_blank'>
                    codeforamerica/civic-tech-patterns
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>)
  }
});

