const { validate } = require("schema-utils");

// 插件实例化时传入 options 的类型结构
const schema = {
    type: "object",
    properties: { 
        test: { type: "string" }
    }
}

class MyPlugin {

    constructor (options = {}) {
        // 校验传入的 options
        validate(schema, options, {
            name: "My Plugin",
            baseDataPath: "options"
        });
    }

    // 在插件的 prototype 上定义一个 apply 方法，并接收一个 compiler 作为参数
    // 插件在使用时 apply 方法会被 webpack compiler 调用一次
    apply (compiler) {

        // 指定一个挂载到 webpack 自身的事件钩子
        // emit - 在输出 assets 到 output 目录之前执行
        compiler.hooks.emit.tapAsync("MyPlugin", (compilation, callback) => {
            console.log(" This is a plugin demo ");
            console.log(" compilation ", compilation);

            // 处理 webpack 实例内部的特定数据
            compilation.addModule();

            // 处理完成后调用 webpack 提供的回调
            callback();
        });

        // done - 在 compilation 完成时执行
        // 不同的事件钩子有不同的参数
        compiler.hooks.done.tap("MyPlugin", stats => {
            console.log(" stats ", stats);
        });

        // compilation - compilation 创建后执行
        compiler.hooks.compilation.tap("MyPlugin", compilation => {
            // optimize - 优化阶段开始时触发
            compilation.hooks.optimize.tap("MyPlugin", () => {
                console.log(" optimize ");
            });
        });
    }
}

module.exports = MyPlugin;
