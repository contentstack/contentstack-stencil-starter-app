import { Component, h, Prop, State, Watch } from '@stencil/core';
import { onEntryChange } from '../../sdk-plugin/index';
import RenderComponents from '../render-components';
import { RouterHistory } from '@stencil/router';
import Helmet from '@stencil/helmet';
import { metaData } from '../../utils/common';
import store from '../../store/state';
import { MatchResults } from '@stencil/router';
import { getPageRes } from '../../helper';
@Component({
  tag: 'app-page',
})
export class AppHome {
  @Prop() history: RouterHistory;
  @Prop() match: MatchResults;
  @State() internalProps: any = {
    result: {},
  };
  @Watch('match')
  async watchPropHandler(newValue) {
    try {
      const result = await getPageRes(newValue.url);
      if (!result) this.history.push('/404', {});
      store.set('page', result);
      store.set('blogpost', null);
      store.set('blogList', null);
      this.internalProps = {
        result: result,
      };
    } catch (error) {
      console.error(error);
    }
  }
  @State() error: any;

  async componentWillLoad() {
    try {
      const result = await getPageRes(this.match.url);
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
        const result = await getPageRes(this.match.url);
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
