import { Component, Prop, h, State } from '@stencil/core';
import { MatchResults, RouterHistory } from '@stencil/router';
import { onEntryChange } from '../../sdk-plugin/index';
import RenderComponents from '../../components/render-components';
import ArchiveRelative from '../../components/archive-relative';
import moment from 'moment';
import { parse } from '@saasquatch/stencil-html-parser';
import Helmet from '@stencil/helmet';
import { metaData } from '../../utils/common';
import { getPageRes, getBlogPostRes } from '../../helper';

@Component({
  tag: 'app-blog-post',
  styleUrl: 'app-blog-post.css',
})
export class AppBlogPost {
  @Prop() history: RouterHistory;
  @Prop() match: MatchResults;

  @State() internalProps: any = {
    banner: {},
    result: {},
  };
  @State() error: string;

  async componentWillLoad() {
    const blogId = this.match && this.match.url;

    try {
      const banner = await getPageRes('/blog');
      const blog = await getBlogPostRes(blogId);

      if (!banner || !blog) this.history.push('/404', {});
      this.internalProps = {
        result: blog,
        banner,
      };
    } catch (error) {
      console.error(error);
    }
  }

  async componentDidLoad() {
    const blogId = this.match && this.match.url;

    try {
      onEntryChange(async () => {
        const banner = await getPageRes('/blog');
        const blog = await getBlogPostRes(blogId);

        if (!banner || !blog) this.history.push('/404', {});
        this.internalProps = {
          result: blog,
          banner,
        };
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { banner, result } = this.internalProps;

    return (
      <div>
        <Helmet>{result.seo && result.seo.enable_search_indexing ? metaData(result.seo) : null}</Helmet>
        {result && banner && <app-devtools page={banner} blogPost={result} />}
        {banner && <RenderComponents pageComponents={banner?.page_components} blogsPage />}
        <div class="blog-container">
          <div class="blog-detail">
            {result.title ? <h2 {...result.$?.title}>{result.title}</h2> : ''}
            {result.date ? (
              <p {...result.$?.date}>
                {moment(result.date).format('ddd, MMM D YYYY')}, <strong {...result.author[0].$?.title}>{result.author[0].title}</strong>
              </p>
            ) : (
              ''
            )}
            {result.body ? <div {...result.$?.body}>{parse(result.body)}</div> : ''}
          </div>
          <div class="blog-column-right">
            <div class="related-post">
            {Object.keys(banner).length > 0 && banner.page_components && 
  <h2 {...(typeof banner.page_components[2].widget.$?.title_h2 === 'object' ? banner.page_components[2].widget.$?.title_h2 : {})}>
    {banner.page_components[2].widget.title_h2}
  </h2>
}
              {result?.related_post && <ArchiveRelative blogs={result.related_post} />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
