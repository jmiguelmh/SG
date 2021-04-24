import * as THREE from '../libs/three.module.js'

class Trebol extends THREE.Object3D {
  constructor() {
    super();

    var circuloArriba = this.crearCirculo(0.0, 3.0, 1.0);
    var circuloAbajoIzquierda = this.crearCirculo(-0.75, 1.75, 1.0);
    var circuloAbajoDerecha = this.crearCirculo(0.75, 1.75, 1.0);
    this.add(circuloArriba);
    this.add(circuloAbajoIzquierda);
    this.add(circuloAbajoDerecha);

    var base = new THREE.Shape();

    var x = 0.0;
    var y = 0.0;
    
    base.lineTo(x + 0.25, y);
    base.bezierCurveTo(x, y, x + 0.1, y + 1.5, x + 0.05, y + 1.5);
    base.lineTo(x - 0.05, y + 1.5);
    base.bezierCurveTo(x - 0.1, y + 1.5, x, y, x - 0.25, y);
    

    var options = {
      depth: 1.0, bevelEnabled: false, bevelSegments: 2, steps: 1, bevelSize: 0.25, bevelThickness: 0.5,bevelSegments: 3, curveSegments: 100
    };

    var geometry = new THREE.ExtrudeGeometry( base, options );

    //var texture = new THREE.TextureLoader().load('../imgs/marmol-blanco.jpg');
    //var trebolMat = new THREE.MeshPhongMaterial ({map: texture});
    var trebolMat = new THREE.MeshPhongMaterial( { color: 0x0000ff } );
    trebolMat.side =  THREE.DoubleSide;

    this.trebol = new THREE.Mesh( geometry, trebolMat ) ;

    this.add( this.trebol);
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

export { Trebol }