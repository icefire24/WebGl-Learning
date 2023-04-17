import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
camera.position.set(5, 5, 5)
camera.lookAt(0, 0, 0)
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
{
    // 半球光
    const skyColor = 0xb1e1ff // 蓝色
    const groundColor = 0xffffff // 白色
    const intensity = 1
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity)
    scene.add(light)
}

{
    // 方向光
    const color = 0xffffff
    const intensity = 1
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(0, 10, 0)
    light.target.position.set(-5, 0, 0)
    scene.add(light)
    scene.add(light.target)
}

function render() {
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}
render()
const loader = new GLTFLoader();
window.screen = scene;
window.camera = camera;
loader.load(
    // glTF文件的URL
    './test.glb',
    // 加载完成后的回调函数
    function (gltf) {
        // 将模型添加到场景中
        scene.add(gltf.scene);
        console.log(gltf.scene);
        // gltf.scene.position.x=0
        gltf.scene.children[0].position.x=6
        gltf.scene.updateMatrixWorld(); // 更新模型的世界矩阵
    },
    // 正在加载时的回调函数
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // 加载失败时的回调函数
    function (error) {
        console.error(error);
    }
);