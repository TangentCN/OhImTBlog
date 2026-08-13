// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import remarkPangu from './remark-pangu.mjs';

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
  // Markdown 渲染：注册盘古之白插件（中英文空格）。
  // 注：heading id 与目录由 Astro 7 内置生成（getHeadings），无需自定义 rehype 插件
  markdown: {
    remarkPlugins: [remarkPangu],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
