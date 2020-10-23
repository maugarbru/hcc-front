let config = {
  api: {
    // Server
    url: 'https://art-portfolio-api.herokuapp.com/api/v1/',
    // Local
    // url: 'http://localhost:3001/api/v1/',
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
