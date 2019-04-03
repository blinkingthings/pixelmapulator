/**
 * Color Utility
 *
 * @description Color functions for converting RGB to Hex (and vice versa) and
 *              interpolating colors.
 */

function colorOperation() {
    /**
     * @name interpolateColor
     *
     * @description Function to return a single RGB color between two given RGB
     *              colors based on the factor given.
     *
     * @param {string} colorOne - The first color to be used for interpolation.
     * @param {string} colorTwo - The second color for interpolation.
     * @param {number} colorFactor - The factor to determine the interpolation.
     *
     * @returns {string} Resulting interpolation.
     *
     * Based on: https://codepen.io/njmcode/pen/axoyD?editors=0010
     */
    function interpolateColor(colorOne, colorTwo, colorFactor = 0.5) {
        const result = colorOne.slice();

        for (let i = 0; i < 3; i += 1) {
            result[i] = Math.round(result[i] + colorFactor * (colorTwo[i] - colorOne[i]));
        }

        return result;
    }

    /**
     * @name interpolateColors
     *
     * @description Function to interpolate between two colors completely.
     *
     * @param {string} colorOne - The first color to be used for interpolation.
     * @param {string} colorTwo - The second color for interpolation.
     * @param {number} colorFactor - The factor to determine the interpolation.
     *
     * @returns {array}
     *
     * Credit: Zach Saucier
     */
    function interpolateColors(colorOne, colorTwo, colorSteps) {
        const stepFactor = 1 / (colorSteps - 1);
        const colorArray = [];

        const interpolatedColorOne = colorOne.match(/\d+/g).map(Number);
        const interpolatedColorTwo = colorTwo.match(/\d+/g).map(Number);

        for (let i = 0; i < colorSteps; i += 1) {
            colorArray
                .push(interpolateColor(
                    interpolatedColorOne,
                    interpolatedColorTwo,
                    stepFactor * i,
                ));
        }

        return colorArray;
    }

    /**
     * @name toRGB
     *
     * @description Converts Hex to RGBa format, with or without the '#'.
     *
     * @param {string} hex - The hex color code.
     * @param {number} alpha - The alpha (opacity) value for the output.
     *
     * @returns {string} RGBa Value
     */
    function toRGB(hex, alpha = 1) {
        // If there's a '#', remove it.
        let hexInput = hex.replace('#', '');

        if (hexInput.length === 3) {
            // If the hex is only 3 digits, convert it to the 6 digit form.
            hexInput = hexInput.split('').map(d => d + d).join('');
        }

        // Convert the hex code to RGBa.
        const [r, g, b] = hexInput.match(/\w\w/g).map(x => parseInt(x, 16));

        // Return the proper RGBa value.
        return `rgba(${r},${g},${b},${alpha})`;
    }

    /**
     * @name toHex
     *
     * @description Converts RGB to a hex color code.
     *
     * @param {number} r - The 0-255 red color value.
     * @param {number} g - The 0-255 green color value.
     * @param {number} b - The 0-255 blue color value.
     *
     * @returns {string} Hex Value
     */
    function toHex(r, g, b) {
        // Map each RGB value to the appropriate hex value.
        const hexValue = [r, g, b].map((x) => {
            const hex = x.toString(16);
            return hex.length === 1 ? `0${hex}` : hex;
        }).join('');

        return `#${hexValue}`;
    }

    return {
        interpolateColor,
        interpolateColors,
        toHex,
        toRGB,
    };
}

const color = colorOperation();

export default color;
