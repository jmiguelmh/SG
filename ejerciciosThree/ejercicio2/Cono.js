import * as THREE from '../libs/three.module.js'
 
class Cono extends THREE.Object3D {
  constructor(gui,titleGui)
  {
    super();
    this.createGUI(gui,titleGui);
    var geometria = new THREE.ConeBufferGeometry (1.0,1.0,10);
    var material = new THREE.MeshPhongMaterial({color: 0x00FF00});
    this.cono = new THREE.Mesh (geometria, material);
    this.add (this.cono);
    this.position.x = 10.0;
  }

  crearNuevo()
  {
    var nuevaGeometria = new THREE.ConeBufferGeometry(this.guiControls.radius,this.guiControls.height,this.guiControls.segments);
    this.cono.geometry = nuevaGeometria;
  }
  
  createGUI(gui,titleGui)
  {
    this.guiControls = new function () {
        this.radius = 1.0;
        this.height = 1.0;
        this.segments = 10;
    } 
    
    var folder = gui.addFolder (titleGui);
    var that = this;

    folder.add (this.guiControls, 'radius', 0.1, 5.0, 0.1).name ('Radio: ').onChange(function(value){that.crearNuevo()});
    folder.add (this.guiControls, 'height', 0.1, 10.0, 0.1).name ('Altura: ').onChange(function(value){that.crearNuevo()});
    folder.add (this.guiControls, 'segments', 3, 100, 1).name ('Segmentos: ').onChange(function(value){that.crearNuevo()});
  }
  
  update()
  {
    this.rotation.y += 0.01;
  }
}

export { Cono };