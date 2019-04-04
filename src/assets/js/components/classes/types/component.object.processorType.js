/**
 * Processor Type Object
 * @class
 *
 * @name processorType
 *
 * @description Creates a new processor object.
 *
 * @param {object} processor - The processor object containing all of the processor info.
 * @param {string} processor.brand - The brand of the processor.
 * @param {string} processor.model - The model name of the processor.
 * @param {array} processor.resolutions - Array of resolutions [pX, pY] supported.
 * @param {number} processor.pixel_limit - The pixels limit per port of the processor.
 * @param {number} processor.ports - The number of ports on the processor.
 * @param {number} processor.rack_size - The rack_size supported by the processor.
 *
 * @returns {object} Processor Object
 */

class processorType {
    constructor(processor) {
        this.brand = processor.brand;
        this.model = processor.model;
        this.resolutions = processor.resolutions;
        this.pixel_limit = processor.pixel_limit;
        this.ports = processor.ports;
        this.port_count = processor.port_count;
        this.rack_size = processor.rack_size;
    }
}

export default processorType;
