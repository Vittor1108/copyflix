import React from 'react';
import './FeatureMovie.css';

export const FeaturedMovie = ({item}) => {

    const firstDate = new Date(item.first_air_date);
    let genres = [];
    for(let i of item.genres){
        genres.push(i.name)
    }
    
    return (
        <section className='featured' style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className='featured--vertical'>
                <div className='featured--horizontal'>
                    <div className='featured--name'>{item.original_name}</div>
                    <div className='featured--info'>
                        <div className='featured--points'>{item.vote_average} pontos</div>
                        <div className='featured--year'>{firstDate.getFullYear()}</div>
                        <div className='featured--seasons'>{item.number_of_seasons} temporada{item.number_of_seasons > 1 ? 's' : ''}</div>
                        <div className='featured--description'>{item.overview}</div>
                        <div className='featured--buttons'>
                            <a href='' className='featured--watchbutton'>► Assitir</a>
                            <a href='' className='featured--mylistbutton'>+ Minha Lista</a>
                        </div>
                        <div className='featured--genrs'><strong>Gêneros:</strong>{genres.join(', ')}</div>
                    </div>
                </div>
            </div>
        </section >
    )
}
