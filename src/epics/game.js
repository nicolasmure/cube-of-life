import { combineEpics, ofType } from 'redux-observable'
import { map, mergeMap } from 'rxjs/operators'
import { interval } from 'rxjs/observable/interval'
import { BUILT, TEXTURES_DRAWN } from '../modules/textures'
import { nextCellsComputed, tick } from '../modules/game'
import { computeNextFaceCells } from '../conway'

export const startGameEpic = action$ =>
    action$.pipe(
        ofType(BUILT),
        mergeMap(() => interval(1000)),
        map(tick),
    )

export const computeNextCellsEpic = (action$, store) =>
    action$.pipe(
        ofType(TEXTURES_DRAWN),
        map(() => store.getState().game.cube.faces.map((face, i) => ({
            nextCells: computeNextFaceCells(i, store.getState().game.cube),
        }))),
        map(nextCellsComputed),
    )

export default combineEpics(
    startGameEpic,
    computeNextCellsEpic,
)
