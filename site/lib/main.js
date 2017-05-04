"use strict";

class Game {
    constructor() {
        this.WIDTH = 1024;
        this.HEIGHT = 768;

        this.lastTime = 0;
        this.renderer = new THREE.WebGLRenderer();

        var c = document.getElementById("gameCanvas");
    
        this.renderer.setSize(this.WIDTH, this.HEIGHT);
        c.appendChild(this.renderer.domElement);

        var VIEW_ANGLE = 50,
            ASPECT = this.WIDTH / this.HEIGHT,
            NEAR = 0.1,
            FAR = 100000000;

        this.camera = new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR
        );

        this.scene = new THREE.Scene();

        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        var cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);

        this.gameObjects = new Array();
        this.gameObjects["viewport"] = new Viewport(this.scene, this.camera, new THREE.Vector3(0, 0, 10));
        this.gameObjects["diag"] = new Diagnostics(c);

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

let game;

function main() {
    game = new Game();
    draw();
}

function draw() {
    game.draw();
    requestAnimationFrame(draw);
}