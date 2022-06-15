import { h } from '@stencil/core';

type AdditionalParam = {
  banner_title: {};
  banner_description: {};
}

type Data = {
  banner_title?: string;
  banner_description?: string;
  $?: AdditionalParam;
}

type BannerProps = {
  blog_banner: Data;
  key: string;
}

/* eslint-disable camelcase */
export default function BlogBanner(props: BannerProps) {
  const { blog_banner } = props;
  return (
    <div class="blog-page-banner">
      <div class="blog-page-content">
        {blog_banner.banner_title && (
          <h1 class="hero-title" {...blog_banner.$?.banner_title}>
            {blog_banner.banner_title}
          </h1>
        )}

        {blog_banner.banner_description && (
          <p class="hero-description" {...blog_banner.$?.banner_description}>
            {blog_banner.banner_description}
          </p>
        )}
      </div>
    </div>
  );
}
