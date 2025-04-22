importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "pwabuilder-page-v2";
const OFFLINE_PAGE = "offline.html";

// --- SKIP WAITING ---
self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// --- INSTALL ---
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll([OFFLINE_PAGE]))
  );
});

// --- ACTIVATE ---
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// --- FETCH ---
if (self.workbox && workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // Protocolo customizado
  if (url.startsWith("gameshelf://")) {
    event.respondWith(new Response("Protocolo personalizado gameshelf:// detectado", { status: 200 }));
    return;
  }

  // Navegação
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preload = await event.preloadResponse;
        return preload || await fetch(event.request);
      } catch {
        const cache = await caches.open(CACHE);
        return await cache.match(OFFLINE_PAGE);
      }
    })());
  }
});

// --- SYNC ---
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-favoritos") {
    event.waitUntil(syncFavoritos());
  } else if (event.tag === "sync-jogos") {
    event.waitUntil(syncJogosComServidor());
  }
});

// --- PERIODIC SYNC ---
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "atualizar-jogos") {
    event.waitUntil(syncJogosComServidor());
  }
});

// --- PUSH ---
self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};
  const title = data.title || "Notificação GameShelf";
  const options = {
    body: data.body || "Você tem atualizações disponíveis.",
    icon: "/icons/android/icon-192x192.png",
    badge: "/icons/android/icon-192x192.png",
    data: { url: data.url || "/" },
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});

// --- FUNÇÕES MOCKADAS ---
async function syncFavoritos() {
  console.log("Sincronizando favoritos...");
  return Promise.resolve();
}

async function syncJogosComServidor() {
  console.log("Atualizando jogos...");
  return Promise.resolve();
}