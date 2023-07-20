import './style.css'
import * as THREE from 'three'

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

//Камера
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 2
scene.add(camera)

//Визуализатор
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)