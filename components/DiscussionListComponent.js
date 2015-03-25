var React = require('react/addons');
var moment = require('moment');


// Stores
var DiscoursePostStore = require('stores/DiscoursePostStore');

// Actions
var DiscourseActionCreators = require('actions/DiscourseActionCreators');

// Mixins
var createStoreMixin = require('mixins/createStoreMixin');


var DiscussionListComponent;
module.exports = DiscussionListComponent = React.createClass({
  propTypes: {
    repo: React.PropTypes.object.isRequired
  },

  mixins: [
    createStoreMixin(
      DiscoursePostStore
    )
  ],
  componentDidMount(){
    // TODO: get the search term from a source that can yield more search results. Perhaps include keywords field in the project.
    DiscourseActionCreators.requestSearch({term: this.props.repo.name});
  },
  getStateFromStores(props){
    return {
      posts: DiscoursePostStore.getAllPosts(),
      topics: DiscoursePostStore.getAllTopics()
    }
  },
  render(){
    let {name} = this.props.repo  || {};
    let fetchingIssues = name ? DiscoursePostStore.isExpectingPage(name) : false;
    let posts = [];
    let topics = [];
    this.state.topics.forEach((topic,i)=>{
      topics.push(<div className='discussion-topic' key={i}>
        <a href={'http://talk.beta.nyc/t/' + topic.slug} target='_blank'>{topic.title}</a>
      </div>);
    });
    this.state.posts.forEach((post,i)=>{
      posts.push(<div className='discussion-post media' key={i}>
        <div className='media-left media-top'>
          <img src={'http://talk.beta.nyc' + post.avatarTemplate.replace(/{size}/,'45')} className='img-rounded' />
        </div>

        <div  className='media-body'>
          <p><b>{post.name}</b></p>
          <div dangerouslySetInnerHTML={{__html: post.blurb}}/>
          <p><a href={'http://talk.beta.nyc/t/' + post.topicSlug}>{moment(post.createdAt).fromNow()}</a></p>

        </div>

      </div>);
    });

    return <div>
      <h4>Topics</h4>
      {topics.length > 0 ? <div className='discussion-topic-list'>
          {topics}
        </div> : <i>No topics about this project</i>}

      <h4>Posts</h4>
      {posts.length > 0 ? posts : <i>No posts about this project</i>}
    </div>
  }
});
