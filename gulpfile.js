var gulp = require('gulp');
var useref = require('gulp-useref');    // 代码合并
var clean = require('gulp-clean');      // 清理
var less = require('gulp-less');        // less
var autoprefixer = require('gulp-autoprefixer');// 加前缀
var webserver = require('gulp-webserver');          // 服务器

var dist = __dirname + '/out'; // 产出目录

// less和加前缀
gulp.task('style-pre', function () {
    gulp.src(['src/style/*.less']) //多个文件以数组形式传入
        .pipe(less())
        .pipe(autoprefixer())           // 样式代码加前缀
        .pipe(gulp.dest(dist + '/style'));
});

// 合并代码
gulp.task('merge', function () {
    gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulp.dest(dist));
    gulp.src(dist + '/style/**')
        .pipe(clean({force: true}));
});

// 清空图片、样式、js
gulp.task('clean', function () {
    return gulp.src([dist + '/**'], {read: false})
        .pipe(clean({force: true}));
});

// 复制文件
gulp.task('copy', function () {
    gulp.src('src/*.html')
        .pipe(gulp.dest(dist));
    gulp.src('src/js/**')
        .pipe(gulp.dest(dist + '/js'));
    gulp.src('src/img/**')
        .pipe(gulp.dest(dist + '/img'));

});

// 开发服务器
gulp.task('webserver', function() {
    gulp.src(dist)
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            port: 8003,
            path: '/'
        }));
});

// 监听变动
gulp.task('watch', function () {
    gulp.watch('src/style/*.less', ['style-pre']); //当所有less文件发生改变时，调用styles任务
    gulp.watch('src/*.html', function () {
        gulp.src('src/*.html')
            .pipe(gulp.dest(dist));
    });
    gulp.watch('src/js/**', function () {
        gulp.src('src/js/**')
            .pipe(gulp.dest(dist + '/js'));
    });
    gulp.watch('src/img/**', function () {
        gulp.src('src/img/**')
            .pipe(gulp.dest(dist + '/img'));
    });
});
// 开发
gulp.task('dev', ['style-pre', 'copy', 'webserver', 'watch']);
// 生产
