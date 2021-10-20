import { Component, h, State } from '@stencil/core';
import Stack from '../../sdk-plugin/index';
import RenderComponents from '../render-components';
import Helmet from '@stencil/helmet';
import { metaData } from '../../utils/common';

@Component({
  tag: 'app-about',
  styleUrl: 'app-about.css',
})
export class AppAbout {
  @State() internalProps: any = {
    result: {},
  };
  @State() error: any;

  async componentWillLoad() {
    try {
      const result = await Stack.getEntryByUrl('page', '/about-us', []);

      this.internalProps = {
        result: result[0],
      };
    } catch (error) {
      this.error = { notFound: true };
    }
  }

  render() {
    const { result } = this.internalProps;
    return (
      <div>
        <Helmet>{result.seo && result.seo.enable_search_indexing ? metaData(result.seo) : null}</Helmet>
        {result.page_components && <RenderComponents pageComponents={result.page_components} about={'about'} />}
      </div>
    );
  }
}
