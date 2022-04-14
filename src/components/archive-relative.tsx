/* eslint-disable jsx-a11y/anchor-is-valid */
import { parse } from '@saasquatch/stencil-html-parser';
import { h, Fragment } from '@stencil/core';

export default function ArchiveRelative(props) {
  const { blogs } = props;
  return (
    <Fragment>
      {blogs?.map((blog: any, idx: any) => (
        <a href={blog.url} {...blog.$?.url} key={idx}>
          <div>
            <h4 {...blog.$?.title}>{blog.title}</h4>
            {parse(blog.body.slice(0, 80))}
          </div>
        </a>
      ))}
    </Fragment>
  );
}
