import {getEntry, getEntryByUrl} from '../sdk-plugin';
import { addEditableTags } from '@contentstack/utils';
import { Env } from '@stencil/core';
import { isEmpty } from "lodash";
import { FooterRes, HeaderRes } from "../typescript/response";
import { PageProps } from "../typescript/layout";

let liveEdit = false;
if (!isEmpty(Env)) {
  liveEdit = Env.CONTENTSTACK_LIVE_EDIT_TAGS === 'true';
} else {
  liveEdit = process.env.CONTENTSTACK_LIVE_EDIT_TAGS === 'true';
}

export const getHeaderRes = async ():Promise<HeaderRes> => {
  const response = await getEntry({
    contentTypeUid: 'header',
    referenceFieldPath: ['navigation_menu.page_reference'],
    jsonRtePath: ['notification_bar.announcement_text'],
  }) as HeaderRes[][];

  liveEdit && addEditableTags(response[0][0], 'header', true);
  return response[0][0];
};

export const getFooterRes = async ():Promise<FooterRes> => {
  const response = await getEntry({
    contentTypeUid: 'footer',
    referenceFieldPath: undefined,
    jsonRtePath: ['copyright'],
  }) as FooterRes[][];
  liveEdit && addEditableTags(response[0][0], 'footer', true);
  return response[0][0];
};

export const getAllEntries = async ():Promise<PageProps[]> => {
  const response = await getEntry({
    contentTypeUid: 'page',
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  }) as PageProps[][];
  liveEdit && response[0].forEach(entry => addEditableTags(entry, 'page', true));
  return response[0];
};

export const getPageRes = async (entryUrl):Promise<PageProps> => {
  const response = await getEntryByUrl({
    contentTypeUid: 'page',
    entryUrl,
    referenceFieldPath: ['page_components.from_blog.featured_blogs'],
    jsonRtePath: [
      'page_components.from_blog.featured_blogs.body',
      'page_components.section_with_buckets.buckets.description',
      'page_components.section_with_html_code.description',
    ],
  }) as PageProps[];
  liveEdit && addEditableTags(response[0], 'page', true);
  return response[0];
};

export const getBlogListRes = async () => {
  const response = await getEntry({
    contentTypeUid: 'blog_post',
    referenceFieldPath: ['author', 'related_post'],
    jsonRtePath: ['body'],
  });
  liveEdit && response[0].forEach(entry => addEditableTags(entry, 'blog_post', true));
  return response[0];
};

export const getBlogPostRes = async entryUrl => {
  const response = await getEntryByUrl({
    contentTypeUid: 'blog_post',
    entryUrl,
    referenceFieldPath: ['author', 'related_post'],
    jsonRtePath: ['body', 'related_post.body'],
  });
  liveEdit && addEditableTags(response[0], 'blog_post', true);
  return response[0];
};
