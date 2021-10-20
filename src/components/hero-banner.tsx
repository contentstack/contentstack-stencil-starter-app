/* eslint-disable eqeqeq */

import { h } from '@stencil/core';

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function HeroBanner(props) {
  const banner = props.hero_banner;
  return (
    <div
      class="hero-banner"
      style={{
        background: banner.bg_color ? banner.bg_color : '',
      }}
    >
      <div class={`${props.title == 'about' ? 'about' : 'home'}-content`}>
        {banner.banner_title && <h1 class="hero-title">{banner.banner_title}</h1>}
        {banner.banner_description ? <p class={`hero-description ${props.title == 'about' && 'about-desc'}`}>{banner.banner_description}</p> : ''}
        {banner.call_to_action.title && banner.call_to_action.href ? (
          <a href={banner.call_to_action.href} class="btn tertiary-btn">
            {banner.call_to_action.title}
          </a>
        ) : (
          ''
        )}
      </div>
      {banner.banner_image ? <img alt={banner.banner_image.filename} src={banner.banner_image.url} /> : ''}
    </div>
  );
}
