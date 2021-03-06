const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const spawn = require('child_process').spawn;

gulp.task('lint', () => {
  return gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('build', gulp.series('lint', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('lib'));
}));

gulp.task('test', done => {
  spawn('npm', ['run', 'test:cover'], {shell: true, stdio: ['inherit', 'inherit', 'ignore']})
    .on('exit', code => {
      console.log('Exited with code:', code);
      done();
    });
});

gulp.task('watch', gulp.series('test', () => {
  gulp.watch(['src/**/*.js', 'test/**/*.spec.js'], gulp.series('test'));
}));

gulp.task('default', gulp.series('test'));
