var React = require('react/addons');
var {Link} = require('react-router');


var SearchFilterListComponent;
module.exports = SearchFilterListComponent = React.createClass({
  propTypes: {
    params: React.PropTypes.object.isRequired,
    query: React.PropTypes.object.isRequired
  },
  render(){
    var {query} = this.props;
    var {category} = query;
    var removeFiltersBtn= category ? <Link to='searchPage' query={{}} className='btn  btn-block bg-danger text-danger' style={{boxShadow: 'none'}}>
                  Clear category <span className='fa fa-times fa-fw'/>
                </Link> : null;

    return <div className='hidden-sm hidden-xs hidden-md'>
      <div className='list-group text-left'>
        <Link to='searchPage' className='list-group-item' query={{category:'crime', q: this.props.query.q}}>
          Crime
        </Link>

        <Link to='searchPage' className='list-group-item' query={{category:'education', q: this.props.query.q}}>
          Education
        </Link>

        <Link to='searchPage' className='list-group-item' query={{category:'healthcare', q: this.props.query.q}}>
          Healthcare
        </Link>

        <Link to='searchPage' className='list-group-item' query={{category:'311-hacks', q: this.props.query.q}}>
          {'311 Hacks'}
        </Link>

        <Link to='searchPage' className='list-group-item' query={{category: 'data-journalism', q: this.props.query.q}}>
          Data journalism
        </Link>

        <Link to='searchPage' className='list-group-item' query={{category:'poverty', q: this.props.query.q}}>
          Poverty
        </Link>

        <Link to='searchPage' className='list-group-item' query={{category:'parks', q: this.props.query.q}}>
          Parks
        </Link>

        <Link to='searchPage' className='list-group-item' query={{category:'transportation', q: this.props.query.q}}>
          Transportation
        </Link>

        <Link to='searchPage' className='list-group-item' query={{category:'science', q: this.props.query.q}}>
          Science
        </Link>

        <Link to='searchPage' className='list-group-item' query={{category:'tools', q: this.props.query.q}}>
          {"Hacker's toolkit"}
        </Link>

        {removeFiltersBtn}

      </div>
    </div>
  }
});