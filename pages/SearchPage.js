var React = require('react/addons');
var {PropTypes} = React;

// Helpers
var isEqual = require('lodash/lang/isEqual');
var isEmpty = require('lodash/lang/isEmpty');
var assign = require('object-assign');

// Stores
var ProjectStore = require('stores/ProjectStore');
var RepoStore = require('stores/RepoStore');
// Actionc reators
var ProjectActionCreators = require('actions/ProjectActionCreators');
var RepoActionCreators = require('actions/RepoActionCreators');
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
    createStoreMixin( ProjectStore, RepoStore ),
    PureRenderMixin,
    Navigation
  ],

  getStateFromStores(props: mixed): mixed{
    return {
      projects: ProjectStore.getAll(),
      projectsCount: ProjectStore.getProjectsCount(),
      nextPageNum: ProjectStore.getNextPageNum(),
      lastPageNum: ProjectStore.getLastPageNum()
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
  },

  requestNextPage(){
    let query = this.params || {};
    let {nextPageNum} = this.state;
    if(nextPageNum){
      query = assign(query||{}, {page: ProjectStore.getNextPageNum()});
      // TODO: disable interaction when the request is being made
      this.transitionTo('searchPage', {}, query);
    }
  },

  render(){
    var {projects,projectsCount,nextPageNum} = this.state;

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
            <ProjectListComponent projects={projects} total={projectsCount} query={this.props.query} lastPage={this.state.lastPageNum || this.props.query.page || 1} />

            {(projectsCount > 0 && nextPageNum) ? <a className='btn btn-block btn-primary' onClick={this.requestNextPage} style={{marginBottom: 40}}>Next page</a> : null}
          </div>
        </div>
      </div>
    </div>)
  }
});

