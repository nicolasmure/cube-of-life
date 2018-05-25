import { buildCells } from './conway'

export const FACES_COUNT = 6 // cube
export const FACE_SIZE = 64 // nb of cells on one axis

const TOP = 0
const RIGHT = 1
const BOTTOM = 2
const LEFT = 3

/**
 * @see https://threejs.org/docs/#api/loaders/CubeTextureLoader
 * for faces order
 */
const faceMap = [
    [2, 5, 3, 4], // 0 : right face. TOP, RIGHT, BOTTOM, LEFT
    [2, 4, 3, 5], // 1 : left face. TOP, RIGHT, BOTTOM, LEFT
    [5, 0, 4, 1], // 2 : top face. TOP, RIGHT, BOTTOM, LEFT
    [4, 0, 5, 1], // 3 : bottom face. TOP, RIGHT, BOTTOM, LEFT
    [2, 0, 3, 1], // 4 : front face. TOP, RIGHT, BOTTOM, LEFT
    [2, 1, 3, 0], // 5 : back face. TOP, RIGHT, BOTTOM, LEFT
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
