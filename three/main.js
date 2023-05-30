import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import {OBJLoader}  from 'three/addons/loaders/OBJLoader.js'
import { TransformControls } from 'three/addons/controls/TransformControls.js'
import { addShowder, addSnowScene, addBox, loadEarth, addSprite, addGui, addInstanceMesh, ray, addOimo } from './util.js'
import './reset.css'
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.set(20, 20, 20)
camera.lookAt(0, 0, 0)

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const axesHelper = new THREE.AxesHelper(500);
scene.add(axesHelper);
const transformControls = new TransformControls(camera, renderer.domElement);
scene.add(transformControls)
// transformControls.attach(box)


// let sphereMesh=addShowder(scene)
// addGui(sphereMesh)
addOimo(scene)
function render() {
    
    // earth.rotation.y += 0.01;
    renderer.shadowMap.enabled = true;//开启阴影
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}
render()
window.onresize = function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
console.log(scene);
window.scene = scene;
window.camera = camera;
