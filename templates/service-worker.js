(function() {
    'use strict';

    var DEFAULT_CACHE = 'default-cache',
        IMAGES_CACHE = 'images-cache',
        ASSETS_CACHE = 'assets-cache';

    var urlsToCache = [
        'static/img/placeholder.png',
        '/',
        'offline/',
        'about/',
        'agenda/'
    ];

    self.addEventListener('install', function(event) {
        event.waitUntil(
            caches.open(DEFAULT_CACHE)
                .then(function(cache) {
                    console.log('Adding all to cache');
                    return cache.addAll(urlsToCache);
                })
                .then(function () {
                    return self.skipWaiting();
                })
        );
    });

    self.addEventListener('fetch', function(event) {
        event.respondWith(
            caches.match(event.request)
                .then(function(response) {
                    if (response) {
                        // console.log('Returning cached assets', response);
                        return response;
                    }
                    // console.log('Fetching and caching assets');
                    return fetchAndCache(event.request);
                })
        );
    });

    self.addEventListener('activate', function(event) {
        console.log('Activating new service worker...');

        var cacheWhitelist = [DEFAULT_CACHE, IMAGES_CACHE, ASSETS_CACHE];

        event.waitUntil(
            caches.keys().then(function(cacheNames) {
                return Promise.all(
                    cacheNames.map(function(cacheName) {
                        if (cacheWhitelist.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        );
    });

    function fetchAndCache(request) {
        console.log('Fetching and caching ' + request);
        var isImage = request.url.endsWith('.jpg') || request.url.endsWith('.png') || request.url.endsWith('.gif');

        return fetch(request)
            .then(function(response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                var cacheName = DEFAULT_CACHE;
                if (isImage) {
                    cacheName = IMAGES_CACHE;
                } else if (request.url.endsWith('.css') || request.url.endsWith('.js')) {
                    cacheName = ASSETS_CACHE;
                }

                return caches.open(cacheName)
                    .then(function(cache) {
                        // TODO: enable/disable the following for caching or not caching images.
                        if (!isImage) {
                            cache.put(request, response.clone());
                        }
                        return response;
                    });
            })
            .catch(function(error) {
                console.log('Request failed:', error);
                if (isImage) {
                    return caches.match('static/img/placeholder.png');
                }
                return caches.match('offline/');
            });
    }

})();
