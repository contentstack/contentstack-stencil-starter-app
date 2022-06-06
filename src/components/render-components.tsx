/* eslint-disable consistent-return */
import { h, Fragment } from '@stencil/core';
import Section from './section';
import HeroBanner from './hero-banner';
import BlogBanner from './blog-banner';
import CardSection from './card-section';
import TeamSection from './team-section';
import BlogSection from './blog-section';
import SectionBucket from './section-bucket';
import AboutSectionBucket from './about-section-bucket';
import SectionWithHtmlCode from './section-with-html-code';
import { Component } from '../typescript/component'

type ComponentProps = {
  pageComponents: [Component];
  blogsPage?: {};
}

export default function RenderComponents(props: ComponentProps) {
  const { pageComponents, blogsPage } = props;
  return (
    <Fragment>
      {pageComponents?.map((component, key) => {
        if (component.hero_banner) {
          return blogsPage ? <BlogBanner blog_banner={component.hero_banner} key={`component-${key}`} /> : <HeroBanner banner={component.hero_banner} />;
        }
        if (component.section) {
          return <Section section={component.section} key={`component-${key}`} />;
        }
        if (component.section_with_buckets) {
          return component.section_with_buckets.bucket_tabular ? (
            <AboutSectionBucket sectionWithBuckets={component.section_with_buckets} key={`component-${key}`} />
          ) : (
            <SectionBucket section={component.section_with_buckets} />
          );
        }
        if (component.from_blog) {
          return <BlogSection blogs={component.from_blog} key={`component-${key}`} />;
        }
        if (component.section_with_cards) {
          return <CardSection cards={component.section_with_cards.cards} key={`component-${key}`} />;
        }
        if (component.section_with_html_code) {
          return <SectionWithHtmlCode embedCode={component.section_with_html_code} key={`component-${key}`} />;
        }
        if (component.our_team) {
          return <TeamSection ourTeam={component.our_team} key={`component-${key}`} />;
        }
      })}
    </Fragment>
  );
}
