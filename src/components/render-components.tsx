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
import { Component } from '../typescript/component';

type ComponentProps = {
  pageComponents: [Component];
  blogsPage?: boolean;
};

export default function RenderComponents(props: ComponentProps) {
  const { pageComponents, blogsPage = false } = props;
  const components = {
    hero_banner: (component: Component, key: number) =>
      blogsPage ? <BlogBanner blog_banner={component.hero_banner} key={`component-${key}`} /> : <HeroBanner banner={component.hero_banner} key={`component-${key}`} />,
    section: (component: Component, key: number) => <Section section={component.section} key={`component-${key}`} />,
    section_with_buckets: (component: Component, key: number) =>
      component.section_with_buckets.bucket_tabular
        ? <AboutSectionBucket sectionWithBuckets={component.section_with_buckets} key={`component-${key}`} />
        :
          <SectionBucket section={component.section_with_buckets}  key={`component-${key}`}/>,
    from_blog: (component: Component, key: number) => <BlogSection blogs={component.from_blog} key={`component-${key}`} />,
    section_with_cards: (component: Component, key: number) => <CardSection cards={component.section_with_cards.cards} key={`component-${key}`} />,
    section_with_html_code: (component: Component, key: number) => <SectionWithHtmlCode embedCode={component.section_with_html_code} key={`component-${key}`} />,
    our_team: (component: Component, key: number) => <TeamSection ourTeam={component.our_team} key={`component-${key}`} />,
    widget:()=>""
  };

  return (
    <Fragment>
      {pageComponents?.map((component, key) => {
        const componentName: string = Object.keys(component)[0];
        return components[componentName](component, key);
      })}
    </Fragment>
  );
}
