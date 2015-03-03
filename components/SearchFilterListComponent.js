var React = require('react/addons');
var {Link} = require('react-router');

var SearchFilterListComponent;
module.exports = SearchFilterListComponent = React.createClass({
  render(){
    return <div className='list-group text-left'>
                <Link to='searchPage' className='list-group-item' query={{category:'crime', q: this.props.query.q}}>
                  <span className='fa fa-tag fa-fw'/> Crime
                </Link>

                <Link to='searchPage' className='list-group-item' query={{category:'education', q: this.props.query.q}}>
                  <span className='fa fa-tag fa-fw'/> Education
                </Link>

                <Link to='searchPage' className='list-group-item' query={{category:'healthcare', q: this.props.query.q}}>
                  <span className='fa fa-tag fa-fw'/> Healthcare
                </Link>

                <Link to='searchPage' className='list-group-item' query={{category:'311-hacks', q: this.props.query.q}}>
                  <span className='fa fa-tag fa-fw'/> {'311 Hacks'}
                </Link>

                <Link to='searchPage' className='list-group-item' query={{category: 'data-journalism', q: this.props.query.q}}>
                  <span className='fa fa-tag fa-fw'/> Data journalism
                </Link>

                <Link to='searchPage' className='list-group-item' query={{category:'poverty', q: this.props.query.q}}>
                  <span className='fa fa-tag fa-fw'/> Poverty
                </Link>

                <Link to='searchPage' className='list-group-item' query={{category:'parks', q: this.props.query.q}}>
                  <span className='fa fa-tag fa-fw'/> Parks
                </Link>

                <Link to='searchPage' className='list-group-item' query={{category:'transportation', q: this.props.query.q}}>
                  <span className='fa fa-tag fa-fw'/> Transportation
                </Link>

                <Link to='searchPage' className='list-group-item' query={{category:'science', q: this.props.query.q}}>
                  <span className='fa fa-tag fa-fw'/> Science
                </Link>

                <Link to='searchPage' className='list-group-item' query={{category:'tools', q: this.props.query.q}}>
                  <span className='fa fa-tag fa-fw'/> {"Hacker's toolkit"}
                </Link>

              </div>
  }
});