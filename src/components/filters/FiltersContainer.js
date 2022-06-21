import React from 'react'
import PropTypes from 'prop-types'
import GenreFilter from './GenreFilter'
import StarFilter from './StarFilter'

function showFilters (props, enabledFilters) {
  if (enabledFilters) {
    return (
      <div className='flex flex-col gap-4'>
        <p className='genreFilterTitle'>Filter by</p>
        <StarFilter setStarsFilter={props.setStarsFilter}/>
        <GenreFilter search={props.search} setGenresFilter={props.setGenresFilter}/>
      </div>
    )
  }
}

function FiltersContainers (props) {
  return (
    <div>
      {showFilters(props, props.enabledFilters)}
    </div>
  )
}

FiltersContainers.propTypes = {
  enabledFilters: PropTypes.bool
}

export default FiltersContainers
