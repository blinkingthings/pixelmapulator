/**
 * Default Application Values
 * @readonly
 *
 * @description Default values to be used during project initialization.
 *
 * @todo Clean these up?
 */

const setting = {
    // Set tracker defaults.
    activeOutput: 0,
    activePackedOutput: 0,
    activeProject: 0,
    activeScreen: 0,

    // Set default counters.
    nextOutput: 0,
    nextProject: 0,
    nextScreen: 0,

    // Set containers.
    projects: [],

    // Default Logo
    logo: new Image(),
    logoSrc: 'assets/img/blinkingthings-logo.png',

    // Set the pattern for every other pixel.
    everyOtherPixel: new Image(),
    everyOtherPixelSrc: 'assets/img/pixel-checker.png',

    // Set the default line width.
    lineWidth: 2,
};

export default setting;
