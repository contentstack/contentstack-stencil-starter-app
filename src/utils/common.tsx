import { h } from '@stencil/core';

export function metaData(seo: any) {
  const metaArr = [];
  for (const key in seo) {
    if (key !== 'enable_search_indexing') {
      metaArr.push(<meta name={key.includes('meta_') ? key.split('meta_')[1] : key} content={seo[key]} key={key} />);
    }
  }
  return metaArr;
}
