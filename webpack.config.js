import webpack from 'webpack';
import process from 'process';

const env = (process.env.NODE_ENV === 'production') ? 'prod' : 'dev';
const config = require(`./webpack-config/webpack.config.${env}.js`);

function scripts() {
  return new Promise(resolve => webpack(config, (err, stats) => {

    if (err) {
  	 console.log('Webpack', err);
    }

    console.log(stats.toString({
      cached: false,
      cachedAssets: false,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      modules: false,
      colors: true,
      hash: false
    }))

    resolve()
  }))
}

module.exports = { scripts };
