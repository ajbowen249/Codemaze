"use strict";

class Main {
    constructor() {
        this.width = 1024;
        this.height = 768;

        this.lastTime = 0;
        this.renderer = new THREE.WebGLRenderer();

        var canvas = document.getElementById("gameCanvas");

        this.renderer.setSize(this.width, this.height);
        canvas.appendChild(this.renderer.domElement);

        var viewAngle = 50,
            aspectRatio = this.width / this.height,
            nearClip = 0.1,
            drawDistance = 1000;

        this.camera = new THREE.PerspectiveCamera(
            viewAngle,
            aspectRatio,
            nearClip,
            drawDistance
        );

        this.scene = new THREE.Scene();

        let thisScene = this.scene;

        loadCharacters(function (loaded, total) { }, function (loadedCharacters) {
            let testGhost = loadedCharacters['ghost'];
            testGhost.translateX(4.5);
            testGhost.rotateY(-1 * Math.PI / 3.5);
            thisScene.add(testGhost);
            thisScene.add(loadedCharacters['sphere']);

            let light = new THREE.DirectionalLight(0xffffff, 2);
            light.target = testGhost;
            thisScene.add(light);
            thisScene.add(new THREE.AmbientLight(0xffffff, 1));
        });

        this.gameObjects = new Array();
        this.gameObjects["viewport"] = new Viewport(this.scene, this.camera, new THREE.Vector3(0, 0, 10));
        this.gameObjects["diag"] = new Diagnostics(canvas);

        this.clock = new THREE.Clock();
    }

    draw() {
        var time = this.clock.getElapsedTime();
        var delta = time - this.lastTime;
        this.lastTime = time;

        for (var obj in this.gameObjects) {
            this.gameObjects[obj].process(time, delta);
        }

        this.scene.updateMatrixWorld();

        this.renderer.render(this.scene, this.camera);
    }
}

let mainObj;

function main() {
    mainObj = new Main();
    draw();
}

function draw() {
    mainObj.draw();
    requestAnimationFrame(draw);
}