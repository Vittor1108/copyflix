import React from 'react';
import { MovieRow } from './components/MovieRow';
import './App.css';
import Tmdb from './Tmdb';
import { FeaturedMovie } from './components/FeaturedMovie';
import { Header } from './components/Header';

export const App = () => {

  const [movieList, setMovieList] = React.useState([]);
  const [featuredData, setFeaturedData] = React.useState(null);
  const [blackHeader, setBlackHeader] = React.useState(false);

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

  React.useEffect(() => {

    const scrollListenner = () =>{
      if(window.scrollY > 10){
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListenner);
    return () => {
      window.removeEventListener('scroll', scrollListenner);
    }
  }, [])


  return (
    <div className="page">
        <Header black={blackHeader}/>

      <section className="lists">
        {featuredData && <FeaturedMovie item={featuredData} />}

        {movieList.map((movie, key) => 
          <MovieRow key={key} title={movie.title} items={movie.items}/>
        )}

      </section>
      
      <footer>
        Feito com <span role="img" arial-label="corãção">por Vittor Daniel ♥ </span><br/>
        Direitos de imagem da Netlfix<br/>
        Dados pego da Tmdb
      </footer>
      {movieList.length <= 0  &&
        <div className='loading'>
          <img src='https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif' alt='carregando'/>
        </div>    
      }
    </div>
  )
}
