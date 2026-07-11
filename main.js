import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { createPanels } from "./panels.js";
import { animateFold } from "./foldAnimation.js";

// =====================
// Scene
// =====================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf5f5f5);

// =====================
// Camera
// =====================
const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(8, 6, 8);

// =====================
// Renderer
// =====================
const renderer = new THREE.WebGLRenderer({
    antialias: true
});


const container = document.getElementById("container");

renderer.setSize(window.innerWidth, window.innerHeight);

container.appendChild(renderer.domElement);

// =====================
// Orbit Controls
// =====================
const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.enableZoom = true;
controls.enableRotate = true;
controls.enablePan = true;

controls.minDistance = 2;
controls.maxDistance = 20;

// =====================
// Lights
// =====================
scene.add(new THREE.AmbientLight(0xffffff, 2));

const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(10, 10, 10);

scene.add(dirLight);

// =====================
// Texture
// =====================
const loader = new THREE.TextureLoader();

const texture = loader.load("/assets/dieline.png");

// =====================
// Panels
// =====================
const parts = createPanels(texture);
console.log(parts);
scene.add(parts.group);

// =====================
// Fold Animation
// =====================
const animation = animateFold(parts);
// =====================
// Raycaster
// =====================
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
// =====================
// Fold Button
// =====================
const foldBtn = document.getElementById("foldBtn");

let folded = false;

foldBtn.addEventListener("click", () => {

    folded = !folded;

    if (folded)
        animation.foldAll();
    else
        animation.unfoldAll();

});

// =====================
// Upload
// =====================
const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {

        loader.load(event.target.result, (tex) => {

            Object.values(parts).forEach((obj) => {

                if (obj.material) {

                    obj.material.map = tex;
                    obj.material.needsUpdate = true;

                }

            });

        });

    };

    reader.readAsDataURL(file);

});
// =====================
// Click Panels
// =====================
renderer.domElement.addEventListener("pointerdown", (event) => {

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const meshes = [
        parts.front,
        parts.left,
        parts.right,
        parts.top,
        parts.bottom,
        parts.back
    ].filter(Boolean);

    const hits = raycaster.intersectObjects(meshes ,false);

    if (hits.length > 0) {

        const mesh = hits[0].object;

        console.log(mesh.name);

        animation.togglePanel(mesh.name);

    }

});
// =====================
// Render
// =====================
function render() {

    requestAnimationFrame(render);

    controls.update();

    renderer.render(scene, camera);

}

render();

// =====================
// Resize
// =====================
window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

});
