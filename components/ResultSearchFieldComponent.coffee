React = require('react')
RepoStore = require('stores/RepoStore')
createStoreMixin = require('mixins/createStoreMixin')
{Navigation} = require('react-router')


isEmpty = require('lodash/lang/isEmpty')

module.exports = ResultSearchFieldComponent = React.createClass
  mixins: [createStoreMixin(RepoStore),Navigation]
  getInitialState: -> {value: @props.query?.q}
  getStateFromStores: (props)->
    repos: []
  onChange: (e)->
    @setState(value: e.target.value)
  runQuery: ->
    if @state.value
      @replaceWith("homePage", {}, {q: @state.value})
    else
      if @refs.q.value
        @setState(value: @refs.q.value)
      else
        @replaceWith("homePage")
  onKeyDown: (e)->
    @runQuery() if e.which is 13
  render: ->
    `<div className='input-group'>
      <input type='search' className='form-control input-lg' placeholder='Search' name='q' value={this.state.value} onChange={this.onChange} onKeyDown={this.onKeyDown} ref='q' />
      <div className='input-group-addon'>
        <a className='btn' onClick={this.runQuery}>
          <span className='fa fa-search'/>
        </a>
      </div>
    </div>`