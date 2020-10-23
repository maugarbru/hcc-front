let config = {
  api: {
    // Local
    url: 'http://localhost:3001/api/v1/',
    src: 'https://image.tmdb.org/t/p/w500',
    movies_path: 'D:\\utorrent\\'
  },
  routes: [
    {
      icon: 'mdi-home',
      title: 'Home',
      to: '/',
    },
    {
      icon: 'mdi-draw',
      title: 'Art Gallery',
      to: '/art',
    },
    {
      icon: 'mdi-chart-bubble',
      title: 'Blog',
      to: '/blog',
    },
    {
      icon: 'mdi-store',
      title: 'Catalogue',
      to: '/catalogue',
    },
  ]
}

export default config
