import { connect } from 'react-redux'
import { componentDidMount, shouldComponentUpdate } from 'react-functional-lifecycle'
import { F, pipe } from 'ramda'
import { buildTextures } from '../../modules/textures'
import Textures from './Textures'

const mapDispatchToProps = dispatch => ({
    build: () => dispatch(buildTextures())
})

const didMount = ({ build }) => build()

export default connect(
    null,
    mapDispatchToProps,
)(pipe(
    componentDidMount(didMount),
    shouldComponentUpdate(F),
)(Textures))
