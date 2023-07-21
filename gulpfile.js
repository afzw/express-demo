const gulp = require('gulp')
const del = require('del')
const $ = require('gulp-load-plugins')()

// ts编译
gulp.task('ts-compile', function () {
  const project = $.typescript.createProject('tsconfig.json')
  return gulp
    .src(['src/**/*.ts', 'scripts/**/*.ts'])
    .pipe(project())
    .pipe($.if('*.js', $.terser().on('error', console.error)))
    .pipe(gulp.dest('dist-tscompile'))
})

// 拷贝资源文件
gulp.task('copyAssets', function () {
  return gulp
    .src(['**/*.js', 'assets/**/*', 'public/**/*', '.npmrc', 'package*.json'], {
      base: 'dist-tscompile',
      dot: true,
      allowEmpty: true
    })
    .pipe(gulp.dest('dist/'))
})

gulp.task('build', gulp.series('ts-compile', 'copyAssets'))

// 清理之前的dist
gulp.task('clean', del.bind(null, ['dist-tscompile', 'dist']))

gulp.task('default', gulp.series('clean', 'build'))
