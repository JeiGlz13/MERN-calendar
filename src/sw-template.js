importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

workbox.loadModule('workbox-background-sync');

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

const {registerRoute} = workbox.routing;
const {CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;

const cacheNetworkFirst = [
    '/api/auth/renew',
    '/api/events'
];

registerRoute(
    ({request, url})=>{
        if(cacheNetworkFirst.includes(url.pathname)) return true
        
        return false;
    },
    new NetworkFirst()
)

const cacheFirst = [
    'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
]

registerRoute(
    ({request, url})=>{
        if(cacheFirst.includes(url.href)) return true;
        
        return false;
    },
    new CacheFirst()
)

//Offline post

const bgSyncPlugin = new BackgroundSyncPlugin('posteos-offline', {
    maxRetentionTime: 24 * 60
})

registerRoute(
    new RegExp('http://localhost:4001/api/events/'),
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'POST'
)

registerRoute(
    new RegExp('http://localhost:4001/api/events/'),
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'DELETE'
)

registerRoute(
    new RegExp('http://localhost:4001/api/events/'),
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'PUT'
)
