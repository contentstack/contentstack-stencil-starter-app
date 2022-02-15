import { Component, Prop, h, State } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import Stack, { onEntryChange } from '../../sdk-plugin/index';
import RenderComponents from '../../components/render-components';
import ArchiveRelative from '../../components/archive-relative';
import moment from 'moment';
import { parse } from '@saasquatch/stencil-html-parser';
import Helmet from '@stencil/helmet';
import { metaData } from '../../utils/common';
import store from '../../store/state';

const fetchEntries = async blogId => {
  try {
    const banner = await Stack.getEntryByUrl({
      contentTypeUid: 'page',
      entryUrl: '/blog',
      referenceFieldPath: [],
      jsonRtePath: [],
    });
    const blog = await Stack.getEntryByUrl({
      contentTypeUid: 'blog_post',
      entryUrl: `/blog/${blogId}`,
      referenceFieldPath: ['author', 'related_post'],
      jsonRtePath: ['body', 'related_post.body'],
    });
    return [banner, blog];
  } catch (error) {
    console.error(error);
  }
};

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
      const [banner, blog] = await fetchEntries(blogId);

      store.set('page', banner[0]);
      store.set('blogpost', blog[0]);

      this.internalProps = {
        result: blog[0],
        banner: banner[0],
      };
    } catch (error) {
      console.error(error);
      this.error = { notFound: true };
    }
  }

  componentDidLoad() {
    const blogId = this.match && this.match.params.id;
    try {
      onEntryChange(async () => {
        const [banner, blog] = await fetchEntries(blogId);
        store.set('page', banner[0]);
        store.set('blogpost', blog[0]);

        this.internalProps = {
          result: blog[0],
          banner: banner[0],
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
        <app-devtools />
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
