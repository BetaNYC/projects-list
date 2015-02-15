/* @flow */

"use strict"

var React = require('react');
var RepoStore = require('./RepoStore.js');
var moment = require('moment');


class RepoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._getState()
  }
  _getState(){
    return {
      repos: RepoStore.getAllRepos()
    };
  }
  _setState(){
    this.setState(this._getState());
  }
  componentWillMount(){
    RepoStore.addChangeListener(this._setState.bind(this));
  }
  componentWillUnmount(){
    RepoStore.removeChangeListener(this._setState.bind(this));
  }

  render(){
    var repos = this.state.repos.map(function(repo,i) {
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
            <div className='panel panel-default'>
              <table className='table table-condensed'>
                <tbody>
                  <tr className='text-muted'>
                    <th className='text-center'>
                      Labels <a className='fa fa-caret-down' href='javascript:;'/>
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
                    <td style={{verticalAlign:'middle', width:30}}><span className='label label-warning'>Help wanted</span></td>
                    <td>lorem ipsum </td>
                    <td style={{verticalAlign:'middle', width:30}}>
                      <a href='' target='_blank'>
                        <span className='fa fa-external-link'/>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>


      </tr> || null;
    })
    // <h3 className='text-center'>
    //   <span className='mega-octicon octicon-location text-info'/>
    //   <div style={{marginTop:10}} className='small'>New York</div>
    // </h3>
    return <div>


      <div className='row' style={{marginTop:20}}>
        <div className='col-lg-8'>
          <table className='table table-condensed' >
            <tbody>
              <tr>
                <th style={{verticalAlign:'middle'}}>{repos.length} projects found.</th>
                <th className='text-right' style={{verticalAlign:'middle'}}>
                  Sort by <a href='javascript:;'><span className='fa fa-caret-down'/></a>
                </th>
              </tr>
              {repos}
            </tbody>
          </table>
        </div>
        <div className='col-lg-4'>

          <div className='panel panel-default'>
            <div className='panel-heading'>
              <h5 className='panel-title'>Promoted projects</h5>
            </div>
            <div className='panel-body'>
            </div>
          </div>
          <div className='panel panel-default'>
            <div className='panel-heading'>
              <h5 className='panel-title'>Community News</h5>
            </div>
            <div className='panel-body'>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}



module.exports = RepoList;