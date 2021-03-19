import * as THREE from '../libs/three.module.js'
 
class Toro extends THREE.Object3D {
  constructor(gui,titleGui)
  {
    super();
    this.createGUI(gui,titleGui);
    var geometria = new THREE.TorusGeometry(1.0,0.5,10,10);
    var material = new THREE.MeshPhongMaterial({color: 0xFF00FF});
    this.toro = new THREE.Mesh (geometria, material);
    this.add (this.toro);
    this.position.x = 10.0;
    this.position.z = 10.0;
  }

  crearNuevo()
  {
    var nuevaGeometria = new THREE.TorusGeometry(this.guiControls.radius,this.guiControls.tube,this.guiControls.radialSegments,this.guiControls.tubularSegments);
    this.toro.geometry = nuevaGeometria;
  }
  
  createGUI(gui,titleGui)
  {
    this.guiControls = new function () {
        this.radius = 1.0;
        this.tube = 0.5;
        this.radialSegments = 10;
        this.tubularSegments = 10;
    } 
    
    var folder = gui.addFolder (titleGui);
    var that = this;

    folder.add (this.guiControls, 'radius', 0.1, 5.0, 0.1).name ('Radio: ').onChange(function(value){that.crearNuevo()});
    folder.add (this.guiControls, 'tube', 0.1, 5.0, 0.1).name ('Tubo: ').onChange(function(value){that.crearNuevo()});
    folder.add (this.guiControls, 'radialSegments', 3, 100, 1).name ('Segmentos radio: ').onChange(function(value){that.crearNuevo()});
    folder.add (this.guiControls, 'tubularSegments', 3, 100, 1).name ('Segmentos tubo: ').onChange(function(value){that.crearNuevo()});
  }
  
  update()
  {
    this.rotation.y += 0.01;
  }
}

export { Toro };