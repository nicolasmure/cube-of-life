import { combineReducers } from 'redux'
import game from './game'
import scene from './scene'
import textures from './textures'

export default combineReducers({
    game,
    scene,
    textures,
})
