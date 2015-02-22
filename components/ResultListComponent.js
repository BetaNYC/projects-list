/* @flow */

"use strict"

var React = require('react');
var RepoStore = require('stores/RepoStore');
var IssuesByRepoStore = require('stores/IssuesByRepoStore');
var createStoreMixin = require('mixins/createStoreMixin');
var isEmpty = require('lodash/lang/isEmpty');
var moment = require('moment');

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

var ResultListItemComponent = React.createClass({
  componetDidMount(){
    this.requestIssues();
  },
  componetWillReceiveProps(nextProps){
    this.requestIssues();
  },
  requestIssues(){
    if(IssuesByRepoStore.getIssuesByRepo(this.props.fullName).length == 0){
      return;
    }
    IssuesActionCreators.requestRepoIssues(this.props.fullName);
  },
  requestReadmeFile(){
    if(ContentByRepoStore.get(this.props.fullName)){ return; }
    ContentActionCreators.requestRepoContent(this.props.fullName, '/README.md');
  },
  render(){
    return null
  }
})

var ResultListComponent;
module.exports = ResultListComponent = React.createClass({
  mixins: [createStoreMixin(RepoStore)],
  getStateFromStores(props){
    return {
      repos: []
    }
  },
  render(){
    var tableHeader = <tr>
      <th style={{verticalAlign:'middle'}}>
        {this.state.repos.length} projects found.
      </th>
      <th className='text-right' style={{verticalAlign:'middle', width: 165}}>
        {isEmpty(this.state.repos) || <SortButton/>}
      </th>
    </tr>

    var tableBody = null;
    if(isEmpty(this.state.repos)){
      tableBody = <tr>
        <td  colSpan={2} style={{height:100, verticalAlign:'middle'}} className='text-center'>No repos found</td>
      </tr>
    }else{

      tableBody = this.state.repos.map((repo,i)=> {
        return <tr key={i} >
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
              <table className='table table-condensed'>
                <tbody>
                  <tr className='text-muted'>
                    <th className='text-center'>
                      <div className='dropdown'>
                        <a className='fa fa-caret-down' data-toggle='dropdown' href='javascript:;' aria-haspopup="true" aria-expanded="false"/> Labels
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
                  <tr>
                    <td style={{verticalAlign:'middle', width:30}}>
                      <span className='label label-warning'>Help wanted</span>
                    </td>
                    <td>lorem ipsum </td>
                    <td style={{verticalAlign:'middle', width:30}}>
                      <a href='' target='_blank'>
                        <span className='fa fa-external-link'/>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style={{verticalAlign:'middle', width:30}}>
                      <span className='label label-warning'>Help wanted</span>
                    </td>
                    <td>lorem ipsum </td>
                    <td style={{verticalAlign:'middle', width:30}}>
                      <a href='' target='_blank'>
                        <span className='fa fa-external-link'/>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
        </tr> || null;
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



