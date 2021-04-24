import * as THREE from '../libs/three.module.js'
import { ThreeBSP } from '../libs/ThreeBSP.js'

class Tuerca extends THREE.Object3D {
  constructor() {
    super();
    var prismaHexagonal = new THREE.CylinderGeometry(5.0, 5.0, 3.0, 6);
    var esferaInterseccion = new THREE.SphereGeometry(5.05, 50, 50);
    var cilindroInterior = new THREE.CylinderGeometry(2.75, 2.75, 3.0, 50);
    
    prismaHexagonal.translate(0.0, 0.0, 0.0);
    esferaInterseccion.translate(0.0, 0.0, 0.0);
    cilindroInterior.translate(0.0, 0.0, 0.0);

    var prismaHexagonalBSP = new ThreeBSP(prismaHexagonal);
    var esferaInterseccionBSP = new ThreeBSP(esferaInterseccion);
    var cilindroInteriorBSP = new ThreeBSP(cilindroInterior);

    var resultadoParcial1 = prismaHexagonalBSP.intersect(esferaInterseccionBSP);
    var resultadoParcial2 = resultadoParcial1.subtract(cilindroInteriorBSP);
    var resultadoFinal = resultadoParcial2;

    for(var i = 0; i < 10; i++) {
        var cilindroRosca = new THREE.CylinderGeometry(3.0, 3.0, 0.15, 50);
        cilindroRosca.translate(0.0, 0.3 * i - 1.5, 0.0);
        var cilindroRoscaBSP = new ThreeBSP(cilindroRosca);
        resultadoFinal = resultadoFinal.subtract(cilindroRoscaBSP);
    }

    var material = new THREE.MeshNormalMaterial();
    this.tuerca = new THREE.Mesh(resultadoFinal.toGeometry(),material);
    this.add(this.tuerca);
  }

  update() {
    this.tuerca.rotation.x += 0.01;
    this.tuerca.rotation.y += 0.01;
}
}

export { Tuerca }