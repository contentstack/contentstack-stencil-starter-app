/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-undef */
/* eslint-disable react/no-array-index-key */
import { h } from '@stencil/core';
import { parse } from '@saasquatch/stencil-html-parser';
import { FeaturedBlogData } from '../typescript/component';

type FeaturedBlogProps = {
  blogs: FeaturedBlogData;
  key: string;
};

export default function BlogSection(props: FeaturedBlogProps) {
  const fromBlog = props.blogs;
  return (
    <div class="community-section">
      <div class="community-head">
        {fromBlog.title_h2 && <h2 {...fromBlog.$?.title_h2}>{fromBlog.title_h2}</h2>}
        {fromBlog.view_articles && (
          <a {...(typeof fromBlog.view_articles.$?.href === 'object' ? fromBlog.view_articles.$?.href : {})} href={fromBlog.view_articles.href} class="btn secondary-btn article">
            {fromBlog.view_articles.title}
          </a>
        )}
      </div>
      <div class="home-featured-blogs">
        {fromBlog.featured_blogs.map((blog, index) => (
          <div class="featured-blog" key={index}>
            {blog.featured_image && (
              <img {...(typeof blog.featured_image.$?.url === 'object' ? blog.featured_image.$?.url : {})} src={blog.featured_image.url} alt={blog.featured_image.filename} />
            )}
            <div class="featured-content">
              {blog.title && <h3 {...blog.$?.title}>{blog.title}</h3>}
              {blog.body && <span {...blog.$?.body}>{parse(blog.body.slice(0, 300))}</span>}
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
