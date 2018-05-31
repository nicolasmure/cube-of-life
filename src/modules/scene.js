const INITIAL_STATE = {
    id: 'scene',
    scene: null,
    camera: null,
    renderer: null,
    mesh: null,
}

export const BUILD_SCENE = 'col/scene/BUILD_SCENE'
export const SCENE_BUILT = 'col/scene/SCENE_BUILT'

export const buildScene = () => ({
    type: BUILD_SCENE,
})

export const sceneBuilt = ({ renderer, scene, camera, mesh }) => ({
    type: SCENE_BUILT,
    renderer,
    scene,
    camera,
    mesh,
})

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SCENE_BUILT:
            return {
                ...state,
                renderer: action.renderer,
                scene: action.scene,
                camera: action.camera,
                mesh: action.mesh,
            }

        default:
            return state
    }
}
