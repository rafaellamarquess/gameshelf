"use client";

import { useEffect } from "react";

// Declare SyncManager type for TypeScript
interface SyncManager {
  register(tag: string): Promise<void>;
}

// Declare PeriodicSyncManager type for TypeScript
interface PeriodicSyncManager {
  getTags(): Promise<string[]>;
  register(tag: string, options: { minInterval: number }): Promise<void>;
}

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", async () => {
        try {
          const registration = await navigator.serviceWorker.register("/service-worker.js");
          console.log("Service Worker registrado:", registration);

          // Background Sync
          if ("sync" in registration) {
            const sync = registration.sync as SyncManager;
            await sync.register("sync-favoritos");
            await sync.register("sync-jogos");
            console.log("Sync tasks registrados.");
          } else {
            console.warn("SyncManager não suportado.");
          }

          // Periodic Background Sync
          if ("periodicSync" in registration) {
            const periodicSync = registration.periodicSync as PeriodicSyncManager;
            const tags = await periodicSync.getTags();
            if (!tags.includes("atualizar-jogos")) {
              await periodicSync.register("atualizar-jogos", {
                minInterval: 24 * 60 * 60 * 1000, // 1x por dia
              });
              console.log("Periodic Sync registrado.");
            }
          } else {
            console.warn(" Periodic Sync não suportado.");
          }
        } catch (error) {
          console.error("Erro ao registrar Service Worker ou Sync:", error);
        }
      });
    }
  }, []);

  return null;
}
