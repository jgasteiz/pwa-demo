importScripts('static/build/workbox-sw.prod.v1.1.0.js');

const workboxSW = new WorkboxSW();
workboxSW.precache([
  {
    "url": "static/css/normalize.css",
    "revision": "8c6eee6b2107ef25dc486020ced13898"
  },
  {
    "url": "static/css/pwademo.css",
    "revision": "fbd24d95d51dc1a61f77a4267678379d"
  },
  {
    "url": "/",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "/offline",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  }
]);

workboxSW.router.registerRoute('https://fonts.googleapis.com/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'googleapis',
    cacheExpiration: {
      maxEntries: 20
    },
    cacheableResponse: {statuses: [0, 200]}
  })
);

workboxSW.router.registerRoute('http://weloveiconfonts.com/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'iconfonts',
    cacheExpiration: {
      maxEntries: 20
    },
    cacheableResponse: {statuses: [0, 200]}
  })
);

// We want no more than 50 images in the cache. We check using a cache first strategy
workboxSW.router.registerRoute(/\.(?:png|gif|jpg)$/,
  workboxSW.strategies.cacheFirst({
    cacheName: 'images-cache',
    cacheExpiration: {
      maxEntries: 50
    }
  })
);
