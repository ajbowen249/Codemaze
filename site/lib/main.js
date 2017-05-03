function init() {
	lastTime = 0;

	var c = document.getElementById("gameCanvas");

	var WIDTH = 1024;
	var HEIGHT = 768;

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(WIDTH, HEIGHT);
	c.appendChild(renderer.domElement);

	var VIEW_ANGLE = 50,
		ASPECT = WIDTH / HEIGHT,
		NEAR = 0.1,
		FAR = 100000000;

	camera = new THREE.PerspectiveCamera(
		VIEW_ANGLE,
		ASPECT,
		NEAR,
		FAR
	);

	scene = new THREE.Scene();

	var geometry = new THREE.BoxGeometry(1, 1, 1);
	var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	var cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	gameObjects = new Array();
	gameObjects["viewport"] = new Viewport(scene, camera, new THREE.Vector3(0, 0, 10));
	gameObjects["diag"] = new Diagnostics(c);

	clock = new THREE.Clock();
}

function draw() {
	time = clock.getElapsedTime();
	delta = time - lastTime;
	lastTime = time;

	for (obj in gameObjects) {
		gameObjects[obj].process(time, delta);
	}

	scene.updateMatrixWorld();

	renderer.render(scene, camera);
	requestAnimationFrame(draw);
}

function main() {
	init();
	draw();
}
