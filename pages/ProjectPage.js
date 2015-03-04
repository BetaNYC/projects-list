var React = require('react/addons');
var Holder = require("imports?this=>window!Holder/holder");
var {PropTypes} = React;
var moment = require('moment');

// Helpers
var isEqual = require('lodash/lang/isEqual');
var README = '/README.md';

// Stores
var UserStore = require('stores/UserStore');
var RepoStore = require('stores/RepoStore');
var ProjectStore = require('../stores/ProjectStore');
var ContentByRepoStore = require('../stores/ContentByRepoStore');
var IssuesByRepoStore = require('../stores/IssuesByRepoStore');

// Action creators
var ProjectActionCreators = require('actions/ProjectActionCreators');
var RepoActionCreators = require('actions/RepoActionCreators');
var IssueActionCreators = require('actions/IssueActionCreators');

// Mixins
var createStoreMixin = require('mixins/createStoreMixin');

// Components
var {Link} = require('react-router');
var Breadcrumbs = require('components/Breadcrumbs');
var IssueListComponent = require('components/IssueListComponent');


var ProjectPage;
var ProjectHeading = React.createClass({
  render(){
    var {repo} = this.props;

    var owner = UserStore.get(repo.owner);
    var ownerLogin = owner.login;
    var ownerHtmlUrl = owner.htmlUrl;
    var ownerAvatarUrl = owner.avatarUrl;

    return <div className='container'>
        <h1>
          <a href={repo.htmlUrl} target="_blank">{repo.name} <span className='mega-octicon octicon-mark-github' /></a>
          <a href={owner.htmlUrl} title={owner.login} className='pull-right'>
            <img src={owner.avatarUrl} width={150} className='img-thumbnail'/>

          </a>
        </h1>
        <ul className='list-inline'>
          <li title='stargazers'>{repo.stargazersCount} <span className='octicon-star octicon'/></li>
          <li title='watchers'>{repo.watchersCount} <span className='octicon-eye-watch octicon'/></li>
          <li title='forks'>{repo.forks} <span className='octicon-repo-forked octicon'/></li>
          <li title='open issues'>{repo.openIssues} <span className='octicon-issue-opened octicon'/></li>
        </ul>

        <p><small>Last updated {moment(repo.pushedAt).fromNow()}</small></p>
        <p className='lead'>{repo.description}</p>
        <hr/>
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
      ContentByRepoStore,
      IssuesByRepoStore
    )
  ],
  componentDidMount(){
    var {repoName} = this.props.params;
    ProjectActionCreators.requestProject({name: repoName});
    IssueActionCreators.requestRepoIssues({repoName});
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
    var {repoName} = this.props.params;
    return {
      projects: ProjectStore.getByName(repoName),
      issues: IssuesByRepoStore.getIssuesByRepo(repoName)
    }
  },
  render(){
    var [project] = this.state.projects;
    var {issues} = this.state;
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

      <div className='container'>
        <IssueListComponent issues={issues}/>
      </div>

    </div>
  }
});


// <div className='text-center'>
//   <img src={require('images/under_construction.svg')} width='40%'/>
// </div>
