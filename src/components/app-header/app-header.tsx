import { Component, State, h, Prop } from '@stencil/core';
import { parse } from '@saasquatch/stencil-html-parser';
import { onEntryChange } from '../../sdk-plugin/index';
import store from '../../store/state';
import { getHeaderRes } from '../../helper';
import { HeaderProps, HeaderMenu } from '../../typescript/layout';

type AdditionalParam = {
  title: string;
  copyright: string;
  announcement_text: string;
  label: string;
  url: string;
  body: string;
  href: string;
}

type Entry = {
  title: string;
  url: string;
  $: AdditionalParam;
}

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.css',
})
export class AppHeader {
  @Prop() header: {};
  @Prop() entries: {};
  @State() internalProps: any = {
    header: {},
  };
  @State() error: string;

  buildNavigation(ent, hd: HeaderProps) {
    let newHeader = { ...hd };
    if (ent.length !== newHeader.navigation_menu.length) {
      ent.forEach((entry: Entry) => {
        const hFound = newHeader?.navigation_menu.find(navLink => navLink.label === entry.title);
        if (!hFound) {
          newHeader.navigation_menu?.push({
            label: entry.title,
            page_reference: [{ title: entry.title, url: entry.url, $: entry.$ }],
            $: {},
          });
        }
      });
    }
    return newHeader;
  }

  componentWillLoad() {
    store.set('header', this.header);
  }

  componentDidLoad() {
    try {
      onEntryChange(async () => {
        const header = await getHeaderRes();
        const newHeader = this.buildNavigation(this.entries, header);
        store.set('header', newHeader);

        this.internalProps = {
          header: newHeader,
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
        <div class="note-div">
          {header.notification_bar?.show_announcement && <span {...header.notification_bar?.$?.announcement_text}>{parse(header.notification_bar?.announcement_text)}</span>}
        </div>
        <div class="max-width header-div">
          <div class="wrapper-logo">
            <a href="/" class="logo-tag" title="Contentstack">
              <img class="logo" {...header.logo?.$?.url} src={header.logo?.url} alt={header?.title} title={header?.title} />
            </a>
          </div>
          <input class="menu-btn" type="checkbox" id="menu-btn" />
          <label class="menu-icon" htmlFor="menu-btn">
            <span class="navicon" />
          </label>
          <nav class="menu">
            <ul class="nav-ul header-ul">
              {header.navigation_menu?.map((list: HeaderMenu) => (
                <li key={list.label} class="nav-li" {...list.page_reference[0]?.$?.url as {}}>
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
