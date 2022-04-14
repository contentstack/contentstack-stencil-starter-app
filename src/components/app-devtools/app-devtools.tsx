import { h, Component, State } from '@stencil/core';
import store from '../../store/state';
import '@alenaksu/json-viewer';

function filterObject(inputObject) {
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
  // @Prop() page: any;
  // @Prop() blogpost: any;
  // @Prop() blogList: any;
  @State() jsonData: any = { header: {}, footer: {}, page: {}, blogpost: {} };

  componentDidLoad() {
    const header = store.get('header');
    const footer = store.get('footer');
    const page = store.get('page');
    const blogpost = store.get('blogpost');
    const blogList = store.get('blogList');
    let jsonData = { header, footer };
    page && (jsonData['page'] = page);
    blogpost && (jsonData['blogPost'] = blogpost);
    blogList && (jsonData['blogList'] = blogList);
    jsonData = filterObject(jsonData);
    this.jsonData = JSON.stringify(jsonData);
    const element = document.getElementsByClassName('cslp-tooltip');
    if (element.length > 0) {
      element[0].outerHTML = null;
    }
  }

  render() {
    function copyObject(object) {
      const tipValue = document.getElementById('copyTip').dataset;
      tipValue.tip = 'Copied';

      navigator.clipboard.writeText(object);
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
              <span class="json-copy" onClick={() => copyObject(this.jsonData)} aria-hidden="true">
                <span class="tool-tip tool-tip-copy" id="copyTip" data-tip="Copy" tabindex="1">
                  <img src="../../assets/copy.svg" alt="copy icon" />
                </span>
              </span>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <json-viewer id="jsonViewer">{this.jsonData}</json-viewer>
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
