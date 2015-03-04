var React = require('react/addons');
var map = require('lodash/collection/map');

var IssueListHeader = React.createClass({
  render(){
    // Label filter toggle
    // <a className='fa fa-caret-down'
    //   data-toggle='dropdown'
    //   href='javascript:;'
    //   aria-haspopup="true"
    //   aria-expanded="false"/>
    // <ul className="dropdown-menu" role="menu">
    //   <li role="presentation" className='active'>
    //     <a role="menuitem" tabIndex="-1" href="javascript:;">
    //       Help wanted
    //     </a>
    //   </li>
    //   <li role="presentation">
    //     <a role="menuitem" tabIndex="-1" href="javascript:;">
    //       Question
    //     </a>
    //   </li>
    // </ul>
    return <tr className='text-muted'>
      <th>Details</th>
      <th></th>
    </tr>
  }
});

var IssueList;
export default IssueList = React.createClass({

  render(){
    var issues = map(this.props.issues, (issue,i) => {
      issue.labels.map(label => {return <span className='label' style={{backgroundColor: issue.color}}>{label.name}</span> });
      let labelsSection;
      if(issue.labels.length > 0){
        labelsSection = <section>
          <b>Labels: </b> {issue.labels.map(label=>{return label.name}).join(', ')}
      </section>}
      return <tr key={i}>
        <td>
          <h5><a href={issue.htmlUrl} target='_blank'>
            {issue.title}
          </a></h5>
          <p>{issue.body}</p>
          {labelsSection}
        </td>
        <td style={{verticalAlign:'middle', width:30}}>

        </td>
      </tr>
    });

    if(issues.length == 0){return null;}

    return <div>
        <h4>Issues</h4>
        <table className='table table-condensed'>
          <tbody>
            <IssueListHeader {...this.props} />
            {issues}
          </tbody>
        </table>
    </div>
  }
});