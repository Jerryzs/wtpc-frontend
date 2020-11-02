const path = require('path');

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $0: [path.resolve(__dirname, 'src/global.js'), 'default']
      }),
      new webpack.DefinePlugin({
        CDN: JSON.stringify(process.env.NEXT_PUBLIC_CDN)
      })
    );

    Object.assign(config.node, {
      fs: 'empty',
      child_process: 'empty',
      net: 'empty',
      tls: 'empty'
    });

    return config;
  },

  webpackDevMiddleware: (config) => {
    return config;
  }
};
