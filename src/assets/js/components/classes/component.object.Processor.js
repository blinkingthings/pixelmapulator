/**
 * Processor Object
 * @class
 *
 * @description Creates a new processor object.
 *
 * @param {object} processor - The processor object containing all of the processor info.
 * @param {string} processor.brand - The brand of the processor.
 * @param {string} processor.model - The model name of the processor.
 * @param {number} processor.height_limit - The height limit of the processor.
 * @param {number} processor.width_limit - The width limit of the processor.
 * @param {number} processor.pixels_per_port_limit - The pixels per port limit of the processor.
 * @param {number} processor.port_count - The number of ports on the processor.
 * @param {number} processor.rack_size - The rack_size of the processor.
 *
 * @returns {object} Processor Object
 */

class Processor {
    constructor(processor) {
        this.brand = processor.brand;
        this.model = processor.model;
        this.height_limit = processor.height_limit;
        this.width_limit = processor.width_limit;
        this.pixels_per_port_limit = processor.pixels_per_port_limit;
        this.port_count = processor.port_count;
        this.rack_size = processor.rack_size;
    }
}

export default Processor;
