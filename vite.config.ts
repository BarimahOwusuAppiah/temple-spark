import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Disable Cloudflare Workers adapter so the build targets Node.js/static
  // This allows deployment to Vercel, Netlify, or any Node host
  cloudflare: false,
});
