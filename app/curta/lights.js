const THREE = require('three');
// ( color, intensity, distance, decay 
const light = new THREE.PointLight(0xFFFFFF, 1.5, 1000, 1);

light.position.x = 300;
light.position.y = 300;
light.position.z = 300;

export default light;