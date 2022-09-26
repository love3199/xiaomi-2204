let {src,dest,watch} = require('gulp');
let htmlmin = require('gulp-htmlmin');
let sass = (require('gulp-sass'))(require('sass'));
let cssnano = require('gulp-cssnano');
let rename = require('gulp-rename');
let concat = require('gulp-concat');
let babel = require('gulp-babel');
let uglify = require('gulp-uglify');
let imagemin = require('gulp-imagemin');

//index
const copyIndex = () => {
    return src('./src/index.html').pipe(dest('./dist'));
}
//lib
const copyLib = () => {
    return src('./src/lib/**/*').pipe(dest('./dist/lib'));
}
//data
const copyData = () => {
    return src('./src/data/**/*').pipe(dest('./dist/data'));
}
//html
const fnHTML = () => {
    return src('./src/html/**/*.html').pipe(htmlmin()).pipe(dest('./dist/html'));
}
//css
const fnCss = () => {
    return src('./src/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/css'));
}
//js
const fnJS = () => {
    return src('./src/js/**/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/js'));
}
//img
const fnImg = () => {
    return src('./src/img/**/*')
    .pipe(imagemin())
    .pipe(dest('./dist/img'));
}
//watch
const fnWatch = () => {
    watch('./src/index.html',copyIndex);
    watch('./src/lib/**/*',copyLib);
    watch('./src/data/**/*',copyData);
    watch('./src/html/**/*.html',fnHTML);
    watch('./src/sass/**/*.scss',fnCss);
    watch('./src/js/**/*.js',fnJS);
    watch('./src/img/**/*',fnImg);
}

exports.index = copyIndex;
exports.lib = copyLib;
exports.data = copyData;
exports.html = fnHTML;
exports.css = fnCss;
exports.js = fnJS;
exports.img = fnImg;
exports.default = fnWatch;