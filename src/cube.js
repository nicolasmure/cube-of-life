import { buildCells } from './conway'

export const FACES_COUNT = 6 // cube
export const FACE_SIZE = 64 // nb of cells on one axis

export const TOP = 0
export const RIGHT = 1
export const BOTTOM = 2
export const LEFT = 3

/**
 * @see https://threejs.org/docs/#api/loaders/CubeTextureLoader
 * for faces order
 *
 * This array has 6 element, one per face. Each element is providing infos
 * about its face.
 * The key of the array is the face number.
 *
 * An element is an array of 4 objects. Each object provide infos about the
 * sibling face (TOP, RIGHT, BOTTOM, LEFT).
 * Each object tells to which face the current face is related in the current
 * direction, and also by which side.
 * For instance, in a cube like this :
 *   0
 * 1 2 3
 *   4
 *   5
 * the face 2 is related to the face 0 for the TOP direction. The side of the
 * face 0 related to the face 2 in this direction is BOTTOM.
 *
 * The following map has been determined by the above link, and the sides have
 * been determined by actually looking to the drawn cube (by enabling the faces
 * debug in /src/texture.js)
 */
const faceMap = [
    // 0 : right face. TOP, RIGHT, BOTTOM, LEFT
    [{face: 2, side: RIGHT}, {face: 5, side: LEFT}, {face: 3, side: RIGHT}, {face: 4, side: RIGHT}],
    // 1 : left face. TOP, RIGHT, BOTTOM, LEFT
    [{face: 2, side: LEFT}, {face: 4, side: LEFT}, {face: 3, side: LEFT}, {face: 5, side: RIGHT}],
    // 2 : top face. TOP, RIGHT, BOTTOM, LEFT
    [{face: 5, side: TOP}, {face: 0, side: TOP}, {face: 4, side: TOP}, {face: 1, side: TOP}],
    // 3 : bottom face. TOP, RIGHT, BOTTOM, LEFT
    [{face: 4, side: BOTTOM}, {face: 0, side: BOTTOM}, {face: 5, side: BOTTOM}, {face: 1, side: BOTTOM}],
    // 4 : front face. TOP, RIGHT, BOTTOM, LEFT
    [{face: 2, side: BOTTOM}, {face: 0, side: LEFT}, {face: 3, side: TOP}, {face: 1, side: RIGHT}],
    // 5 : back face. TOP, RIGHT, BOTTOM, LEFT
    [{face: 2, side: TOP}, {face: 1, side: LEFT}, {face: 3, side: BOTTOM}, {face: 0, side: RIGHT}],
]

/**
 * A map to turn coordinates from the given direction to the given side.
 */
const sideMap = {
    [`${TOP}to${TOP}`]: (x, y) => ({x: FACE_SIZE - (x + 1), y: 0}),
    [`${TOP}to${RIGHT}`]: (x, y) => ({x: FACE_SIZE - 1, y: FACE_SIZE - (x + 1)}),
    [`${TOP}to${BOTTOM}`]: (x, y) => ({x: x, y: FACE_SIZE - 1}),
    [`${TOP}to${LEFT}`]: (x, y) => ({x: 0, y: x}),
    [`${RIGHT}to${TOP}`]: (x, y) => ({x: FACE_SIZE - (y + 1), y: 0}),
    [`${RIGHT}to${BOTTOM}`]: (x, y) => ({x: y, y: FACE_SIZE - 1}),
    [`${RIGHT}to${LEFT}`]: (x, y) => ({x: 0, y: y}),
    [`${BOTTOM}to${TOP}`]: (x, y) => ({x: x, y: 0}),
    [`${BOTTOM}to${BOTTOM}`]: (x, y) => ({x: FACE_SIZE - (x + 1), y: FACE_SIZE - 1}),
    [`${BOTTOM}to${RIGHT}`]: (x, y) => ({x: FACE_SIZE - 1, y: x}),
    [`${BOTTOM}to${LEFT}`]: (x, y) => ({x: 0, y: FACE_SIZE - (x + 1)}),
    [`${LEFT}to${TOP}`]: (x, y) => ({x: y, y: 0}),
    [`${LEFT}to${RIGHT}`]: (x, y) => ({x: FACE_SIZE - 1, y: y}),
    [`${LEFT}to${BOTTOM}`]: (x, y) => ({x: FACE_SIZE - (y + 1), y: FACE_SIZE - 1}),
}

/**
 * @param int face The original face
 * @param object cube
 * @param int direction TOP, RIGHT, BOTTOM, LEFT
 * @param int x The x coordinate of the walked cell from the actual face
 * @param int y The y coordinate of the walked cell from the actual face
 *
 * @return boolean The walked cell value
 */
export const getWalkedCellOnSiblingFace = (face, cube, direction, x, y) => {
    const siblingFaceInfo = faceMap[face][direction]
    const siblingFace = cube.faces[siblingFaceInfo.face]
    const adapterFn = sideMap[`${direction}to${siblingFaceInfo.side}`]

    const c = adapterFn(x, y)

    return siblingFace.cells[c.x][c.y]
}

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
