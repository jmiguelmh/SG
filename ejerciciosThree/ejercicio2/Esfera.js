import * as THREE from '../libs/three.module.js'

class Esfera extends THREE.Object3D
{
    constructor(gui,titleGui)
    {
        super();
        this.createGUI(gui,titleGui);
        
        var geometria = new THREE.SphereBufferGeometry(1.0,10,10);
        var material = new THREE.MeshPhongMaterial({color: 0x00FFFF});
        this.esfera = new THREE.Mesh(geometria,material);
        this.add(this.esfera);

        this.position.x = -10.0;
        this.position.z = 10.0;
    }

    crearNuevo()
    {
        var nuevaGeometria = new THREE.SphereBufferGeometry(this.guiControls.radius,this.guiControls.widthSegments,this.guiControls.heightSegments);
        this.esfera.geometry = nuevaGeometria;
    }

    createGUI(gui,titleGui)
    {
        this.guiControls = new function()
        {
            this.radius = 1.0;
            this.widthSegments = 10;
            this.heightSegments = 10;
        }

        var folder = gui.addFolder(titleGui);
        var that = this;

        folder.add(this.guiControls,'radius',0.1,5.0,0.1).name('Radio: ').onChange(function(value){that.crearNuevo()});
        folder.add(this.guiControls,'widthSegments',2,100,1).name('Segmentos ancho: ').onChange(function(value){that.crearNuevo()});
        folder.add(this.guiControls,'heightSegments',2,100,1).name('Segmentos alto: ').onChange(function(value){that.crearNuevo()});
    }

    update()
    {
        this.rotation.y += 0.01;
    }
}

export { Esfera };