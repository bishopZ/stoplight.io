var babel = require('gulp-babel'),
    browserSync = require('browser-sync').create(),
    gulp = require('gulp'),
    file = require('gulp-file'),
    gutil = require('gulp-util'),
    ghPages = require('gh-pages'),
    child_process = require('child_process'),
    del = require('del'),
    sequence = require('run-sequence'),
    path = require('path'),
    // Load gulp plugins
    $ = require('gulp-load-plugins')()

var paths = {
  assets: './app/_assets/',
  modules: './node_modules/',
  dist: './dist/',
  includes: './app/_includes/'
}

var sources = {
  content: 'app/**/*.{markdown,md,html,txt,yml,yaml}',
  styles: paths.assets + 'stylesheets/**/*.scss',
  js: [
    paths.modules + 'jquery/dist/jquery.js',
    paths.modules + 'particles.js/particles.js',
    paths.modules + 'bootstrap-sass/assets/javascripts/bootstrap/collapse.js',
    paths.modules + 'bootstrap-sass/assets/javascripts/bootstrap/affix.js',
    paths.modules + 'bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
    paths.modules + 'bootstrap-sass/assets/javascripts/bootstrap/tab.js',
    paths.assets + 'javascripts/**/*.js'
  ],
  images: paths.assets + 'images/**/*',
  fonts: paths.modules + 'font-awesome/fonts/**/*.*'
}

gulp.task('styles', function () {
  return gulp.src(sources.styles)
    .pipe($.plumber())
    .pipe($.sass({
      outputStyle: 'compressed',
      includePaths: paths.modules
    }))
    .pipe($.autoprefixer())
    .pipe(gulp.dest(paths.dist + 'assets/css'))
    .pipe(browserSync.stream())
})

gulp.task('javascripts', function () {
  return gulp.src(sources.js)
    .pipe($.plumber())
    .pipe($.concat('app.js'))
    .pipe(gulp.dest(paths.dist + 'assets/js/'))
    .pipe(babel({
      presets: ['es2015-without-strict'],
    }))
    .pipe($.uglify())
    .pipe(gulp.dest(paths.dist + 'assets/js/'))
    .pipe(browserSync.stream())
})

gulp.task('images', function () {
  return gulp.src(sources.images)
    .pipe($.plumber())
    .pipe(gulp.dest(paths.dist + 'assets/img'))
    .pipe(browserSync.stream())
})

gulp.task('fonts', function () {
  return gulp.src(sources.fonts)
    .pipe($.plumber())
    .pipe(gulp.dest(paths.dist + '/assets/fonts'))
    .pipe(browserSync.stream())
})

gulp.task('jekyll', function (cb) {
  var command = 'bundle exec jekyll build --config jekyll.yml --destination '
    + paths.dist

  child_process.exec(command, function (err, stdout, stderr) {
    gutil.log(stdout)
    gutil.log(stderr)
    cb(err)
  })
})

gulp.task('html', ['jekyll'], function () {
  return gulp.src(paths.dist + '/**/*.html')
    .pipe($.plumber())
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream())
})

gulp.task('clean', function () {
  ghPages.clean()
  return del(['dist', '.gh-pages'])
})

gulp.task('build', ['javascripts', 'images', 'fonts'], function (cb) {
  sequence('html', 'styles', cb)
})

gulp.task('watch', function () {
  gulp.watch(sources.content, ['html'])
  gulp.watch(sources.styles, ['styles'])
  gulp.watch(sources.images, ['images'])
  gulp.watch(sources.js, ['javascripts'])
})

gulp.task('browser-sync', function () {
  browserSync.init({
    minify: false,
    notify: false,
    server: 'dist'
  })
})

gulp.task('gh-pages', function (cb) {
  var cmd = 'git rev-parse --short HEAD'

  child_process.exec(cmd, function (err, stdout) {
    if (err) {
      cb(err)
    }

    ghPages.publish(path.join(__dirname, paths.dist), {
      message: 'Deploying ' + stdout + '(' + new Date().toISOString() + ')'
    }, cb)
  })
})

gulp.task('deploy', function (cb) {
  sequence('build', 'gh-pages', cb)
})

gulp.task('default', ['clean'], function (cb) {
  sequence('build', 'browser-sync', 'watch', cb)
})
