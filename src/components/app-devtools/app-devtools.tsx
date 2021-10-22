import { h, Component, State } from '@stencil/core';
import store from '../../store/state';
import '@alenaksu/json-viewer';

@Component({
  tag: 'app-devtools'
})
export class AppDevtools {
  @State() internalProps: any = {
    jsonData: {},
  };

  componentWillRender() {
    const header = store.get('header');
    const footer = store.get('footer');
    const page = store.get('page');
    const blogpost = store.get('blogpost');
    const jsonData = { header, footer };
    page && (jsonData['page'] = page);
    blogpost && (jsonData['blog_post'] = blogpost);

    this.internalProps = {
      jsonData: JSON.stringify(jsonData)
    };
  }

  render() {
    const { jsonData } = this.internalProps;

    return (
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title" id="staticBackdropLabel">
                Json Response
              </h2>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <json-viewer id="jsonViewer">{jsonData}</json-viewer>
              {/* <pre id="jsonViewer"></pre> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
