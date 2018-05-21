import { ALIVE } from './conway'
import { FACE_SIZE } from './cube'

export const CELL_WIDTH = 4

export const buildTextures = textures =>
    textures.map((texture, face) => ({
        ...texture,
        ...build(FACE_SIZE)
    }))

const build = (size) => {
    const canvas = document.createElement('canvas')

    canvas.height = size * CELL_WIDTH
    canvas.width = size * CELL_WIDTH

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
        drawCells(textures[i].ctx, face)
    )

const drawCells = (ctx, face) => {
    face.nextCells.forEach((xVal, x) =>
        face.nextCells[x].forEach((yVal, y) => {
            const cell = face.cells[x] && face.cells[x][y]
            const nextCell = face.nextCells[x][y]

            if (cell === nextCell) {
                // no changes so nothing to repaint :)
                return
            }

            const color = ALIVE === nextCell
                ? 'black'
                : 'white'

            ctx.fillStyle = color
            ctx.fillRect(
                x * CELL_WIDTH,
                y * CELL_WIDTH,
                CELL_WIDTH,
                CELL_WIDTH,
            )
        })
    )
}
