import * as THREE from '../libs/three.module.js'
 
class Icosaedro extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        this.createGUI(gui,titleGui);
        var geometria = new THREE.IcosahedronBufferGeometry(1.0);
        var material = new THREE.MeshPhongMaterial({color: 0xFFFF00});
        this.icosaedro = new THREE.Mesh(geometria,material);
        this.add(this.icosaedro);
        this.position.z = 10.0;
    }

    crearNuevo()
    {
        var nuevaGeometria = new THREE.IcosahedronBufferGeometry(this.guiControls.radius);
        this.icosaedro.geometry = nuevaGeometria;
    }
    
    createGUI (gui,titleGui) {
        this.guiControls = new function () {
            this.radius = 0.5;
        } 
        
        var folder = gui.addFolder (titleGui);
        var that = this;
    
        folder.add (this.guiControls, 'radius', 0.1, 5.0, 0.1).name ('Radio: ').onChange(function(value){that.crearNuevo()});
    }
    
    update () {
        this.rotation.y += 0.01;
    }
}

export { Icosaedro };