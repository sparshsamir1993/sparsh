var browserify = require('browserify');
var gulp = require('gulp');
var source = require("vinyl-source-stream");
var reactify = require('reactify');

function swallowError (error) {

    console.log(error.toString());
    this.emit('end');
}

gulp.task('browserify', function(){
    var b = browserify();
    b.transform(reactify); // use the reactify transform
    b.add('./main.js');
    return b.bundle()
        .pipe(source('main.js'))
        .on('error', swallowError)
        .pipe(gulp.dest('./dist'));
});

