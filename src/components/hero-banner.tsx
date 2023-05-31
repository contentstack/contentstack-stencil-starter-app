/* eslint-disable eqeqeq */

import { h } from '@stencil/core';
import { Action, Image } from '../typescript/action';

type Data = {
  bg_color: string;
  banner_title: string;
  text_color: string;
  banner_description: string | undefined;
  call_to_action: Action;
  banner_image: Image;
  $: Data;
};

type BannerProps = {
  banner: Data;
  key:string;
};

export default function HeroBanner({ banner }: BannerProps) {
  return (
    <div
      class="hero-banner"
      style={{
        background: banner.bg_color || '',
      }}
    >
      <div class="home-content">
        {banner.banner_title && (
          <h1
            class="hero-title"
            {...(banner.$?.banner_title as {})}
            style={{
              color: banner.text_color || '#222',
            }}
          >
            {banner.banner_title}
          </h1>
        )}
        {banner.banner_description ? (
          <p
            class="hero-description"
            {...(banner.$?.banner_description as {})}
            style={{
              color: banner.text_color || '#222',
            }}
          >
            {banner.banner_description}
          </p>
        ) : (
          ''
        )}
        {banner.call_to_action.title && banner.call_to_action.href ? (
          <a href={banner.call_to_action.href} {...(banner.call_to_action.$?.href as {})} class="btn tertiary-btn">
            {banner.call_to_action.title}
          </a>
        ) : (
          ''
        )}
      </div>
      {banner.banner_image ? <img alt={banner.banner_image.filename} src={banner.banner_image.url} {...(banner.banner_image.$?.url as {})} /> : ''}
    </div>
  );
}
