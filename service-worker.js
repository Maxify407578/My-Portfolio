// Service Worker für Offline-Funktionalität
const CACHE_NAME = 'portfolio-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/favicon.ico',
  '/images/Multi Tool png.png',
  '/images/Chatbot png.png',
  '/images/Weather_app.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Installation: Cache-Ressourcen für Offline-Nutzung vormerken
self.addEventListener('install', event => {
  console.log('Service Worker: Installiere...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Öffne Cache...');
        return cache.addAll(urlsToCache);
      })
  );
});

// Aktivierung: Alte Caches aufräumen
self.addEventListener('activate', event => {
  console.log('Service Worker: Aktiviere...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Lösche alten Cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch: Anfragen abfangen und mit Cache beantworten wenn möglich
self.addEventListener('fetch', event => {
  console.log('Service Worker: Fetch', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache-Hit - Rückgabe der Antwort aus dem Cache
        if (response) {
          console.log('Service Worker: Gefunden im Cache', event.request.url);
          return response;
        }
        
        // Keine Übereinstimmung im Cache gefunden - Server anfragen
        console.log('Service Worker: Nicht im Cache gefunden, rufe Server auf', event.request.url);
        return fetch(event.request)
          .then(response => {
            // Prüfen, ob wir eine gültige Antwort erhalten haben
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Antwort klonen (da Streams nur einmal gelesen werden können)
            const responseToCache = response.clone();
            
            // Antwort im Cache speichern für zukünftige Anfragen
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          });
      })
      .catch(error => {
        console.log('Service Worker: Fetch fehlgeschlagen', error);
        // Optionale Fallback-Seite für Netzwerkfehler anzeigen
        return caches.match('/offline.html');
      })
  );
}); 