/**
 * Output Type Object
 * @class
 *
 * @description Creates a new output type.
 *
 * @param {object} processor - The processor object containing all of the processor info.
 * @param {number} output.height - The height of the output.
 * @param {number} output.width - The width of the output.
 *
 * @returns {object} Output Type Object
 */

class Output {
    constructor(output) {
        this.height = output.height;
        this.width = output.width;
    }
}

export default Output;
