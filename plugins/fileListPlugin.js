
/**
 * 生成一个 assets.md 新文件，内容是所有构建生成的文件列表
 */
class FileListPlugin {

    static defaultOptions = {
        outputFile: "assets.md"
    }

    constructor (options = {}) {
        this.options = { ...FileListPlugin.defaultOptions, ...options };
    }

    apply (compiler) {
        const pluginName = FileListPlugin.name;

        const { webpack } = compiler;

        // Compilation - 提供一些常用的常量
        const { Compilation } = webpack;

        // RawSource - 一种 “源码” 类型，用来在 compilation 中表示资源的源码
        const { RawSource } = webpack.sources;

        // thisCompilation - 初始化 compilation 时触发
        compiler.hooks.thisCompilation.tap(pluginName, compilation => {
            // 返回的 compilation 可以让我们更加细致地绑定编译过程中的阶段/事件
            // processAssets - 处理资源时
            compilation.hooks.processAssets.tap({
                name: pluginName,
                stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE
            }, assets => {
                // assets - 包含 compilation 中所有资源的对象，键是资源路径，值是资源源码

                // 遍历所有资源的路径，作为要输出的文件内容
                const content = Object.keys(assets).map(filename => `- ${filename}`).join("\n");

                // 向 compilation 添加资源，webpack 会自动生成并输出到 output 目录
                compilation.emitAsset(this.options.outputFile, new RawSource(content));
            });
        });
    }

}

module.exports = FileListPlugin;
