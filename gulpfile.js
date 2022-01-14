
// Импорт пакетов

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const browsersync = require('browser-sync').create()
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')

// Пути исходных файлов src

const paths = {

   html: {
      src: ['src/*.html'],
      dest: 'dist'
   },

   scss: {
      src: 'src/scss/**/*.scss',
      dest: 'dist/css/'
   },
   scripts: {
      src: 'src/scripts/**/*.js',
      dest: 'dist/js/'
   },
   images: {
      src: 'src/img/**',
      dest: 'dist/img/'
   }
}

// Очистить каталог dist, удалить все кроме изображений
function clean() {
   return del(['dist/*', '!dist/img'])
}

// Обработка htm
function html() {
   return gulp.src(paths.html.src)
      .pipe(gulp.dest(paths.html.dest))
      .pipe(browsersync.stream())
}

// Обработка препроцессоров стилей
function scss() {
   return gulp.src(paths.scss.src,{
      sourcemapas: true
      })
      .pipe(sass())
      .pipe(concat('style.css'))
      .pipe(gulp.dest(paths.scss.dest))
      .pipe(browsersync.stream())
}

function scripts() {
   return gulp.src(paths.scripts.src,{
         sourcemapas: true
         })
         .pipe(babel())
         .pipe(uglify())
         .pipe(concat('script.js'))
      .pipe(gulp.dest(paths.scripts.dest))
      .pipe(browsersync.stream())
}

// Обработка изображений

function img() {
   return gulp.src(paths.images.src)
      .pipe(gulp.dest(paths.images.dest))
}

// Отслеживание изменений и запуск  сервера
function watch() {
   browsersync.init({
      server: {
          baseDir: "./dist"
      }
    })
   gulp.watch(paths.html.dest).on('change', browsersync.reload)
   gulp.watch(paths.html.src, html)
   gulp.watch(paths.scss.src, scss)
   gulp.watch(paths.scripts.src, scripts)
   gulp.watch(paths.images.src, img)
}

// Задача которая выполняется по команде gulp

const build = gulp.series(clean, html, gulp.parallel(scripts, scss, img), watch)

// Задача для ручного запуска

exports.clean = clean
exports.html = html
exports.img = img
exports.scss = scss
exports.watch = watch
exports.build = build
exports.default = build
exports.scripts = scripts
