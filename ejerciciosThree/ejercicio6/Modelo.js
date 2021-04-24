import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Modelo extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();

    this.createGUI(gui, titleGui);

    this.posX = 0.0;
    this.posZ = 0.0;
    this.escalado = 5.0;
    var that = this;
    var material = new MTLLoader();
    var geometria = new OBJLoader();
    material.load(
        '../models/porsche911/911.mtl',
        function (materiales) {
            geometria.setMaterials (materiales);
            geometria.load(
                '../models/porsche911/Porsche_911_GT2.obj',
                function (objeto) {
                    var modelo = objeto;
                    that.position.set(0.0, 0.6 * that.escalado, 10.0);
                    that.rotateY(-0.5 * Math.PI);
                    that.scale.set(that.escalado, that.escalado, that.escalado);
                    that.add (modelo);
                },
                null, null
            );
        }
    )
  }

  createGUI (gui, titleGui) {
      this.guiControls = new function() {
          this.animacion = false;
      }

      var folder = gui.addFolder (titleGui);
      folder.add (this.guiControls, 'animacion').name ('Animación: ');
  }

  update() {
    if(this.guiControls.animacion)
    {
        this.position.set(Math.sin(this.posX) * 10.0, 0.6 * this.escalado, Math.cos(this.posZ) * 10.0);
        this.posX += 0.1;
        this.posZ += 0.1;
        this.rotation.y += 0.1;
    }
  }
}

export { Modelo }