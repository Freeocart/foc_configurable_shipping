const gulp = require('gulp'),
      zip = require('gulp-zip');
const pkg = require('./package.json')

gulp.task('build', () => {
  return gulp
    .src('./upload/**', { base: '.' })
    .pipe(zip(`${pkg.name}.ocmod.zip`))
    .pipe(gulp.dest('./'));
})

function mktest () {
  return gulp
    .src('./upload/**')
    .pipe(gulp.dest(process.env.SITE_DIR))
}

function watchMkTest () {
  return gulp.watch('./upload/**', mktest)
}

gulp.task('mktest', mktest);
gulp.task('default', gulp.series(mktest, watchMkTest));