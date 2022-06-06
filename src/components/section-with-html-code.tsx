/* eslint-disable react/react-in-jsx-scope */
import { parse } from '@saasquatch/stencil-html-parser';
import { h } from '@stencil/core';

type AdditionalParam = {
  title: {};
  html_code_alignment?: {};
  description: {};
  html_code: {};
}

type Data = {
  title: string;
  html_code_alignment: string;
  description: string;
  html_code: string;
  $: AdditionalParam;
}

type EmbedSection = {
  embedCode: Data;
  key: string;
}

export default function SectionWithHtmlCode(props: EmbedSection) {
  const { embedCode } = props;
  if (embedCode.html_code_alignment === 'Left') {
    return (
      <div class="contact-page-section max-width">
        <div class="contact-page-content">
          {embedCode.title && <h1 {...embedCode.$?.title}>{embedCode.title}</h1>}
          {embedCode.description && <span {...embedCode.$?.description}>{parse(embedCode.description)}</span>}
        </div>
        <div class="contact-page-form">{embedCode.html_code && <span {...embedCode.$?.html_code}>{parse(embedCode.html_code)}</span>}</div>
      </div>
    );
  }
  return (
    <div class="contact-maps-section max-width">
      <div class="maps-details" {...embedCode.$?.html_code}>
        {parse(embedCode.html_code)}
      </div>
      <div class="contact-maps-content">
        {embedCode.title ? <h2 {...embedCode.$?.title}>{embedCode.title}</h2> : ''}
        {embedCode.description && <span {...embedCode.$?.description}>{parse(embedCode.description)}</span>}
      </div>
    </div>
  );
}
