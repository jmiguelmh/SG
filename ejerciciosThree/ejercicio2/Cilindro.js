import * as THREE from '../libs/three.module.js'
 
class Cilindro extends THREE.Object3D {
  constructor(gui,titleGui)
  {
    super();
    this.createGUI(gui,titleGui);
    var geometria = new THREE.CylinderBufferGeometry(1.0,1.0,1.0,10);
    var material = new THREE.MeshPhongMaterial({color: 0x0000FF});
    this.cilindro = new THREE.Mesh (geometria, material);
    this.add (this.cilindro);
    this.position.x = -10.0;
  }

  crearNuevo()
  {
    var nuevaGeometria = new THREE.CylinderBufferGeometry(this.guiControls.radiusTop,this.guiControls.radiusBottom,this.guiControls.height,this.guiControls.segments);
    this.cilindro.geometry = nuevaGeometria;
  }
  
  createGUI(gui,titleGui)
  {
    this.guiControls = new function () {
        this.radiusBottom = 1.0;
        this.radiusTop = 1.0;
        this.height = 1.0;
        this.segments = 10;
    } 
    
    var folder = gui.addFolder (titleGui);
    var that = this;

    folder.add (this.guiControls, 'radiusBottom', 0.1, 5.0, 0.1).name ('Radio Inferior: ').onChange(function(value){that.crearNuevo()});
    folder.add (this.guiControls, 'radiusTop', 0.1, 5.0, 0.1).name ('Radio Superior: ').onChange(function(value){that.crearNuevo()});
    folder.add (this.guiControls, 'height', 0.1, 10.0, 0.1).name ('Altura: ').onChange(function(value){that.crearNuevo()});
    folder.add (this.guiControls, 'segments', 3, 50, 1).name ('Segmentos: ').onChange(function(value){that.crearNuevo()});
  }
  
  update()
  {
    this.rotation.y += 0.01;
  }
}

export { Cilindro };