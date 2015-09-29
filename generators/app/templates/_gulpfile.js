var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('stylesheet', function () {
  return gulp.src('app/content/css/main<%= cssExtension %>')
    <% if (cssPreprocessor == "scss") { %>
    .pipe($.sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.'],
      onError: console.error.bind(console, 'Sass error:')
    }))<% } else if (cssPreprocessor == "stylus") { %>
    .pipe($.stylus({
      errors: true
    }))<% } else if (cssPreprocessor == "less") { %>
    .pipe($.less())<% } %>
    .on('error', function (error) {
      console.log(error.stack);
      this.emit('end');
    })
    .pipe(gulp.dest('dist/content/css/'));
});

gulp.task('html', function () {
  return gulp.src('app/index.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('serve', ['stylesheet', 'html'], function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });

  // watch for changes
  gulp.watch([
    'dist/*.html',
    'dist/content/**/*'
  ]).on('change', reload);

  gulp.watch(['app/content/css/**/*<%= cssExtension %>'], ['stylesheet']);
  gulp.watch(['app/**/*.html'], ['html']);
});

gulp.task('serve:dist', function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});
