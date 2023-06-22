import { h } from '@stencil/core';
import { parse } from '@saasquatch/stencil-html-parser';
import { FeaturedBlogData } from '../typescript/component';

type FeaturedBlogProps = {
  blogs: FeaturedBlogData;
  key: string;
}

export default function BlogSection(props: FeaturedBlogProps) {
  const fromBlog = props.blogs;
  return (
    <div class="community-section">
      <div class="community-head">
        {fromBlog.title_h2 && <h2 {...fromBlog.$?.title_h2 as {}}>{fromBlog.title_h2}</h2>}
        {fromBlog.view_articles && (
          <a {...fromBlog.view_articles.$?.href as {}} href={fromBlog.view_articles.href} class="btn secondary-btn article-btn">
            {fromBlog.view_articles.title}
          </a>
        )}
      </div>
      <div class="home-featured-blogs">
        {fromBlog.featured_blogs.map((blog, index) => (
          <div class="featured-blog" key={`blog-${index}`}>
            {blog.featured_image && <img {...blog.featured_image.$?.url as {}} src={blog.featured_image.url} alt={blog.featured_image.filename} class="blog-post-img" />}
            <div class="featured-content">
              {blog?.title && <h3 {...blog.$?.title as {}}>{blog.title}</h3>}
              {blog?.body && <span {...blog.$?.body as {}}>{parse(blog.body.slice(0, 300))}</span>}
              {blog?.url && (
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
