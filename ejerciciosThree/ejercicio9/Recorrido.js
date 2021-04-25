import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

class Recorrido extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();

    var geometriaCono = new THREE.ConeGeometry(1.0,2.0,3);
    var textura = new THREE.TextureLoader().load('../imgs/textura-ajedrezada.jpg');
    var material = new THREE.MeshPhongMaterial( { map: textura } );
    this.cono = new THREE.Mesh(geometriaCono, material);
    this.cono.rotateX(0.5 * Math.PI);
    this.nave = new THREE.Object3D;
    this.nave.add(this.cono);

    this.spline = new THREE.CatmullRomCurve3( [
        new THREE.Vector3(5.0, -5.0, 0.0),
        new THREE.Vector3(5.0, -5.0, -5.0),
        new THREE.Vector3(0.0, 5.0, -5.0),
        new THREE.Vector3(-5.0, -5.0, -5.0),
        new THREE.Vector3(-5.0, -5.0, 5.0),
        new THREE.Vector3(0.0, 5.0, 5.0),
        new THREE.Vector3(5.0, -5.0, 5.0),
        new THREE.Vector3(5.0, -5.0, 0.0)
    ] );

    var geometriaLinea = new THREE.Geometry();
    geometriaLinea.vertices = this.spline.getPoints(100);
    var material = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
    this.recorrido = new THREE.Line(geometriaLinea, material);
    this.add(this.recorrido);

    var origen1 = {p: 0.0};
    var destino1 = {p: 0.28};

    var origen2 = {p: 0.28};
    var destino2 = {p: 0.715};

    var origen3 = {p: 0.715};
    var destino3 = {p: 1.0};

    var posicion = this.spline.getPoint(origen1.p);
    this.nave.position.copy(posicion);
    this.add(this.nave);
    var tangente = this.spline.getTangentAt(origen1.p);
    posicion.add(tangente);
    this.nave.lookAt(posicion);

    var bucle1 = new TWEEN.Tween(origen1).to(destino1,1000).easing(TWEEN.Easing.Quadratic.Out).onUpdate(()=>{
        posicion = this.spline.getPoint(origen1.p);
        this.nave.position.copy(posicion);
        tangente = this.spline.getTangentAt(origen1.p);
        posicion.add(tangente);
        this.nave.lookAt(posicion);
    });

    var bucle2 = new TWEEN.Tween(origen2).to(destino2,2000).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(()=>{
        posicion = this.spline.getPoint(origen2.p);
        this.nave.position.copy(posicion);
        tangente = this.spline.getTangentAt(origen2.p);
        posicion.add(tangente);
        this.nave.lookAt(posicion);
    });

    var bucle3 = new TWEEN.Tween(origen3).to(destino3,1000).easing(TWEEN.Easing.Quadratic.In).onUpdate(()=>{
        posicion = this.spline.getPoint(origen3.p);
        this.nave.position.copy(posicion);
        tangente = this.spline.getTangentAt(origen3.p);
        posicion.add(tangente);
        this.nave.lookAt(posicion);
    }).onComplete(()=>{bucle1.start();});

    bucle1.chain(bucle2);
    bucle2.chain(bucle3);
    bucle1.start();

  }

  update() {
    TWEEN.update();
  }
}

export { Recorrido }