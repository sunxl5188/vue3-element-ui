/**
 * 自动引入当前文件夹下所有module
 * require.context(directory, useSubdirectories = false, regExp = /^.//);
 * @param {String} directory 读取文件的路径
 * @param {Boolean} directory 匹配文件的正则表达式
 * @param {} regExp 读取文件的路径
 */

const modulesFiles = require.context("./modules", true, /.ts$/);
const api = modulesFiles.keys().reduce((modules: any, modulePath: string) => {
  const moduleName = modulePath.replace(/^.\/(.*)\.ts/, "$1");
  const value = modulesFiles(modulePath);
  if (moduleName !== "index") {
    modules[moduleName] = value.default;
  }
  return modules;
}, {});

export default api;
