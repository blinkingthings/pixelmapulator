/**
 * Directional Variables (Flows) and Mapping
 * @readonly
 *
 * @description Flow directions.
 *
 * @todo Clarify what these are and how they're applied so a better solution
 *       can be developed.
 */

const flows = {
    none: -1,
    start: 5, // Start of flow.
    end: 4, // End of flow.
    up: 3,
    down: 1,
    left: 2,
    right: 0,
    upLeft: 8,
    upRight: 6,
    downRight: 7,
    downLeft: 9,

    /*
     * Coordinate (x, y) step for each direction.
     */
    directions: [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
        [1, 0],
        [1, 0],
        [1, -1],
        [1, 1],
        [1, -1],
        [1, 1],
    ],

    /*
     * Maps are used to set the flow layout.
     *
     * (startX, startY) - Set the starting (x, y) position of the flow (?).
     * Directions - Set an array for each direction. The first parameter is the
     *              travel direction and the second is the max number of steps
     *              before turning.
     */
    maps: [
        {
            // Top left start, right, down, left , down.
            startX: 0,
            startY: 0,
            directions: [
                [0, Infinity],
                [1, 1],
                [2, Infinity],
                [1, 1],
            ],
        },
        {
            // Top left start, down, right up, right.
            startX: 0,
            startY: 0,
            directions: [
                [1, Infinity],
                [0, 1],
                [3, Infinity],
                [0, 1],
            ],
        },
        {
            // Bottom left start, right, up, left, up.
            startX: 0,
            startY: 1,
            directions: [
                [0, Infinity],
                [3, 1],
                [2, Infinity],
                [3, 1],
            ],
        },
        {
            // Bottom left start, up, right, down, right.
            startX: 0,
            startY: 1,
            directions: [
                [3, Infinity],
                [0, 1],
                [1, Infinity],
                [0, 1],
            ],
        },
        {
            // Top left start, down, diagonal up to the right, repeat.
            startX: 0,
            startY: 0,
            directions: [
                [1, Infinity],
                [6, 1],
            ],
        },
        {
            // Bottom left start, up, diagonal down to the right, repeat.
            startX: 0,
            startY: 1,
            directions: [
                [3, Infinity],
                [7, 1],
            ],
        },
        {
            // Top left start, right, diagonal down to the left, repeat.
            startX: 0,
            startY: 0,
            directions: [
                [0, Infinity],
                [9, 1],
            ],
        },
        {
            // Bottom left start, right, diagonal up to the left, repeat.
            startX: 0,
            startY: 1,
            directions: [
                [0, Infinity],
                [8, 1],
            ],
        },
    ],
};

export default flows;
