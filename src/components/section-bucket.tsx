import { parse } from '@saasquatch/stencil-html-parser';
import { h } from '@stencil/core';
import { Action, Image } from '../typescript/action';

type AdditionalParam = {
  title_h2: {};
  title_h3: {};
  description: {};
}

type Bucket = {
  title_h3: string;
  icon: Image;
  description: string;
  call_to_action: Action;
  $: AdditionalParam
}

type Data = {
  title_h2: string;
  description: string;
  buckets: [Bucket];
  $: AdditionalParam;
}

type BucketProps = {
  section: Data;
}

export default function SectionBucket({ section }: BucketProps) {
  return (
    <div class="member-main-section">
      <div class="member-head">
        {section.title_h2 && <h2 {...section.$?.title_h2}>{section.title_h2}</h2>}
        {section.description && <p {...section.$?.description}>{section.description}</p>}
      </div>
      <div class="member-section">
        {section.buckets?.map((bucket, index) => (
          <div class="content-section" key={index}>
            {bucket.icon && <img {...bucket.icon.$?.url} src={bucket.icon.url} alt="bucket icon" />}

            {bucket.title_h3 ? <h3 {...bucket.$?.title_h3}>{bucket.title_h3}</h3> : ''}
            {bucket.description && <span {...bucket.$?.description}>{parse(bucket.description)}</span>}
            {bucket.call_to_action.title ? (
              <a {...bucket.call_to_action.$?.href} href={bucket.call_to_action.href ? bucket.call_to_action.href : '#'}>{`${bucket.call_to_action.title} -->`}</a>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
