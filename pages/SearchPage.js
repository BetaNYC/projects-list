var React = require('react/addons');
var {PropTypes} = React;
// Helpers
var isEqual = require('lodash/lang/isEqual');
var isEmpty = require('lodash/lang/isEmpty');

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


var SearchPage;
module.exports = SearchPage = React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  },
  mixins: [
    createStoreMixin( ProjectStore, RepoStore ),
    PureRenderMixin
  ],

  getStateFromStores(props: mixed): mixed{
    return {
      projects: ProjectStore.getAll(),
      projectsCount: ProjectStore.getProjectsCount()
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
    ProjectActionCreators.requestProjects(query);
  },


  render(){
    var {projects,projectsCount} = this.state;
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
            <ProjectListComponent projects={projects} total={projectsCount} />

          </div>
        </div>
      </div>
    </div>)
  }
});

