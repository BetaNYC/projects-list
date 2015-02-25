var React = require('react/addons');
var {PropTypes} = React;
var {Link} = require('react-router');

var OwnerPage;
module.exports = OwnerPage = React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  },
  mixins: [],
  render(){
    return <div>
          <ol className="breadcrumb">
            <li>
              <Link to='homePage'>
                Home
              </Link>
            </li>
            <li>
              <Link to='searchPage'>
                Civic Projects
              </Link>
            </li>
            <li className="active">
              {this.props.params.owner}
            </li>
          </ol>
          <div className='text-center'>
            <img src={require('images/under_construction.svg')} width='40%'/>
          </div>
        </div>
  }
});