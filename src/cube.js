import { buildCells } from './conway'

export const FACES_COUNT = 6 // cube
export const FACE_SIZE = 64 // nb of cells on one axis

const TOP = 0
const RIGHT = 1
const BOTTOM = 2
const LEFT = 3

const faceMap = [
    [1, 2, 4, 3], // face 0, TOP, RIGHT, BOTTOM, LEFT
    [5, 2, 0, 3], // face 1, TOP, RIGHT, BOTTOM, LEFT
    [5, 4, 0, 1], // face 2, TOP, RIGHT, BOTTOM, LEFT
    [1, 0, 4, 5], // face 3, TOP, RIGHT, BOTTOM, LEFT
    [0, 2, 5, 3], // face 4, TOP, RIGHT, BOTTOM, LEFT
    [4, 2, 1, 3], // face 5, TOP, RIGHT, BOTTOM, LEFT
]

export const getTopFace = (actualFace, cube) =>
    getFace(actualFace, cube, TOP)

export const getRightFace = (actualFace, cube) =>
    getFace(actualFace, cube, RIGHT)

export const getBottomFace = (actualFace, cube) =>
    getFace(actualFace, cube, BOTTOM)

export const getLeftFace = (actualFace, cube) =>
    getFace(actualFace, cube, LEFT)

const getFace = (actualFace, cube, desiredFace) =>
    cube.faces[faceMap[actualFace][desiredFace]]

/**
 * @return object A cube which has faces (0 indexed),
 * which has cells.
 */
export const buildCube = () => ({
    faces: Array(FACES_COUNT).fill(null).map(() => ({
        cells: [],
        nextCells: buildCells(FACE_SIZE),
    })),
})
