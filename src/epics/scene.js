import { combineEpics, ofType } from 'redux-observable'
import { zip } from 'rxjs/observable/zip'
import { ignoreElements, map, mapTo } from 'rxjs/operators'
import { BUILD_SCENE, sceneBuilt } from '../modules/scene'
import { BUILT, TEXTURES_DRAWN } from '../modules/textures'
import { build, render } from '../scene'

export const buildSceneEpic = (action$, store) =>
    zip(
        action$.pipe(ofType(BUILD_SCENE)),
        action$.pipe(ofType(BUILT)),
    )
    .pipe(
        map(() => build(
            store.getState().scene.id,
            store.getState().textures.textures,
        )),
        map(sceneBuilt),
    )

export const reRenderSceneEpic = (action$, store) =>
    action$.pipe(
        ofType(TEXTURES_DRAWN),
        map(() => render(
            store.getState().scene.renderer,
            store.getState().scene.scene,
            store.getState().scene.camera,
            store.getState().scene.mesh,
        )),
        ignoreElements(),
    )

export default combineEpics(
    buildSceneEpic,
    reRenderSceneEpic,
)
