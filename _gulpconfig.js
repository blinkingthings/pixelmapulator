/**
 * -----------------------------------------------------------------------------
 * Gulp Configuration
 * -----------------------------------------------------------------------------
 */

module.exports = {
    /**
     * -------------------------------------------------------------------------
     * General Project Settings
     * -------------------------------------------------------------------------
     */

    // Project Title
    projectName: 'Pixelmapulator',

    // Project License URI
    projectLicenseURI: 'https://github.com/blinkingthings/pixelmapulator/blob/master/LICENSE',

    /**
     * -------------------------------------------------------------------------
     * Project Folders & Entries
     *
     * @description Includes directory types with the root directory path and
     *              then any sub-folders that should be made by default.
     * -------------------------------------------------------------------------
     */

    // Source Directory
    projectSourceDir: './src',

    // Build Directory
    projectBuildDir: './build',

    // Distribution Directory
    projectDistDir: './dist',

    // Development Directories (Relative Paths Only)
    projectDevDirs: {
        // Javascript
        js: {
            root: 'assets/js',
            dirs: [
                'components',
                'vendors',
            ],
        },

        // Style (SCSS)
        scss: {
            root: 'assets/scss',
            dirs: [
                'components',
                'modules',
                'vendors',
            ],
        },

        // Images (Design Assets)
        img: {
            root: 'assets/img',
        },

        // Included Assets
        inc: {
            root: 'assets/inc',
        },

        // Views
        views: {
            root: 'views',
        },

        // Media (Content Assets)
        media: {
            root: 'media',
            dirs: [
                'icons',
                'pages',
            ],
        },
    },

    /**
     * -------------------------------------------------------------------------
     * Javascript Settings
     *
     * @description Settings for JS processing.
     * -------------------------------------------------------------------------
     */

    // Stylesheet Entry File Name (Omit the extension, it's .scss.)
    scriptEntry: 'index',

    // Stylesheet Output File Name (Omit the extension, it's (.min).css.)
    scriptOutput: 'app',

    /**
     * -------------------------------------------------------------------------
     * Style Settings
     *
     * @description Settings for SCSS/PostCSS processing.
     * -------------------------------------------------------------------------
     */

    // Stylesheet Entry File Name (Omit the extension, it's .scss.)
    styleEntry: 'main',

    // Stylesheet Output File Name (Omit the extension, it's (.min).css.)
    styleOutput: 'style',

    // Include CSS from Node Modules
    styleIncludePaths: [],

    // An array of plugins to include with PostCSS.
    // Must be in `require('plugin-name')` format.
    stylePlugins: [
        require('css-mqpacker')({
            sort: true,
        }),
        require('cssnano')({
            autoprefixer: {
                browsers: [
                    'last 2 version',
                    '> .25%',
                    'ie >= 10',
                ],
            },
        }),
    ],

    /**
     * -------------------------------------------------------------------------
     * Image Processing Settings
     *
     * @description Settings for handling image files.
     * -------------------------------------------------------------------------
     */

    // GIF Options (https://github.com/imagemin/imagemin-gifsicle)
    imgGifInterlace: false,
    imgGifOptimizationLevel: 2,
    imgGifColors: 256,

    // JPEG Options (https://github.com/imagemin/imagemin-jpegtran)
    imgJpegProgressive: true,
    imgJpegArithmetic: false,

    // PNG Options (https://github.com/imagemin/imagemin-optipng)
    imgPngOptimizationLevel: 5,
    imgPngBitDepthReduction: true,
    imgPngColorTypeReduction: true,
    imgPngPaletteReduction: true,

    // SVG Options (https://github.com/svg/svgo)
    imgSvgOpts: {
        plugins: [{
            removeViewBox: false,
        }],
    },

    /**
     * -------------------------------------------------------------------------
     * BrowserSync Settings
     *
     * @description Settings for BrowserSync live reloads/streaming.
     * -------------------------------------------------------------------------
     */

    // Automatically open browser on start.
    bsBrowserAutoOpen: false,

    // Mirror actions on one device to all others.
    bsGhostMode: false,

    // Show pop-over notifications from BrowserSync.
    bsNotify: false,

    // Sync viewports to TOP position.
    bsScrollProportionally: false,

    // Inject changes instead of reloading.
    bsInjectChanges: true,
};
