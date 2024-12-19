import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // TODO: Change domain to only cdn.ctrl-alt-elite.club
  images: {
    domains: ['cdn.torten.xyz', 'cdn.ctrl-alt-elite.club']
  },
  publicRuntimeConfig: {
    api: {
      baseURL: 'https://gradex-api.ctrl-alt-elite.club/'
    },
  }
};

export default nextConfig;
