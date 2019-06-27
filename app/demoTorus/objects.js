const THREE = require('three');

const geometry = new THREE.TorusGeometry( 1, .2, 16, 32, Math.PI*2 );
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 }); // todo: textures should have their own place.  Perhaps a core concern
const objects = new THREE.Mesh( geometry, material );

export default objects;