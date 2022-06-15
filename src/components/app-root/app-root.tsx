import { Component, Fragment, h, State } from '@stencil/core';
import { getHeaderRes, getFooterRes, getAllEntries } from '../../helper';
import { Entry, HeaderProps, FooterProps } from "../../typescript/layout";

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  @State() layout = { header: {}, footer: {}, entries: {} };

  buildNavigation(ent: Entry, hd: HeaderProps, ft: FooterProps) {
    let newHeader = { ...hd };
    let newFooter = { ...ft };
    if (ent.length !== newHeader.navigation_menu.length) {
      ent.forEach(entry => {
        const hFound = newHeader?.navigation_menu.find(navLink => navLink.label === entry.title);
        if (!hFound) {
          newHeader.navigation_menu?.push({
            label: entry.title,
            page_reference: [{ title: entry.title, url: entry.url, $: entry.$ }],
            $: {},
          });
        }
        const fFound = newFooter?.navigation.link.find(nlink => nlink.title === entry.title);
        if (!fFound) {
          newFooter.navigation.link?.push({
            title: entry.title,
            href: entry.url,
            $: entry.$,
          });
        }
      });
    }
    return [newHeader, newFooter];
  }

  async componentWillLoad() {
    try {
      const header = await getHeaderRes();
      const footer = await getFooterRes();
      const allEntry = await getAllEntries();
      const [newHeader, newFooter] = this.buildNavigation(allEntry, header, footer);
      this.layout = { header: newHeader, footer: newFooter, entries: allEntry };
    } catch (e) {
      console.error(e);
    }
  }
  render() {
    return (
      <Fragment>
        <app-header header={this.layout.header} entries={this.layout.entries} />
        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-home" exact={true} />
              <stencil-route url="/blog/:id" component="app-blog-post" />
              <stencil-route url="/blog" component="app-blog" exact={true} />
              <stencil-route url="/404" component="app-not-found" exact={true} />
              <stencil-route url="/:id" component="app-page" />
              <stencil-route component="app-not-found" />
            </stencil-route-switch>
          </stencil-router>
        </main>
        <app-footer footer={this.layout.footer} entries={this.layout.entries} />
      </Fragment>
    );
  }
}
