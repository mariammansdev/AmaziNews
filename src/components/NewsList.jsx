import React from 'react'
import NewsCard from './NewsCard'

const NewsList = ({news}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {
         news.map((article, idx) => 
            <NewsCard key={idx} article={article} />
        )
    }
    </div>
  )
}

export default NewsList