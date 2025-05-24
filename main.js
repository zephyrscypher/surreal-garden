
import * as THREE from 'https://cdn.skypack.dev/three@0.154.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x111111, 0.05);

// Camera
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.5, 6);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

// Lighting
const ambient = new THREE.AmbientLight(0x88ccaa, 0.4);
scene.add(ambient);
const pointLight = new THREE.PointLight(0xffffff, 2, 50);
pointLight.position.set(0, 6, 0);
scene.add(pointLight);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;

// Ground
const groundGeo = new THREE.PlaneGeometry(50, 50);
const groundMat = new THREE.MeshStandardMaterial({ color: 0x112211 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Bioluminescent particles
const starGeometry = new THREE.BufferGeometry();
const starCount = 500;
const starVertices = [];
for (let i = 0; i < starCount; i++) {
  const x = (Math.random() - 0.5) * 20;
  const y = Math.random() * 5 + 1;
  const z = (Math.random() - 0.5) * 20;
  starVertices.push(x, y, z);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const starMaterial = new THREE.PointsMaterial({ color: 0xaaffee, size: 0.1 });
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Placeholder: Hibiscus Flower
const hibiscus = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0xff66aa, emissive: 0xff88cc, emissiveIntensity: 0.3 })
);
hibiscus.position.set(-2, 0.5, 0);
scene.add(hibiscus);

// Placeholder: Mirror Stairway
const stairway = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 1.5, 0.1),
  new THREE.MeshStandardMaterial({ color: 0xccccff, metalness: 1.0, roughness: 0.2 })
);
stairway.position.set(2, 0.75, -1);
scene.add(stairway);

// Animate scene
function animate() {
  requestAnimationFrame(animate);
  hibiscus.rotation.y += 0.003;
  stairway.rotation.y -= 0.002;
  stars.rotation.y += 0.0005;
  controls.update();
  renderer.render(scene, camera);
}

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
