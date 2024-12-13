import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//Scene
const scene = new THREE.Scene();

//lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(2, 2, 2);
scene.add(ambientLight, pointLight);

//textures
const textureLoader = new THREE.TextureLoader();
const paticoleTexture = textureLoader.load("texture/alphaSnow.jpg");
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
const geometry = new THREE.BufferGeometry(1, 1);
const verticesNumber = 10000;
const VerticesAr = new Float32Array(verticesNumber * 3);
for (let i = 0; i < verticesNumber * 3; i++) {
  VerticesAr[i] = (Math.random() - 0.5) * 4; // to rotate around y -0.5
  // --> then multiply x4 gives each particle more range to move
}
geometry.setAttribute("position", new THREE.BufferAttribute(VerticesAr, 3));
const material = new THREE.PointsMaterial({
  alphaMap: paticoleTexture,
  transparent: true,
  depthTest: false,
  size: 0.02,
});
const points = new THREE.Points(geometry, material);
scene.add(points);

//Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(
  75,
  aspect.width / aspect.height,
  0.01, // near
  100 //far
);
camera.position.z = 1;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(aspect.width, aspect.height);

//OrbitControls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;
orbitControls.enableZoom = false;
orbitControls.enableRotate = false;
orbitControls.autoRotate = true; //-->  best for performance to rotate the camera
orbitControls.autoRotateSpeed = 0.2;

//Clock Class
const clock = new THREE.Clock();

const animate = () => {
  //GetElapsedTime
  const elapsedTime = clock.getElapsedTime();

  //points.rotation.y = elapsedTime * 0.05; //-->  best for performance to rotate the camera
  //points.rotation.x = elapsedTime * 0.05;

  //Update Controls
  orbitControls.update();

  //Renderer
  renderer.render(scene, camera);

  //RequestAnimationFrame
  window.requestAnimationFrame(animate);
};
animate();
