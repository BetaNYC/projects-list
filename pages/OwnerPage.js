var React = require('react/addons');
var {PropTypes} = React;
var {Link} = require('react-router');
var Breadcrumbs = require('components/Breadcrumbs');

var OwnerPage;
module.exports = OwnerPage = React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  },
  mixins: [],
  render(){
    return <div>
            <Breadcrumbs>
              <Link to='homePage'>
                Home
              </Link>
              <Link to='searchPage'>
                Civic Projects
              </Link>
              {this.props.params.owner}
            </Breadcrumbs>
            <div className='text-center'>
              <img src={require('images/under_construction.svg')} width='40%'/>
            </div>
          </div>
  }
});