/* @flow */
"use strict"
var React = require('react/addons');
var {PropTypes} = React;
var isEmpty = require('lodash/lang/isEmpty');
var forEach = require('lodash/collection/forEach');
var toArray = require('lodash/lang/toArray');
var map = require('lodash/collection/map');
var moment = require('moment');
require('blast-text');

// Stores
var RepoStore = require('../stores/RepoStore');
var UserStore = require('../stores/UserStore');
// Mixins
var createStoreMixin = require('../mixins/createStoreMixin');
// Components
var {Link} = require('react-router');

var ProjectListItemComponent = React.createClass({
  mixins: [
    createStoreMixin( RepoStore, UserStore )
  ],

  getStateFromStores(props: mixed): mixed{
    return {
      repo: RepoStore.get(this.props.githubDetails)
    }
  },

  componentDidUpdate(){
    let {query} = this.props;
    let {q} = query;
    var node = this.refs.projectListItem.getDOMNode();
    if(q)
      $(node).blast({ search: q }, true);
    else
      $(node).blast(false);
  },

  render(){
    var project = this.props;
    if(!project){return null;}
    if(!this.state.repo){return null;}
    var {repo} = this.state;

    var owner = UserStore.get(repo.owner);
    var ownerLogin = owner.login;
    var ownerHtmlUrl = owner.htmlUrl;
    var ownerAvatarUrl = owner.avatarUrl;

    return <tr key={this.props.key} >
      <td colSpan={2} style={{position: 'relative'}} ref='projectListItem'>
        <Link to='projectPage'
          params={{owner: ownerLogin, repoName: project.name}}
          style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%'}} />

        <h2>
          <Link to='projectPage' params={{owner: ownerLogin, repoName: project.name}}>{project.name}
          </Link>

          <a href={ownerHtmlUrl} title={ownerLogin} className='pull-right'>
            <img src={ownerAvatarUrl} width={50}/>
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

var ProjectListComponent;
module.exports = ProjectListComponent = React.createClass({

  propTypes: {
    projects: PropTypes.array.isRequired
  },

  render(): any {

    var {projects} = this.props;
    var {total} = this.props;


    var tableHeader = <tr>
      <th style={{verticalAlign:'middle'}}>
        {total} projects found.
      </th>
      <th className='text-right' style={{verticalAlign:'middle', width: 165}}>
      </th>
    </tr>
    // {isEmpty(projects) || <SortButton/>}

    var tableBody = null;
    if(isEmpty(projects)){
      tableBody = <tr>
        <td  colSpan={2} style={{height:100, verticalAlign:'middle'}} className='text-center'>Nothing found</td>
      </tr>
    }else{
      tableBody = map(projects, (project,i)=> {
        return <ProjectListItemComponent {...project} query={this.props.query} key={i} />;
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