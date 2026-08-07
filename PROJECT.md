# OhImTBlog 项目档案（Agent 指导文件）

> 本文件是项目的完整档案，供**新对话的 agent 快速了解项目**。所有操作约定请同时遵守 [CLAUDE.md](CLAUDE.md)。
>
> 最后更新：2026-08-07 ｜ 当前 git：`master @ 0dd180b`

---

## 1. 项目背景

- **是什么**：一个纯静态个人博客网站，从零搭建（非套用模板）
- **起源**：用户参考 [novic.cc 建站文章](https://novic.cc/articles/2026/first-post/) 想独立做出自己的网站
- **与参考方案的关键差异**：
  - 不使用 opencode + WSL，改用 **Windows + Claude Code** 开发
  - 内容结构简化为**仅"博客文章"一个栏目**（参考方案还有 Notes）
  - 首版从最小可用开始，暂不做搜索/标签页/RSS 等
- **当前状态**：首版功能完成 + 字体体系完成，**尚未部署**

---

## 2. 用户画像与需求

### 画像
- **身份**：计算机专业学生
- **基础**：有一定计算机基础，**无前端开发经验**（不懂 HTML/CSS/JS，但能理解编程概念）
- **目标**：不只是"做出来"，还要**看懂代码**——理解项目结构和每步在做什么
- **语言**：用简体中文与 agent 交流

### 需求
- 纯静态博客，**暂不部署**
- 内容：**技术 + 生活**混合，**中英混合**
- 文章用 Markdown 写在 `src/content/blog/`

### 沟通与工作约定（agent 必须遵守）
1. **教学式推进**：分阶段、每阶段有可验证的成果、关键概念先讲解再动手
2. **讲解用比喻 + 本项目真实代码例子**，避免抽象术语堆砌
3. **git 纪律**：每个阶段/每次完整改动提交一次；实验性改动**单开分支**，确认后再合并
4. 动手改样式/排版前，先讲清楚"改哪个文件、为什么"

---

## 3. 技术栈

| 层 | 技术 | 版本 | 说明 |
|---|---|---|---|
| 框架 | Astro | ^7.2.0 | 静态输出，**无 adapter**，纯静态站点 |
| 样式 | Tailwind CSS v4 | ^4.3.3 | 通过 `@tailwindcss/vite` 接入（非废弃的 `@astrojs/tailwind`） |
| 排版插件 | @tailwindcss/typography | ^0.5.20 | `prose` 类美化文章正文 |
| 内容 | Markdown 内容集合 | — | `glob` loader + zod schema（Astro 7 新 API） |
| 字体 | JetBrains Mono | ^5.3.0 | `@fontsource-variable` 自托管，代码等宽字体 |
| 包管理 | pnpm | 11.x | `pnpm-workspace.yaml` 有 build 权限配置 |
| 语言 | TypeScript | — | `astro/tsconfigs/strict` |
| 运行环境 | Node.js | >= 22.12.0 | Windows 11 |

### 关键技术约定（避免踩坑）
- Tailwind v4 配置**写在 CSS 里**（`@theme`），**没有** `tailwind.config.js`
- 内容集合 schema 用 `z.coerce.date()` 处理日期；`getCollection` 排序不保证，必须自己 `.sort()`
- `@theme` 会被 VS Code 标 `Unknown at rule` 警告——**误报**，忽略即可

---

## 4. 目录结构与关键文件

```
OhImTBlog/
├─ astro.config.mjs            # Astro 配置：@tailwindcss/vite 插件 + 固定端口
├─ package.json                # 依赖与脚本
├─ pnpm-workspace.yaml         # pnpm build 权限配置
├─ CLAUDE.md                   # 操作约定（dev 模式/git/端口/文档）
├─ PROJECT.md                  # 本档案文件
└─ src/
   ├─ content.config.ts        # 内容集合 schema（文章字段校验）
   ├─ content/blog/*.md        # 文章（Markdown，frontmatter 写元数据）
   ├─ layouts/BaseLayout.astro # 全站布局壳（head/header/slot/footer）
   ├─ components/PostCard.astro# 首页文章卡片
   ├─ pages/index.astro        # 首页：文章列表（按 pubDate 倒序）
   ├─ pages/blog/[...slug].astro # 文章详情页（动态路由）
   └─ styles/global.css        # Tailwind 入口 + @theme 设计令牌 + 字体引入
```

**写新文章**：只需在 `src/content/blog/` 放一个 `.md` 文件，无需改代码。frontmatter 字段见 `src/content.config.ts`（title 必填 / description 可选 / pubDate 必填 / tags 可选）。

---

## 5. 历史与关键决策

### 时间线
| 提交 | 内容 |
|---|---|
| `6fcccab` | Initial commit from Astro（模板）|
| `d4598d9` | 阶段1：接入 Tailwind v4 + 全站布局骨架 |
| `af1069c` | 阶段2：内容集合 + 2 篇示例文章 |
| `789d1a7` | 阶段3：首页文章列表（日期倒序）|
| `1321815` | 阶段4：文章详情页（动态路由）|
| `550db06` | 阶段5：详情页标签 + 构建验证（首版完成）|
| `e53eb76` | 实验：@theme 覆盖字体（理解字体令牌机制）|
| `9f0b4b3` | 正式三字体配置（正文无衬线/代码等宽/衬线备用）|
| `b20d479` | 自托管 JetBrains Mono 代码字体 |
| `0dd180b` | 去掉演示用标题衬线（当前 HEAD）|

### 关键决策记录
1. **固定端口**：dev 用 `45231`、preview 用 `45232`（写在 astro.config.mjs），避免默认 4321 冲突
2. **git 节奏**：每阶段提交一次；实验性改动单开分支（如 `style/*`），确认后合并、清理
3. **字体方案演进**：系统字体 → `@theme` 设计令牌 → Web Font（@fontsource 自托管 + unicode-range 分片按需加载）
4. **样式方案**：Tailwind v4 手写 class（非现成主题），教学价值优先

---

## 6. 当前进度与资产

### 已完成
- ✅ 首页文章列表（标题/日期/摘要，按日期倒序）
- ✅ 文章详情页（Markdown 渲染 + prose 排版 + 标签显示 + 返回链接）
- ✅ 内容集合（zod 校验，写错字段立即报错）
- ✅ 字体体系：正文无衬线（苹方/雅黑栈）、代码 JetBrains Mono、衬线备用令牌
- ✅ 构建验证通过，`dist/` 含字体文件，可随时部署

### 当前资产
- **dev server**：后台运行于 http://localhost:45231（用 `astro dev status/logs/stop` 管理）
- **构建产物**：`pnpm build` → `dist/`（纯静态，可拖到任意静态托管）
- **示例文章**：`my-first-post.md`（2026-08-07）、`second-post.md`（2026-08-01）

---

## 7. 常用命令

```bash
pnpm astro dev --background   # 后台启动 dev（约定方式）
pnpm astro dev status/logs/stop  # 管理 dev server
pnpm run build                # 构建到 dist/
pnpm astro preview --background  # 预览构建产物（45232 端口）
pnpm astro sync               # 内容集合变更后重新生成类型
```

git 约定：改动 → `git add -A && git commit`；实验单开分支 → 确认后合并 → `git branch -d`

---

## 8. 未来方向（Roadmap，未开始）

按性价比排序：
1. **中文标题字体**（子集化，如 cn-font-split）——标题字少，子集后体积小，效果出彩
2. **头栏排版**（参考 novic.cc：站名/导航/搜索三栏 + sticky + 毛玻璃）
3. **暗色主题**（Tailwind v4 `dark:` 变体）
4. **RSS / 站内搜索（Pagefind）/ SEO**（sitemap + OG 图）
5. **部署上线**（Netlify 拖拽 / GitHub Pages / Vercel）
6. **代码高亮**（Expressive Code）

---

## 9. 文档参考

- [Astro 官方文档](https://docs.astro.build)（路由 / 内容集合 / 组件）
- [Tailwind CSS v4 文档](https://tailwindcss.com/docs)（注意：不用 v3 教程）
- [typography 插件](https://github.com/tailwindlabs/tailwindcss-typography)
