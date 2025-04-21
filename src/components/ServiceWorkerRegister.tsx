"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log("✅ Service Worker registrado:", registration);
          })
          .catch((error) => {
            console.error("❌ Falha ao registrar Service Worker:", error);
          });
      });
    }
  }, []);

  return null;
}
