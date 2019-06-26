const THREE = require('three');
import DemoTorus from './DemoTorus';

let state = {
    width: 0,
    height: 0,
    aspectRatio: 1.0,
    fullscreen: false
};

function reducer(action, item) {
    switch (action) {
        case 'update':
            const elem = item;
            state = {
                width: elem.innerWidth,
                height: elem.innerHeight,
                aspectRatio: elem.innerWidth/elem.innerHeight
            };
            break;
        default:
            break;
    }
}

function demo () {
    reducer('udpate', window);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, state.aspectRatio, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    var geometry = DemoTorus();
    var geometry2 = DemoTorus();

    var light = new THREE.PointLight(0xFFFFFF);
    light.position.x = 10;
    light.position.y = 10;
    light.position.z = 10;
    
    var material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );


    scene.add( cube );
    scene.add( light );

    camera.position.z = 5;

    function canvasResizeEventHandler(evt) {
        reducer('update', window);
        
        renderer.setSize( innerWidth, innerHeight );
        camera.aspect = state.aspectRatio;
        camera.updateProjectionMatrix();
        renderer.setSize(state.width, state.height);
    }


    function canvasClickHandler(evt) {
       !state.fullscreen && evt.target.requestFullscreen();
       state.fullscreen = !state.fullscreen;
    }
    window.addEventListener('resize', canvasResizeEventHandler);
    renderer.domElement.onclick = canvasClickHandler;

    var animate = function () {
        requestAnimationFrame( animate );

        cube.rotation.x += 0.02;
        cube.rotation.y += 0.02;
        cube.rotation.z += 0.02;

        renderer.render( scene, camera );
    };
    animate();

    function printObj(obj) {
        let prop = '';
        let res = [];
        for (prop in obj) {
            if(obj.hasOwnProperty(prop)){
                res.push(obj);
            }
        }
        return res;
    }

    console.log(THREE);
    
}

export default demo;