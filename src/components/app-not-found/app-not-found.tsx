import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-not-found',
  styleUrl: 'app-not-found.css',
})
export class AppNotFound {
  render() {
    return (
      <div class="error-page">
        <h1>404: Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </div>
    );
  }
}
