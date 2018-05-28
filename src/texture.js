import { ALIVE } from './conway'
import { FACE_SIZE } from './cube'

export const CELL_WIDTH = 4
export const DEBUG_FACES = true

export const buildTextures = textures =>
    textures.map((texture) => ({
        ...texture,
        ...build()
    }))

const build = () => {
    const canvas = document.createElement('canvas')

    canvas.height = FACE_SIZE * CELL_WIDTH
    canvas.width = FACE_SIZE * CELL_WIDTH

    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.fillRect(
        0,
        0,
        canvas.height,
        canvas.width,
    )

    return {
        canvas,
        ctx
    }
}

export const drawTextures = (textures, cube) =>
    cube.faces.map((face, i) =>
        drawCells(textures[i].ctx, face, i)
    )

const drawCells = (ctx, face, faceIndex) => {
    // store the cells to paint to minimize brush color changes and
    // improve painting perfs
    const blackCells = []
    const whiteCells = []

    face.nextCells.forEach((xVal, x) =>
        face.nextCells[x].forEach((yVal, y) => {
            const cell = face.cells[x] && face.cells[x][y]
            const nextCell = face.nextCells[x][y]

            if (cell === nextCell) {
                // no changes so nothing to repaint :)
                return
            }

            let collection = ALIVE === nextCell
                ? blackCells
                : whiteCells

            collection.push({ x, y })
        })
    )

    // draw all the black cells
    ctx.fillStyle = 'black'
    blackCells.map(({ x, y }) => drawCell(ctx, x, y))

    // draw all the white cells
    ctx.fillStyle = 'white'
    whiteCells.map(({ x, y }) => drawCell(ctx, x, y))

    if (DEBUG_FACES) {
        debugFaces(ctx, faceIndex)
    }
}

const drawCell = (ctx, x, y) =>
    ctx.fillRect(
        x * CELL_WIDTH,
        y * CELL_WIDTH,
        CELL_WIDTH,
        CELL_WIDTH,
    )

/**
 * Draw face ridges and some squares indicating the face index.
 */
const debugFaces = (ctx, faceIndex) => {
    const size = 20
    ctx.fillStyle = 'red'

    Array(faceIndex).fill(null).map((v, i) =>
        ctx.fillRect(
            size + i * size * 2,
            size,
            size,
            size,
        )
    )

    const length = FACE_SIZE * CELL_WIDTH
    ctx.fillRect(0, 0, length, 1) // top ridge
    ctx.fillRect(length -1, 0, 1, length) // right ridge
    ctx.fillRect(0, length -1, length, 1) // bottom ridge
    ctx.fillRect(0, 0, 1, length) // left ridge
}
