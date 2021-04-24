import * as THREE from '../libs/three.module.js'

class ColumnaCorazon extends THREE.Object3D {
  constructor() {
    super();
    
    var shape = new THREE.Shape();
    var x = 0.0;
    var y = 0.0;
    var z = 0.0;
    
    shape.moveTo(x,y);
    shape.bezierCurveTo(x + 0.5, y + 2.0, x + 2.0, y + 1.0, x + 2.5, y + 3.0);
    shape.bezierCurveTo(x + 2.5, y + 4.5, x, y + 4.5, x, y + 3.0);
    shape.bezierCurveTo(x, y + 4.5, x - 2.5, y + 4.5, x - 2.5, y + 3.0);
    shape.bezierCurveTo(x - 2.0, y + 1.0, x - 0.5, y + 2.0, x, y);

    var path = new THREE.CatmullRomCurve3( [
        new THREE.Vector3(x, y, z),
        new THREE.Vector3(x - 2.5, y + 2.5, z),
        new THREE.Vector3(x - 2.5, y + 5.0, z + 2.5),
        new THREE.Vector3(x, y + 7.5, z + 0.25),
        new THREE.Vector3(x, y + 11.0, z)
    ] );

    var options = {
        steps: 50, curveSegments: 100, extrudePath: path
    }

    var geometria = new THREE.ExtrudeGeometry(shape,options);
    var material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
    this.columnaCorazon = new THREE.Mesh(geometria, material);
    this.columnaCorazon.scale.set(0.5,1,0.5);
    this.add(this.columnaCorazon);
  }
}

export { ColumnaCorazon }