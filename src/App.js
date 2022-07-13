import React from 'react';
import { MovieRow } from './components/MovieRow';
import './App.css';
import Tmdb from './Tmdb';
import { FeaturedMovie } from './components/FeaturedMovie';

export const App = () => {

  const [movieList, setMovieList] = React.useState([]);
  const [featuredData, setFeaturedData] = React.useState(null);
  React.useEffect(() => {

    const loadAll = async () => {

      // Pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Pegando o Feature
      let originals = list.filter(item => item.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getmMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    };

    loadAll();

  }, []);



  return (
    <div className="page">

      <section className="lists">

        {featuredData && <FeaturedMovie item={featuredData} />}

        {movieList.map((movie, key) => 
          <MovieRow key={key} title={movie.title} items={movie.items}/>
        )}

      </section>

    </div>
  )
}
