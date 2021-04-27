import * as THREE from '../libs/three.module.js'
import { ThreeBSP } from '../libs/ThreeBSP.js'
import * as TWEEN from '../libs/tween.esm.js'

class ComeCocos extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();
    var geometriaEsfera = new THREE.SphereGeometry(1.0, 25, 25);
    var geometriaBoca = new THREE.CylinderGeometry(1.0, 1.0, 2.0, 3);
    var geometriaCilindro = new THREE.CylinderGeometry(0.15, 0.15, 2.0);
    var materialEsfera = new THREE.MeshPhongMaterial( { color: 0xffff00} );

    geometriaCilindro.rotateZ(0.5 * Math.PI);
    geometriaCilindro.translate(0.0, 0.5, 0.5);

    geometriaBoca.rotateZ(0.5 * Math.PI);
    geometriaBoca.translate(0.0, -1.0, 0.5);
    geometriaBoca.rotateX(-1/6 * Math.PI)

    var esferaBSP = new ThreeBSP(geometriaEsfera);
    var cilindroBSP = new ThreeBSP(geometriaCilindro);
    var bocaBSP = new ThreeBSP(geometriaBoca)
    
    var resultadoParcial = esferaBSP.subtract(cilindroBSP);
    var resultadoFinal = resultadoParcial.subtract(bocaBSP);
    this.esfera = new THREE.Mesh(resultadoFinal.toGeometry(),materialEsfera);
    
    var recorrido = [
        new THREE.Vector3(3.0, 1.0, 0.0),
        new THREE.Vector3(3.0, 1.0, 5.0),
        new THREE.Vector3(-3.0, 1.0, 5.0),
        new THREE.Vector3(-3.0, 1.0, 0.0),
        new THREE.Vector3(-3.0, 1.0, -7.0),
        new THREE.Vector3(7.0, 1.0, -7.0),
        new THREE.Vector3(7.0, 1.0, 0.0),
        new THREE.Vector3(3.0, 1.0, 0.0)
    ];

    this.spline = new THREE.CatmullRomCurve3(recorrido);

    var geometriaLinea = new THREE.Geometry();
    geometriaLinea.vertices = this.spline.getPoints(100);
    var material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
    this.recorrido = new THREE.Line(geometriaLinea, material);
    this.add(this.recorrido);
    
    var origen1 = {p: 0.0};
    var destino1 = {p: 0.45};

    var origen2 = {p: 0.45};
    var destino2 = {p: 1.0};

    var posicion = this.spline.getPoint(origen1.p);
    this.esfera.position.copy(posicion);
    this.add(this.esfera);
    var tangente = this.spline.getTangentAt(origen1.p);
    posicion.add(tangente);
    this.esfera.lookAt(posicion);

    var bucle1 = new TWEEN.Tween(origen1).to(destino1,4000).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(()=>{
        posicion = this.spline.getPoint(origen1.p);
        this.esfera.position.copy(posicion);
        tangente = this.spline.getTangentAt(origen1.p);
        posicion.add(tangente);
        this.esfera.lookAt(posicion);
    });

    var bucle2 = new TWEEN.Tween(origen2).to(destino2,6000).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(()=>{
        posicion = this.spline.getPoint(origen2.p);
        this.esfera.position.copy(posicion);
        tangente = this.spline.getTangentAt(origen2.p);
        posicion.add(tangente);
        this.esfera.lookAt(posicion);
    }).onComplete(()=>{bucle1.start();});

    bucle1.chain(bucle2);
    bucle1.start();
  }

  update() {
    TWEEN.update();
  }
}

export { ComeCocos }