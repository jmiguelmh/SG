import * as THREE from '../libs/three.module.js'

class Diamante extends THREE.Object3D {
  constructor() {
    super();
    var shape = new THREE.Shape();

    var x = 0.0;
    var y = 0.0;

    shape.moveTo(x,y);
    shape.lineTo(x + 1.5, y + 2.25);
    shape.lineTo(x, y + 4.5);
    shape.lineTo(x - 1.5, y + 2.25);

    var options = {
        depth: 1.0, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.25, bevelThickness: 0.5,bevelSegments: 3, curveSegments: 100
    };

    var geometria = new THREE.ExtrudeGeometry(shape,options);
    var material = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
    this.diamante = new THREE.Mesh(geometria,material);
    this.add(this.diamante);
  }
}

export { Diamante }