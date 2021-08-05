/* eslint-disable @typescript-eslint/no-var-requires */
const WebpackAutoInjectVersionPlugin = require("webpack-auto-inject-version-plugin"); // 版本號
const CompressionWebpackPlugin = require("compression-webpack-plugin"); // 打包壓縮
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); // 打包時間檢測
const TerserPlugin = require("terser-webpack-plugin");
const GenLocalesWebpackPlugin = require("gen-locales-webpack-plugin"); // i18n 文件解析

module.exports = {
  productionSourceMap: false, // 是否在構建生產包時生成 sourceMap 文件，false將提高構建速度(map文件能看到具體報錯位置)
  configureWebpack: (config) => {
    // plugins -------------------------------
    // 開發模式 -------------------------------
    if (process.env.NODE_ENV === "development") {
      const development = [
        new GenLocalesWebpackPlugin({
          path: "./src/plugins/i18n",
          target: "locales.json"
        })
      ];
      config.plugins = [...config.plugins, ...development];
    }
    // 生產模式 -------------------------------
    if (process.env.NODE_ENV === "production") {
      const production = [
        new CompressionWebpackPlugin({
          filename: `[path].br[query]`,
          algorithm: `brotliCompress`,
          // filename: "[path].gz[query]",
          // algorithm: "gzip",
          test: /\.js$|\.css$|\.scss$|\.less$|\.html$/, // 匹配檔名
          threshold: 10240, // 對超過10kb的資料進行壓縮
          deleteOriginalAssets: false, // 是否刪除原檔案
          minRatio: 0.8
        })
      ];
      config.plugins = [...config.plugins, ...production];
    }
    config.plugins = [...config.plugins, new WebpackAutoInjectVersionPlugin()];

    // optimization -------------------------------
    config.optimization = {
      usedExports: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ["console.log"] // 移除console
            }
          }
        })
      ],
      splitChunks: {
        automaticNameDelimiter: ".",
        minSize: 10000,
        maxSize: 250000,
        // 提取到多個CSS文件中更好地進行緩存和預加載隔離
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.(css|vue)$/,
            chunks: "all",
            enforce: true
          }
        }
      }
    };
  },
  chainWebpack: (config) => {
    // 設定打包時間檢測
    config.plugin("speed-measure-webpack-plugin").use(SpeedMeasurePlugin).end();
    // webpack-bundle-analyzer
    if (process.env.NODE_ENV !== "production") {
      config.plugin("webpack-bundle-analyzer").use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
    }
  },
  devServer: {
    disableHostCheck: true,
    https: true,
    proxy: {
      "/api": {
        target: "http://bgec.dev-relithe.com" // 泰爾開發站
        // target: "https://bgec-stage.relithe.com" // 泰爾整合站,
        // pathRewrite: { "^/api": "" },
        // changeOrigin: true
        // ws: true
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/styles/index.scss";'
      }
    }
  }
};
