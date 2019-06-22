const THREE = require('three');
const cameraHelper = require('cameraHelper');
let state = {
    initialWidth: 0,
    initialHeight: 0,
    initialAspectRatio: 1.0,
    fullscreen: false
};

function reducer(action, item) {
    switch (action) {
        case 'init':
            const elem = item;
            state = {
                initialWidth: elem.innerWidth,
                initialHeight: elem.innerHeight,
                initialAspectRatio: elem.innerWidth/elem.innerHeight
            };
            break;
        default:
            break;
    }
}

function demo () {
    reducer('init', window);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, state.initialAspectRatio, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    renderer.domElement.id = "myRenderer";

    var rendererDomElement = document.getElementById('myRenderer');
    // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // var geometry = new THREE.CylinderGeometry( 1, .1, 2, 32  );
    // var geometry = new THREE.DodecahedronGeometry( 1 );
    // var geometry = new THREE.CircleBufferGeometry( 1, 32, 0, Math.PI );
    // RingBufferGeometry: ƒ ( innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength )
    // var geometry = new THREE.RingBufferGeometry( 1, 1.5, 16, 4, 0, Math.PI );
    // TorusGeometry: ƒ ( radius, tube, radialSegments, tubularSegments, arc )
    // var geometry = new THREE.TorusGeometry( 1, .2, 16, 32, Math.PI*2 );
    var geometry = new THREE.TorusGeometry( 1, .2, 16, 32, Math.PI*2 );

    var light = new THREE.PointLight(0xFFFFFF);
    light.position.x = 10;
    light.position.y = 10;
    light.position.z = 10;
    
    // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    scene.add( light );

    camera.position.z = 5;

    function canvasResizeEventHandler(evt) {
        const { innerWidth, innerHeight } = evt.target;
        const xScale = innerWidth / state.initialWidth;
        const yScale = innerHeight / state.initialHeight;
        
        renderer.setSize( innerWidth, innerHeight );
        camera.scale.x = xScale;
        camera.scale.y = yScale;
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