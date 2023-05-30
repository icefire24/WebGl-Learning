import * as THREE from 'three'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import { OimoPhysics } from 'three/addons/physics/OimoPhysics.js';

function addBox(scene) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    return cube;
}
function loadEarth(scene) {
    const geometry = new THREE.SphereGeometry(100, 32, 32);
    const material = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('./assets/earth.jpg')
    });
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);
    console.log(earth);
    return earth;
}
//添加精灵,
function addSprite(scene) {
    const spriteMap = new THREE.TextureLoader().load('./assets/snow.png');
    const spriteMaterial = new THREE.SpriteMaterial({
        map: spriteMap,
        // color: 0xffffff
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(10, 10, 1);
    sprite.position.set(0, 0, 0);
    scene.add(sprite);
    return sprite;
}
//生成随机雪花
function addSnowScene(scene) {
    let group = new THREE.Group();

    for (let index = 0; index < 2000; index++) {
        let sprite = addSprite(scene);
        let x = Math.random() * 800;
        let y = Math.random() * 800;
        let z = Math.random() * 800;
        sprite.position.set(x, y, z);
        sprite.scale.set(10, 10, 1);
        group.add(sprite);
    }
    scene.add(group);
    function animate() {
        requestAnimationFrame(animate);
        group.children.forEach((item) => {
            item.position.y -= 0.5;
            if (item.position.y < -100) {
                item.position.y = 1000;
            }
        })
    }
    animate();
}
function addLight(scene) {
    //添加环境光灯光
    const light = new THREE.AmbientLight(0x404040, 0.5)
    light.position.set(10, 10, 10)
    scene.add(light)
    //添加点光源
    const pointLight = new THREE.PointLight(0xffffff, 0.5)
    pointLight.position.set(200, 200, 200)
    scene.add(pointLight)
    //添加平行光
    const directLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directLight.position.set(10, 10, 10)
    // directLight.target=earth
    scene.add(directLight)
    //添加聚光灯
    const spotLight = new THREE.SpotLight(0xffffff)
    spotLight.position.set(0, 200, 100)
    scene.add(spotLight)
}
function addShowder(scene) {
    // 平面几何体
    const planGeometry = new THREE.PlaneGeometry(1000, 1000)
    // 平面几何材质
    const planMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 })
    // 平面
    const plan = new THREE.Mesh(planGeometry, planMaterial)
    plan.position.set(0, -10, 0)
    plan.rotation.x = - Math.PI / 2
    scene.add(plan)
    // 球体
    const sphereGeometry = new THREE.SphereGeometry(50, 32, 16)
    const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 })
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphereMesh.position.set(0, 60, 0)
    scene.add(sphereMesh)
    // 辅助轴
    const axesHelper = new THREE.AxesHelper(50)
    scene.add(axesHelper)
    // 环境光
    const ambient = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambient)
    // 聚光灯
    const sportLight = new THREE.SpotLight(0xffffff, 1)
    sportLight.position.set(-200, 350, 0)
    sportLight.angle = Math.PI / 6
    sportLight.penumbra = 0.2 //边缘羽化
    scene.add(sportLight)

    sphereMesh.castShadow = true//投射物体产生阴影
    plan.receiveShadow = true//接收阴影
    sportLight.castShadow = true//光源投射阴影
    return sphereMesh
}
function addGui(mesh) {
    const gui = new GUI()
    gui.close()//折叠菜单
    let poi = gui.addFolder('球体位置')//添加分组
    poi.add(mesh.position, 'x', -100, 100).name('x位置').step(10).onChange((val) => {
        console.log(val);
    })
    gui.addColor(mesh.material, 'color').name('材料颜色') //添加颜色选择器
}
//实例化网格批量创建物体
function addInstanceMesh(scene) {
    const geometry = new THREE.IcosahedronGeometry(0.5, 5)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    let count = 1000
    let meshes = new THREE.InstancedMesh(geometry, material, count)
    //循环设置每个实例的位置
    // 定义每个小球的id索引，作为小球的标识
    let index = 0
    let amount = 10
    // 定义颜色
    let white = new THREE.Color().setHex(0xffffff)
    // 定义每个小球位置的偏移量
    const offset = (amount - 1) / 2 //4.5,即每个小球间隔4.5
    // 转换矩阵，
    const matrix = new THREE.Matrix4()
    for (let i = 0; i < amount; i++) {
        for (let j = 0; j < amount; j++) {
            for (let k = 0; k < amount; k++) {
                // 设置matrix的位置，根据偏移量
                matrix.setPosition(offset - i, offset - j, offset - k) //-4.5 ~ 4.5
                // 将index和matrix赋值给meshes
                meshes.setMatrixAt(index, matrix)
                let white = new THREE.Color().setHex(Math.random() * 0xffffff)

                // 设置每个小球的颜色
                meshes.setColorAt(index, white)
                index = index + 1
            }
        }
    }
    scene.add(meshes)
    return meshes
}
function ray(mesh) {
    let lastInstanceId
    let instancedMesh = addInstanceMesh(scene)
    const mouse = new THREE.Vector2()
    const raycaster = new THREE.Raycaster()
    window.addEventListener('mousemove', function (event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
        raycaster.setFromCamera(mouse, camera)

    })
    // 通过摄像机和鼠标位置更新射线
    // console.log(mouse);
    // 计算物体和射线的焦点
    const intersection = raycaster.intersectObject(instancedMesh)
    // console.log(intersection.length)
    if (intersection.length > 0) {
        lastInstanceId && instancedMesh.setColorAt(lastInstanceId, new THREE.Color(1, 0, 0))
        const instanceId = intersection[0].instanceId //获取射线穿透时的第一个物体
        instancedMesh.setColorAt(instanceId, new THREE.Color(1, 0, 0).setHex(0xffffff))
        instancedMesh.instanceColor.needsUpdate = true
        lastInstanceId = instanceId
    }
}
function addPlan(scene) {
    let planGeometry = new THREE.PlaneGeometry(10, 10,10)
    let planMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 }) 
    let plan = new THREE.Mesh(planGeometry, planMaterial)
    plan.rotation.x = - Math.PI / 2
    plan.position.set(0, -1, 0)
    scene.add(plan)
    return plan
}
async function addOimo(scene) {
    let physics = await OimoPhysics()
    let box = addBox(scene)
    box.position.y=10
    //不传入代表刚体
    //BUG:刚体会穿透地面
    let plan = addPlan(scene)
    console.log('plan: ', plan);
    //默认为0，即代表小球不参与物理世界的运动，我们把其设置为1
    physics.addMesh(plan)
    physics.addMesh(box, 1)
}
export { addOimo, addShowder, addInstanceMesh, addGui, ray, addBox, loadEarth, addSprite, addSnowScene, addLight }