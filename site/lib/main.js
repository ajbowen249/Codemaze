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

        var modelLoader = new THREE.JSONLoader();
        var textureLoader = new THREE.TextureLoader();
        modelLoader.load('/assets/characters/ghost/ghost.json', function (geometry, materials) {
            textureLoader.load('/assets/characters/ghost/ghost.png', function (texture) {
                var mesh = new THREE.Mesh(geometry, [
                        new THREE.MeshLambertMaterial({
                        map: texture,
                        morphTargets: true
                    }), 
                    materials
                ]);

                thisScene.add(mesh);
            });
        });

        this.scene.add(new THREE.AmbientLight(0xffffff));

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