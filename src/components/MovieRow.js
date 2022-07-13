import React from 'react'
import './MovieRow.css';

export const MovieRow = ({title, items}) => {


  return (
    <div className='movieRow'>
        <h2>{title}</h2>

        <div className="movieRow--listarea">

            <div className='movieRow--list'>
                {items.results.length > 0 && items.results.map((movie, key) =>

                    <div key={key} className='movieRow--item'>
                        <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}  alt={movie.originalTitle}/>
                    </div>

                )}
            </div>

        </div>  
    </div> 
  );
}
