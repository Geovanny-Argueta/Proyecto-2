const {src,dest,watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const sourcemap = require('gulp-sourcemaps');
const cssnano = require('cssnano');


function css(done) {
    src("scss/app.scss")
    .pipe( sourcemap.init())
    .pipe(sass({outputStyle:"compressed"}))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemap.write('.'))
    .pipe(dest("build/css"));
    done();
}

function dev(done){
    watch("scss/app.scss", css);
    watch("./index.html", css);
    watch("./scss/**/*.scss", css);
    done();
}

function imagenes() {
    return src('src/img/**/*')
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest('build/img') )
}


function versionWebp(){
    return src('src/img/**/*.{png, jpg}')
    .pipe( webp ())
    .pipe( dest ('build/img'));
}


function versionAvif(){
    const opciones = {
        quality:50
    }
    return src('src/img/**/*.{png, jpg}')
    .pipe( avif (opciones))
    .pipe( dest ('build/img'));
}


exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series( imagenes, versionWebp, versionAvif, css, dev);
