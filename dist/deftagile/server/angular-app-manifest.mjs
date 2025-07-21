
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5376, hash: 'da392ed91751c8e35992ad2f224f0b83b1289077ae5f15ca8a910ed258db7690', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 999, hash: '8469291a46e38c08bf80500c587d6c0c9800906b570913b03b87d53dc8ab7bc4', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 27047, hash: '43be86daa68866e0c1fd30630e3c23c5d43b598867ecfc26f1bebff9553e6126', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-YPD7T5SI.css': {size: 226967, hash: 'TtSOtRXQAj8', text: () => import('./assets-chunks/styles-YPD7T5SI_css.mjs').then(m => m.default)}
  },
};
