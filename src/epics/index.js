import { combineEpics } from 'redux-observable'
import game from './game'
import scene from './scene'
import textures from './textures'

export default combineEpics(
    game,
    scene,
    textures,
)
