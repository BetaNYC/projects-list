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
        <Link to='searchPage' className='list-group-item' query={{category:'civic-hacking', q: this.props.query.q}}>
          Crime
        </Link>

        <Link to='searchPage' className='list-group-item' query={{category:'education', q: this.props.query.q}}>
          Education
        </Link>

        <Link to='searchPage' className='list-group-item' query={{category:'crime', q: this.props.query.q}}>
          Crime
        </Link>

        <Link to='searchPage' className='list-group-item' query={{category:'transportation', q: this.props.query.q}}>
          {'Transportation'}
        </Link>


        <Link to='searchPage' className='list-group-item' query={{category:'parks', q: this.props.query.q}}>
          Parks
        </Link>

        <Link to='searchPage' className='list-group-item' query={{category:'elections', q: this.props.query.q}}>
          Elections
        </Link>

        <Link to='searchPage' className='list-group-item' query={{category:'311', q: this.props.query.q}}>
          311
        </Link>

        <Link to='searchPage' className='list-group-item' query={{category:'health', q: this.props.query.q}}>
          Health
        </Link>

        <Link to='searchPage' className='list-group-item' query={{category:'housing', q: this.props.query.q}}>
          {"Housing"}
        </Link>

        {removeFiltersBtn}

      </div>
    </div>
  }
});