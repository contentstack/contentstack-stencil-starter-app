import { Component, State, h } from '@stencil/core';
import { parse } from '@saasquatch/stencil-html-parser';
import Stack, { onEntryChange } from '../../sdk-plugin/index';
import store from '../../store/state';

const fetchEntries = () => {
  try {
    return Stack.getEntry({
      contentTypeUid: 'header',
      referenceFieldPath: 'navigation_menu.page_reference',
      jsonRtePath: ['notification_bar.announcement_text'],
    });
  } catch (error) {
    console.error(error);
  }
};
@Component({
  tag: 'app-header',
  styleUrl: 'app-header.css',
})
export class AppHeader {
  @State() internalProps: any = {
    header: {},
  };
  @State() error: any;

  async componentWillLoad() {
    try {
      const header = await fetchEntries();
      store.set('header', header[0][0]);

      this.internalProps = {
        header: header[0][0],
      };
    } catch (error) {
      console.error(error);
    }
  }

  componentDidLoad() {
    try {
      onEntryChange(async () => {
        const header = await fetchEntries();
        store.set('header', header[0][0]);

        this.internalProps = {
          header: header[0][0],
        };
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { header } = this.internalProps;

    return (
      <header class="header">
        <div class="note-div">{header.notification_bar?.show_announcement && parse(header.notification_bar?.announcement_text)}</div>
        <div class="max-width header-div">
          <div class="wrapper-logo">
            <a href="/" class="logo-tag" title="Contentstack">
              <img class="logo" src={header.logo?.url} alt={header?.title} title={header?.title} />
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
                  <stencil-route-link url={list.page_reference[0].url} exact activeClass={'active'}>
                    {list.label}
                  </stencil-route-link>
                </li>
              ))}
            </ul>
          </nav>
          <div class="json-preview">
            <span class="tool-tip" data-tip="JSON Preview">
              <span data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <img src="../../assets/json.svg" alt="JSON Preview icon" />
              </span>
            </span>
          </div>
        </div>
      </header>
    );
  }
}
