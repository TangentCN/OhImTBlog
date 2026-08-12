// 内容集合定义：告诉 Astro 文章放在哪、每篇必须有/可以有哪些字段
// 把它理解成"文章数据库的建表语句"——写错字段会立刻报错，编辑器还有自动补全

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  // glob loader：扫描 src/content/blog/ 下所有 .md / .mdx 文件作为文章
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  // schema：字段校验。z.string() 必填，.optional() 选填，z.coerce.date() 自动把日期字符串转成 Date
  schema: z.object({
    title: z.string(),                    // 文章标题（必填）
    description: z.string().optional(),   // 摘要（选填）
    pubDate: z.coerce.date(),             // 发布日期（必填，支持 "2026-08-07" 格式）
    tags: z.array(z.string()).default([]),// 标签（选填，默认空数组）
  }),
});

const about = defineCollection({
  // 简介集合：扫描 src/content/about/ 下所有 .md
  // 简介没有 frontmatter 字段（title/pubDate 是文章专属），用空 schema——正文即全部内容
  loader: glob({ base: './src/content/about', pattern: '**/*.md' }),
  schema: z.object({}),
});

export const collections = { blog, about };
