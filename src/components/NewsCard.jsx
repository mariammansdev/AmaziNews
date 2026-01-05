import React from 'react'
import PerformedImage from './PerformedImage'

const NewsCard = ({article}) => {
  return (
    <div className='card bg-base-100 shadow-2xl'>
        <figure className="overflow-hidden rounded-lg shadow-lg">
            <PerformedImage 
              src={article.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'}
              alt={article.title}
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            />
            
        </figure>
    </div>
  )
}

export default NewsCard