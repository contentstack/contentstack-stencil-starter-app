import contentstack from 'contentstack';
import * as Utils from '@contentstack/utils';
import { Env } from '@stencil/core';
import ContentstackLivePreview from '@contentstack/live-preview-utils';
import { customHostUrl, isValidCustomHostUrl } from './utils';
import { isEmpty } from 'lodash';

let stackConfig, hostUrl;
if (!isEmpty(Env)) {
  stackConfig = {
    api_key: Env.CONTENTSTACK_API_KEY,
    delivery_token: Env.CONTENTSTACK_DELIVERY_TOKEN,
    environment: Env.CONTENTSTACK_ENVIRONMENT,
    branch: Env.CONTENTSTACK_BRANCH,
    region: Env.CONTENTSTACK_REGION,
    live_preview: {
      host: Env.CONTENTSTACK_PREVIEW_HOST,
      enable: Env.CONTENTSTACK_LIVE_PREVIEW === 'true',
      preview_token: Env.CONTENTSTACK_PREVIEW_TOKEN,
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
      host: process.env.CONTENTSTACK_PREVIEW_HOST,
      enable: process.env.CONTENTSTACK_LIVE_PREVIEW === 'true',
      preview_token: process.env.CONTENTSTACK_PREVIEW_TOKEN,
    },
    clientUrlParams: {
      host: process.env.CONTENTSTACK_APP_HOST,
    },
  };
  hostUrl = process.env.CONTENTSTACK_API_HOST;
}
const Stack = contentstack.Stack(stackConfig);
hostUrl = hostUrl ? customHostUrl(hostUrl) : '';
if (hostUrl && isValidCustomHostUrl(hostUrl)) {
  Stack.setHost(hostUrl);
}

ContentstackLivePreview.init({
  ssr: false,
  //@ts-ignore
  stackSdk: Stack,
}).catch(err => console.error(err));

const renderOption = {
  ['span']: (node, next) => {
    return next(node.children);
  },
};

export const onEntryChange = ContentstackLivePreview.onEntryChange;

/**
 *
 * fetches all the entries from specific content-type
 * @param {* content-type uid} contentTypeUid
 * @param {* reference field name} referenceFieldPath
 *
 */
export const getEntry = ({ contentTypeUid, referenceFieldPath, jsonRtePath }) => {
  return new Promise((resolve, reject) => {
    const query = Stack.ContentType(contentTypeUid).Query();
    if (referenceFieldPath) query.includeReference(referenceFieldPath);
    query
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
};

/**
 *fetches specific entry from a content-type
 *
 * @param {* content-type uid} contentTypeUid
 * @param {* url for entry to be fetched} entryUrl
 * @param {* reference field name} referenceFieldPath
 * @returns
 */
export const getEntryByUrl = ({ contentTypeUid, entryUrl, referenceFieldPath, jsonRtePath }) => {
  return new Promise((resolve, reject) => {
    const blogQuery = Stack.ContentType(contentTypeUid).Query();
    if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
    blogQuery.toJSON();
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
};
