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
  tag: 'app-blog',
  styleUrl: 'app-blog.css',
})
export class AppBlog {
  @Prop() match: MatchResults;

  @State() internalProps: any = {
    archived: [],
    blog: {},
    blogList: [],
  };
  @State() error: any;

  async componentWillLoad() {
    try {
      const blog = await Stack.getEntryByUrl('page', '/blog', ['page_components.from_blog.featured_blogs']);
      const result = await Stack.getEntry('blog_post', ['author', 'related_post']);

      let archived = [],
        blogList = [];
      result[0].forEach(blogs => {
        if (blogs.is_archived) {
          archived.push(blogs);
        } else {
          blogList.push(blogs);
        }
      });
      this.internalProps = {
        blog: blog[0],
        blogList,
        archived,
      };
    } catch (error) {
      console.error(error);
      this.error = { notFound: true };
    }
  }

  render() {
    const { archived, blog, blogList } = this.internalProps;
    return (
      <div>
        <Helmet>{blog.seo && blog.seo.enable_search_indexing ? metaData(blog.seo) : null}</Helmet>
        {blog.page_components && <RenderComponents pageComponents={blog.page_components} blogsPage />}

        <div class="blog-container">
          <div class="blog-column-left">
            {blogList?.map((bloglist, index) => (
              <div class="blog-list" key={index}>
                {bloglist.featured_image && (
                  <a href={bloglist.url}>
                    <img alt="blog img" class="blog-list-img" src={bloglist.featured_image.url} />
                  </a>
                )}
                <div class="blog-content">
                  {bloglist.title && (
                    <a href={bloglist.url}>
                      <h3>{bloglist.title}</h3>
                    </a>
                  )}
                  <p>
                    {moment(bloglist.date).format('ddd, MMM D YYYY')}, <strong>{bloglist.author[0].title}</strong>
                  </p>
                  {bloglist.body && parse(bloglist.body.slice(0, 300))}
                  {bloglist.url ? (
                    <a href={bloglist.url}>
                      <span>{'Read more -->'}</span>
                    </a>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            ))}
          </div>
          <div class="blog-column-right">
            {blog.page_components[1].widget && <h2>{blog.page_components[1].widget.title_h2} </h2>}
            <ArchiveRelative blogs={archived} />
          </div>
        </div>
      </div>
    );
  }
}
