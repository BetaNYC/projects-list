var React = require('react/addons');
var Holder = require("imports?this=>window!Holder/holder");
var {PropTypes} = React;
var moment = require('moment');

// Helpers
var isEqual = require('lodash/lang/isEqual');
var README = '/README.md';

// Stores
var RepoStore = require('stores/RepoStore');
var ProjectStore = require('../stores/ProjectStore');
var ContentByRepoStore = require('../stores/ContentByRepoStore');

// Action creators
var ProjectActionCreators = require('actions/ProjectActionCreators');
var RepoActionCreators = require('actions/RepoActionCreators');

// Mixins
var createStoreMixin = require('mixins/createStoreMixin');

// Components
var {Link} = require('react-router');
var Breadcrumbs = require('components/Breadcrumbs');


var ProjectPage;
var ProjectHeading = React.createClass({
  render(){
    var {repo} = this.props;
    return <div className='container'>
        <h2>
          <a href={repo.htmlUrl} target="_blank">{repo.name}</a>
          <a href={repo.owner.htmlUrl} title={repo.owner.login} className='pull-right'>
            <img src={repo.owner.avatarUrl} width={50}/>
          </a>
        </h2>
        <ul className='list-inline'>
          <li title='stargazers'>{repo.stargazersCount} <span className='octicon-star octicon'/></li>
          <li title='watchers'>{repo.watchersCount} <span className='octicon-eye-watch octicon'/></li>
          <li title='forks'>{repo.forks} <span className='octicon-repo-forked octicon'/></li>
          <li title='open issues'>{repo.openIssues} <span className='octicon-issue-opened octicon'/></li>
        </ul>

        <p><small>Last updated {moment(repo.updatedAt).fromNow()}</small></p>
        <p>{repo.description}</p>
        <p>{this.props.readme}</p>

      </div>
  }
});

export default ProjectPage = React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  },
  mixins: [
    createStoreMixin(
      RepoStore,
      ProjectStore,
      ContentByRepoStore
    )
  ],
  componentDidMount(){
    ProjectActionCreators.requestProject({name: this.props.params.repoName});
    this.requestReadmeFile();
  },
  componentWillReceiveProps(nextProps){
    this.requestReadmeFile();
  },
  requestReadmeFile(){
    // if(!ContentByRepoStore.getContent(this.fullName(), README))
    //   ContentActionCreators.requestRepoContent(this.fullName(), README);
    // readme: ContentByRepoStore.getContent(this.fullName(), README)
  },
  getStateFromStores(props){
    return {
      projects: ProjectStore.getByName(this.props.params.repoName)
    }
  },
  render(){
    var [project] = this.state.projects;
    if(project)
      var repo = RepoStore.get(project.githubDetails);
    return <div>
      <Breadcrumbs>
        <Link to='homePage'>
          Home
        </Link>
        <Link to='searchPage'>
          Civic Projects
        </Link>
        {this.props.params.repoName}
      </Breadcrumbs>


      {project ? <ProjectHeading {...project} repo={repo} /> : null}
    </div>
  }
});


// <div className='text-center'>
//   <img src={require('images/under_construction.svg')} width='40%'/>
// </div>
