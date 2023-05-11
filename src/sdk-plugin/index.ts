import contentstack from 'contentstack';
import * as Utils from '@contentstack/utils';
import { Env } from '@stencil/core';
import ContentstackLivePreview from '@contentstack/live-preview-utils';

let stackConfig, hostUrl;
if (Object.keys(Env).length > 0) {
  stackConfig = {
    api_key: Env.CONTENTSTACK_API_KEY,
    delivery_token: Env.CONTENTSTACK_DELIVERY_TOKEN,
    environment: Env.CONTENTSTACK_ENVIRONMENT,
    branch: process.env.CONTENTSTACK_BRANCH,
    region: process.env.CONTENTSTACK_REGION,
    live_preview: {
      host: Env.CONTENTSTACK_API_HOST,
      enable: Env.CONTENTSTACK_LIVE_PREVIEW === 'true',
      management_token: Env.CONTENTSTACK_MANAGEMENT_TOKEN,
    },
    clientUrlParams: {
      host: Env.CONTENTSTACK_APP_HOST,
    },
  };
  hostUrl = Env.CONTENTSTACK_API_HOST;
} else {
  stackConfig = {
    api_key: process.env.CONTENTSTACK_API_KEY,
    delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
    environment: process.env.CONTENTSTACK_ENVIRONMENT,
    branch: process.env.CONTENTSTACK_BRANCH,
    region: process.env.CONTENTSTACK_REGION,
    live_preview: {
      host: process.env.CONTENTSTACK_API_HOST,
      enable: process.env.CONTENTSTACK_LIVE_PREVIEW === 'true',
      management_token: process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
    },
    clientUrlParams: {
      host: process.env.CONTENTSTACK_APP_HOST,
    },
  };
  hostUrl = process.env.CONTENTSTACK_API_HOST;
}

const Stack = contentstack.Stack(stackConfig);
Stack.setHost(hostUrl);

ContentstackLivePreview.init({
  ssr: false,
  //@ts-ignore
  stackSdk: Stack,
  clientUrlParams: {
    host: stackConfig.clientUrlParams.host,
  },
});

const renderOption = {
  ['span']: (node, next) => {
    return next(node.children);
  },
};

export const onEntryChange = ContentstackLivePreview.onEntryChange;

export default {
  /**
   *
   * fetches all the entries from specific content-type
   * @param {* content-type uid} contentTypeUid
   * @param {* reference field name} referenceFieldPath
   *
   */
  getEntry({ contentTypeUid, referenceFieldPath, jsonRtePath }) {
    return new Promise((resolve, reject) => {
      const query = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) query.includeReference(referenceFieldPath);
      query
        .includeOwner()
        .toJSON()
        .find()
        .then(
          result => {
            jsonRtePath &&
              Utils.jsonToHTML({
                entry: result,
                paths: jsonRtePath,
                renderOption,
              });
            resolve(result);
            resolve(result);
          },
          error => {
            reject(error);
          },
        );
    });
  },

  /**
   *fetches specific entry from a content-type
   *
   * @param {* content-type uid} contentTypeUid
   * @param {* url for entry to be fetched} entryUrl
   * @param {* reference field name} referenceFieldPath
   * @returns
   */
  getEntryByUrl({ contentTypeUid, entryUrl, referenceFieldPath, jsonRtePath }) {
    return new Promise((resolve, reject) => {
      const blogQuery = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
      blogQuery.includeOwner().toJSON();
      const data = blogQuery.where('url', `${entryUrl}`).find();
      data.then(
        result => {
          jsonRtePath &&
            Utils.jsonToHTML({
              entry: result,
              paths: jsonRtePath,
              renderOption,
            });
          resolve(result[0]);
        },
        error => {
          reject(error);
        },
      );
    });
  },
};
