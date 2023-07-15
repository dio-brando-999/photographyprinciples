import * as THREE from "three";
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("viewer").appendChild(renderer.domElement);

var loader = new THREE.FBXLoader();
var fileInput = document.getElementById("activities_Camera");

fileInput.addEventListener("change", function(event) {
  var file = event.target.files[0];
  var reader = new FileReader();

  reader.addEventListener("load", function(event) {
    var fileContent = event.target.result;

    loader.load(fileContent, function(object) {
      scene.add(object);
    });
  });

  reader.readAsDataURL(file);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
