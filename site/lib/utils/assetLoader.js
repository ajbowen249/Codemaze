"use strict";

class AssetLoader {
    constructor(keyes, loaderFunc) {
        this.keyes = keyes;
        this.loaderFunc = loaderFunc;
        this.assets = [];
        this.numLoaded = 0;
        this.loadTotal = keyes.length;
    }

    startLoad(progressCallback, finishedCallback) {
        let thiz = this;
        for (var i = 0; i < thiz.loadTotal; i++) {
            let assetKey = thiz.keyes[i];
            thiz.loaderFunc(assetKey, function (asset) {
                thiz.assets[assetKey] = asset;
                thiz.numLoaded++;

                progressCallback(thiz.numLoaded, thiz.loadTotal);
                if (thiz.numLoaded == thiz.loadTotal) {
                    finishedCallback();
                }
            });
        }
    }
}

function loadCharacters(progressCallback, finishedCallback) {
    let characters = [
        'ghost',
        'sphere',
    ];

    let charactersBasePath = '/assets/characters';
    var modelLoader = new THREE.JSONLoader();
    var textureLoader = new THREE.TextureLoader();

    let loader = new AssetLoader(characters, function (key, callback) {
        let modelPath = `${charactersBasePath}/${key}/${key}.json`;
        let texturePath = `${charactersBasePath}/${key}/${key}.png`;

        modelLoader.load(modelPath, function (geometry, materials) {
            textureLoader.load(texturePath, function (texture) {
                var mesh = new THREE.Mesh(geometry, [
                    new THREE.MeshLambertMaterial({
                        map: texture,
                        morphTargets: true
                    }),
                    materials
                ]);

                callback(mesh);
            });
        });
    });

    loader.startLoad(progressCallback, function(loadedCharacters){
        finishedCallback(loader.assets);
    });
}
