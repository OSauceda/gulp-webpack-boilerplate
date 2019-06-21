// Dependencies
import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';

// SCSS
import sass from 'gulp-sass';
import cssnano from 'gulp-cssnano';

// SCSS task
gulp.task('scss', () => {
  const sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded',
  };
  const cssNanoOptions = {
    autoprefixer: {
      browsers: ['last 2 version', 'ie >= 10'],
      add: true
    },
    reduceIdents: false
  };

  return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(cssnano(cssNanoOptions))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/assets/css/'));
});

