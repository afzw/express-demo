const gulp = require('gulp')
const del = require('del')
const $ = require('gulp-load-plugins')()

// for project building

// 编译源代码
gulp.task('compile-src', function () {
  const project = $.typescript.createProject('tsconfig.json')
  return gulp
    .src(['src/**/*.ts'])
    .pipe(project())
    .pipe($.if('*.js', $.terser().on('error', console.error)))
    .pipe(gulp.dest('build-internal'))
})

// 拷贝js源代码
gulp.task('copy-src', function () {
  return gulp
    .src(['build-internal/**/*.js'], {
      base: 'build-internal',
      dot: true
    })
    .pipe(gulp.dest('build/internal'))
})

// 拷贝资源文件
gulp.task('copy-assets', function () {
  return gulp
    .src(['node_modules/**/*', 'assets/**/*', 'public/**/*'], {
      base: '.',
      dot: true,
      allowEmpty: true
    })
    .pipe(gulp.dest('build/'))
})

gulp.task('build', gulp.series('compile-src', 'copy-src', 'copy-assets'))

// 清理之前的dist
gulp.task('clean', del.bind(null, ['build-internal', 'build']))

gulp.task('default', gulp.series('clean', 'build'))
