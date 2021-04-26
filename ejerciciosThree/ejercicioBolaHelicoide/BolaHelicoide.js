import * as THREE from '../libs/three.module.js'

class BolaHelicoide extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();

    this.createGUI(gui, titleGui);

    var geometriaCilindro = new THREE.CylinderGeometry(5.0, 5.0, 20.0, 100);
    var materialCilindro = new THREE.MeshNormalMaterial({
      opacity: 0.35,
      transparent: true,
    });

    this.cilindro = new THREE.Mesh(geometriaCilindro,materialCilindro);
    this.cilindro.position.y = 10.0;
    this.add(this.cilindro);

    this.alpha = 0.0;
    this.beta = 0.0;
    this.posicionVertical = 1.5;
    this.velocidadVertical = 0.05;

    var geometriaEsfera = new THREE.SphereGeometry(1.0,100,100);
    var materialEsfera = new THREE.MeshNormalMaterial();
    this.esfera = new THREE.Mesh(geometriaEsfera,materialEsfera);
    this.esfera.position.set(5.0 * Math.cos(this.alpha), this.posicionVertical, 5.0 * Math.sin(this.beta));
    this.add(this.esfera);

  }

  createGUI (gui, titleGui) {
    this.guiControls = new function() {
    this.extension = 1.0;
  }
    
    var folder = gui.addFolder(titleGui);
    folder.add(this.guiControls,'extension', 0.1, 3.0, 0.1).name('Extensión: ').listen();
  }

  update() {
    this.cilindro.scale.x = this.guiControls.extension;
    this.cilindro.scale.z = this.guiControls.extension;
    this.alpha -= 0.05;
    this.beta -= 0.05;
    this.posicionVertical += this.velocidadVertical;

    if(this.esfera.position.y > 18.5)
      this.velocidadVertical = -0.05;
    
    if(this.esfera.position.y < 1.5)
      this.velocidadVertical = 0.05;

    this.esfera.position.set(5.0 * Math.cos(this.alpha) * this.guiControls.extension, this.posicionVertical, 5.0 * Math.sin(this.beta) * this.guiControls.extension);
  }
}

export { BolaHelicoide }