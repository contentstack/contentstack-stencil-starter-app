import { parse } from '@saasquatch/stencil-html-parser';
import { h } from '@stencil/core';

export default function SectionBucket(props) {
  const { section } = props;
  return (
    <div class="member-main-section">
      <div class="member-head">
        {section.title_h2 && <h2>{section.title_h2}</h2>}
        {section.description && <p>{section.description}</p>}
      </div>
      <div class="member-section">
        {section.buckets?.map((bucket: any, index: any) => (
          <div class="content-section" key={index}>
            {bucket.icon && <img src={bucket.icon.url} alt="bucket icon" />}

            {bucket.title_h3 ? <h3>{bucket.title_h3}</h3> : ''}
            {bucket.description && parse(bucket.description)}
            {bucket.call_to_action.title ? (
              <a href={bucket.call_to_action.href ? bucket.call_to_action.href : '#'}>{`${bucket.call_to_action.title} -->`}</a>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
