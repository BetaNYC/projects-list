/* @flow */

"use strict"

var React = require('react/addons');
var {PropTypes} = React;
var RepoSearchStore = require('../stores/RepoSearchStore');
var ContentByRepoStore = require('../stores/ContentByRepoStore');
var ContentActionCreators = require('../actions/ContentActionCreators');
var createStoreMixin = require('../mixins/createStoreMixin');
var isEmpty = require('lodash/lang/isEmpty');
var forEach = require('lodash/collection/forEach');
var toArray = require('lodash/lang/toArray');
var map = require('lodash/collection/map');
var moment = require('moment');
var README = '/README.md';
var {Link} = require('react-router');

var ResultListItemComponent = React.createClass({
  mixins: [
    createStoreMixin(
      RepoSearchStore,
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
    if(!ContentByRepoStore.getContent(this.props.fullName, README))
      ContentActionCreators.requestRepoContent(this.props.fullName, README);
  },
  getStateFromStores(props){
    return {
      readme: ContentByRepoStore.getContent(props.fullName, README)
    }
  },
  render(){
    var repo = this.props;
    if(!repo){return null;}
    // <a href={repo.htmlUrl} target="_blank">{repo.name}</a>
    return <tr key={this.props.key} >
      <td colSpan={2} style={{position: 'relative'}}>
        <Link to='projectPage'
          params={{owner: repo.owner.login, repoName: repo.name}}
          style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%'}} />

        <h2>
          <Link to='projectPage' params={{owner: repo.owner.login, repoName: repo.name}}>{repo.name}
          </Link>

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

      </td>
    </tr>
  }
})

var ResultListComponent;
module.exports = ResultListComponent = React.createClass({
  mixins: [
    createStoreMixin(RepoSearchStore)
  ],
  getStateFromStores(props: mixed): mixed{
    return {
      repos: toArray(RepoSearchStore.getAllRepos())
    }
  },
  render(): any {
    var tableHeader = <tr>
      <th style={{verticalAlign:'middle'}}>
        {this.state.repos.length} projects found.
      </th>
      <th className='text-right' style={{verticalAlign:'middle', width: 165}}>
      </th>
    </tr>
    // {isEmpty(this.state.repos) || <SortButton/>}

    var tableBody = null;
    if(isEmpty(this.state.repos)){
      tableBody = <tr>
        <td  colSpan={2} style={{height:100, verticalAlign:'middle'}} className='text-center'>No repos found</td>
      </tr>
    }else{
      tableBody = map(this.state.repos, (repo,i)=> {
        return <ResultListItemComponent {...repo} key={i} />;
      });
    }

    return <table className='table table-condensed' >
      <tbody>
        {tableHeader}
        {tableBody}
      </tbody>
    </table>
  }
});






var SortButton = <div className='dropdown'>
  Sort by <a href='javascript:;' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  <span className='fa fa-caret-down'/></a>
  <ul className="dropdown-menu" role="menu">
    <li role="presentation">
      <a role="menuitem" tabIndex="-1" href="javascript:;">
        <span className='octicon-star octicon fa-fw'/> Stars
      </a>
    </li>
    <li role="presentation">
      <a role="menuitem" tabIndex="-1" href="javascript:;">
        <span className='octicon-issue-opened octicon fa-fw'/> Issues
      </a>
    </li>
    <li role="presentation">
      <a role="menuitem" tabIndex="-1" href="javascript:;">
        <span className='fa fa-fw fa-building-o'/> NYC
      </a>
    </li>
  </ul>
</div>