import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ColorTools Studio',
    short_name: 'ColorTools',
    description:
      'Creative Agency Grade Color Suite - palette generator, contrast checker, gradient studio and converter.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0B0E',
    theme_color: '#6366f1',
    icons: [
      { src: '/icon', sizes: '192x192', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
