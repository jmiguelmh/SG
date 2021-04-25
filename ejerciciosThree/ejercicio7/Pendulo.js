import * as THREE from '../libs/three.module.js'

class Pendulo extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();

    this.createGUI(gui, titleGui);

    //Materiales
    var materialAzul = new THREE.MeshPhongMaterial( { color: 0x0000ff } );
    var materialGris = new THREE.MeshPhongMaterial( { color: 0x808080 } );
    var materialRojo = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
    var materialVerde = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );

    //Geometrias
    var cajaPrimerPendulo = new THREE.BoxGeometry(2.0, 1.0, 0.5);
    var cajaSegundoPendulo = new THREE.BoxGeometry(1.0, 1.0, 0.5);
    var cilindroPrimerPendulo = new THREE.CylinderGeometry(0.5,0.5,0.75,25,25);
    var cilindroSegundoPendulo = new THREE.CylinderGeometry(0.25, 0.25, 0.75);

    cajaPrimerPendulo.translate(0.0, -0.5, 0.0);
    cajaSegundoPendulo.translate(0.0, -0.5, 0.5);
    cilindroPrimerPendulo.translate(0.0, -2.0, 0.0);
    cilindroSegundoPendulo.translate(0.0, -2.0, 0.5);

    cilindroPrimerPendulo.rotateX(0.5 * Math.PI);
    cilindroSegundoPendulo.rotateX(0.5 * Math.PI);

    //Primer pendulo
    this.cajaA = new THREE.Mesh(cajaPrimerPendulo,materialVerde);
    this.cajaA.scale.y = 4.0;
    var nodo1 = new THREE.Object3D();
    nodo1.add(this.cajaA);

    this.cajaB = new THREE.Mesh(cajaPrimerPendulo,materialRojo);
    var nodo2 = new THREE.Object3D();
    nodo2.add(this.cajaB);
    nodo2.position.y = 1.0 - this.guiControls.escalaPrimerPendulo;

    this.cajaC = new THREE.Mesh(cajaPrimerPendulo,materialVerde);
    this.cajaC.scale.y = 4.0;
    var nodo3 = new THREE.Object3D();
    nodo3.add(this.cajaC);

    this.cilindroA = new THREE.Mesh(cilindroPrimerPendulo,materialGris);
    this.cilindroA.position.y = -2.0;
    this.cilindroA.position.z = 2.0;

    var nodoPrimerPendulo = new THREE.Object3D();
    nodoPrimerPendulo.add(nodo1);
    nodoPrimerPendulo.add(nodo2);
    nodoPrimerPendulo.add(nodo3);
    nodoPrimerPendulo.add(this.cilindroA);
    nodoPrimerPendulo.position.y = 2.0;

    //Segundo Pendulo    
    this.cajaD = new THREE.Mesh(cajaSegundoPendulo,materialAzul);
    this.cajaD.scale.y = 10.0;
    this.cajaD.position.y = 0.5;
    this.nodo4 = new THREE.Object3D();
    this.nodo4.add(this.cajaD);
    this.nodo4.position.y = -2.0;

    this.cilindroB = new THREE.Mesh(cilindroSegundoPendulo,materialGris);
    this.cilindroB.position.y = -1.5;
    this.cilindroB.position.z = 2.5;

    this.nodoSegundoPendulo = new THREE.Object3D();
    this.nodoSegundoPendulo.add(this.nodo4);
    this.nodoSegundoPendulo.add(this.cilindroB);
    this.nodoSegundoPendulo.position.y = -2.5;

    var nodoFinal = new THREE.Object3D();
    nodoFinal.add(nodoPrimerPendulo);
    nodoFinal.add(this.nodoSegundoPendulo);

    this.add(nodoFinal);
  }

  createGUI (gui, titleGui) {
    this.guiControls = new function() {
      this.escalaPrimerPendulo = 5.0;
      this.escalaSegundoPendulo = 10.0;
      this.giroPrimerPendulo = 0.0;
      this.giroSegundoPendulo = 0.0;
      this.posicionSegundoPendulo = 10.0;

      /*
      this.reset = function () {
        this.longitudPrimerPendulo = 8.0;
        this.longitudSegundoPendulo = 12.0;
        this.giroPrimerPendulo = 0.0;
        this.giroSegundoPendulo = 0.0;
        this.posicionSegundoPendulo = 0.0;
      }
      */
    }

    var folder1 = gui.addFolder ('Primer Péndulo');
    folder1.add (this.guiControls, 'escalaPrimerPendulo', 5.0, 10.0, 0.1).name ('Longitud').listen();
    folder1.add (this.guiControls, 'giroPrimerPendulo', -0.5, 0.5, 0.1).name ('Rotación').listen();

    var folder2 = gui.addFolder ('Segundo Péndulo');
    folder2.add (this.guiControls, 'escalaSegundoPendulo', 10.0, 20.0, 0.1).name ('Longitud').listen();
    folder2.add (this.guiControls, 'giroSegundoPendulo', -0.5, 0.5, 0.1).name ('Rotación').listen();
    folder2.add (this.guiControls, 'posicionSegundoPendulo', 10, 90, 1.0).name ('Posición(%)').listen();
  }

  update() {
    this.cajaB.scale.y = this.guiControls.escalaPrimerPendulo;
    this.cajaC.position.y = -4.0-this.guiControls.escalaPrimerPendulo;
    this.rotation.z = this.guiControls.giroPrimerPendulo;
    this.cajaD.scale.y = this.guiControls.escalaSegundoPendulo;
    this.nodo4.rotation.z = this.guiControls.giroSegundoPendulo;
    this.nodoSegundoPendulo.position.y = -(this.guiControls.escalaPrimerPendulo*this.guiControls.posicionSegundoPendulo/100);
  }
}

export { Pendulo }