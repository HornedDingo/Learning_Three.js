import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//Курсор
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => 
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)
})

//Сцена
const scene = new THREE.Scene()

//Объекты
const group = new THREE.Group()
scene.add(group)

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xA0FF56})
)
group.add(cube)

//Оси куба
const axesHelper = new THREE.AxesHelper()
group.add(axesHelper)

//Размеры
const sizes = {
    width: 800,
    height: 600
}

//Камера с перспективой
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 2
camera.lookAt(cube.position)
scene.add(camera)

//Камера без перспективы
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(
//     -1 * aspectRatio, 
//     1 * aspectRatio,
//     1,
//     -1,
//     0.1,
//     100
// )
// camera.position.x = 2
// camera.position.y = 2
// camera.position.z = 2
// scene.add(camera)

//Визуализатор
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

//Контроль
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//Таймер
// const clock = new THREE.Clock()

//Анимация
const tick = () => 
{
    //Таймер
    // const elapsedTime = clock.getElapsedTime()

    //Первый способ - обновление камеры
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    // camera.position.y = cursor.y * Math.PI
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.lookAt(group.position)

    //Второй способ - обновление контроля
    controls.update()

    //Рендер
    // group.rotation.y = elapsedTime
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()