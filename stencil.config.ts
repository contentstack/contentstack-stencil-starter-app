import { Config } from '@stencil/core';
import dotenvPlugin from 'rollup-plugin-dotenv';
import fs from 'fs';

export const config: Config = {

  plugins: fs.existsSync('./.env') ? [dotenvPlugin()] : [],
  env: !fs.existsSync('./.env') ? {
    CONTENTSTACK_API_KEY: process.env.CONTENTSTACK_API_KEY,
    CONTENTSTACK_DELIVERY_TOKEN: process.env.CONTENTSTACK_DELIVERY_TOKEN,
    CONTENTSTACK_ENVIRONMENT: process.env.CONTENTSTACK_ENVIRONMENT,
    CONTENTSTACK_REGION: process.env.CONTENTSTACK_REGION || "us"
  } : {},
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
