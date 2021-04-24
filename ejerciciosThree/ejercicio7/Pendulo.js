import * as THREE from '../libs/three.module.js'

class Pendulo extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();

    this.createGUI(gui, titleGui);

    this.primerPendulo = this.createPrimerPendulo();
    this.segundoPendulo = this.createSegundoPendulo();

    this.add(this.primerPendulo);
    this.add(this.segundoPendulo);
  }

  createPrimerPendulo() {
    var pendulo = new THREE.Object3D;
    var geometriaCajaVerde = new THREE.BoxGeometry(4.0, 4.0, 2.0);
    var geometriaCajaRoja = new THREE.BoxGeometry(4.0, 8.0, 2.0);
    var geometriaCilindro = new THREE.CylinderGeometry(1.0, 1.0, 3.0, 25, 25);
    var materialVerde = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
    var materialRojo = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
    var materialGris = new THREE.MeshPhongMaterial( { color: 0x808080 } );

    pendulo.cajaArriba = new THREE.Mesh(geometriaCajaVerde, materialVerde);
    pendulo.cajaCentro = new THREE.Mesh(geometriaCajaRoja, materialRojo);
    pendulo.cajaAbajo = new THREE.Mesh(geometriaCajaVerde, materialVerde);

    pendulo.eje = new THREE.Mesh(geometriaCilindro, materialGris);

    pendulo.cajaCentro.position.set(0.0, -6.0, 0.0);
    pendulo.cajaAbajo.position.set(0.0, -12.0, 0.0);
    pendulo.eje.rotateX(0.5 * Math.PI);
    
    pendulo.add(pendulo.cajaArriba);
    pendulo.add(pendulo.cajaCentro);
    pendulo.add(pendulo.cajaAbajo);
    pendulo.add(pendulo.eje);

    return pendulo;
  }

  createSegundoPendulo() {
    var pendulo = new THREE.Object3D;
    var geometriaCaja = new THREE.BoxGeometry(3.0, 12.0, 1.0);
    var geometriaCilindro = new THREE.CylinderGeometry(0.5, 0.5, 2.0, 25, 25);
    var materialAzul = new THREE.MeshPhongMaterial( { color: 0x0000ff } );
    var materialGris = new THREE.MeshPhongMaterial( { color: 0x808080 } );

    pendulo.caja = new THREE.Mesh(geometriaCaja,materialAzul);
    pendulo.eje = new THREE.Mesh(geometriaCilindro,materialGris);
    
    pendulo.caja.position.set(0.0, -8.0, 1.5);
    pendulo.eje.rotateX(0.5 * Math.PI);
    pendulo.eje.position.set(0.0, -3.5, 1.5);

    pendulo.add(pendulo.caja);
    pendulo.add(pendulo.eje);
    
    return pendulo;
  }

  createGUI (gui, titleGui) {
    this.guiControls = new function() {
        this.longitudPrimerPendulo = 8.0;
        this.longitudSegundoPendulo = 12.0;
        this.giroPrimerPendulo = 0.0;
        this.giroSegundoPendulo = 0.0;
        this.posicionSegundoPendulo = 0.0;

        this.reset = function () {
            this.longitudPrimerPendulo = 8.0;
            this.longitudSegundoPendulo = 12.0;
            this.giroPrimerPendulo = 0.0;
            this.giroSegundoPendulo = 0.0;
            this.posicionSegundoPendulo = 0.0;
        }
    }
  }

  update() {
      
  }
}

export { Pendulo }