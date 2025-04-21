importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "pwabuilder-page-v2";
const OFFLINE_PAGE = "offline.html";

// SKIP WAITING
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// INSTALL
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.add(OFFLINE_PAGE))
  );
});

// ACTIVATE
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// ENABLE PRELOAD
if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

// FETCH - único handler
self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // Custom Protocol Handler
  if (url.startsWith("gameshelf://")) {
    event.respondWith(
      new Response("🔗 Protocolo personalizado gameshelf:// detectado", { status: 200 })
    );
    return;
  }

  // Navegação
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;
        if (preloadResp) return preloadResp;

        return await fetch(event.request);
      } catch (error) {
        const cache = await caches.open(CACHE);
        return await cache.match(OFFLINE_PAGE);
      }
    })());
  }
});

// BACKGROUND SYNC
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-jogos') {
    event.waitUntil(syncJogosComServidor());
  }
});

async function syncJogosComServidor() {
  console.log('🔄 Sincronizando dados com servidor...');
  // Aqui entraria a lógica real de sync, tipo IndexedDB -> API
  return Promise.resolve();
}

// PERIODIC SYNC
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "atualizar-jogos") {
    event.waitUntil(syncJogosComServidor());
  }
});

// PUSH NOTIFICATIONS
self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};
  const title = data.title || "Notificação GameShelf";
  const options = {
    body: data.body || "Você tem atualizações disponíveis.",
    icon: "/icons/android/icon-192x192.png",
    badge: "/icons/android/icon-192x192.png",
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  const { notification } = event;
  const url = notification.data?.url || '/';
  event.waitUntil(clients.openWindow(url));
  notification.close();
});
