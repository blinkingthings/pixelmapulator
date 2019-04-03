/**
 * Tile Object
 * @class
 *
 * @description Creates a new tile object.
 *
 * @param {object} tile - The tile object containing all of the tile info.
 * @param {string} tile.brand - The brand of the tile.
 * @param {string} tile.model - The model name of the tile.
 * @param {number} tile.pixel_pitch - The pixel pitch of the tile.
 * @param {number} tile.height - The height of the tile.
 * @param {number} tile.width - The width of the tile.
 * @param {number} tile.physical_height - The physical height of the tile.
 * @param {number} tile.physical_width - The physical width of the tile.
 * @param {number} tile.weight - The weight of the tile.
 * @param {number} tile.power_stack_limit - The power limit of the tile.
 * @param {number} tile.hang_limit - The hang limit of the tile.
 *
 * @returns {object} Tile Object
 */

class Tile {
    constructor(tile) {
        this.brand = tile.brand;
        this.model = tile.model;
        this.pixel_pitch = tile.pixel_pitch;
        this.height = tile.height;
        this.width = tile.width;
        this.physical_height = tile.physical_height;
        this.physical_width = tile.physical_width;
        this.weight = tile.weight;
        this.power_stack_limit = tile.power_stack_limit;
        this.hang_limit = tile.hang_limit;
    }
}

export default Tile;
