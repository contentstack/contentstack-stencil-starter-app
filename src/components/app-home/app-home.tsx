import { Component, h, Prop, State } from '@stencil/core';
import { onEntryChange } from '../../sdk-plugin/index';
import RenderComponents from '../render-components';
import { RouterHistory } from '@stencil/router';
import Helmet from '@stencil/helmet';
import { metaData } from '../../utils/common';
import { getPageRes } from '../../helper';
@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {
  @Prop() history: RouterHistory;
  @State() internalProps: any = {
    result: {},
  };
  @State() error: string;

  async componentWillLoad() {
    try {
      const result = await getPageRes('/');
      if (!result) this.history.replace('/404', {});
      this.internalProps = {
        result: result,
      };
    } catch (error) {
      console.error(error);
    }
  }

  componentDidLoad() {
    try {
      onEntryChange(async () => {
        const result = await getPageRes('/');
        if (!result) this.history.replace('/404', {});
        this.internalProps = {
          result: result,
        };
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { result } = this.internalProps;

    return (
      <div>
        <Helmet>{result.seo && result.seo.enable_search_indexing ? metaData(result.seo) : null}</Helmet>
        {result && <app-devtools page={result} />}
        {result.page_components && <RenderComponents pageComponents={result.page_components} />}
      </div>
    );
  }
}
