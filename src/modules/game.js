import { buildCube } from '../cube'

const INITIAL_STATE = {
    cube: buildCube(),
}

export const NEXT_CELLS_COMPUTED = 'col/game/NEXT_CELLS_COMPUTED'
export const TICK = 'col/game/TICK'

export const nextCellsComputed = nextCells => ({
    type: NEXT_CELLS_COMPUTED,
    nextCells,
})

export const tick = () => ({
    type: TICK,
})

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NEXT_CELLS_COMPUTED:
            return {
                ...state,
                cube: {
                    ...state.cube,
                    faces: action.nextCells.map((next, i) => ({
                        cells: state.cube.faces[i].nextCells,
                        nextCells: next.nextCells,
                    })),
                },
            }

        default:
            return state
    }
}
