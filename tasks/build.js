var uglify     = require('gulp-uglify'),
    concat     = require('gulp-concat'),
    mustache   = require('gulp-mustache');

module.exports = function(gulp, config) {
  var options = config.build;

  gulp.task('build', options.deps, function() {
    var stream = gulp
      .src(options.main)
      .pipe(mustache(config.package))
      .pipe(concat(options.out.file))
      .pipe(uglify())
      .pipe(gulp.dest(options.out.dir));

    return stream;
  });
};