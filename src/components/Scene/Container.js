import { connect } from 'react-redux'
import { componentDidMount, shouldComponentUpdate } from 'react-functional-lifecycle'
import { F, pipe } from 'ramda'
import { buildScene } from '../../modules/scene'
import Scene from './Scene'

const mapStateToProps = state => ({
    id: state.scene.id,
})

const mapDispatchToProps = dispatch => ({
    build: () => dispatch(buildScene())
})

const didMount = ({ build }) => build()

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(pipe(
    componentDidMount(didMount),
    shouldComponentUpdate(F),
)(Scene))
