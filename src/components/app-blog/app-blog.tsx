import { Component, Prop, h, State } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import { onEntryChange } from '../../sdk-plugin/index';
import RenderComponents from '../../components/render-components';
import ArchiveRelative from '../../components/archive-relative';
import moment from 'moment';
import { parse } from '@saasquatch/stencil-html-parser';
import Helmet from '@stencil/helmet';
import { metaData } from '../../utils/common';
import { getPageRes, getBlogListRes } from '../../helper';
import { Image } from '../../typescript/action';

type Result = {
  is_archived: boolean;
};

type AdditionalParam = {
  title: {};
  date: {};
  body: {};
};

type Author = {
  title: string;
};

type BlogList = {
  featured_image: Image;
  url: string;
  title: string;
  date: string;
  body: string;
  author: Author[];
  $: AdditionalParam;
};

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
  @State() error: string;

  async componentWillLoad() {
    try {
      const blog = await getPageRes('/blog');
      const result: [Result] = await getBlogListRes();
      let archived = [],
        blogList = [];
      result.forEach(blogs => {
        if (blogs.is_archived) {
          archived.push(blogs);
        } else {
          blogList.push(blogs);
        }
      });
      this.internalProps = {
        blog: blog,
        blogList,
        archived,
      };
    } catch (error) {
      console.error(error);
    }
  }

  componentDidLoad() {
    try {
      onEntryChange(async () => {
        const blog = await getPageRes('/blog');
        const result: [Result] = await getBlogListRes();
        let archived = [],
          blogList = [];
        result.forEach(blogs => {
          if (blogs.is_archived) {
            archived.push(blogs);
          } else {
            blogList.push(blogs);
          }
        });
        this.internalProps = {
          blog: blog,
          blogList,
          archived,
        };
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { archived, blog, blogList } = this.internalProps;
    return (
      <div>
        <Helmet>{blog.seo && blog.seo.enable_search_indexing ? metaData(blog.seo) : null}</Helmet>
        {blog && <app-devtools page={blog} blogList={blogList.concat(archived)} />}
        {Object.keys(blog).length > 0 && blog.page_components && <RenderComponents pageComponents={blog.page_components} blogsPage />}

        <div class="blog-container">
          <div class="blog-column-left">
            {blogList.length > 0 &&
              blogList.map((bloglist: BlogList, index: number) => (
                <div class="blog-list" key={index}>
                  {bloglist.featured_image && (
                    <a href={bloglist.url}>
                      <img
                        alt="blog img"
                        class="blog-list-img"
                        {...(typeof bloglist.featured_image.$?.url === 'object' ? bloglist.featured_image.$?.url : {})}
                        src={bloglist.featured_image.url}
                      />
                    </a>
                  )}
                  <div class="blog-content">
                    {bloglist.title && (
                      <a href={bloglist.url}>
                        <h3 {...bloglist.$?.title}>{bloglist.title}</h3>
                      </a>
                    )}
                    <p>
                      {moment(bloglist.date).format('ddd, MMM D YYYY')}, <strong>{bloglist.author[0].title}</strong>
                    </p>
                    {bloglist.body && <span {...bloglist.$?.body}>{parse(bloglist.body.slice(0, 300))}</span>}
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
            {Object.keys(blog).length > 0 && blog.page_components && <h2>{blog.page_components[1].widget.title_h2}</h2>}

            <ArchiveRelative blogs={archived} />
          </div>
        </div>
      </div>
    );
  }
}
