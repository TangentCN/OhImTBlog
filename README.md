# OhImT Blog

- *本文档由AI生成*

一个从零搭建的个人静态博客，基于 **Astro 7 + Tailwind CSS v4**，无前端框架依赖。

在线访问：https://ohimt.novic.cc

## 技术栈

| 层 | 技术 | 说明 |
|---|---|---|
| 框架 | Astro 7 | 静态输出，内置 View Transitions |
| 样式 | Tailwind CSS v4 | `@theme` 设计令牌（字体 + 配色） |
| 排版 | @tailwindcss/typography | `prose` 美化文章正文 |
| 内容 | Markdown 内容集合 | glob loader + zod schema 校验 |
| 字体 | JetBrains Mono（自托管）| 等宽代码字体 |
| 包管理 | pnpm | |

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器（后台模式，端口 45231）
pnpm astro dev --background
```

浏览器打开 http://localhost:45231 即可预览。

## 常用命令

| 命令 | 作用 |
|---|---|
| `pnpm astro dev --background` | 后台启动 dev server（45231） |
| `pnpm astro dev status / logs / stop` | 管理后台 dev server |
| `pnpm run build` | 构建到 `dist/` |
| `pnpm astro preview --background` | 预览构建产物（45232） |
| `pnpm astro sync` | 内容集合变更后重新生成类型 |

## 项目结构

```
src/
├─ content.config.ts        # 内容集合 schema（文章 + 简介）
├─ content/
│  ├─ blog/*.md             # 文章（标题/pubDate 必填）
│  └─ about/me.md           # 首页简介（改此文件即改简介）
├─ layouts/BaseLayout.astro # 全站外壳（背景图/毛玻璃 header/导航）
├─ components/PostCard.astro# 文章卡片（圆角半透明 + hover）
├─ pages/
│  ├─ index.astro           # 极简主页（粒子背景 + 标题 + 简介）
│  └─ blog/
│     ├─ index.astro        # 文章列表页
│     └─ [...slug].astro    # 文章详情页（动态路由 + 浮动返回按钮）
└─ styles/global.css        # Tailwind 入口 + @theme 字体/配色令牌
```

## 内容管理

**写新文章**：在 `src/content/blog/` 放一个 `.md` 文件即可，无需改代码：

```markdown
---
title: "文章标题"
description: "摘要（可选）"
pubDate: 2026-08-10
tags: ["标签", "可选"]
---

正文内容（Markdown）
```

**修改首页简介**：编辑 `src/content/about/me.md`。

> 新增文章/文件后，先运行 `pnpm astro sync` 再构建。

## 部署

GitHub 推送 → vercel自动构建部署：

```bash
git push origin master
```

约 1 分钟后访问 https://ohimt.novic.cc 查看更新。

## 文档参考

- [Astro 文档](https://docs.astro.build)
- [Tailwind CSS v4 文档](https://tailwindcss.com/docs)
- [typography 插件](https://github.com/tailwindlabs/tailwindcss-typography)
