var React = require('react/addons');
var {PropTypes} = React;
var RepoSearchStore = require('stores/RepoSearchStore');
var RepoStore = require('stores/RepoStore');
var RepoActionCreators = require('actions/RepoActionCreators');
var ResultListComponent = require('components/ResultListComponent');
var SearchFieldComponent = require('components/SearchFieldComponent');
var SearchFilterListComponent = require('components/SearchFilterListComponent');
var createStoreMixin = require('mixins/createStoreMixin');
var isEqual = require('lodash/lang/isEqual');
var isEmpty = require('lodash/lang/isEmpty');
var AppDispatcher = require('dispatchers/AppDispatcher');
var {Link} = require('react-router');
var PureRenderMixin = React.addons;

var SearchPage;
module.exports = SearchPage = React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  },
  mixins: [
    createStoreMixin( RepoSearchStore, RepoStore ),
    PureRenderMixin
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

  parseQuery(props): mixed {
    props = props || this.props;
    return props.query;
  },

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.parseQuery(nextProps), this.parseQuery())) {
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
      <ol className="breadcrumb">
        <li>
          <Link to='homePage'>
            Home
          </Link>
        </li>
        <li className="active">Search</li>
      </ol>
      <div className='container' style={{marginTop: 20}}>
        <div className='row'>
          <div className='col-lg-3 text-center'>
            <SearchFilterListComponent  {...this.props} />
          </div>
          <div className='col-lg-9'>

            <SearchFieldComponent {...this.props}/>
            <ResultListComponent/>

          </div>
        </div>
      </div>
    </div>)
  }
});

