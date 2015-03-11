var React = require('react/addons');
var {PropTypes} = React;

// Helpers
var isEqual = require('lodash/lang/isEqual');
var isEmpty = require('lodash/lang/isEmpty');
var assign = require('object-assign');

// Stores
var ProjectStore = require('stores/ProjectStore');
var SearchByProjectStore = require('stores/SearchByProjectStore');
var RepoStore = require('stores/RepoStore');
// Actionc reators
var ProjectActionCreators = require('actions/ProjectActionCreators');
// Components
var ProjectListComponent = require('components/ProjectListComponent');
var SearchFieldComponent = require('components/SearchFieldComponent');
var SearchFilterListComponent = require('components/SearchFilterListComponent');
var {Link} = require('react-router');
var Breadcrumbs = require('components/Breadcrumbs');
// Mixins
var createStoreMixin = require('mixins/createStoreMixin');
var PureRenderMixin = React.addons;
var {Navigation} = require('react-router');


var SearchPage;
module.exports = SearchPage = React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  },

  mixins: [
    createStoreMixin(
      ProjectStore,
      RepoStore,
      SearchByProjectStore
    ),
    PureRenderMixin,
    Navigation
  ],

  getStateFromStores(props: mixed): mixed{
    let pageCount = this.props.query.page || 1;
    return {
      projects: SearchByProjectStore.getAll(),
      projectsCount: ProjectStore.getList().getTotal(),
      pageCount,
      nextPageUrl: ProjectStore.getNextPageUrl()
    }
  },

  componentDidMount() {
    this.queryDidChange(this.props);
  },

  parseQuery(props): mixed {
    props = props || this.props;
    return props.query;
  },

  componentWillReceiveProps(np,ns) {
    if (!isEqual(this.parseQuery(np), this.parseQuery())) {
      this.setState(this.getStateFromStores(np));
      this.queryDidChange(np);
    }
  },

  queryDidChange(props) {
    var query = this.parseQuery(props);
    ProjectActionCreators.requestProjects(query);
    window.scrollTo(0,0);
  },

  requestNextPage(){
    let query = this.params || {};
    let {nextPageUrl, pageCount} = this.state;
    if(nextPageUrl){
      query = assign(query||{}, {page: ++pageCount});
      this.transitionTo('searchPage', {}, query);
    }
  },

  render(){
    var {projects,projectsCount,nextPageUrl} = this.state;
    let isFetching = ProjectStore.isExpectingPage();
    return (<div>
      <Breadcrumbs>
          <Link to='homePage'>
            Home
          </Link>
          Civic Projects
      </Breadcrumbs>

      <div className='container' style={{marginTop: 20}}>
        <div className='row'>
          <div className='col-lg-3 text-center'>
            <SearchFilterListComponent  {...this.props} />
          </div>
          <div className='col-lg-9'>

            <SearchFieldComponent {...this.props}/>

            {isFetching ? <div><span className='fa fa-1x fa-circle-o-notch text-muted fa-spin'/></div> : <ProjectListComponent projects={projects} total={projectsCount} query={this.props.query} lastPage={this.state.lastPageNum || this.props.query.page || 1} /> }

            {(projectsCount > 0 && nextPageUrl && !isFetching) ? <a className='btn btn-block btn-primary' onClick={this.requestNextPage} style={{marginBottom: 40}}>Next page</a> : null}
          </div>
        </div>
      </div>
    </div>)
  }
});

