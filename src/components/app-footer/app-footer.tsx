import { Component, State, h, Prop } from '@stencil/core';
import { parse } from '@saasquatch/stencil-html-parser';
import { onEntryChange } from '../../sdk-plugin/index';
import store from '../../store/state';
import { getFooterRes, getAllEntries } from '../../helper';
import { Entry, FooterProps, Menu, Social } from '../../typescript/layout';

@Component({
  tag: 'app-footer',
})
export class AppFooter {
  @Prop() footer: {};
  @Prop() entries: {};
  @State() internalProps: any = {
    footer: {},
  };
  @State() error: string;

  buildNavigation(ent: Entry, ft: FooterProps) {
    let newFooter = { ...ft };
    if (ent.length !== newFooter.navigation.link.length) {
      ent.forEach(entry => {
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
    return newFooter;
  }

  componentWillLoad() {
    store.set('footer', this.footer);
  }

  componentDidLoad() {
    try {
      onEntryChange(async () => {
        const footer = await getFooterRes();
        const allEntry = await getAllEntries();
        const newFooter = await this.buildNavigation(allEntry, footer);
        store.set('footer', newFooter);
        this.internalProps = {
          footer: footer,
        };
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { footer } = this.internalProps;

    return (
      <footer>
        <div class="max-width footer-div">
          <div class="col-quarter">
            <a href="/" class="logo-tag">
              <img {...footer.logo?.$?.url} src={footer.logo?.url} alt={footer?.title} title={footer?.title} class="logo footer-logo" />
            </a>
          </div>
          <div class="col-half">
            <nav>
              <ul class="nav-ul">
                {footer.navigation?.link.map((menu: Menu) => (
                  <li class="footer-nav-li" key={menu.title} {...menu?.$?.href as {}}>
                    <stencil-route-link url={menu.href}>{menu.title}</stencil-route-link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div class="col-quarter social-link">
            <div class="social-nav">
              {footer.social?.social_share.map((social: Social) => (
                <a href={social.link.href} title={social.link.title} key={social.link.title}>
                  {social.icon && <img {...social.icon?.$?.url as {}} src={social.icon.url} alt={social.link.title} />}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div class="copyright">{footer.copyright && <span {...footer?.$?.copyright}>{parse(footer.copyright)}</span>}</div>
      </footer>
    );
  }
}
