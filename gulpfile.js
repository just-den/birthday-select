
const { src, dest, watch, series, parallel } = require('gulp');

const uglify = require('gulp-uglify');  
const babel = require('gulp-babel');
const rename = require('gulp-rename');

function jsTask(){
    return src([
        'src/*.js'
        ])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
		.pipe(rename(function (path) {
			path.basename += ".min";
			path.extname = ".js";
		 }))
        .pipe(dest('dist')
    );
}


exports.build = series(
    jsTask
);
