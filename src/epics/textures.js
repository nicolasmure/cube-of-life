import { combineEpics, ofType } from 'redux-observable'
import { filter, map } from 'rxjs/operators'
import { BUILD_TEXTURES, DRAW_TEXTURES, built, drawTextures, texturesDrawn } from '../modules/textures'
import { TICK } from '../modules/game'
import { buildTextures, drawTextures as doDrawTextures } from '../texture'

export const buildTexturesEpic = (action$, store) =>
    action$.pipe(
        ofType(BUILD_TEXTURES),
        map(() => buildTextures(store.getState().textures.textures)),
        map(built),
    )

export const onTickEpic = (action$, store) =>
    action$.pipe(
        ofType(TICK),
        filter(() => !store.getState().textures.drawing),
        map(drawTextures),
    )

export const drawTexturesEpic = (action$, store) =>
    action$.pipe(
        ofType(DRAW_TEXTURES),
        map(() => doDrawTextures(
            store.getState().textures.textures,
            store.getState().game.cube
        )),
        map(texturesDrawn),
    )

export default combineEpics(
    buildTexturesEpic,
    onTickEpic,
    drawTexturesEpic,
)
