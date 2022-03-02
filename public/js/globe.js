// imports 
import * as THREE from 'three'

// creating scene, camera, renderer
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
    )

const renderer = new THREE.WebGLRenderer({
    antialias: true
})

renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(window.devicePixelRatio) // cleans up image, better quality
document.body.appendChild(renderer.domElement)


function onWindowResize()
{
    camera.aspect = innerWidth / innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(innerWidth, innerHeight)
}

window.addEventListener( 'resize', onWindowResize )


// create a sphere
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(3, 50, 50),
    new THREE.MeshBasicMaterial({
        //color: 0x2266EE
        map: new THREE.TextureLoader().load('./img/globe.jpg') // jpg is "wrapped" around the sphere
    })
)
scene.add(sphere)

camera.position.z = 5


// establishing the "main" function or entry point into file
function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    //console.log(sphere.radius);
    // addEventListener('click', () => {
    //     console.log(sphere.userData.position)
    // })
    sphere.rotation.y += 0.001
}

// calling entry point
animate()