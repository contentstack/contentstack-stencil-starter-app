import { Component, State, h, Prop } from '@stencil/core';
import { parse } from '@saasquatch/stencil-html-parser';
import { onEntryChange } from '../../sdk-plugin/index';
import store from '../../store/state';
import { getFooterRes, getAllEntries } from '../../helper';
import { Menu, PageProps, Social } from '../../typescript/layout';
import { FooterRes } from "../../typescript/response";

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

  buildNavigation(entries: PageProps[], footerRes: FooterRes) {
    const navFooterList = footerRes.navigation.link;
    if (entries.length !== footerRes.navigation.link.length) {
      entries.forEach((entry) => {
        const fFound = footerRes.navigation.link.find(
          (link) => link.title === entry.title
        );
        if (!fFound) {
          navFooterList.push({ title: entry.title, href: entry.url });
        }
      });
      footerRes.navigation.link = navFooterList
    }
    return footerRes;
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
