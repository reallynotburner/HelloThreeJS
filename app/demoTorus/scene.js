const THREE = require('three');
import light from './lights';
import camera from './camera';
import object from './objects';

let renderer;

let state = {
    width: 0,
    height: 0,
    aspectRatio: 1.0,
    fullscreen: false
};

function reducer(action, item) {
    switch (action) {
        case 'updateWindow':
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
    reducer('updateWindow', window);
    
    renderer.setSize( innerWidth, innerHeight );
    camera.aspect = state.aspectRatio;
    camera.updateProjectionMatrix();
    renderer.setSize(state.width, state.height);
}

function canvasClickHandler(evt) {
   !state.fullscreen && evt.target.requestFullscreen();
   state.fullscreen = !state.fullscreen;
}

function demo () {
    reducer('updateWindow', window);

    var scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();  // todo separate concern!
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );


    scene.add( object );
    scene.add( light );

    window.addEventListener('resize', canvasResizeEventHandler);
    renderer.domElement.onclick = canvasClickHandler;

    var animate = function () {
        requestAnimationFrame( animate );

        object.rotation.x += 0.02;
        object.rotation.y += 0.02;
        object.rotation.z += 0.02;

        renderer.render( scene, camera );
    };
    animate();    
}

export default demo;