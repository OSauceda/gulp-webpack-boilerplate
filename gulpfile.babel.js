// Dependencies
import gulp, { watch, series, parallel } from 'gulp';
import notify from 'gulp-notify';

// SCSS
import sass from 'gulp-sass';
import cssnano from 'gulp-cssnano';
import cached from 'gulp-cached';
import dependents from 'gulp-dependents';

sass.compiler = require('node-sass');

// Webpack
import { scripts } from './webpack.config.js';

// Compile SCSS to CSS
export function styles() {
  const isProd = process.env.NODE_ENV === 'production';
  const sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded',
  };
  const defaults = {
    autoprefixer: {
      browsers: ['last 3 version', 'ie >= 11'],
      add: true
    },
    reduceIdents: false
  };
  const devOptions = {
    normalizeWhitespace: false,
    colormin: false,
    mergeLonghand: false,
    mergeRules: false,
    minifyGradients: false,
    reduceTransforms: false,
    reduceInitial: false,
    svgo: false,
    minifyFontValues: false,
  };
  const cssNanoOptions = (isProd) ? Object.assign({}, defaults) : Object.assign({}, defaults, devOptions);

  return gulp.src('./src/scss/**/*.scss')
    .pipe(cached('scss'))
    .pipe(dependents())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(cssnano(cssNanoOptions))
    .pipe(gulp.dest('./dist/assets/css/'));
}

// Chokidar event listener callback
const onFileChangeHandler = (task, message) => {

  return (newPath) => {
    console.log(`File ${newPath} was changed, running task '${task}'...`);
    notify({
      title: `Starting task '${task}'...`,
      message,
      sound: false
    }).write('');
  };
};

function watchTask() {

  watch('./src/scss/**/*.scss', styles)
    .on('change', onFileChangeHandler('scss', 'Proceeding to compile SCSS...'));
}

// default task (dev)
exports.default = series([parallel([styles, scripts])], watchTask);
