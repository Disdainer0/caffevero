import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  async redirects() {
    const map: Record<string, string> = {
      "/index.html": "/",
      "/kava.html": "/kava",
      "/kapsule.html": "/kapsule",
      "/caj.html": "/caj",
      "/cokolada.html": "/cokolada",
      "/sirup.html": "/sirupy",
      "/kavovar.html": "/kavovary",
      "/co_je_kava.html": "/o-kave",
      "/historia_kavy.html": "/o-kave",
      "/vero.html": "/o-kave",
      "/contact.html": "/kontakt",
    };

    return Object.entries(map).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
