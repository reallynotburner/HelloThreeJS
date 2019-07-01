import * as THREE from 'three';
import light from './lights';
import camera from './camera';
import STLLoader from '../lib/STLLoader';

let globalMesh;
let renderer;
let state = {
    width: 0,
    height: 0,
    aspectRatio: 1.0,
    fullscreen: false
};

function reducer(action, item) {
    switch (action) {
        case 'resize':
            const elem = item;
            state = {
                ...state,
                width: elem.innerWidth,
                height: elem.innerHeight,
                aspectRatio: elem.innerWidth/elem.innerHeight
            };
            break;
        default:
            break;
    }
}

function canvasResizeEventHandler(evt) {
    reducer('resize', window);
    
    renderer.setSize( innerWidth, innerHeight );
    camera.aspect = state.aspectRatio;
    camera.updateProjectionMatrix();
    renderer.setSize(state.width, state.height);
}

function myload(source, scene) {
    return new Promise((resolve, reject) => {
        var loader = new STLLoader();
        loader.load( source, function ( geometry ) {
            let material = new THREE.MeshPhongMaterial({ color: 0x00ff00 }); // todo: textures should have their own place.  Perhaps a core concern
            var mesh = new THREE.Mesh( geometry, material );
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            globalMesh = mesh;
            scene.add( mesh );
            resolve();
        } );
    });
}

function curtaDemo () {
    reducer('resize', window);

    var scene = new THREE.Scene();
    scene.add(light);
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });  // todo separate concern!
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

    window.addEventListener('resize', canvasResizeEventHandler);

    var animate = function () {
        requestAnimationFrame( animate );
        globalMesh.rotation.y += .01;
        renderer.render( scene, camera );
    };

    myload('stl/Lower_Housing.stl', scene)
        .then(animate);
}

camera.position.z = 200;

export default curtaDemo;