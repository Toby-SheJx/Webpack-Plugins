
const fs = require("fs");
const path = require("path");

/** 每次编译时删除上一次编译结果中不再需要的文件 */
class CleanPlugin {

    constructor (options) {
        this.options = options;
    }

    apply (compiler) {
        const pluginName = CleanPlugin.name;

        // 编译输出文件的路径，根据此路径可获取对应目录下的所有文件
        const outputPath = compiler.options.output.path;
        const outputPathPrefix = path.basename(outputPath);
        const oldFiles = this.readAllFiles(outputPath);

        // console.log(" old files ", oldFiles);

        // done - 完成新的编译后执行，此时能获取新的输出文件与现有文件进行对比
        compiler.hooks.done.tap(pluginName, stats => {

            // 新的一次编译完成后的输出文件的相对路径
            const newFiles = stats.toJson().assets.map(assets => fs.realpathSync(`${outputPathPrefix}\\${assets.name}`));

            // console.log(" new files ", newFiles);

            // 新旧文件对比，筛选出需要删除的文件
            const removeFiles = [];
            oldFiles.forEach(oldFile => {
                if (newFiles.indexOf(oldFile) === -1) {
                    removeFiles.push(oldFile);
                }
            });

            // 删除文件
            removeFiles.forEach(removeFile => fs.unlinkSync(removeFile));
        });
    }

    /**
     * 获取文件夹下所有的文件名（包括子级文件夹中的文件）
     * @param {string} dir 文件夹路径
     */
    readAllFiles (dir) {
        let fileList = [];

        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                fileList = fileList.concat(this.readAllFiles(filePath));
            } else {
                fileList.push(filePath);
            }
        });

        return fileList;
    }

}

module.exports = CleanPlugin;
