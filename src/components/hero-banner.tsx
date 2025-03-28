/* eslint-disable eqeqeq */

import { h } from '@stencil/core';
import { Action, Image } from '../typescript/action';

type AdditionalParam = {
  banner_title: {};
  banner_description: {};
};

type Data = {
  bg_color: string;
  banner_title: string;
  text_color: string;
  banner_description: string;
  call_to_action: Action;
  banner_image: Image;
  $: AdditionalParam;
};

type BannerProps = {
  banner: Data;
};

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function HeroBanner({ banner }: BannerProps) {
  return (
    <div
      class="hero-banner"
      style={{
        background: banner.bg_color ? banner.bg_color : '',
      }}
    >
      <div class="home-content">
        {banner.banner_title && (
          <h1
            class="hero-title"
            {...banner.$?.banner_title}
            style={{
              color: banner.text_color ? banner.text_color : '#222',
            }}
          >
            {banner.banner_title}
          </h1>
        )}
        {banner.banner_description ? (
          <p
            class="hero-description"
            {...banner.$?.banner_description}
            style={{
              color: banner.text_color ? banner.text_color : '#222',
            }}
          >
            {banner.banner_description}
          </p>
        ) : (
          ''
        )}
        {banner.call_to_action.title && banner.call_to_action.href ? (
          <a href={banner.call_to_action.href} {...(typeof banner.call_to_action.$?.href === 'object' ? banner.call_to_action.$?.href : {})} class="btn tertiary-btn">
            {banner.call_to_action.title}
          </a>
        ) : (
          ''
        )}
      </div>
      <img alt={banner.banner_image.filename} src={banner.banner_image.url} {...(typeof banner.banner_image.$?.url === 'object' ? banner.banner_image.$?.url : {})} />
    </div>
  );
}
