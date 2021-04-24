import * as THREE from '../libs/three.module.js'

class ColumnaTrebol extends THREE.Object3D {
  constructor() {
    super();
    
    var x = 0.0;
    var y = 0.0;
    var z = 0.0;

    var trebol = new THREE.Shape();

    trebol.moveTo( x, y + 1.25 );
    trebol.bezierCurveTo( x, y + 1.25, x - 0.5, x, y - 1.25);
    trebol.bezierCurveTo( x - 2.75, y, x - 2.75, y + 1.5, x - 2.75, y + 1.0);

    trebol.bezierCurveTo( x - 2.75, y + 2.5, x - 1.25, y + 2.5, x - 0.75, y + 2.5);
    trebol.bezierCurveTo( x - 0.75, y + 2.5, x - 1.25, y + 1.5, x - 1.25, y + 2.5);
    trebol.bezierCurveTo( x - 1.75, y + 3.5, x - 1.75, y + 4.5, x, y + 4.75);
    trebol.bezierCurveTo( x + 1.75, y + 4.5, x + 1.75, y + 3.5, x + 1.25, y + 2.5);

    trebol.bezierCurveTo( x + 1.25, y + 2.5, x + 2.75, y + 2.5, x + 2.75, y + 1.0);
    trebol.bezierCurveTo( x + 2.75, y + 1.0, x + 2.75, y, x + 1.25, y);
    trebol.bezierCurveTo( x + 0.5, y, x, y + 1.25, x, y + 1.25);

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

    var geometria = new THREE.ExtrudeGeometry(trebol,options);
    var material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
    this.columnaCorazon = new THREE.Mesh(geometria, material);
    this.columnaCorazon.scale.set(0.5,1,0.5);
    this.add(this.columnaCorazon);
  }
}

export { ColumnaTrebol }