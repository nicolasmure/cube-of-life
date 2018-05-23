import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'

/**
 * @see https://threejs.org/examples/#webgl_materials_texture_rotation
 * @see https://github.com/mrdoob/three.js/blob/master/examples/webgl_materials_texture_rotation.html
 * @see https://www.npmjs.com/package/three-orbitcontrols
 */
export const build = (id, textures) => {
    const renderer = new THREE.WebGLRenderer()

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.getElementById(id).appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        1,
        1000
    )
    camera.position.set(10, 15, 25)
    scene.add(camera);

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.addEventListener('change', () => render(renderer, scene, camera))
    controls.minDistance = 20
    controls.maxDistance = 50
    controls.maxPolarAngle = Math.PI * 2

    const cubeTexture = new THREE.Texture(textures[0].canvas)

    /*
    const loader = new THREE.CubeTextureLoader()
    const cubeTexture = loader.load(textures.map(texture =>
        texture.canvas.toDataURL()
    ))
    */

    const material = new THREE.MeshBasicMaterial({
        map: cubeTexture,
        // envMap: cubeTexture, // for CubeTexture
    });

    const geometry = new THREE.BoxGeometry(10, 10, 10)
    const mesh = new THREE.Mesh(geometry, material)

    scene.add(mesh)

    window.addEventListener(
        'resize',
        () => onWindowResize(renderer, scene, camera),
        false
    )

    return {
        renderer,
        scene,
        camera,
        cubeTexture,
    }
}

export const render = (renderer, scene, camera, cubeTexture = null) => {
    if (cubeTexture) {
        cubeTexture.needsUpdate = true
    }

    renderer.render(scene, camera)
}

const onWindowResize = (renderer, scene, camera) => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)

    render(renderer, scene, camera)
}
