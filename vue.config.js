const path = require('path');


module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  outputDir: 'dist',
  // publicPath: xconfig.publicPath,
  configureWebpack: {
    // cdn预加载使用
    externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios'
    },
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
      }
    },
    // 关闭 webpack 的性能提示
    performance: {
      hints: false
    },
    // 或者
    // 警告 webpack 的性能提示
    performance: {
      hints: 'warning',  // 枚举
      //入口起点的最大体积,整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      //生成文件的最大体积,整数类型（以字节为单位）
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示, 提供资源文件名的断言函数
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js') || assetFilename.endsWith('.css');
      }
    },
  },
  // devServer: {
  //   open: false,
  //   // host:xconfig.devHost,
  //   //host:'192.168.2.58',
  //   host: '127.0.0.1',
  //   port: '8080',
  //   https: false,
  //   hotOnly: false,
  //   proxy: {
  //     '/': {
  //       // target: xconfig.devTarget, //API服务器的地址
  //       target: `http://api.conference.strangeuniverse.com`,
  //       ws: true,  //代理websockets
  //       changeOrigin: true, // 虚拟的站点需要更管origin
  //       // pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
  //       //   '/': '/'
  //       // }
  //     }
  //   },
  // },

  css: {
    loaderOptions: {
      sass: {
        // prependData: `@import "~@/assets/style/commun.scss";`
      }
    },
    extract: process.env.NODE_ENV === 'production' ? {
      ignoreOrder: true,
    } : false,
  }
}