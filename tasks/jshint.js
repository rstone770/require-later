var jshint = require('gulp-jshint'),
    map    = require('map-stream');

var hasErrors = false,
    checkError = map(function(file, callback) {
      if(!file.jshint.success) {
        hasErrors = true;
      }

      callback();
    }),
    handleErrors = function() {
      if(hasErrors) {
        return process.exit(1);
      }
    };

module.exports = function(gulp, config) {
  var options = config.lint;

  gulp.task('lint', function() {
    var stream = gulp
      .src(options.paths)
      .pipe(jshint())
      .pipe(jshint.reporter(options.reporter))
      .pipe(checkError)
      .on('end', handleErrors);

    return stream;
  });
};