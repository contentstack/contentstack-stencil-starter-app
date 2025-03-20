/* eslint-disable jsx-a11y/anchor-is-valid */
import { parse } from '@saasquatch/stencil-html-parser';
import { h, Fragment } from '@stencil/core';

type AdditionalParam = {
  title: {};
  body: {};
  url: string;
}

type Data = {
  url: string;
  body: string;
  title: string;
  $: AdditionalParam;
}

type BlogListProps = {
  blogs: [Data];
}

export default function ArchiveRelative(props: BlogListProps) {
  const { blogs } = props;
  return (
    <Fragment>
      {blogs?.map((blog, idx: number) => (
        <a href={blog.url} {...(typeof blog.$?.url === 'object' ? blog.$?.url : {})} key={idx}>
        <div>
            <h4 {...blog.$?.title}>{blog.title}</h4>
            {<div {...blog.$?.body}>{parse(blog.body.slice(0, 80))}</div>}
          </div>
        </a>
      ))}
    </Fragment>
  );
}
