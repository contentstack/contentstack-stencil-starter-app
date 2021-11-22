import contentstack from 'contentstack';
import { Env } from '@stencil/core';

const Stack = Object.keys(Env).length > 0 ? contentstack.Stack(
  Env.CONTENTSTACK_API_KEY,
  Env.CONTENTSTACK_DELIVERY_TOKEN,
  Env.CONTENTSTACK_ENVIRONMENT,
  Env.CONTENTSTACK_REGION
): contentstack.Stack(
  process.env.CONTENTSTACK_API_KEY,
  process.env.CONTENTSTACK_DELIVERY_TOKEN,
  process.env.CONTENTSTACK_ENVIRONMENT,
  process.env.CONTENTSTACK_REGION
)

export default {
  /**
   *
   * fetches all the entries from specific content-type
   * @param {* content-type uid} contentTypeUid
   * @param {* reference field name} referenceFieldPath
   *
   */
  getEntry(contentTypeUid, referenceFieldPath) {
    return new Promise((resolve, reject) => {
      const query = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) query.includeReference(referenceFieldPath);
      query
        .includeOwner()
        .toJSON()
        .find()
        .then(
          result => {
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
  getEntryByUrl(contentTypeUid, entryUrl, referenceFieldPath) {
    return new Promise((resolve, reject) => {
      const blogQuery = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
      blogQuery.includeOwner().toJSON();
      const data = blogQuery.where('url', `${entryUrl}`).find();
      data.then(
        result => {
          resolve(result[0]);
        },
        error => {
          reject(error);
        },
      );
    });
  },
};
