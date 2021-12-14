const API_KEY = '98d97bdfc0863b5b287100817bdc7e75';
const API_BASE = 'https://api.themoviedb.org/3';

/*
- originais da netflix
- recomendados (trending)
- em alta (top rated)
- acao
- comedia
- terror
- romance
- documentarios
*/

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`); // esta fazendo uma requisicao para um servico externo. Quando ele recebe essa resposta, vai para a segunda linha
    const json = await req.json(); // ele roda esse comando e espera a resposta (o await significa que ele deve esperar essa resposta e entao ir para o proximo comando)
    return json;
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Netflix Originals',
                items: await basicFetch(`/discover/tv?with_network=213&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Trending Now',
                items: await basicFetch(`/trending/all/week?&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Popular on Netflix',
                items: await basicFetch(`/movie/top_rated?&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Acion',
                items: await basicFetch(`/discover/movie?with_genres=28&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comedies',
                items: await basicFetch(`/discover/movie?with_genres=35&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Horror Movies',
                items: await basicFetch(`/discover/movie?with_genres=27&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentaries',
                items: await basicFetch(`/discover/movie?with_genres=99&api_key=${API_KEY}`)
            }
        ]
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};

        if(movieId) {
            switch(type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?api_key=${API_KEY}`);
                break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?api_key=${API_KEY}`);
                break;
                default:
                    info = null;
                break;
            }
        }

        return info;
    }

}