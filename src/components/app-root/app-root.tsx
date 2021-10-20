import { Component, Fragment, h } from '@stencil/core';
@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {

  render() {
    return (
      <Fragment>
        <app-header />
        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-home" exact={true} />
              <stencil-route url="/blog/:id" component="app-blog-post" />
              <stencil-route url="/blog" component="app-blog" />
              <stencil-route url="/about-us" component="app-about" exact={true} />
              <stencil-route url="/contact-us" component="app-contact" exact={true} />
              <stencil-route component="app-not-found" />
            </stencil-route-switch>
          </stencil-router>
        </main>
        <app-footer />
      </Fragment>
    );
  }
}
