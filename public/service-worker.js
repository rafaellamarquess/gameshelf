importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "pwabuilder-page-v2";
const OFFLINE_PAGE = "offline.html";

// Skip waiting quando mandado
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Instalação: cache da página offline
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.add(OFFLINE_PAGE))
  );
});

// Ativação
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Preload de navegação
if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

// Fetch: serve página offline em caso de falha
self.addEventListener('fetch', (event) => {
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

//  Background Sync (ex: sincronizar dados offline)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-jogos') {
    event.waitUntil(syncJogosComServidor());
  }
});

async function syncJogosComServidor() {
  console.log('🔄 Sincronizando dados com servidor...');
  // Aqui entra a lógica real de sync, tipo IndexedDB -> API
  return Promise.resolve(); // placeholder
}

// Periodic Background Sync
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "atualizar-jogos") {
    event.waitUntil(syncJogosComServidor());
  }
});

//Push Notification
self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};
  const title = data.title || "Notificação GameShelf";
  const options = {
    body: data.body || "Você tem atualizações disponíveis.",
    icon: "/icons/android/icon-192x192.png",
    badge: "/icons/android/icon-192x192.png"
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Handle links as app
self.addEventListener('notificationclick', (event) => {
  const { notification } = event;
  const url = notification.data.url || '/';
  event.waitUntil(
    clients.openWindow(url)
  );
  notification.close();
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith("gameshelf://")) {
    event.respondWith(new Response("Custom Protocol Handler: gameshelf://", { status: 200 }));
  }
});