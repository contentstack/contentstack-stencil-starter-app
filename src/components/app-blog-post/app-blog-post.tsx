import { Component, Prop, h, State } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import Stack from '../../sdk-plugin/index';
import RenderComponents from '../../components/render-components';
import ArchiveRelative from '../../components/archive-relative';
import moment from 'moment';
import { parse } from '@saasquatch/stencil-html-parser';
import Helmet from '@stencil/helmet';
import { metaData } from '../../utils/common';

@Component({
  tag: 'app-blog-post',
  styleUrl: 'app-blog-post.css',
})
export class AppBlogPost {
  @Prop() match: MatchResults;

  @State() internalProps: any = {
    banner: {},
    result: {},
  };
  @State() error: any;

  async componentWillLoad() {
    const blogId = this.match && this.match.params.id;
    try {
      const banner = await Stack.getEntryByUrl('page', '/blog', []);
      const blog = await Stack.getEntryByUrl('blog_post', `/blog/${blogId}`, ['author', 'related_post']);
      this.internalProps = {
        result: blog[0],
        banner: banner[0],
      };
    } catch (error) {
      console.error(error);
      this.error = { notFound: true };
    }
  }

  render() {
    const { banner, result } = this.internalProps;

    return (
      <div>
        <Helmet>{result.seo && result.seo.enable_search_indexing ? metaData(result.seo) : null}</Helmet>
        {banner.page_components && <RenderComponents pageComponents={banner.page_components} blogsPage />}
        <div class="blog-container">
          <div class="blog-detail">
            <h2>{result.title ? result.title : ''}</h2>
            <p>
              {moment(result.date).format('ddd, MMM D YYYY')}, <strong>{result.author[0].title}</strong>
            </p>
            {parse(result.body)}
          </div>
          <div class="blog-column-right">
            <div class="related-post">
              {banner.page_components[2].widget && <h2>{banner.page_components[2].widget.title_h2}</h2>}
              {result.related_post && <ArchiveRelative blogs={result.related_post} />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
