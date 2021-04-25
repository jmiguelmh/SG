import * as THREE from '../libs/three.module.js'

class Reloj extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();

    this.createGUI(gui,titleGui);

    var geometriaEsfera = new THREE.SphereGeometry(1.0, 25, 25);
    var geometriaCilindroGrande = new THREE.CylinderGeometry(0.5, 0.5, 12.5, 25);
    var geometriaCilindroPequenio = new THREE.CylinderGeometry(0.5, 0.5, 7.0, 25);
    var materialRojo = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
    var materialVerde = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
    var materialAzul = new THREE.MeshPhongMaterial( { color: 0x0000ff } );

    //Esferas horas
    this.esferas = [];

    for(var i = 0; i < 12; i++) {
        var esfera = new THREE.Mesh(geometriaEsfera, materialVerde);
        esfera.position.x = Math.cos(i * 2 * Math.PI / 12 ) * 15.0;
        esfera.position.z = Math.sin(i * 2 * Math.PI / 12 ) * 15.0;
        this.esferas[i] = esfera;
    }

    for(var i = 0; i < 12; i++) {
        this.add(this.esferas[i]);
    }

    //Aguja horas
    this.agujaHoras = new THREE.Mesh(geometriaCilindroPequenio,materialAzul);
    this.agujaHoras.position.x = -3.5;
    this.agujaHoras.rotateZ(0.5 * Math.PI);
    this.nodoAgujaHoras = new THREE.Object3D();
    this.nodoAgujaHoras.add(this.agujaHoras);
    this.add(this.nodoAgujaHoras);

    //Aguja minutos
    this.agujaMinutos = new THREE.Mesh(geometriaCilindroGrande,materialRojo);
    this.agujaMinutos.position.x = -6.25;
    this.agujaMinutos.rotateZ(0.5 * Math.PI);
    this.nodoAgujaMinutos = new THREE.Object3D();
    this.nodoAgujaMinutos.add(this.agujaMinutos);
    this.add(this.nodoAgujaMinutos);
  }

  createGUI (gui, titleGui) {
    this.guiControls = new function() {
        this.velocidad = 1.0;
    }
    
    var folder = gui.addFolder(titleGui);
    folder.add(this.guiControls, 'velocidad', 0.1, 5.0, 0.1).name('Velocidad').listen();
  }

  update() {
    this.nodoAgujaMinutos.rotation.y -= this.guiControls.velocidad * 0.05;
    this.nodoAgujaHoras.rotation.y -= this.guiControls.velocidad * 0.05 / 12;
  }
}

export { Reloj }