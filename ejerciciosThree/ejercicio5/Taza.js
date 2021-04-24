import * as THREE from '../libs/three.module.js'
import { ThreeBSP } from '../libs/ThreeBSP.js'

class Taza extends THREE.Object3D {
  constructor() {
    super();
    var cilindroExterior = new THREE.CylinderGeometry(5.0, 5.0, 10.0, 50);
    var cilindroInterior = new THREE.CylinderGeometry(4.8, 4.8, 10.0, 50);
    var toro = new THREE.TorusGeometry(3.0, 0.5, 50, 50);

    cilindroInterior.translate(0.0, 1.0, 0.0);
    toro.translate(5.5, 0.0, 0.0)

    var cilindroExteriorBSP = new ThreeBSP(cilindroExterior);
    var cilindroInteriorBSP = new ThreeBSP(cilindroInterior);
    var toroBSP = new ThreeBSP(toro);

    var resultadoParcial = cilindroExteriorBSP.union(toroBSP);
    var resultadoFinal = resultadoParcial.subtract(cilindroInteriorBSP);
    var material = new THREE.MeshNormalMaterial();
    this.taza = new THREE.Mesh(resultadoFinal.toGeometry(),material);
    this.add(this.taza);
  }

  update() {
      this.taza.rotation.x += 0.01;
      this.taza.rotation.y += 0.01;
  }
}

export { Taza }