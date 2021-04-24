import * as THREE from '../libs/three.module.js'
import { ThreeBSP } from '../libs/ThreeBSP.js'

class Escuadra extends THREE.Object3D {
  constructor() {
    super();
    var cajaEscuadra = new THREE.BoxGeometry(10.0, 10.0, 2.0);
    var cajaRecorteAbajo = new THREE.BoxGeometry(10.0, 7.0, 2.0);
    var cajaRecorteArriba = new THREE.BoxGeometry(10.0, 9.0, 2.0);
    var cilindroRecorteEsquina = new THREE.CylinderGeometry(2.0, 2.0, 2.0, 50);
    var cilindroRecorteArriba1 = new THREE.CylinderGeometry(0.25, 0.5, 1.0, 50);
    var cilindroRecorteArriba2 = new THREE.CylinderGeometry(0.25, 0.5, 1.0, 50);
    var cilindroRecorteAbajo1 = new THREE.CylinderGeometry(0.25, 0.5, 1.0, 50);
    var cilindroRecorteAbajo2 = new THREE.CylinderGeometry(0.25, 0.5, 1.0, 50);

    cajaEscuadra.translate(0.0, 0.0, 0.0);
    cajaRecorteAbajo.translate(1.0, -1.5, 0.0);
    cajaRecorteArriba.translate(3.0, -0.5, 0.0);
    cilindroRecorteEsquina.rotateX(0.5 * Math.PI);
    cilindroRecorteEsquina.translate(-2.0, 2.0, 0.0);
    cilindroRecorteArriba1.translate(3.0, 4.5, 0.0);
    cilindroRecorteArriba2.translate(-1.0, 4.5, 0.0);
    cilindroRecorteAbajo1.rotateZ(0.5 * Math.PI);
    cilindroRecorteAbajo1.translate(-4.5, 1.0, 0.0);
    cilindroRecorteAbajo2.rotateZ(0.5 * Math.PI);
    cilindroRecorteAbajo2.translate(-4.5, -3.0, 0.0);

    var cajaEscuadraBSP = new ThreeBSP(cajaEscuadra);
    var cajaRecorteAbajoBSP = new ThreeBSP(cajaRecorteAbajo);
    var cajaRecorteArribaBSP = new ThreeBSP(cajaRecorteArriba);
    var cilindroRecorteEsquinaBSP = new ThreeBSP(cilindroRecorteEsquina);
    var cilindroRecorteArriba1BSP = new ThreeBSP(cilindroRecorteArriba1);
    var cilindroRecorteArriba2BSP = new ThreeBSP(cilindroRecorteArriba2);
    var cilindroRecorteAbajo1BSP = new ThreeBSP(cilindroRecorteAbajo1);
    var cilindroRecorteAbajo2BSP = new ThreeBSP(cilindroRecorteAbajo2);

    var resultadoParcial1 = cajaEscuadraBSP.subtract(cajaRecorteAbajoBSP);
    var resultadoParcial2 = resultadoParcial1.subtract(cajaRecorteArribaBSP);
    var resultadoParcial3 = resultadoParcial2.subtract(cilindroRecorteEsquinaBSP);
    var resultadoParcial4 = resultadoParcial3.subtract(cilindroRecorteArriba1BSP);
    var resultadoParcial5 = resultadoParcial4.subtract(cilindroRecorteArriba2BSP);
    var resultadoParcial6 = resultadoParcial5.subtract(cilindroRecorteAbajo1BSP);
    var resultadoFinal = resultadoParcial6.subtract(cilindroRecorteAbajo2BSP);

    var material = new THREE.MeshNormalMaterial();
    this.escuadra = new THREE.Mesh(resultadoFinal.toGeometry(),material);
    this.add(this.escuadra);
    
  }

  update() {
    this.escuadra.rotation.x += 0.01;
    this.escuadra.rotation.y += 0.01;
    }
}

export { Escuadra }