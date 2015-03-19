var React = require('react/addons');
var {PropTypes: T} = React;

// Helpers
var assign = require('object-assign');

// Stores
var ProjectStore = require('stores/ProjectStore');
var ProjectsByQueryStore = require('stores/ProjectsByQueryStore');

// Components
var {Link} = require('react-router');
var Breadcrumbs = require('components/Breadcrumbs');
var ProjectListComponent = require('components/ProjectListComponent');
var Brick = require('components/Brick');

// Action creators
var ProjectActionCreators = require('actions/ProjectActionCreators');

// Mixins
var createStoreMixin = require('mixins/createStoreMixin');
var PureRenderMixin = React.addons;
var {Navigation,State} = require('react-router');


var ShowcasePage;
module.exports = ShowcasePage = React.createClass({
  propTypes: {
    params: T.object.isRequired,
    query: T.object.isRequired
  },
  mixins: [
    createStoreMixin( ProjectStore, ProjectsByQueryStore ),
    PureRenderMixin
  ],

  getStateFromStores(props: mixed): mixed{
    return {
      projects: ProjectsByQueryStore.getAll()
    }
  },

  componentDidMount() {
    // Request data from the project store
    ProjectActionCreators.requestProjects({q: 311});
  },

  render(){
    let {projects} = this.state;
    let isFetching = ProjectStore.isExpectingPage();
    console.log(projects)

    return <div className='showcase-page'>
      <Breadcrumbs style={{marginBottom: 0}}>
          <Link to='homePage'>
            Home
          </Link>
          Showcase
      </Breadcrumbs>

      <div className='jumbotron showcasePage-intro'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <h1>
                <img src={require('images/service.svg')} /> 311 apps
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col-lg-8'>
            {isFetching ? <div><span className='fa fa-1x fa-circle-o-notch text-muted fa-spin'/></div> : <ProjectListComponent projects={projects} query={this.props.query} lastPage={1} hideHeader={true} /> }
          </div>
          <div className='col-lg-4'>
            <h3 style={{marginTop:0}}>Related showcases</h3>
            <Brick text='Civic Hacking 101' icon='hacker'/>
          </div>
        </div>
      </div>
    </div>
  }
})


