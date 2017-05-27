"use strict";

class Player {
    constructor(graphicsTemplate, scene, physics) {
        this.graphics = graphicsTemplate.clone();
        scene.add(this.graphics);
        this.position = this.graphics.position;
        this.physics = physics;
    }

    process(time, delta) {
        this.physics.transformWithVector(this.position, new THREE.Vector3(-.5, 10, 0.5), 10, delta);
    }
}