import React, { useEffect, useState } from 'react'
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
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    setEnabled(props.enabledFilters)
  }, [props.enabledFilters])

  const onClickFilterBy = () => {
    setEnabled(!enabled)
  }

  return (
    <div>
      {/* Aca uso la prop enabledFilters para que no se ponga en gris cuando clickeo para abrir o cerrar los filtros */}
      <div className={`${(!props.enabledFilters) ? 'filterContainerDisabled' : ''} flex flex-row gap-4 mb-6 `} onClick={onClickFilterBy}>
        <img src={(enabled) ? '/filters-enabled.svg' : '/filters-disabled.svg'} />
        <p className='filterContainerTitle text-left'>Filter by</p>
      </div>
      {showFilters(props, enabled)}
    </div>
  )
}

FiltersContainers.propTypes = {
  enabledFilters: PropTypes.bool
}

export default FiltersContainers
