"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(async (registration) => {
          console.log("Service Worker registrado:", registration);

          const reg = registration as ServiceWorkerRegistration & {
            sync?: { register: (tag: string) => Promise<void> };
            periodicSync?: {
              getTags: () => Promise<string[]>;
              register: (
                tag: string,
                options: { minInterval: number }
              ) => Promise<void>;
            };
          };

          // Background Sync
          if (reg.sync) {
            try {
              await reg.sync.register("sync-favoritos");
              await reg.sync.register("sync-jogos");
              console.log("Sync tags registradas com sucesso");
            } catch (err) {
              console.warn("Erro ao registrar sync tags:", err);
            }
          }

          // Periodic Background Sync
          if (reg.periodicSync) {
            try {
              const tags = await reg.periodicSync.getTags();
              if (!tags.includes("atualizar-jogos")) {
                await reg.periodicSync.register("atualizar-jogos", {
                  minInterval: 24 * 60 * 60 * 1000, // 1 dia
                });
                console.log("Periodic sync 'atualizar-jogos' registrado");
              }
            } catch (err) {
              console.warn("Erro ao registrar periodic sync:", err);
            }
          }
        })
        .catch((err) => {
          console.error("Erro no registro do Service Worker:", err);
        });
    }
  }, []);

  return null;
}
