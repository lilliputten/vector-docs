/* jshint camelcase:false, unused:false, laxbreak:true, laxcomma:true, expr:true, boss:true, eqnull:true, esversion:6 */
/* globals debugger */
/**
 *
 * @overview gulpfile.js - Создание html версии документации
 *
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.08.10, 12:17
 * @version 2018.08.10, 12:17
 *
 * $Date: 2018-08-10 15:16:38 +0300 (Пт, 10 авг 2018) $
 * $Id: gulpfile.js 10530 2018-08-10 12:16:38Z miheev $
 *
*/

// Params...

// Paths...
const targetPath = 'html';

// html template filenames
const htmlPreFile = 'templates/html-pre.html';
const htmlPostFile = 'templates/html-post.html';

// Markdown...
const myMarked = require('marked');
const highlight = require('highlight.js');
const markdownOptions = {
    // renderer: new myMarked.Renderer(),
    highlight: (code) => {
        return highlight.highlightAuto(code).value;
    },
    // pedantic: false,
    // gfm: true,
    // tables: true,
    // breaks: false,
    // sanitize: false,
    // smartLists: true,
    // smartypants: false,
    // xhtml: false,
};

// Requirements...

const fs = require('fs-extra');
const path = require('path');
const del = require('del');

const gulpMarkdown = require('gulp-markdown');
// const gulpMarkdown = require('gulp-markdown-github-style');

const gulp = require('gulp');
const gulpDebug = require('gulp-debug');
// const gulpReplace = require('gulp-replace'); // https://www.npmjs.com/package/gulp-replace
const gilpInsert = require('gulp-insert'); // https://www.npmjs.com/package/gulp-insert
const gulpRename = require('gulp-rename'); // https://www.npmjs.com/package/gulp-rename
const gulpIf = require('gulp-if'); // https://github.com/robrich/gulp-if
// const gulpSequence = require('gulp-sequence'); // https://www.npmjs.com/package/gulp-sequence
// const lazypipe = require('lazypipe'); // https://github.com/OverZealous/lazypipe
const gulpConcat = require('gulp-concat');
const gulpCssmin = require('gulp-cssmin'); // https://www.npmjs.com/package/gulp-cssmin
const gulpStylus = require('gulp-stylus'); // https://www.npmjs.com/package/gulp-stylus

// Assets...

// html templates
const htmlPre = fs.readFileSync(htmlPreFile).toString();
const htmlPost = fs.readFileSync(htmlPostFile).toString();

// Utils...

const parseVars = (content, vars) => {
    const result = content.replace(/{{([\w\.-]+)}}/g, function (match, id) {
        if ( vars[id] != null ) {
            return vars[id];
        }
        return match;
    });
    return result;
};

// Tasks...

gulp.task('clean', (next) =>
    del( targetPath + '/**/*', { force: true }, next )
);

gulp.task('styles', () =>
    gulp.src([
        'styles/**/*.{css,styl}',
        // 'node_modules/highlight.js/styles/github.css',
        // 'node_modules/highlight.js/styles/railscasts.css',
        // 'node_modules/highlight.js/styles/zenburn.css',
        // 'node_modules/highlight.js/styles/atom-one-dark.css',
        'node_modules/highlight.js/styles/solarized-dark.css',
    ], { base: '.' })
        // .pipe(gulpDebug({ title: 'styles <-' }) )
        .pipe( gulpIf( file => file.path.endsWith('.styl'), gulpStylus() ) )
        .pipe(gulpConcat('styles/all.css'))
        .pipe(gulpCssmin())
        // .pipe(gulpDebug({ title: 'styles ->' }) )
        .pipe(gulp.dest(targetPath))
);

gulp.task('img', () =>
    gulp.src('img/**/*', { base: '.' })
        // .pipe(gulpDebug({ title: 'img <-' }) )
        .pipe(gulp.dest(targetPath))
);

gulp.task('md', () =>
    gulp.src('*.md')
    // gulp.src('README.md')
        // .pipe(gulpDebug({ title: 'md <-' }) )
        .pipe(gulpMarkdown(markdownOptions))
        .pipe(gilpInsert.transform((contents, file) => {
            const filename = path.basename(file.path);
            const matchTitle = contents.match(/<h1.*?>(.*?)<\/h1>/i);
            const vars = {
                filename,
                title : ( matchTitle && matchTitle[1] ) || filename,
            };
            contents = contents
                .replace(/(<a[^<>]* href=")README\.md(")/ig, '$1index.html$2')
                .replace(/(<a[^<>]* href=")([^\/"]*)\.md(")/ig, '$1$2.html$3')
                .replace(/<pre>/ig, '<pre class="hljs">')
            ;
            return parseVars(htmlPre, vars) + contents + parseVars(htmlPost, vars);
        }))
        .pipe( gulpIf( file => file.path.endsWith('README.html'), gulpRename('index.html') ) )
        // .pipe(gulpDebug({ title: 'md ->' }) )
        .pipe(gulp.dest(targetPath))
);

gulp.task('make', gulp.parallel('styles', 'img', 'md'));

gulp.task('all', gulp.series('clean', 'make'));

gulp.task( 'default', gulp.parallel('all'));

