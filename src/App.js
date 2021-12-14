import React, { useEffect, useState } from "react";
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null); //quando nao houver filme em destaque para mostrar, fica nulo. Preencher o featuredData com o filme em destaque
  const [blackHeader, setblackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () => {
      // Pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando o featured (mostra itens da netflix aleatoriamente)
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1)); // Gerou um numero aleatorio
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    
    }

    loadAll();
  }, []);

  useEffect(()=> {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setblackHeader(true);
      } else {
        setblackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader} />
      
      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }
      
      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/> 
        ))}
      </section>

      <footer>
      Made with️ <span role="img" aria-label="heart">❤️</span> by Thais Santiago<br/>
      All image rights reserved for Netflix<br/>
      Data source: Themoviedb.org
      </footer>

    {movieList.length <= 0 &&
      <div className="loading">
        <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" />
      </div>
    }
    </div>
  );
}