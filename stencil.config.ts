import { Config } from '@stencil/core';
import dotenvPlugin from 'rollup-plugin-dotenv';
import fs from 'fs';

export const config: Config = {
  plugins: [dotenvPlugin()],
  env: {
    CONTENTSTACK_API_KEY: process.env.CONTENTSTACK_API_KEY,
    CONTENTSTACK_DELIVERY_TOKEN: process.env.CONTENTSTACK_DELIVERY_TOKEN,
    CONTENTSTACK_ENVIRONMENT: process.env.CONTENTSTACK_ENVIRONMENT,
    CONTENTSTACK_BRANCH: process.env.CONTENTSTACK_BRANCH,
    CONTENTSTACK_REGION: process.env.CONTENTSTACK_REGION,
    CONTENTSTACK_MANAGEMENT_TOKEN: process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
    CONTENTSTACK_API_HOST: process.env.CONTENTSTACK_API_HOST,
    CONTENTSTACK_APP_HOST: process.env.CONTENTSTACK_APP_HOST,
    CONTENTSTACK_LIVE_PREVIEW: process.env.CONTENTSTACK_LIVE_PREVIEW,
    CONTENTSTACK_LIVE_EDIT_TAGS: process.env.CONTENTSTACK_LIVE_EDIT_TAGS,
  },
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      // comment the following line to disable service workers in production
      serviceWorker: {
        globPatterns: ['**/*.{ts,css,json,html,ico,png}'],
      },
      baseUrl: 'https://myapp.local/',
      copy: [{ src: 'robots.txt' }],
    },
  ],
};
