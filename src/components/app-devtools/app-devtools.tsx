import { h, Component, State, Prop } from '@stencil/core';
import store from '../../store/state';
import '@alenaksu/json-viewer';

function filterObject(inputObject: any) {
  const unWantedProps = ['uid', '_version', 'ACL', '_in_progress', 'created_at', 'created_by', 'updated_at', 'updated_by', 'publish_details'];
  for (const key in inputObject) {
    unWantedProps.includes(key) && delete inputObject[key];
    if (typeof inputObject[key] !== 'object') {
      continue;
    }
    inputObject[key] = filterObject(inputObject[key]);
  }
  return inputObject;
}

@Component({
  tag: 'app-devtools',
})
export class AppDevtools {
  @Prop() page: string;
  @Prop() blogList: [];
  @Prop() blogPost: {};
  @State() internalProps: any = {
    jsonData: {},
  };

  componentWillRender() {
    const header = store.get('header');
    const footer = store.get('footer');
    let jsonData = { header, footer };

    this.page && Object.keys(this.page).length && (jsonData['page'] = this.page);
    this.blogList && Object.keys(this.blogList).length && (jsonData['blogList'] = this.blogList);
    this.blogPost && Object.keys(this.blogPost).length && (jsonData['blogPost'] = this.blogPost);
    jsonData = filterObject(jsonData);
    this.internalProps = {
      jsonData: JSON.stringify(jsonData),
    };
  }

  render() {
    const { jsonData } = this.internalProps;

    function copyObject(copyText: string) {
      const tipValue = document.getElementById('copyTip').dataset;
      tipValue.tip = 'Copied';

      navigator.clipboard.writeText(copyText);
      setTimeout(() => {
        tipValue.tip = 'Copy';
      }, 300);
    }
    return (
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog .modal-lg modal-dialog-centered modal-dialog-scrollable" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title" id="staticBackdropLabel">
                JSON Preview
              </h2>
              <span class="json-copy" onClick={() => copyObject(jsonData)} aria-hidden="true">
                <span class="tool-tip tool-tip-copy" id="copyTip" data-tip="Copy" tabindex="1">
                  <img src="../../assets/copy.svg" alt="copy icon" />
                </span>
              </span>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <json-viewer id="jsonViewer">{jsonData}</json-viewer>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn tertiary-btn modal-btn" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
