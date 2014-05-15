var mocha = require('gulp-mocha');

module.exports = function(gulp, config) {
  gulp.task('spec', function() {
    var stream = gulp
      .src(config.spec.paths)
      .pipe(mocha());

    return stream;
  });
};