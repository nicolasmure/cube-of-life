import { FACES_COUNT } from '../cube'

const initTextures = () =>
    Array(FACES_COUNT).fill(null).map(() => ({
        canvas: null,
        ctx: null,
    }))

const INITIAL_STATE = {
    textures: initTextures(),
    drawing: false,
}

export const BUILD_TEXTURES = 'col/textures/BUILD_TEXTURES'
export const BUILT = 'col/textures/BUILT'
export const DRAW_TEXTURES = 'col/textures/DRAW_TEXTURES'
export const TEXTURES_DRAWN = 'col/textures/TEXTURES_DRAWN'

export const buildTextures = () => ({
    type: BUILD_TEXTURES,
})

export const built = textures => ({
    type: BUILT,
    textures,
})

export const drawTextures = () => ({
    type: DRAW_TEXTURES,
})

export const texturesDrawn = () => ({
    type: TEXTURES_DRAWN,
})

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BUILT:
            return {
                ...state,
                textures: action.textures,
            }

        case DRAW_TEXTURES:
            return {
                ...state,
                drawing: true,
            }

        case TEXTURES_DRAWN:
            return {
                ...state,
                drawing: false,
            }

        default:
            return state
    }
}
