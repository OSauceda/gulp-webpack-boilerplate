// Dependencies
import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';

// SCSS
import sass from 'gulp-sass';
import cssnano from 'gulp-cssnano';

// Webpack
import { scripts } from './webpack.config.js';

// SCSS task
gulp.task('scss', () => {
  const isProd = process.env.NODE_ENV === 'production';
  const sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded',
  };
  const defaults = {
    autoprefixer: {
      browsers: ['last 2 version', 'ie >= 10'],
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
  let cssNanoOptions;

  if (isProd) {
    cssNanoOptions = Object.assign({}, defaults);
  } else {
    cssNanoOptions = Object.assign({}, defaults, devOptions);
  }

  return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(cssnano(cssNanoOptions))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/assets/css/'));
});

// Development task
gulp.task('default', scripts);
