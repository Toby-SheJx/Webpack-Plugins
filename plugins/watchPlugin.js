
/**
 * 在 webpack 的 watch 模式下触发
 */
class WatchPlugin {
    
    apply (webpackCompiler) {
        
        // watchRun - 在监听模式下触发，在一个 compilation 出现后，在 compilation 执行前触发
        webpackCompiler.hooks.watchRun.tapAsync("WatchPlugin", (compiler, callback) => {
            console.log(" 监听到了！ ");

            const mtimes = compiler.watchFileSystem.watcher.mtimes;
            if (!mtimes) return;
            // 通过正则处理，避免显示 node_modules 文件夹下依赖的变化
            const mtimesKeys = Object.keys(mtimes).filter(path => !/(node_modules)/.test(path));
            if (mtimesKeys.length) {
                console.log(` 本次改动了 ${mtimesKeys.length} 个文件，路径为：\n `, mtimes);
            }

            callback();
        });

        // watchClose - 在一个监听中的 compilation 结束时触发
        webpackCompiler.hooks.watchClose.tap("WatchPlugin", () => {
            console.log(" 监听结束，再见！ ");
        });

    }

}

module.exports = WatchPlugin;
