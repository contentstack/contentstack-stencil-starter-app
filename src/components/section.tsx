/* eslint-disable jsx-a11y/anchor-is-valid */
import { h } from '@stencil/core';
import { Action, Image } from '../typescript/action';

type AdditionalParam = {
  title_h2: {};
  description: {};
};

type Data = {
  title_h2: string;
  description: string;
  call_to_action: Action;
  image: Image;
  image_alignment: string;
  $: AdditionalParam;
};

type BucketProps = {
  section: Data;
  key: string;
};

export default function Section(props: BucketProps) {
  const { section } = props;

  function contentSection(key: string) {
    return (
      <div class="home-content" key={key}>
        {section.title_h2 && <h2 {...section.$?.title_h2}>{section.title_h2}</h2>}
        {section.description && <p {...section.$?.description}>{section.description}</p>}
        {section.call_to_action.title && section.call_to_action.href ? (
          <a {...(typeof section.call_to_action.$?.href === 'object' ? section.call_to_action.$?.href : {})} href={section.call_to_action.href} class="btn secondary-btn">
            {section.call_to_action.title}
          </a>
        ) : (
          ''
        )}
      </div>
    );
  }

  function imageContent(key: string) {
    return <img {...(typeof section.image.$?.url === 'object' ? section.image.$?.url : {})} src={section.image.url} alt={section.image.filename} key={key} />;
  }

  return (
    <div class="home-advisor-section">
      {section.image_alignment === 'Left' ? [imageContent('key-image'), contentSection('key-contentstection')] : [contentSection('key-contentstection'), imageContent('key-image')]}
    </div>
  );
}
