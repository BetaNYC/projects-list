var React = require('react/addons');


// Stores
var DiscoursePostStore = require('stores/DiscoursePostStore');

// Actions
var DiscourseActionCreators = require('actions/DiscourseActionCreators');

// Mixins
var createStoreMixin = require('mixins/createStoreMixin');


var IssueListComponent;
module.exports = IssueListComponent = React.createClass({
  propTypes: {
    repo: React.PropTypes.object
  },
  mixins: [
    createStoreMixin(
      DiscoursePostStore
    )
  ],
  componentDidMount(){
    DiscourseActionCreators.requestSearch({term: '311'});
  },
  getStateFromStores(props){
    return {

    }
  },
  render(){
    let {name} = this.props.repo  || {};
    let fetchingIssues = name ? DiscoursePostStore.isExpectingPage(name) : true;

    return <div>

      hello world
    </div>
  }
});
