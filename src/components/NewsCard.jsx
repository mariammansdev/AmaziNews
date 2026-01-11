import React from 'react'
import PerformedImage from './PerformedImage'

//Todo: animation once it is rendered for showing there is info like a curtain opening effect then stays fixed
const NewsCard = ({article}) => {
  const [overlayDone, setOverlayDone] = React.useState(false);
  const onClickCard = (article) => {
    if (article && article.url) window.open(article.url);
  }
  return (
    <div className='card mx-4 bg-base-100 shadow-sm hover:shadow-lg transition-shadow duration-600 cursor-pointer shadow-secondary relative curtain-container'
    onClick={()=>onClickCard(article)}>
        {/* Curtain overlay shows the article image and animates away */}
        {!overlayDone && (
          <div
            className="curtain-overlay"
            aria-hidden="true"
            onAnimationEnd={() => setOverlayDone(true)}
            style={{
              backgroundImage: `url(${article?.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}

        {article.urlToImage && <figure className="overflow-hidden rounded-lg shadow-lg">
            <PerformedImage 
              src={article.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'}
              alt={article.title}
              className={overlayDone ? '' : 'opacity-0'}
            />
        </figure>}
        <div className='card-body'>
          <h2 className='card-title'>
            {article.title}
          </h2>
          {article.source?.name && <p className='text-sm text-gray-500'>Source: {article.source.name}</p>}
          <p>{article.description}</p>
          <div className='card-actions justify-end mt-2'>
            <a href={article.url} rel='noopener noreferer' target='_blank' className='btn btn-primary'>
              Read more
            </a>
          </div>
        </div>
    </div>
  )
}

export default NewsCard