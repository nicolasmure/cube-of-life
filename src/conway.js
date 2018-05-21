import {
    getTopFace,
    getRightFace,
    getBottomFace,
    getLeftFace,
} from './cube'

export const DENSITY = 0.5 // 0 to 1 @TODO : make it configurable on the UI
export const ALIVE = true
export const DEAD = false

/**
 * @param int faceSize The length of the face
 *
 * @return array
 */
export const buildCells = faceSize => {
    let cells = []

    for (let x = 0; x < faceSize; x++) {
        cells.push([])

        for (let y = 0; y < faceSize; y++) {
            cells[x].push(birth()
                ? ALIVE
                : DEAD
            )
        }
    }

    return cells;
}

/**
 * @return boolean Indicates whether a ranbom birth has happened or not,
 * based on the DENSITY.
 */
const birth = () => Math.random() < DENSITY

/**
 * @param int face The face number (starts from 0)
 * @param object cube The cube which has all faces
 *
 * @return array The next cells for that face
 */
export const computeNextFaceCells = (face, cube) => {
    const cells = cube.faces[face].cells
    let nextCells = []

    for (let x = 0; x < cells.length; x ++) {
        nextCells.push([])

        for (let y = 0; y < cells.length; y++) {
            nextCells[x].push(computeNextCell(face, cube, x, y))
        }
    }

    return nextCells
}

/**
 * @see https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 *
 * @param int face The face number (starts from 0)
 * @param object cube The cube which has all faces
 * @param int x The x coordinate of the cell on this face for which compute
 * next state
 * @param int y The y coordinate of the cell on this face for which compute
 * next state
 *
 * @return boolean Whether the cell for x and y coordinates will be ALIVE
 * or DEAD on the next state.
 */
const computeNextCell = (face, cube, x, y) => {
    const cells = cube.faces[face].cells
    const cell = cells[x][y]
    const faceSize = cells.length
    // the nb of alive adjacent cells to the current one
    let aliveAdjacentCount = 0;

    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (i === x && j === y) {
                // do not count ourselve
                continue
            }

            // special case where we're in a corner of the face
            // so we can't overlap to an adjacent face
            if (
                (i === -1 && j === -1)
                || (i === faceSize && j === -1)
                || (i === faceSize && j === faceSize)
                || (i === -1 && j === faceSize)
            ) {
                // we ramdomly pop a new cell in that case
                if (birth()) {
                    aliveAdjacentCount++;
                }

                continue
            }

            let walkedCell

            if (i === -1) {
                walkedCell = getTopFace(face, cube).cells[faceSize - 1][j]
            } else if (i === faceSize) {
                walkedCell = getBottomFace(face, cube).cells[0][j]
            } else if (j === -1) {
                walkedCell = getLeftFace(face, cube).cells[i][faceSize - 1]
            } else if (j === faceSize) {
                walkedCell = getRightFace(face, cube).cells[i][0]
            } else {
                walkedCell = cells[i][j]
            }

            if (ALIVE === walkedCell) {
                aliveAdjacentCount++
            }
        }
    }

    if (ALIVE === cell) {
        return aliveAdjacentCount < 2
            ? DEAD
            : aliveAdjacentCount < 4
                ? ALIVE
                : DEAD
    } else {
        return 3 === aliveAdjacentCount
            ? ALIVE
            : DEAD
    }
}
