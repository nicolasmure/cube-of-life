const INITIAL_STATE = {
    id: 'scene',
    scene: null,
    camera: null,
    renderer: null,
    cubeTexture: null,
}

export const BUILD_SCENE = 'col/scene/BUILD_SCENE'
export const SCENE_BUILT = 'col/scene/SCENE_BUILT'

export const buildScene = () => ({
    type: BUILD_SCENE,
})

export const sceneBuilt = ({ renderer, scene, camera, cubeTexture }) => ({
    type: SCENE_BUILT,
    renderer,
    scene,
    camera,
    cubeTexture,
})

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SCENE_BUILT:
            return {
                ...state,
                renderer: action.renderer,
                scene: action.scene,
                camera: action.camera,
                cubeTexture: action.cubeTexture,
            }

        default:
            return state
    }
}
