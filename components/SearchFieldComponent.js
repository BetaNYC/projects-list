var Navigation, React, RepoStore, SearchFieldComponent, createStoreMixin, assign;
React = require('react/addons');
RepoStore = require('stores/RepoStore');
createStoreMixin = require('mixins/createStoreMixin');
Navigation = require('react-router').Navigation;
assign = require('object-assign');
var clone = require('lodash/lang/clone');

module.exports = SearchFieldComponent = React.createClass({
  mixins: [
    createStoreMixin(RepoStore),
    Navigation
  ],
  getStateFromStores(props) {
    return {
      repos: []
    };
  },
  onChange(e) {
    this.runQuery({q: e.target.value});
  },
  runQuery(query: mixed){
    this.transitionTo("searchPage", {}, query);
  },
  onKeyDown(e) {
    // Instant search FTW!
  },
  clearQuery(){
    this.runQuery({});
  },
  render(){
    var clearBtn;
    if(this.props.query.q){
      clearBtn = <a
          className='input-group-addon'
          href='javascript:;'
          style={{background: 'transparent', borderLeft: 'none', boxShadow: 'none'}}
          onClick={this.clearQuery}>
          <span className='fa fa-times'/>
        </a>;
    }


    return <div className='input-group' style={{paddingBottom:10}}>
      <input
        type='search'
        className='form-control input-lg'
        placeholder='Search'
        name='q'
        value={this.props.query.q}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        ref='q'
        style={{borderRight: 'none', boxShadow: 'none'}}
        autoComplete='off'
      />
      {clearBtn}
      <div className='input-group-addon'>
        <a className='btn' onClick={this.runQuery}>
          <span className='fa fa-search'/>
        </a>
      </div>
    </div>
  }
});
