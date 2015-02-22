/* @flow */

"use strict"

var React = require('react');
var {PropTypes} = React;
var RepoStore = require('../stores/RepoStore');
var IssuesByRepoStore = require('../stores/IssuesByRepoStore');
var ContentByRepoStore = require('../stores/ContentByRepoStore');
var IssueActionCreators = require('../actions/IssueActionCreators');
var ContentActionCreators = require('../actions/ContentActionCreators');
var createStoreMixin = require('../mixins/createStoreMixin');
var isEmpty = require('lodash/lang/isEmpty');
var moment = require('moment');
var README = '/README.md';

var IssueListHeader = React.createClass({
  render(){
    return <tr className='text-muted'>
      <th className='text-center'>
        <div className='dropdown'>
          <a className='fa fa-caret-down'
            data-toggle='dropdown'
            href='javascript:;'
            aria-haspopup="true"
            aria-expanded="false"/> Labels

          <ul className="dropdown-menu" role="menu">
            <li role="presentation" className='active'>
              <a role="menuitem" tabIndex="-1" href="javascript:;">
                Help wanted
              </a>
            </li>
            <li role="presentation">
              <a role="menuitem" tabIndex="-1" href="javascript:;">
                Question
              </a>
            </li>
          </ul>
        </div>
      </th>
      <th></th>
      <th></th>
    </tr>
  }
});

var IssueList = React.createClass({
  mixins: [
    createStoreMixin(
      IssuesByRepoStore
    )
  ],
  componetDidMount(){
    this.requestIssues();
  },
  componetWillReceiveProps(nextProps){
    this.requestIssues();
  },
  requestIssues(){
    IssueActionCreators.requestRepoIssues(this.props.fullName);
  },
  getStateFromStores(props){
    return {
      issues: IssuesByRepoStore.getIssuesByRepo(props.fullName),
      readme: ContentByRepoStore.getContent(props.fullName, README)
    }
  },
  render(){
    var issues = this.state.issues.map(issue => {
      issue.labels.map(label => {return <span className='label' style={{backgroundColor: issue.color}}>{label.name}</span> });
      return <tr>
        <td style={{verticalAlign:'middle', width:30}}>
          {issue.labels}
        </td>
        <td>{issue.title}</td>
        <td style={{verticalAlign:'middle', width:30}}>
          <a href={issue.url} target='_blank'>
            <span className='fa fa-external-link'/>
          </a>
        </td>
      </tr>

    });
    return <table className='table table-condensed'>
            <tbody>
              <IssueListHeader {...this.props} />
              {issues}
            </tbody>
          </table>
  }
});
var ResultListItemComponent = React.createClass({
  mixins: [
    createStoreMixin(
      RepoStore,
      IssuesByRepoStore,
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
    var repo = this.props.repo;
    return <tr key={this.props.key} >
        <td colSpan={2}>
          <h2>
            <a href={repo.html_url} target="_blank">{repo.name}</a>
            <a href={repo.owner.html_url} title={repo.owner.login} className='pull-right'>
              <img src={repo.owner.avatar_url} width={50}/>
            </a>
          </h2>
          <ul className='list-inline'>
            <li title='stargazers'>{repo.stargazers_count} <span className='octicon-star octicon'/></li>
            <li title='watchers'>{repo.watchers_count} <span className='octicon-eye-watch octicon'/></li>
            <li title='forks'>{repo.forks} <span className='octicon-repo-forked octicon'/></li>
            <li title='open issues'>{repo.open_issues} <span className='octicon-issue-opened octicon'/></li>
          </ul>

          <p><small>Last updated {moment(repo.updated_at).fromNow()}</small></p>
          <p>{repo.description}</p>
          <hr/>
          <p>{this.props.readme}</p>

          <IssueList {...repo} />
        </td>
    </tr>
  }
})

var ResultListComponent;
module.exports = ResultListComponent = React.createClass({
  mixins: [
    createStoreMixin(RepoStore)
  ],
  getStateFromStores(props: mixed): mixed{
    return {
      repos: RepoStore.getAll()
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
      tableBody = this.state.repos.map((repo,i)=> {
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