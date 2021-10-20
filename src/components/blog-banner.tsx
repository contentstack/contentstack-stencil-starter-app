import { h } from '@stencil/core';

/* eslint-disable camelcase */
export default function BlogBanner(props) {
  const { blog_banner } = props;
  return (
    <div class="blog-page-banner">
      <div class="blog-page-content">
        {blog_banner.banner_title && <h1 class="hero-title">{blog_banner.banner_title}</h1>}

        {blog_banner.banner_description && <p class="hero-description">{blog_banner.banner_description}</p>}
      </div>
    </div>
  );
}
