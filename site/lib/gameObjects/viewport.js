"use strict";

class Viewport {
    constructor(scene, camera, initPosition) {
        var geom = new THREE.BoxGeometry(.1, .1, 10);
        var material = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
        
        this.mesh = new THREE.Mesh(new THREE.Geometry(), material);
        camera.translateY(1);
        camera.rotateY(Math.PI);
        this.mesh.add(camera);
        this.mesh.rotateY(Math.PI);

        this.mesh.position.x = initPosition.x;
        this.mesh.position.y = initPosition.y;
        this.mesh.position.z = initPosition.z;

        scene.add(this.mesh);
    }

    process(time, delta) {
        //do nothing yet...
    }
}