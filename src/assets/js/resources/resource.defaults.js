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

    // Default Tile Types.
    tiles: [
        {
            brand: 'Absen',
            models: [
                {
                    name: 'A3 Pro',
                    pixel_pitch: 3.9,
                    height: 128,
                    width: 128,
                    physical_height: 500,
                    physical_width: 500,
                    weight: 12.7,
                    power_draw: 1,
                    stack_limit: 1,
                    hang_limit: 1,
                },
                {
                    name: 'A 1.9',
                    pixel_pitch: 1.9,
                    height: 155,
                    width: 208,
                    physical_height: 300,
                    physical_width: 400,
                    weight: 12.7,
                    power_draw: 1,
                    stack_limit: 1,
                    hang_limit: 1,
                },
                {
                    name: 'C7',
                    pixel_pitch: 7.5,
                    height: 80,
                    width: 80,
                    physical_height: 600,
                    physical_width: 600,
                    weight: 12.7,
                    power_draw: 1,
                    stack_limit: 1,
                    hang_limit: 1,
                },
            ],
        },
        {
            brand: 'Infiled',
            models: [
                {
                    name: 'Floor 5.9',
                    pixel_pitch: 5.9,
                    height: 84,
                    width: 84,
                    physical_height: 500,
                    physical_width: 500,
                    weight: 12.7,
                    power_draw: 1,
                    stack_limit: 1,
                    hang_limit: 1,
                },
                {
                    name: 'Floor 7.8',
                    pixel_pitch: 7.8,
                    height: 64,
                    width: 64,
                    physical_height: 500,
                    physical_width: 500,
                    weight: 12.7,
                    power_draw: 1,
                    stack_limit: 1,
                    hang_limit: 1,
                },
            ],
        },
        {
            brand: 'Roe',
            models: [
                {
                    name: 'Black Onyx 2',
                    pixel_pitch: 2.84,
                    height: 176,
                    width: 176,
                    physical_height: 500,
                    physical_width: 500,
                    weight: 9.4,
                    power_draw: 1,
                    stack_limit: 1,
                    hang_limit: 1,
                },
                {
                    name: 'Black Onyx 3',
                    pixel_pitch: 3.47,
                    height: 144,
                    width: 144,
                    physical_height: 500,
                    physical_width: 500,
                    weight: 9.4,
                    power_draw: 1,
                    stack_limit: 1,
                    hang_limit: 1,
                },
                {
                    name: 'Black Onyx 5',
                    pixel_pitch: 5.2,
                    height: 96,
                    width: 96,
                    physical_height: 500,
                    physical_width: 500,
                    weight: 9.4,
                    power_draw: 1,
                    stack_limit: 1,
                    hang_limit: 1,
                },
                {
                    name: 'Black Pearl 2',
                    pixel_pitch: 2.84,
                    height: 176,
                    width: 176,
                    physical_height: 500,
                    physical_width: 500,
                    weight: 9.4,
                    power_draw: 1,
                    stack_limit: 1,
                    hang_limit: 1,
                },
                {
                    name: 'Black Pearl 3',
                    pixel_pitch: 3.9,
                    height: 128,
                    width: 128,
                    physical_height: 500,
                    physical_width: 500,
                    weight: 9.4,
                    power_draw: 1,
                    stack_limit: 1,
                    hang_limit: 1,
                },
                {
                    name: 'Black Pearl 5',
                    pixel_pitch: 5.2,
                    height: 96,
                    width: 96,
                    physical_height: 500,
                    physical_width: 500,
                    weight: 9.4,
                    power_draw: 1,
                    stack_limit: 1,
                    hang_limit: 1,
                },
                {
                    name: 'Carbon 3',
                    pixel_pitch: 3.75,
                    height: 320,
                    width: 160,
                    physical_height: 1200,
                    physical_width: 600,
                    weight: 12.7,
                    power_draw: 1,
                    stack_limit: 1,
                    hang_limit: 1,
                },
                {
                    name: 'Carbon 5',
                    pixel_pitch: 5.76,
                    height: 208,
                    width: 104,
                    physical_height: 1200,
                    physical_width: 600,
                    weight: 12.7,
                    power_draw: 1,
                    stack_limit: 1,
                    hang_limit: 1,
                },
                {
                    name: 'Carbon 8',
                    pixel_pitch: 8.3,
                    height: 144,
                    width: 72,
                    physical_height: 1200,
                    physical_width: 600,
                    weight: 12.7,
                    power_draw: 1,
                    stack_limit: 1,
                    hang_limit: 1,
                },
            ],
        },
        {
            brand: 'Uniliumin',
            models: [
                {
                    name: 'Upad III 2.6',
                    pixel_pitch: 2.6,
                    height: 192,
                    width: 192,
                    physical_height: 500,
                    physical_width: 500,
                    weight: 12.7,
                    power_draw: 1,
                    stack_limit: 1,
                    hang_limit: 1,
                },
                {
                    name: 'Upad III 4.8',
                    pixel_pitch: 4.8,
                    height: 104,
                    width: 104,
                    physical_height: 500,
                    physical_width: 500,
                    weight: 12.7,
                    power_draw: 1,
                    stack_limit: 1,
                    hang_limit: 1,
                },
                {
                    name: 'UTILE 3.9',
                    pixel_pitch: 3.9,
                    height: 128,
                    width: 128,
                    physical_height: 500,
                    physical_width: 500,
                    weight: 12.7,
                    power_draw: 1,
                    stack_limit: 1,
                    hang_limit: 1,
                },
            ],
        },
    ],

    // Default Processor Types
    processors: [
        {
            brand: 'User Defined',
            models: [
                {
                    name: 'User Defined',
                    resolutions: [
                        [1280, 720],
                        [1920, 1080],
                        [3840, 2160],
                        [4096, 2160],
                    ],
                    pixel_limit: 555555,
                    ports: 8,
                    rack_size: 4,
                },
            ],
        },
        {
            brand: 'Brompton',
            models: [
                {
                    name: 'Tessera M2',
                    resolutions: [
                        [1280, 720],
                        [1920, 1080],
                    ],
                    pixel_limit: 555555,
                    ports: 8,
                    rack_size: 2,
                },
                {
                    name: 'Tessera SX40',
                    resolutions: [
                        [1280, 720],
                        [1920, 1080],
                        [3840, 2160],
                        [4096, 2160],
                    ],
                    pixel_limit: 555555,
                    ports: 8,
                    rack_size: 4,
                },
            ],
        },
        {
            brand: 'Novastar',
            models: [
                {
                    name: 'MCTRL4K',
                    resolutions: [
                        [1280, 720],
                        [1920, 1080],
                        [3840, 2160],
                        [4096, 2160],
                    ],
                    pixel_limit: 555555,
                    ports: 16,
                    rack_size: 4,
                },
                {
                    name: 'NovaPro HD',
                    resolutions: [
                        [1280, 720],
                        [1920, 1080],
                    ],
                    pixel_limit: 555555,
                    ports: 8,
                    rack_size: 4,
                },
            ],
        },
        {
            brand: 'ROE',
            models: [
                {
                    name: 'Evision HD102',
                    resolutions: [
                        [1280, 720],
                        [1920, 1080],
                    ],
                    pixel_limit: 555555,
                    ports: 4,
                    rack_size: 2,
                },
            ],
        },
    ],
};

export default setting;
