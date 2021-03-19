import * as THREE from '../libs/three.module.js'
 
class Cubo extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    this.createGUI(gui,titleGui);
    var geometria = new THREE.BoxBufferGeometry (1,1,1);
    var material = new THREE.MeshPhongMaterial({color: 0xFF0000});
    this.cubo = new THREE.Mesh (geometria, material);
    this.add (this.cubo);
  }
  
  createGUI (gui,titleGui) {
    this.guiControls = new function () {
      this.sizeX = 1.0;
      this.sizeY = 1.0;
      this.sizeZ = 1.0;
      
      this.rotX = 0.0;
      this.rotY = 0.0;
      this.rotZ = 0.0;
    } 
    
    var folder = gui.addFolder (titleGui);

    folder.add (this.guiControls, 'sizeX', 0.1, 10.0, 0.1).name ('Tamaño X: ').listen();
    folder.add (this.guiControls, 'sizeY', 0.1, 10.0, 0.1).name ('Tamaño Y: ').listen();
    folder.add (this.guiControls, 'sizeZ', 0.1, 10.0, 0.1).name ('Tamaño Z: ').listen();
  }
  
  update () {
    this.cubo.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
    this.rotation.y += 0.01;
  }
}

export { Cubo };