import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

// // color and density
// const light = new THREE.DirectionalLight("white",2); 
// // Jitna pass light utna zyada elem visible
// light.position.set(1,1,1); 
// scene.add(light)

// const helper = new THREE.DirectionalLightHelper(light,0.8); //elem and size
// scene.add(helper)

// const textureLoader = new THREE.TextureLoader()
// const tex = textureLoader.load("./textures/8k_earth_daymap.jpeg")
// const texSec = textureLoader.load("./textures/8k_earth_nightmap.jpg")
// For original color 
// tex.colorSpace = THREE.SRGBColorSpace;  


const textureLoader = new THREE.TextureLoader();

const dayMap = textureLoader.load('./textures/1_earth_8k.jpg');
dayMap.colorSpace = THREE.SRGBColorSpace;

const geometry = new THREE.SphereGeometry(1, 300, 300);
const earthMaterial = new THREE.MeshStandardMaterial({map: dayMap,});
// const material = new THREE.MeshStandardMaterial({color : "red"})
// const material = new THREE.MeshNormalMaterial()
const Sphere = new THREE.Mesh(geometry,earthMaterial);

scene.add(Sphere);

camera.position.z = 2;

const hdri = new RGBELoader();
hdri.load(
  "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/urban_street_01_4k.hdr",
  function (hdritexture){
    hdritexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment=hdritexture;
    scene.background = hdritexture;
  }
)


const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth,window.innerHeight);

const controls = new OrbitControls( camera, renderer.domElement );

function animate(){
    renderer.render(scene,camera);
    controls.update();
    // cube.rotation.y += 0.03;
    window.requestAnimationFrame(animate);
}
animate();