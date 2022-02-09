import { Component, h, State } from '@stencil/core';
import Stack, { onEntryChange } from '../../sdk-plugin/index';
import RenderComponents from '../render-components';
import Helmet from '@stencil/helmet';
import { metaData } from '../../utils/common';
import store from '../../store/state';

const fetchEntries = () => {
  try {
    return Stack.getEntryByUrl({
      contentTypeUid: 'page',
      entryUrl: '/about-us',
      referenceFieldPath: [],
      jsonRtePath: ['page_components.section_with_buckets.buckets.description'],
    });
  } catch (error) {
    console.error(error);
  }
};
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
      const result = await fetchEntries();
      store.set('page', result[0]);
      store.set('blogpost', null);

      this.internalProps = {
        result: result[0],
      };
    } catch (error) {
      this.error = { notFound: true };
    }
  }

  componentDidLoad() {
    try {
      onEntryChange(async () => {
        const result = await fetchEntries();
        store.set('page', result[0]);
        store.set('blogpost', null);
        this.internalProps = {
          result: result[0],
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
        <app-devtools />
        {result.page_components && <RenderComponents pageComponents={result.page_components} about={'about'} />}
      </div>
    );
  }
}
