//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//Keep track of the mouse position, so we can make the eye move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

//Keep the 3D object on a global variable so we can access it later
let object;

//OrbitControls allow the camera to move around the scene
let controls;

//Set which object to render
let objToRender = "eye";

//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

//Load the file
loader.load(
  `.static/Media/camera.gltf`,
  function (gltf) {
    //If the file is loaded, add it to the scene
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    //If there is an error, log it
    console.error(error);
  }
);

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = objToRender === "dino" ? 25 : 500;

//Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
topLight.position.set(500, 500, 500); //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(
  0x333333,
  objToRender === "dino" ? 5 : 1
);
scene.add(ambientLight);

//This adds controls to the camera, so we can rotate / zoom it with the mouse
if (objToRender === "dino") {
  controls = new OrbitControls(camera, renderer.domElement);
}

//Render the scene
function animate() {
  requestAnimationFrame(animate);
  //Here we could add some code to update the scene, adding some automatic movement

  //Make the eye move
  if (object && objToRender === "eye") {
    //I've played with the constants here until it looked good
    object.rotation.y = -3 + (mouseX / window.innerWidth) * 3;
    object.rotation.x = -1.2 + (mouseY * 2.5) / window.innerHeight;
  }
  renderer.render(scene, camera);
}

//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//add mouse position listener, so we can make the eye move
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

//Start the 3D rendering
animate();

// import * as THREE from "./three.js";
// import { GLTFLoader } from "./GLTFLoader.js";

// const scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.01,
//   1000
// );
// var renderer = new THREE.WebGLRender();
// renderer, setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// var obj;
// var loader = new GLTFLoader();
// loader.load("./static/Media/camera.gltf", function (gltf) {
//   obj = gltf.scene;
//   scene.add(gltf.scene);
// });
// var light = new THREE.HemisphereLight(0xffffff, 0x00000, 3);
// scene.add(light);
// camera.position.set(100, 100, 10);
// function animate() {
//   requestAnimationFrame(animate);
//   renderer.render(scene.camera);
// }
// animate();

// // Select the canvas element with class "webgl"
// const canvas = document.querySelector(".webgl");
// const scene = new THREE.Scene();

// // Create the camera
// const camera = new THREE.PerspectiveCamera(
//   40,
//   window.innerWidth / window.innerHeight,
//   1,
//   5000
// );
// camera.rotation.y = (45 / 180) * Math.PI;
// camera.position.x = 500;
// camera.position.y = 500;
// camera.position.z = 200;

// // Create the renderer
// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Add lights to the scene
// const hlight = new THREE.AmbientLight(0x404040, 100);
// scene.add(hlight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 100);
// directionalLight.position.set(0, 1, 0);
// directionalLight.castShadow = true;
// scene.add(directionalLight);

// // const light = new THREE.PointLight(0xc4c4c4, 10);
// light.position.set(0, 300, 500);
// scene.add(light);

// const light2 = new THREE.PointLight(0xc4c4c4, 10);
// light2.position.set(500, 100, 0);
// scene.add(light2);

// const light3 = new THREE.PointLight(0xc4c4c4, 10);
// light3.position.set(0, 100, -500);
// scene.add(light3);

// const light4 = new THREE.PointLight(0xc4c4c4, 10);
// light4.position.set(-500, 300, 500);
// scene.add(light4);

// // Load the GLTF model
// const loader = new THREE.GLTFLoader();
// loader.load("./static/Media/camera.gltf", function (gltf) {
//   scene.add(gltf.scene);
//   renderer.render(scene, camera);
// });

// // Initialize the controls
// const controls = new OrbitControls(camera, renderer.domElement);

// // Animation loop
// function animate() {
//   renderer.render(scene, camera);
//   requestAnimationFrame(animate);
// }

// animate();
