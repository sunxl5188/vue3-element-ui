const { defineConfig } = require("@vue/cli-service");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  devServer: {
    proxy: {
      "/api": {
        target: process.env.VUE_APP_BASE_URL, // 代理地址，这里设置的地址会代替axios中设置的baseURL
        changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        ws: true, // 代理websockets
        pathRewrite: {
          // 路径重写，
          "^/api": "", // 替换target中的请求地址，也就是说以后你在请求http://api.taobao.com/xxx这个地址的时候直接写成/taobao/xxx即可。
        },
      },
    },
  },
});
