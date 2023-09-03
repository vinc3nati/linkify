import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'linkify',
    short_name: 'linkify',
    description: 'Best way to summarize your online portfolio',
    start_url: '/',
    display: 'standalone',
    background_color: '#f4faff',
    theme_color: '#4361ee',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}