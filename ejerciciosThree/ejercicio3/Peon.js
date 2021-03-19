import * as THREE from '../libs/three.module.js'

class Peon extends THREE.Object3D
{
    constructor(gui,titleGui)
    {
        super();
        this.createGUI(gui,titleGui);

        this.puntos = [];
        this.puntos.push(new THREE.Vector2(1.0,0.0));
        this.puntos.push(new THREE.Vector2(1.0,0.4));
        this.puntos.push(new THREE.Vector2(1.1,0.5));
        this.puntos.push(new THREE.Vector2(1.0,0.6));
        this.puntos.push(new THREE.Vector2(0.7,1.0));
        this.puntos.push(new THREE.Vector2(0.4,2.0));
        this.puntos.push(new THREE.Vector2(0.6,2.2));
        this.puntos.push(new THREE.Vector2(0.4,2.4));
        this.puntos.push(new THREE.Vector2(0.6,2.8));
        this.puntos.push(new THREE.Vector2(0.6,3.2));
        this.puntos.push(new THREE.Vector2(0.4,3.4));
        this.puntos.push(new THREE.Vector2(0.0,3.5));

        var geometria = new THREE.LatheBufferGeometry(this.puntos,10,1.0);
        var material = new THREE.MeshNormalMaterial({color: 0xCF0000});
        this.peon = new THREE.Mesh(geometria,material);
        this.add(this.peon);
    }

    crearNuevo()
    {
        var nuevaGeometria = new THREE.LatheBufferGeometry(this.puntos,guiControls.segments,this.guiControls.angle);
        this.peon.geometry = nuevaGeometria;
    }

    createGUI(gui,titleGui)
    {
        this.guiControls = new function () {
            this.segments = 10;
            this.angle = 1;
        } 
        
        var folder = gui.addFolder (titleGui);
        var that = this;
    
        folder.add (this.guiControls, 'segments', 3, 100, 1).name ('Segmentos: ').onChange(function(value){that.crearNuevo()});
        folder.add (this.guiControls, 'angle', 0.1, Math.PI*2, 0.1).name ('Ángulo: ').onChange(function(value){that.crearNuevo()});
    }

    update()
    {
        this.rotation.y += 0.01;
    }
}

export { Peon };