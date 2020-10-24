let config = {
  api: {
    // Local
    url: 'http://localhost:3001/api/v1/',
    src_movie_cover: 'https://image.tmdb.org/t/p/w500',
    src_movie_backdrop: 'https://image.tmdb.org/t/p/original',
    src_game: 'https://images.igdb.com/igdb/image/upload/t_720p/',
    src_game2: 'https://images.igdb.com/igdb/image/upload/t_1080p/',
    movies_path: 'D:\\utorrent\\movies\\',
    games_path: 'D:\\utorrent\\games\\'
  },
  routes: [
    {
      icon: 'mdi-home',
      title: 'Home',
      to: '/',
    }
  ]
}

export default config
