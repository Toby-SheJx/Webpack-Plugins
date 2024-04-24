const Minimize = require("minimize");

/**
 * 压缩 HTML 文件
 * @param {string} source 接收所要处理的文件源代码
 */
function HtmlMinimizeLoader (source) {
    // async 方法返回的才是异步回调函数，异步回调函数会将结果传递出去，因此不需要再 return
    const callback = this.async();

    // webpack 5 不再需要用 loader-utils 的 getOptions 方法获取 option，可以直接通过 this.query 获取
    const options = this.query;    

    const minimize = new Minimize(options);
    // 实际上异步回调函数 callback 接收两个参数，第一个是错误信息，第二个是处理结果
    // 这里 parse 方法的回调函数会返回这两个参数，由 callback 接收并调用
    minimize.parse(source, callback);

    // return result;
};

module.exports = HtmlMinimizeLoader;
