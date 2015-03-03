var React = require('react/addons');

var Breadcrumbs;
module.exports = Breadcrumbs = React.createClass({
  render(){
    var children = this.props.children.map((link,i) => {
      var classs = this.props.children.length - 1 === i ? 'active' : null
      return <li key={i} className={classs}>{link}</li>
    })
    return <ol className="breadcrumb">{children}</ol>
  }
});