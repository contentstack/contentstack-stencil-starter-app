/* eslint-disable no-undef */
import { parse } from '@saasquatch/stencil-html-parser';
import { h } from '@stencil/core';
import { Image } from '../typescript/action';
import { BucketList } from '../typescript/component';

type AdditionalParam = {
  title_h2: {};
  title_h3: {};
  description: {};
}

type Bucket = {
  title_h3: string;
  description: string;
  icon: Image;
  $: AdditionalParam;
}

type Data = {
  title_h2: string;
  description: string;
  buckets: BucketList;
  $: AdditionalParam;
}

type BucketProps = {
  sectionWithBuckets: Data;
  key: string;
}

function bucketContent(bucket: Bucket, index: number) {
  return (
    <div class="mission-content-section" key={index}>
      {bucket.icon && <img class="mission-icon" {...bucket.icon.$?.url} src={bucket.icon.url} alt="art work" />}

      <div class="mission-section-content">
        {bucket.title_h3 && <h3 {...bucket.$?.title_h3}>{bucket.title_h3}</h3>}
        <span {...bucket.$?.description}>{bucket.description && parse(bucket.description)}</span>
      </div>
    </div>
  );
}

export default function AboutSectionBucket(props: BucketProps) {
  const { sectionWithBuckets } = props;

  return (
    <div class="member-main-section">
      <div class="member-head">
        {sectionWithBuckets.title_h2 && <h2 {...sectionWithBuckets.$?.title_h2}>{sectionWithBuckets.title_h2}</h2>}
        {sectionWithBuckets.description && <p>{sectionWithBuckets.description}</p>}
      </div>
      <div class="mission-section">
        <div class="mission-content-top">{sectionWithBuckets.buckets.map((bucket, index) => index < 2 && bucketContent(bucket, index))}</div>
        <div class="mission-content-bottom">{sectionWithBuckets.buckets.map((bucket, index) => index >= 2 && bucketContent(bucket, index))}</div>
      </div>
    </div>
  );
}
