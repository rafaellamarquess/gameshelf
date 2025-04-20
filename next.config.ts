import withPWA from "next-pwa";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // outras opções...
};

export default withPWA({
  ...nextConfig,
  dest: "public", // Diretório de destino para o service worker
  disable: isDev, // Desativa o PWA em desenvolvimento (evita loop de recompilação)
  register: true,  // Registra o service worker
  skipWaiting: true, // Faz o service worker ativar imediatamente
});
