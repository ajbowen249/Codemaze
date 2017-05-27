"use strict";

class SimplePhysics {
    constructor(worldMax, worldMin) {
        this.worldMax = worldMax;
        this.worldMin = worldMin;
    }

    transformWithVector(position, vector, velocityCap, time) {
        let finalPos = position.clone();
        let delta = vector.clone();
        let velocity = delta.length();

        if(Math.abs(velocity) > velocityCap) {
            delta.normalize();
            delta.multiplyScalar(velocityCap);
        }

        delta.multiplyScalar(time);
        finalPos.add(delta);
        
        position.set(
            this.restrict(finalPos.x, this.worldMin.x, this.worldMax.x),
            this.restrict(finalPos.y, this.worldMin.y, this.worldMax.y),
            this.restrict(finalPos.z, this.worldMin.z, this.worldMax.z)
        );
    }

    restrict(value, min, max) {
        return value > max ? max : (value < min ? min : value);
    }
}