import * as THREE from '../libs/three.module.js'

class Corazon extends THREE.Object3D {
  constructor() {
    super();

    var shape = new THREE.Shape();

    var x = 0.0;
    var y = 0.0;
    
    shape.moveTo(x,y);
    shape.bezierCurveTo(x + 0.5, y + 2.0, x + 2.0, y + 1.0, x + 2.5, y + 3.0);
    shape.bezierCurveTo(x + 2.5, y + 4.5, x, y + 4.5, x, y + 3.0);
    shape.bezierCurveTo(x, y + 4.5, x - 2.5, y + 4.5, x - 2.5, y + 3.0);
    shape.bezierCurveTo(x - 2.0, y + 1.0, x - 0.5, y + 2.0, x, y);

    var options = {
      depth: 1.0, bevelEnabled: false, bevelSegments: 2, steps: 1, bevelSize: 0.25, bevelThickness: 0.5,bevelSegments: 3, curveSegments: 100
    };

    var geometry = new THREE.ExtrudeGeometry( shape, options );

    //var texture = new THREE.TextureLoader().load('../imgs/marmol-blanco.jpg');
    //var corazonMat = new THREE.MeshPhongMaterial ({map: texture});
    var corazonMat = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
    corazonMat.side =  THREE.DoubleSide;

    this.corazon = new THREE.Mesh( geometry, corazonMat );
    this.corazon.position.z = 0.5;
    this.add( this.corazon);
  }
}

export { Corazon }