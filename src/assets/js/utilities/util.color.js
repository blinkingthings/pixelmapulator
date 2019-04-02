/**
 * Color Utility
 *
 * @description Color functions for converting RGB to Hex (and vice versa) and 
 *              interpolating colors.
 *
 * @param {object} processor - The processor object containing all of the processor info.
 * @param {number} output.height - The height of the output.
 * @param {number} output.width - The width of the output.
 */

function colorOperation() {
    /*
     * Function to return a single RGB color between two given RGB colors
     * based on the factor given.
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

    /*
     * Function to interpolate between two colors completely, returning an
     * array.
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

    // Function to convert Hex to RGBa (with or without '#').
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

    // Function to convert RGB to Hex.
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
