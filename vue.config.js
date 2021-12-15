module.exports = {
  // publicPath:
  //   process.env.NODE_ENV === 'production' ? '/public_html' : '/',
  // Plugins
  pluginOptions: {
    // If we install Vite, we can configure it here
    vite: {
      /**
       * Plugin[]
       *
       * @default []
       */
      plugins: [
        // ...
      ],
      /**
       * Vite UserConfig.optimizeDeps options
       * recommended set `include` for speedup page-loaded time, e.g. include: ['vue', 'vue-router', '@scope/xxx']
       *
       * @default {}
       */
      optimizeDeps: {
        // ...
      },
      /**
       * type-checker, recommended disabled for large-scale old project.
       *
       * @default false
       */
      disabledTypeChecker: true,
      /**
       * lint code by eslint
       *
       * @default false
       */
      disabledLint: false,
    },
  },
  // Webpack
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
      ],
    },
  },
}
