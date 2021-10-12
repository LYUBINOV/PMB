export const TMDB_URL='http://api.themoviedb.org/3';

export const TMDB_POPULAR_MOVIES='/movie/popular?page={0}';
export const TMDB_POPULAR_TVS='/movie/popular?page={0}';

export const TMDB_GENRE_DOCUMENTARY='/discover/movie?api_key=9db6197866934a53c13a28e02fa72b83&with_genres=99';
export const TMDB_GENRE_FAMILY='/discover/movie?api_key=9db6197866934a53c13a28e02fa72b83&with_genres=10751';

export const TMDB_API_KEY_SUFFIX='&api_key=';
export const TMDB_API_KEY='9db6197866934a53c13a28e02fa72b83';

export const TMDB_POSTER_IMAGE = (width) => { return 'http://image.tmdb.org/t/p/w' + width; };

export const getImageUri = (item, postersCount) => {
   return (
      (postersCount === 1) ?
      (TMDB_POSTER_IMAGE(500) + item.backdrop_path) : 
      (TMDB_POSTER_IMAGE(200) + item.poster_path)
   )
};

export const getItemTitle = (item, uncut) => {
   let retVal;

   if(uncut) {
      retVal = item.title;
   }
   else {
      retVal = (item.title.length > 25) ? (item.title.substr(0, 25) + ' ...') : item.title;
   }
   return retVal;
};

export const getItemDescription = (item, postersCount, category, uncut) => {
   let retVal;

   if(postersCount === 1) {
      if(uncut) {
         retVal = item.overview;
      }
      else {
         retVal = (item.overview.length > 100) ? (item.overview.substr(0, 100) + ' ...') : item.overview;
      }
   }
   else {
      retVal = category;
   }

   return retVal;
};