var browserSync = require('browser-sync').create(),
    gulp = require('gulp'),
    file = require('gulp-file'),
    gutil = require('gulp-util'),
    ghPages = require('gh-pages'),
    child_process = require('child_process'),
    es = require('event-stream'),
    del = require('del'),
    sequence = require('run-sequence'),
    React = require('react'),
    ReactDOMServer = require('react-dom/server'),
    // Load gulp plugins
    $ = require('gulp-load-plugins')(),
    // Babel Require hook to make require jsx working
    babel = require('babel/register')({
      only: './node_modules/StopLight'
    })

var paths = {
  assets: './app/_assets/',
  modules: './node_modules/',
  dist: './dist/',
  docs: './app/_docs/',
  includes: './app/_includes/'
}

var sources = {
  content: 'app/**/*.{markdown,md,html,txt,yml,yaml}',
  styles: paths.assets + 'stylesheets/**/*.scss',
  js: [
    paths.modules + 'jquery/dist/jquery.js',
    paths.modules + 'typed.js/js/typed.js',
    paths.assets + 'javascripts/**/*.js'
  ],
  images: paths.assets + 'images/**/*',
  fonts: paths.modules + 'font-awesome/fonts/**/*.*'
}

gulp.task('styles', function () {
  return gulp.src(sources.styles)
    .pipe($.plumber())
    .pipe($.sass({outputStyle: 'compressed'}))
    .pipe($.autoprefixer())
    .pipe(gulp.dest(paths.dist + 'assets/css'))
    .pipe(browserSync.stream())
})

gulp.task('javascripts', function () {
  return gulp.src(sources.js)
    .pipe($.plumber())
    .pipe($.concat('app.js'))
    .pipe(gulp.dest(paths.dist + 'assets/js/'))
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

gulp.task('docs', function () {
  var fileContent = '',
    tasks = [],
    Help = require('StopLight/dashboard/components/help/Help.jsx'),
    ignore = ['isReactClass', 'displayName', 'propTypes', 'action', 'gif', 'img']

  for (var section in Help) {
    if (Help.hasOwnProperty(section) && ignore.indexOf(section) === -1) {
      var sectionElem = React.createElement(Help[section], {
          rootPath: '/docs',
          staticMarkup: true,
          startStoryHandler: new Function,
          updateSection: new Function,
          createTabHandler: new Function
        }),
        fileName = section.replace(/[A-Z]/, function (match) {
          return '-' + match.toLowerCase()
        })

      fileContent = [
        '---',
        'title: ' + Help[section].title,
        'id: ' + section,
        '---',
        ReactDOMServer.renderToStaticMarkup(sectionElem)
      ].join('\n')

      tasks.push(file(fileName + '.html', fileContent, {src: true})
        .pipe(gulp.dest(paths.docs)))
    }
  }

  return es.merge.apply(null, tasks)
})

gulp.task('docs-nav', function () {
  var HelpTab = require('StopLight/dashboard/components/tabs/HelpTab.jsx'),
    navElem = React.createElement(HelpTab, {
      rootPath: '/docs',
      staticMarkup: true,
      cache: {},
      updateStoryStep: new Function,
      updateSection: new Function,
      createTabHandler: new Function,
      startStoryHandler: new Function,
      cacheUpdateHandler: new Function
    })

  return file('docs-nav.html', ReactDOMServer.renderToStaticMarkup(navElem),
    {src: true}).pipe(gulp.dest(paths.includes))
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

gulp.task('html', ['docs-nav', 'docs', 'jekyll'], function () {
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
