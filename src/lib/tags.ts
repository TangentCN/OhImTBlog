// tag 聚合工具：把所有文章的 tags 去重、计数、按文章数降序排列
// 供列表页顶部 tag 列表与 tag 归档页复用（参考 novic.cc 的排序方式）

export interface TagCount {
  tag: string;
  count: number;
}

// tag → URL slug：把 URL 特殊字符换成安全形式（空格→连字符、去掉 %，中文/字母/数字不变）。
// 否则含空格或 % 的 tag（如 "100% Human"）当路径时 URL 编码/解码对不上，构建会报错
export const tagSlug = (tag: string) => tag.replace(/\s+/g, "-").replace(/%/g, "");

export function getAllTags(posts: { data: { tags: string[] } }[]): TagCount[] {
  const map = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      map.set(tag, (map.get(tag) ?? 0) + 1);
    }
  }
  // [...map.entries()] 把 Map 变成 [tag, count] 数组，再映射成对象、按数量降序
  return [...map.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}
