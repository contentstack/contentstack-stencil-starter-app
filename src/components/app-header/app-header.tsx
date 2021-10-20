import { Component, State, h } from '@stencil/core';
import { parse } from '@saasquatch/stencil-html-parser';
import Stack from '../../sdk-plugin/index';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.css',
})
export class AppHeader {
  @State() internalProps: any = {
    header: {}
  };
  @State() error: any;

  async componentWillLoad() {
    try {
      const header = await Stack.getEntry('header', 'navigation_menu.page_reference');

      this.internalProps = {
        header: header[0][0]
      };
    } catch (error) {
      this.error = { notFound: true };
    }
  }

  render() {
    const { header } = this.internalProps;

    return (
      <header class="header">
        {header.notification_bar && header.notification_bar.show_announcement ? <div class="note-div">{parse(header.notification_bar.announcement_text)}</div> : ''}
        <div class="max-width header-div">
          <div class="wrapper-logo">
            <a href="/" class="logo-tag" title="Contentstack">
              <img class="logo" src={header.logo.url} alt={header.title} title={header.title} />
            </a>
          </div>
          <input class="menu-btn" type="checkbox" id="menu-btn" />
          <label class="menu-icon" htmlFor="menu-btn">
            <span class="navicon" />
          </label>
          <nav class="menu">
            <ul class="nav-ul header-ul">
              {header.navigation_menu?.map(list => (
                <li key={list.label} class="nav-li">
                  <stencil-route-link 
                    url={list.page_reference[0].url}
                    activeClass={'active'}
                    // anchorClass={window.location.pathname === list.page_reference[0].url ? 'active' : 'home'}
                  >
                    {list.label}
                  </stencil-route-link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}
