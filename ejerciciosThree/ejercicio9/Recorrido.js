import * as THREE from '../libs/three.module.js'

class Recorrido extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();

    this.createGUI(gui,titleGui);
  }

  createGUI (gui, titleGui) {
    this.guiControls = new function() {
        
    }
    
    var folder = gui.addFolder(titleGui);
    folder.add(this.guiControls, 'velocidad', 0.1, 5.0, 0.1).name('Velocidad').listen();
  }

  update() {
    this.nodoAgujaMinutos.rotation.y -= this.guiControls.velocidad * 0.05;
    this.nodoAgujaHoras.rotation.y -= this.guiControls.velocidad * 0.05 / 12;
  }
}

export { Recorrido }