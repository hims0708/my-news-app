import React from 'react'

const Card = ({ data }) => {
    return (
        <div className='cardContainer'>
            {data.map((curItem, index) => {
                if (!curItem.urlToImage || !curItem.title) {
                    return null
                }

                return (
                    <article className='card' key={index}>
                        <img
                            src={curItem.urlToImage}
                            alt={curItem.title}
                            loading="lazy"
                        />
                        <div className='content'>
                            <h3
                                className='title'
                                onClick={() => window.open(curItem.url, '_blank')}
                                role="button"
                                tabIndex="0"
                            >
                                {curItem.title}
                            </h3>
                            <p>{curItem.description || "Click read more to view the full story."}</p>
                            <button
                                onClick={() => window.open(curItem.url, '_blank')}
                                aria-label={`Read more about ${curItem.title}`}
                            >
                                Read More
                            </button>
                        </div>
                    </article>
                )
            })}
        </div>
    )
}

export default Card