import { Component, State, h } from '@stencil/core';
import { parse } from '@saasquatch/stencil-html-parser';
import Stack from '../../sdk-plugin/index';
import store from '../../store/state';

@Component({
  tag: 'app-footer'
})
export class AppFooter {
  @State() internalProps: any = {
    footer: {},
  };
  @State() error: any;

  async componentWillLoad() {
    try {
      const footer = await Stack.getEntry('footer', '');
      store.set('footer', footer[0][0]);
      this.internalProps = {
        footer: footer[0][0]
      };
    } catch (error) {
      this.error = { notFound: true };
    }
  }

  render() {
    const { footer } = this.internalProps;

    return (
      <footer>
        <div class="max-width footer-div">
          <div class="col-quarter">
            <a href="/" class="logo-tag">
              <img src={footer.logo.url} alt={footer.title} title={footer.title} class="logo footer-logo" />
            </a>
          </div>
          <div class="col-half">
            <nav>
              <ul class="nav-ul">
                {footer.navigation.link?.map(menu => (
                  <li class="footer-nav-li" key={menu.title}>
                    <stencil-route-link url={menu.href}>{menu.title}</stencil-route-link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div class="col-quarter social-link">
            <div class="social-nav">
              {footer.social.social_share?.map(social => (
                <a href={social.link.href} title={social.link.title} key={social.link.title}>
                  {social.icon && <img src={social.icon.url} alt={social.link.title} />}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div class="copyright">{footer.copyright && parse(footer.copyright)}</div>
      </footer>
    );
  }
}
