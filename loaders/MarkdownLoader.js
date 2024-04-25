const MarkdownIt = require("markdown-it");

/**
 * Markdown 文件的加载器
 * @param {string} source 源代码
 * @returns HTML 字符串
 */
function MarkdownLoader (source) {
    const options = this.query;

    // 将 md 转换为 html 格式
    const md = new MarkdownIt({ html: true, ...options });
    const result = md.render(source);
    // html 需要作为一个模块导出，这样才能够通过 import 或 require 被导入
    const html = `module.exports = ${JSON.stringify(result)}`;

    return html;
}

module.exports = MarkdownLoader;
