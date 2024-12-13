import "./style.css";
import * as THREE from "three";
import {
  MapControls,
  OrbitControls,
} from "three/examples/jsm/controls/OrbitControls";

//Scene
const scene = new THREE.Scene();

//lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(2, 2, 2);
scene.add(ambientLight, pointLight);

//textures
const texture = new THREE.TextureLoader();
const colorTexture = texture.load("/texture/color.jpg");
const bumpTexture = texture.load("/texture/bump.jpg");
const dispacementTexture = texture.load("/texture/displacementMap.jpg");

// cube texture loader
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  "/texture/env/px.png",
  "/texture/env/nx.png",
  "/texture/env/py.png",
  "/texture/env/ny.png",
  "/texture/env/pz.png",
  "/texture/env/nz.png",
]);

//Resizing
window.addEventListener("resize", () => {
  //Update Size
  aspect.width = window.innerWidth;
  aspect.height = window.innerHeight;

  //New Aspect Ratio
  camera.aspect = aspect.width / aspect.height;
  camera.updateProjectionMatrix();

  //New RendererSize
  renderer.setSize(aspect.width, aspect.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//Mesh
const geometry = new THREE.PlaneGeometry(1, 1, 2, 2);
const material = new THREE.MeshStandardMaterial({
  //metalness: 0.4,
  //roughness: 0,
  map: colorTexture,
  bumpMap: bumpTexture,
  displacementMap: dispacementTexture,
});
const mesh = new THREE.Mesh(geometry, material);
//scene.add(mesh);

//Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 1;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);

//OrbitControls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

//Clock Class
const clock = new THREE.Clock();

const animate = () => {
  //GetElapsedTime
  const elapsedTime = clock.getElapsedTime();

  //Update Controls
  orbitControls.update();

  //Renderer
  renderer.render(scene, camera);

  //RequestAnimationFrame
  window.requestAnimationFrame(animate);
};
animate();
