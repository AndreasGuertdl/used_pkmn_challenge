/* const addResourcesToCache = async (resources) => {
    const cache = await caches.open('cache_v1');
    await cache.addAll(resources);
}

const cacheMatch = async (request) => {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        console.log("Cache hit!");
        return cachedResponse;
    }
    try {
        console.log("Retrieving network data.");
        const networkResponse = await fetch(request);
        const cache = await caches.open('cache_v1');
        await cache.put(request, networkResponse.clone());
        return networkResponse;
    } catch (err) {
        console.log("Response not found: ", err);
    }
}

self.addEventListener('install', (event) => {
    event.waitUntil(addResourcesToCache([
       //O que botar no cache
    ]))
})

self.addEventListener('fetch', (event) => {
    event.respondWith(cacheMatch(event.request));
})
 */