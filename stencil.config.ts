import { Config } from '@stencil/core';
import dotenvPlugin from 'rollup-plugin-dotenv';

// https://stenciljs.com/docs/config

export const config: Config = {
  plugins: [
    dotenvPlugin()
  ],
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      // comment the following line to disable service workers in production
      serviceWorker: {
        globPatterns: [
          '**/*.{ts,css,json,html,ico,png}'
        ]
      },
      baseUrl: 'https://myapp.local/',
      copy: [
        { src: 'robots.txt' }
      ]
    },
  ],
};
