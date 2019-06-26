const THREE = require('three');

function DemoTorus() {
    return new THREE.TorusGeometry( 1, .2, 16, 32, Math.PI*2 );;
}

export default DemoTorus;