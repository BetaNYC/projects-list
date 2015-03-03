var React = require('react/addons');
var {PropTypes} = React;
var RepoStore = require('stores/RepoStore');
var Breadcrumbs = require('components/Breadcrumbs');
var ContentByRepoStore = require('../stores/ContentByRepoStore');


var RepoActionCreators = require('actions/RepoActionCreators');
var createStoreMixin = require('mixins/createStoreMixin');
var isEqual = require('lodash/lang/isEqual');
var Holder = require("imports?this=>window!Holder/holder");
var {Link} = require('react-router');
var README = '/README.md';

var ProjectPage;
var ProjectHeading = React.createClass({
  render(){
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
module.exports = ProjectPage = React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  },
  mixins: [
    createStoreMixin(
      RepoStore,
      ContentByRepoStore
    )
  ],
  componetDidMount(){
    this.requestReadmeFile();
  },
  componetWillReceiveProps(nextProps){
    this.requestReadmeFile();
  },
  requestReadmeFile(){
    if(!ContentByRepoStore.getContent(this.fullName(), README))
      ContentActionCreators.requestRepoContent(this.fullName(), README);
  },
  getStateFromStores(props){
    return {
      readme: ContentByRepoStore.getContent(this.fullName(), README)
    }
  },
  fullName(){
    return this.props.owner + '/' + this.props.repoName
  },
  render(){
    console.log(this.state.readme);
    var {repo} = this.props;
    return <div>
      <Breadcrumbs>
        <Link to='homePage'>
          Home
        </Link>
        <Link to='searchPage'>
          Civic Projects
        </Link>
        <Link to='ownerPage' params={{owner: this.props.params.owner}}>
          {this.props.params.owner}
        </Link>
        {this.props.params.repoName}
      </Breadcrumbs>

      <div className='text-center'>
        <img src={require('images/under_construction.svg')} width='40%'/>
      </div>
      {repo ? <ProjectHeading /> : null}
    </div>
  }
});
