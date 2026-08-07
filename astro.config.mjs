// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // 本地开发固定端口：dev 用 45231，preview 用 45232
  // 存在这里任何启动命令都会自动使用，不用每次手动 --port
  server: {
    port: 45231,
  },
  preview: {
    port: 45232,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
