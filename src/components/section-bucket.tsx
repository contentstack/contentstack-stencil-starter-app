import { parse } from '@saasquatch/stencil-html-parser';
import { h } from '@stencil/core';
import { SectionWithBucket } from "../typescript/component";

type BucketProps = {
  section: SectionWithBucket;
  key:string;
}

export default function SectionBucket({ section }: BucketProps) {
  return (
    <div class="member-main-section">
      <div class="member-head">
        {section.title_h2 && <h2 {...section.$?.title_h2 as {}}>{section.title_h2}</h2>}
        {section.description && <p {...section.$?.description as {}}>{section.description}</p>}
      </div>
      <div class="member-section">
        {section.buckets?.map((bucket, index) => (
          <div class="content-section" key={index}>
            {bucket.icon && <img {...bucket.icon.$?.url as {}} src={bucket.icon.url} alt="bucket icon" />}

            {bucket.title_h3 ? <h3 {...bucket.$?.title_h3 as {}}>{bucket.title_h3}</h3> : ''}
            {bucket.description && <span {...bucket.$?.description as {}}>{parse(bucket.description)}</span>}
            {bucket.call_to_action.title ? (
              <a {...bucket.call_to_action.$?.href as {}} href={bucket.call_to_action.href ? bucket.call_to_action.href : '#'}>{`${bucket.call_to_action.title} -->`}</a>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
