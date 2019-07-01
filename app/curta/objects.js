const THREE = require('three');
const objects = [];

let geometry = new THREE.TorusGeometry( 1, .2, 16, 32, Math.PI*2 );
let material = new THREE.MeshPhongMaterial({ color: 0x00ff00 }); // todo: textures should have their own place.  Perhaps a core concern
let torus = new THREE.Mesh( geometry, material );

geometry = new THREE.TorusGeometry( .3, .03, 16, 32, Math.PI*1.33 );
material = new THREE.MeshPhongMaterial({ color: 0x00ffff }); // todo: textures should have their own place.  Perhaps a core concern
let torus2 = new THREE.Mesh( geometry, material );
torus2.position.set(1.5, .75, .4);
torus2.rotation.x = Math.PI/2;
// torus2.rotation.x = Math.PI;

let group = new THREE.Group();
group.add(torus);
group.add(torus2);


// objects.push(torus);
// objects.push(torus2);

export default group;