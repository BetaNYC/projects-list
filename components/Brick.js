var React = require('react/addons');
var {PropTypes: T} = React;


var Brick;

Brick = React.createClass({
  propTypes: {
    icon: T.string.isRequired,
    text: T.string.isRequired
  },
  componentDidMount(){
    $('.brick-text').fitText()
  },
  render(){
    return <div className='brick'>
      <div className='brick-icon'>
        <img src={require('images/'+this.props.icon+'.svg')}/>
      </div>
      <div className='brick-text'>
        {this.props.text}
      </div>
    </div>
  }
})

module.exports = Brick;



