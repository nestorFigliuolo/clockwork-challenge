import React from 'react'
import PropTypes from 'prop-types'
import GenreFilter from './GenreFilter'
import StarFilter from './StarFilter'

function showFilters (props, enabledFilters) {
  if (enabledFilters) {
    return (
      <div className='flex flex-col gap-4'>
        <StarFilter setStarsFilter={props.setStarsFilter}/>
        <GenreFilter search={props.search} setGenresFilter={props.setGenresFilter}/>
      </div>
    )
  }
}

function FiltersContainers (props) {
  return (
    <div>
      <div className={`${(!props.enabledFilters) ? 'filterContainerDisabled' : ''} flex flex-row gap-4`}>
        <img src={(props.enabledFilters) ? '/filters-enabled.svg' : '/filters-disabled.svg'} />
        <p className='filterContainerTitle text-left'>Filter by</p>
      </div>
      {showFilters(props, props.enabledFilters)}
    </div>
  )
}

FiltersContainers.propTypes = {
  enabledFilters: PropTypes.bool
}

export default FiltersContainers
