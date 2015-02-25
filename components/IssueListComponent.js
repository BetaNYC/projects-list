var IssueActionCreators = require('../actions/IssueActionCreators');
var IssuesByRepoStore = require('../stores/IssuesByRepoStore');

var IssueListHeader = React.createClass({
  render(){
    return <tr className='text-muted'>
      <th className='text-left'>
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
    )
  ],
  componetDidMount(){
    this.requestIssues();
  },
  componetWillReceiveProps(nextProps){
    this.requestIssues();
  },
  getStateFromStores(props){
    return {
    }
  },
  render(){
    var issues = map(this.state.issues, issue => {
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

    if(issues.length == 0){return null;}

    return <table className='table table-condensed'>
      <tbody>
        <IssueListHeader {...this.props} />
        {issues}
      </tbody>
    </table>
  }
});