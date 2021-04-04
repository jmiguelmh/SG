import * as THREE from '../libs/three.module.js'

class Peon extends THREE.Object3D
{
    constructor(gui,titleGui)
    {
        super();
        this.createGUI(gui,titleGui);

        this.puntos = [];
        this.puntos.push(new THREE.Vector2(0.0,0.0));
        this.puntos.push(new THREE.Vector2(1.0,0.0));
        this.puntos.push(new THREE.Vector2(1.0680,0.1305));
        this.puntos.push(new THREE.Vector2(1.2955,0.3182));
        this.puntos.push(new THREE.Vector2(1.0606,0.5227));
        this.puntos.push(new THREE.Vector2(1.1742,0.6288));
        this.puntos.push(new THREE.Vector2(1.1970,0.7121));
        this.puntos.push(new THREE.Vector2(1.1970,0.8106));
        this.puntos.push(new THREE.Vector2(0.8258,1.1818));
        this.puntos.push(new THREE.Vector2(0.7727,1.2879));
        this.puntos.push(new THREE.Vector2(0.7727,1.3712));
        this.puntos.push(new THREE.Vector2(0.8106,1.5076));
        this.puntos.push(new THREE.Vector2(0.8106,1.5379));
        this.puntos.push(new THREE.Vector2(0.6212,1.6136));
        this.puntos.push(new THREE.Vector2(0.4621,1.8712));
        this.puntos.push(new THREE.Vector2(0.3636,2.1742));
        this.puntos.push(new THREE.Vector2(0.3258,2.4318));
        this.puntos.push(new THREE.Vector2(0.3258,2.6439));
        this.puntos.push(new THREE.Vector2(0.3636,2.8485));
        this.puntos.push(new THREE.Vector2(0.4242,2.9015));
        this.puntos.push(new THREE.Vector2(0.4242,3.0152));
        this.puntos.push(new THREE.Vector2(0.25,3.2349));
        this.puntos.push(new THREE.Vector2(0.3864,3.3333));
        this.puntos.push(new THREE.Vector2(0.5,3.4849));
        this.puntos.push(new THREE.Vector2(0.5833,3.6288));
        this.puntos.push(new THREE.Vector2(0.6288,3.8106));
        this.puntos.push(new THREE.Vector2(0.6288,3.9621));
        this.puntos.push(new THREE.Vector2(0.5757,4.1136));
        this.puntos.push(new THREE.Vector2(0.4470,4.2652));
        this.puntos.push(new THREE.Vector2(0.2197,4.4167));
        this.puntos.push(new THREE.Vector2(0.0,4.4546));


        var geometria = new THREE.LatheBufferGeometry(this.puntos,this.guiControls.segments,0.0,this.guiControls.angle);
        var material = new THREE.MeshPhongMaterial({color: 0xCF0000});
        this.peon = new THREE.Mesh(geometria,material);
        this.add(this.peon);
    }

    createGUI (gui,titleGui) {
        this.guiControls = new function () {
          this.segments = 50;
          this.angle = Math.PI*2;
        }
        
        var folder = gui.addFolder (titleGui);
        var that = this;
        
        folder.add (this.guiControls, 'segments', 3, 100, 1).name ('Segmentos').listen().onChange(function(segmentos)
        {
          var nuevaGeometria = new THREE.LatheGeometry(that.puntos, segmentos, 0, that.guiControls.angle);
          that.segments = segmentos;
          that.peon.geometry = nuevaGeometria;
        });
    
          folder.add (this.guiControls, 'angle', 0.1, 2*Math.PI, 0.1).name ('Ángulo').listen().onChange(function(angle){
            var nuevaGeometria = new THREE.LatheGeometry(that.puntos, that.guiControls.segments, 0, angle);
            that.angle = angle;
            that.peon.geometry = nuevaGeometria;
          });
      }

    update(){}
}

export { Peon };