// Variables
let scene, camera, renderer;

// Initialization
init();

function init() {
  // Create a scene
  scene = new THREE.Scene();

  // Create a camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Create a renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('canvas').appendChild(renderer.domElement);

  // Add lights
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  // Event listener for file input change
  const modelInput = document.getElementById('modelInput');
  modelInput.addEventListener('change', handleModelUpload, false);
}

function handleModelUpload(event) {
  const modelInput = event.target;
  const file = modelInput.files[0];

  const reader = new FileReader();
  reader.addEventListener('load', function (event) {
    const result = event.target.result;

    // Load and render the 3D model using the FBXLoader
    const loader = new THREE.FBXLoader();
    loader.load(result, function (object) {
      scene.add(object);
    });
  });

  reader.readAsDataURL(file);
}

// Render loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the model (example)
  if (scene.children.length > 0) {
    const model = scene.children[0];
    model.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}

animate();
