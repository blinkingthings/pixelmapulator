/**
 * -----------------------------------------------------------------------------
 * Gulpfile
 *
 * Licensed under GPL v3.0:
 * https://github.com/jdaio/launchpad/blob/master/LICENSE
 *
 * @license GPL-3.0-or-later
 *
 * @overview Handles all file processing tasks, as well as BrowserSync, etc.
 *
 * @author Jamal Ali-Mohammed (https://jdaio.github.io)
 *
 * @version 1.0.0
 * -----------------------------------------------------------------------------
 */

/**
 * -----------------------------------------------------------------------------
 * Module Import & Settings
 * -----------------------------------------------------------------------------
 */

// Import Base Objects and Utilities
import gulp from 'gulp';
import del from 'del';
import fs from 'fs';
import fsExtra from 'fs-extra';
import glob from 'glob';
import newer from 'gulp-newer';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import plumber from 'gulp-plumber';

// Import Code Utilities
import browserSync from 'browser-sync';
import header from 'gulp-header';
import sourcemaps from 'gulp-sourcemaps';
import stripComments from 'gulp-strip-comments';

// Import JS Utilities
import babel from 'babelify';
import browserify from 'browserify';
import watchify from 'watchify';
import uglify from 'gulp-uglify';

// Import CSS Utilities
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';

// Import Image Utilities
import imagemin from 'gulp-imagemin';

// Import Configuration
import config from './_gulpconfig';

// Import Project Info
import projInfo from './package.json';

/**
 * -----------------------------------------------------------------------------
 * Module Imports, Utilities & Settings
 *
 * @description Default variables used in processes below.
 * -----------------------------------------------------------------------------
 */

// Get Project Directories
const directories = config.projectDevDirs;

// Get Today's Date and Year
const today = new Date();
const year = today.getFullYear();

// Get Style and Script Entry & Output Names
const scriptEntry = config.scriptEntry.length > 0 ? config.scriptEntry : 'index';
const scriptOutput = config.scriptOutput.length > 0 ? config.scriptOutput : 'app';
const styleEntry = config.styleEntry.length > 0 ? config.styleEntry : 'main';
const styleOutput = config.styleOutput.length > 0 ? config.styleOutput : 'style';

// Helper task to clear the build/dist directory before it's added to again.
gulp.task('util:clean', done => del([config.projectBuildDir, config.projectDistDir])
    .then(() => done()));

/**
 * -----------------------------------------------------------------------------
 * Startup Checks
 *
 * @description Checks to see if conditions are met before proceeding with the
 *              gulp tasks.
 * -----------------------------------------------------------------------------
 */

// Function to manually exit Gulpfile on error.
function exitGulp(err) {
    // Check if an error message was passed into the function.
    const errorMessage = err.length > 0 ?
        err :
        'An error has occurred. Gulp task terminated.';

    // Exit the gulp process with the appropriate method.
    throw Error(errorMessage);
}


const preFlight = {
    check: () => {
        try {
            // Checks if configuration file exists.
            fs.accessSync('./_gulpconfig.js');
        } catch (e) {
            exitGulp('[PreFlight] Gulp configuration file not found! Please create it or fetch it from the launchpad repo.');
        }

        try {
            fs.statSync(config.projectSourceDir)
                .isDirectory();
        } catch (e) {
            exitGulp('[PreFlight] Source folder directory not found! Please run `npm run setup` to create the project folder structure.');
        }

        return false;
    },
    run: () => {
        console.log('[PreFlight] Setting up project folder structure...');

        for (const [key, type] of Object.entries(directories)) {
            const currentFolder = `${config.projectSourceDir}/${type.root}`;

            fsExtra.mkdirpSync(currentFolder);

            if (type.hasOwnProperty('dirs') && type.dirs.length > 0) {
                for (const subFolder of type.dirs) {
                    fsExtra.mkdirpSync(`${currentFolder}/${subFolder}`);
                }
            }
        }

        console.log('[PreFlight] Project folders successfully created!');
    },
};

gulp.task('proj:check', (done) => {
    preFlight.check();
    done();
});

gulp.task('proj:init', (done) => {
    console.log('[PreFlight] Initializing the project...');

    preFlight.run();
    done();
});

/**
 * -----------------------------------------------------------------------------
 * BrowserSync Setup
 *
 * @description BrowserSync runtime options.
 * -----------------------------------------------------------------------------
 */

function runBrowserSync() {
    const bsBrowserAutoOpen = config.bsBrowserAutoOpen.length > 0 ? config.bsBrowserAutoOpen : false;
    const bsGhostMode = config.bsGhostMode.length > 0 ? config.bsGhostMode : false;
    const bsNotify = config.bsNotify.length > 0 ? config.bsNotify : false;
    const bsScrollProportionally = config.bsScrollProportionally.length > 0 ? config.bsScrollProportionally : false;
    const bsInjectChanges = config.bsInjectChanges.length > 0 ? config.bsScrollProportionally : true;

    browserSync.init({
        ghostMode: bsGhostMode,
        logPrefix: config.projectName,
        notify: bsNotify,
        open: bsBrowserAutoOpen,
        server: config.projectBuildDir,
        scrollProportionally: bsScrollProportionally,
        injectChanges: bsInjectChanges,
    });
}

gulp.task('bs:reload', () => browserSync.reload());

gulp.task('bs:stream', () => browserSync.stream());

/**
 * -----------------------------------------------------------------------------
 * Javascript Bundling
 *
 * @description Sets up watchify/browserify for bundling, uglifies and minifies
 *              javascript files as well as concatenating vendor files.
 * -----------------------------------------------------------------------------
 */

function buildScripts(prod = false, watch = false) {
    const b = browserify(`${config.projectSourceDir}/${directories.js.root}/${scriptEntry}.js`, {
            debug: true,
        })
        .transform(babel);

    function bundler(pkg) {
        let stream = pkg.bundle()
            .on('error', (err) => {
                console.error(err);
                this.emit('end');
            })
            .pipe(source(`${scriptEntry}.js`))
            .pipe(buffer())
            .pipe(rename(`${scriptOutput}.min.js`));

        if (!prod) {
            stream = stream.pipe(sourcemaps.init({
                    loadMaps: true,
                }))
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest(`${config.projectBuildDir}/${directories.js.root}`));
        } else {
            stream = stream.pipe(uglify())
                .pipe(gulp.dest(`${config.projectDistDir}/${directories.js.root}`));
        }

        return stream;
    }

    if (watch) {
        watchify(b)
            .on('update', () => {
                console.log('-> Rebundling scripts...');
                bundler(watchify(b));
                console.log('All javascript processed.');
            });

        console.log('[Browserify] Watching javascript codebase for changes...');
    }

    bundler(b);
}

gulp.task('js:build', (done) => {
    buildScripts();
    done();
});

gulp.task('js:dev', (done) => {
    buildScripts(false, true);
    browserSync.reload();
    done();
});

gulp.task('js:prod', (done) => {
    buildScripts(true, false);
    done();
});

/**
 * -----------------------------------------------------------------------------
 * Style Rendering
 *
 * @description Compiles, autoprefixes, processes and minifies SCSS, SASS and
 *              LESS to CSS.
 * -----------------------------------------------------------------------------
 */

function buildStyles(prod = false, watch = false) {
    const styleBanner = [
        '@charset \'UTF-8\';',
        '/*!',
        ` * ${config.projectName} v${projInfo.version} (${projInfo.homepage})`,
        ` * Author: ${projInfo.author.name}`,
        ` * Author URI: ${projInfo.author.url}`,
        ` * Copyright ${year}, ${projInfo.author.name}`,
        ` * Licensed under ${projInfo.license} (${config.projectLicenseURI})`,
        ' */\n\n',
    ].join('\n');

    let stream = gulp.src(`${config.projectSourceDir}/${directories.scss.root}/${styleEntry}.scss`)
        .pipe(plumber())
        .pipe(header(styleBanner))
        .pipe(rename(`${styleOutput}.min.css`));

    if (!prod) {
        stream = stream.pipe(sourcemaps.init({
                loadMaps: true,
            }))
            .pipe(sass({
                includePaths: config.styleIncludePaths,
                indentWidth: 4,
                outputStyle: 'compressed',
            }))
            .pipe(postcss(config.stylePlugins))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(`${config.projectBuildDir}/assets/css`));
    } else {
        stream = stream.pipe(sass({
                includePaths: config.styleIncludePaths,
                indentWidth: 4,
                outputStyle: 'compressed',
            }))
            .pipe(postcss(config.stylePlugins))
            .pipe(gulp.dest(`${config.projectDistDir}/assets/css`));
    }

    if (watch) {
        stream = stream.pipe(browserSync.stream());
    }

    return stream;
}

gulp.task('css:build', () => buildStyles());

gulp.task('css:dev', () => buildStyles(false, true));

gulp.task('css:prod', () => buildStyles(true));

/**
 * -----------------------------------------------------------------------------
 * Copy Included Assets
 *
 * @description Copies all files from the include folder in assets to their
 *              respective directories.
 * -----------------------------------------------------------------------------
 */

function buildIncludes(prod = false) {
    let stream = gulp.src(`${config.projectSourceDir}/${directories.inc.root}/**.*`);

    // If there are no files to copy over, exit the function early.
    if (glob.sync(`${config.projectSourceDir}/${directories.inc.root}/**.*`)
        .length === 0) {
        return false;
    }

    if (!prod) {
        stream = stream.pipe(newer(`${config.projectBuildDir}/${directories.inc.root}`))
            .pipe(gulp.dest(`${config.projectBuildDir}/${directories.inc.root}`));
    } else {
        stream = stream.pipe(gulp.dest(`${config.projectDistDir}/${directories.inc.root}`));
    }

    return stream;
}

gulp.task('inc:build', () => buildIncludes());

gulp.task('inc:dev', () => buildIncludes(false, true));

gulp.task('inc:prod', () => buildIncludes(true));

/**
 * -----------------------------------------------------------------------------
 * View Handling
 *
 * @description Processes view files and copies them to a destination folder.
 * -----------------------------------------------------------------------------
 */

function buildViews(prod = false, watch = false) {
    let stream = gulp.src(`${config.projectSourceDir}/${directories.views.root}/**/*.*`);

    if (!prod) {
        stream = stream.pipe(newer(`${config.projectBuildDir}/${directories.views.root}`))
            .pipe(gulp.dest(config.projectBuildDir));
    } else {
        stream = stream.pipe(stripComments.html())
            .pipe(gulp.dest(config.projectDistDir));
    }

    if (watch) {
        stream = stream.pipe(browserSync.stream());
    }

    return stream;
}

gulp.task('views:build', () => buildViews());

gulp.task('views:dev', () => buildViews(false, true));

gulp.task('views:prod', () => buildViews(true));

/**
 * -----------------------------------------------------------------------------
 * Image Rendering
 *
 * @description Minifies and readies images for production use.
 * -----------------------------------------------------------------------------
 */

function buildImages(prod = false, watch = false) {
    // If there are no files to copy over, exit the function early.
    if (glob.sync(`${config.projectSourceDir}/${directories.img.root}/**`)
        .length === 0) {
        return false;
    }

    // Import GIF Optimization Options
    const imgGifInterlace = config.imgGifInterlace.length > 0 ? config.imgGifInterlace : false;
    const imgGifOptimizationLevel = config.imgGifOptimizationLevel.length > 0 ? config.imgGifOptimizationLevel : 1;
    const imgGifColors = config.imgGifColors.length > 0 ? config.imgGifColors : 256;

    // Import JPEG Optimization Options
    const imgJpegProgressive = config.imgJpegProgressive.length > 0 ? config.imgJpegProgressive : true;
    const imgJpegArithmetic = config.imgJpegArithmetic.length > 0 ? config.imgJpegArithmetic : false;

    // Import PNG Optimization Options
    const imgPngOptimizationLevel = config.imgPngOptimizationLevel.length > 0 ? config.imgPngOptimizationLevel : 3;
    const imgPngBitDepthReduction = config.imgPngBitDepthReduction.length > 0 ? config.imgPngBitDepthReduction : true;
    const imgPngColorTypeReduction = config.imgPngColorTypeReduction.length > 0 ? config.imgPngColorTypeReduction : true;

    const imgPngPaletteReduction = config.imgPngPaletteReduction.length > 0 ? config.imgPngPaletteReduction : true;

    // Import SVG Optimization Options
    const imgSvgOpts = config.imgSvgOpts.length > 0 ? config.imgSvgOpts : '';

    let stream = gulp.src(`${config.projectSourceDir}/${directories.img.root}/**`);

    if (!prod) {
        stream = stream.pipe(newer(`${config.projectBuildDir}/${directories.img.root}`));
    }

    stream = stream.pipe(imagemin([
        imagemin.gifsicle({
            interlaced: imgGifInterlace,
            optimizationLevel: imgGifOptimizationLevel,
            colors: imgGifColors,
        }),
        imagemin.jpegtran({
            progressive: imgJpegProgressive,
            arithmetic: imgJpegArithmetic,
        }),
        imagemin.optipng({
            optimizationLevel: imgPngOptimizationLevel,
            bitDepthReduction: imgPngBitDepthReduction,
            colorTypeReduction: imgPngColorTypeReduction,
            paletteReduction: imgPngPaletteReduction,
        }),
        imagemin.svgo(imgSvgOpts),
    ]));

    if (!prod) {
        stream = stream.pipe(gulp.dest(`${config.projectBuildDir}/${directories.img.root}`));
    } else {
        stream = stream.pipe(gulp.dest(`${config.projectDistDir}/${directories.img.root}`));
    }

    if (watch) {
        stream = stream.pipe(browserSync.stream());
    }

    return stream;
}

gulp.task('img:build', () => buildImages());

gulp.task('img:dev', () => buildImages(false, true));

gulp.task('img:prod', () => buildImages(true));

/**
 * -----------------------------------------------------------------------------
 * File Watcher
 *
 * @description Watches files for changes.
 * -----------------------------------------------------------------------------
 */

gulp.task('watch', () => {
    gulp.watch(`${config.projectSourceDir}/${directories.js.root}/**/*.js`, gulp.series('js:dev'));
    gulp.watch(`${config.projectSourceDir}/${directories.scss.root}/**/*.scss`, gulp.series('css:dev'));
    gulp.watch(`${config.projectSourceDir}/${directories.inc.root}/**.*`, gulp.series('inc:dev', 'bs:reload'));
    gulp.watch(`${config.projectSourceDir}/${directories.views.root}/**/*.*`, gulp.series('views:dev'));
    gulp.watch(`${config.projectSourceDir}/${directories.img.root}/**`, gulp.series('img:dev'));
});

/**
 * -----------------------------------------------------------------------------
 * Main Gulp Tasks
 *
 * @description Gulp tasks for building, development and production.
 * -----------------------------------------------------------------------------
 */

gulp.task('render:build', gulp.series('proj:check', 'util:clean', gulp.parallel('js:build', 'css:build', 'inc:build', 'views:build', 'img:build')));

gulp.task('render:dev', gulp.series('proj:check', 'util:clean', gulp.parallel('js:dev', 'css:dev', 'inc:dev', 'views:dev', 'img:dev', runBrowserSync, 'watch')));

gulp.task('render:prod', gulp.parallel('proj:check', 'js:prod', 'css:prod', 'inc:prod', 'views:prod', 'img:prod'));

gulp.task('default', () => {
    console.log('Please use the NPM commands or specific gulp task names rather than running `gulp default`.');

    return false;
});
