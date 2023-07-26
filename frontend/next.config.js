/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ENVIROMENT: 'development',
    MAXAGE: 2592000,
    BACKEND: 'http://localhost/projector/',
    FRONTEND: 'http://localhost:3000/',
    PAGE_TITLE: 'Projector'
  }
}

module.exports = nextConfig
