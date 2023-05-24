import * as THREE from 'three'
function addBox(scene) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
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

}
export { addShowder, addBox, loadEarth, addSprite, addSnowScene, addLight }