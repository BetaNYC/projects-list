React = require('react')
RepoStore = require('stores/RepoStore')
createStoreMixin = require('mixins/createStoreMixin')
isEmpty = require('lodash/lang/isEmpty')

module.exports = React.createClass
  mixins: [createStoreMixin(RepoStore)]
  getStateFromStores: (props)->
    repos: []

  render: ->
    return null if isEmpty(@state.repos)
    `<div className='input-group'>
      <input type='search' className='form-control input-lg' placeholder='Search' name='q' />
      <div className='input-group-addon'>
        <a className='btn '>
          <span className='fa fa-search'/>
        </a>
      </div>
    </div>`