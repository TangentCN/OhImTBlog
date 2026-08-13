// remark 插件：渲染 Markdown 时在中英文衔接处自动加空格（盘古之白）
// 用法：astro.config.mjs 的 markdown.remarkPlugins 里注册，所有文章渲染时自动生效
// 只遍历 text 节点 → 天然保护：代码块(code)、行内代码(inlineCode)、链接URL(link.url) 不会被误改
export default function remarkPangu() {
  return (tree) => {
    const walk = (node) => {
      if (node.type === "text") {
        node.value = node.value
          // 中文/数字 后跟 英文/数字：加空格
          .replace(/([一-龥])([A-Za-z0-9])/g, "$1 $2")
          // 英文/数字 后跟 中文：加空格
          .replace(/([A-Za-z0-9])([一-龥])/g, "$1 $2");
      }
      if (node.children) node.children.forEach(walk);
    };
    walk(tree);
  };
}
