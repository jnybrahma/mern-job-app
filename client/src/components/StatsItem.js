import React from 'react'
import Wrapper from '../assets/wrappers/StatItem'

const StatsItem = ({count, title,icon,color, bcg}) => {
  return (
    <Wrapper>
      <header>
      <span className='count'>{count}</span> 
      <div className='icon'>{icon}</div> 
      </header>
      <h5 className='title'>{title}</h5>
    </Wrapper>
  )
}

export default StatsItem
