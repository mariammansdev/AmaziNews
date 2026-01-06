import React from 'react'
import PerformedImage from './PerformedImage'

//Todo: animation once it is rendered for showing there is info like a curtain opening effect then stays fixed
const NewsCard = ({article}) => {
  const onClickCard = (article) => {
    if (article && article.url) window.open(article.url);
  }
  return (
    <div className='card mx-4 bg-base-100 shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer shadow-secondary'
    onClick={()=>onClickCard(article)}>
        {article.urlToImage && <figure className="overflow-hidden rounded-lg shadow-lg">
            <PerformedImage 
              src={article.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'}
              alt={article.title}
              className="w-full h-full hover:h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            
        </figure>}
        <div className='card-body'>
          <h2 className='card-title'>
            {article.title}
          </h2>
          {article.source?.name && <p className='text-sm text-gray-500 mb-2'>Source: {article.source.name}</p>}
          <p>{article.description}</p>
          <div className='card-actions justify-end mt-4'>
            <a href={article.url} rel='noopener noreferer' target='_blank' className='btn btn-primary'>
              Read more
            </a>
          </div>
        </div>
    </div>
  )
}

export default NewsCard