/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-undef */
/* eslint-disable react/no-array-index-key */
import { h } from '@stencil/core';
import { parse } from '@saasquatch/stencil-html-parser';

export default function BlogSection(props) {
  const fromBlog = props.blogs;
  return (
    <div class="community-section">
      <div class="community-head">
        {fromBlog.title_h2 && <h2>{fromBlog.title_h2}</h2>}
        {fromBlog.view_articles && (
          <a href={fromBlog.view_articles.href} class="btn secondary-btn article-btn">{fromBlog.view_articles.title}</a>
        )}
      </div>
      <div class="home-featured-blogs">
        {fromBlog.featured_blogs.map((blog, index) => (
          <div class="featured-blog" key={index}>
            {blog.featured_image && <img src={blog.featured_image.url} alt={blog.featured_image.filename} class="blog-post-img" />}
            <div class="featured-content">
              {blog.title && <h3>{blog.title}</h3>}
              {blog.body && parse(blog.body.slice(0, 300))}
              {blog.url && (
                <a href={blog.url} class="blogpost-readmore">
                  {'Read More -->'}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
