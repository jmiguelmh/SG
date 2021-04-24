import * as THREE from '../libs/three.module.js'

class Pica extends THREE.Object3D {
  constructor() {
    super();

    var circuloAbajoIzquierda = this.crearCirculo(-0.75, 1.75, 1.0);
    var circuloAbajoDerecha = this.crearCirculo(0.75, 1.75, 1.0);
    this.add(circuloAbajoIzquierda);
    this.add(circuloAbajoDerecha);

    var base = new THREE.Shape();

    var x = 0.0;
    var y = 0.0;
    
    base.moveTo(x, y);
    base.lineTo(x + 0.25, y);
    base.bezierCurveTo(x, y, x + 0.1, y + 1.5, x + 0.05, y + 1.5);
    base.lineTo(x - 0.05, y + 1.5);
    base.bezierCurveTo(x - 0.1, y + 1.5, x, y, x - 0.25, y);
    
    var punta = new THREE.Shape();
    punta.moveTo(x + 0.75, y + 1.5);
    punta.lineTo(x + 0.825, y + 2.75);
    punta.bezierCurveTo(x + 0.75, y + 2.8, x + 0.25, y + 3.0, x, y + 4.5);
    punta.bezierCurveTo(x - 0.25, y + 3.0, x - 0.75, y + 2.8, x - 0.825, y + 2.75);
    punta.lineTo(x - 0.75, y + 2.75);

    var options = {
      depth: 1.0, bevelEnabled: false, bevelSegments: 2, steps: 1, bevelSize: 0.25, bevelThickness: 0.5,bevelSegments: 3, curveSegments: 100
    };

    var geometriaBase = new THREE.ExtrudeGeometry( base, options );
    var geometriaPunta = new THREE.ExtrudeGeometry( punta, options );
    var material = new THREE.MeshPhongMaterial( { color: 0x0000ff } );
    this.basePica = new THREE.Mesh(geometriaBase,material);
    this.puntaPica = new THREE.Mesh(geometriaPunta,material);
    this.add(this.basePica);
    this.add(this.puntaPica);
    
  }

  crearCirculo(posicionX, posicionY, radio) {
    var shape = new THREE.Shape();
    shape.absarc(posicionX, posicionY, radio, 0, 2 * Math.PI);

    var options = {
        steps: 1, depth: 1.0, bevelEnabled: false, curveSegments: 100
    };

    var geometria = new THREE.ExtrudeGeometry(shape,options);
    var material = new THREE.MeshPhongMaterial( { color: 0x0000ff } );
    var circulo = new THREE.Mesh(geometria,material);
    return circulo;
  }
}

export { Pica }