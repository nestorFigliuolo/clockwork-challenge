import React, { Children, useState } from 'react'
import PropTypes from 'prop-types'
const MAX_STARS = 5

function StarFilter (props) {
  const [numberSelected, setNumberSelected] = useState(3)
  const [hoverNumberSelected, setHoverNumberSelected] = useState(numberSelected)
  const [isHovering, setIsHovering] = useState(false)

  const onHoverStar = (index) => {
    setIsHovering(true)
    setHoverNumberSelected(index)
  }

  const onHoverStarExit = () => {
    setIsHovering(false)
  }

  const onStarClick = (index) => {
    setNumberSelected(index)
    if (index === numberSelected) {
      props.setStarsFilter(null)
    } else {
      props.setStarsFilter(index)
    }
  }

  const genStars = () => {
    const limit = (isHovering) ? hoverNumberSelected : numberSelected
    const stars = []
    for (let i = 1; i <= MAX_STARS; i++) {
      stars.push(<img
        className='star m-1'
        key={i}
        src={(i <= limit) ? '/star-selected.svg' : '/star-unselected.svg'}
        onMouseEnter={() => onHoverStar(i)}
        onMouseLeave={() => onHoverStarExit()}
        onClick={() => onStarClick(i)}
      />)
    }
    return stars
  }

  return (
    <div className='filterContainerBubble flex flex-col justify-start space-y-4 p-5'>
      <p className='starFilterTitle text-left'>Rating</p>
      <div className='flex flex-row '>
        {genStars()}
      </div>
    </div>
  )
}

StarFilter.propTypes = {
  setStarsFilter: PropTypes.func
}

export default StarFilter
