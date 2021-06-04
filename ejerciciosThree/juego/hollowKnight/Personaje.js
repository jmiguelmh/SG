import * as THREE from '../../libs/three.module.js'

class Personaje extends THREE.Object3D {
  constructor() {
    super();
    this.x = 0.0;
    this.y = 0.0;
    this.direccion = "derecha";
    var geometriaCaja = new THREE.BoxBufferGeometry(1,2,0.001);
    var loader = new THREE.TextureLoader();
    var textura = loader.load('../img/idleLeft.png');
    var materialCaja = new THREE.MeshPhongMaterial({map: textura, transparent: true});
    this.caja = new THREE.Mesh(geometriaCaja,materialCaja);
    this.add(this.caja);
    this.position.z = 0.1;
  }

  faceLeft() {
    this.direccion = "izquierda";
    new THREE.TextureLoader().load(
      "../img/idleLeft.png",
      textura => {
        this.caja.material.map = textura;
        this.caja.material.needsUpdate = true;
      }
    );
  }

  faceRight() {
    this.direccion = "derecha";
    new THREE.TextureLoader().load(
      "../img/idleRight.png",
      textura => {
        this.caja.material.map = textura;
        this.caja.material.needsUpdate = true;
      }
    );
  }

  lookUp() {
    if(this.direccion == "derecha") {
      new THREE.TextureLoader().load(
        "../img/lookUpRight.png",
        textura => {
          this.caja.material.map = textura;
          this.caja.material.needsUpdate = true;
        }
      );
    } else if(this.direccion == "izquierda") {
      new THREE.TextureLoader().load(
        "../img/lookUpLeft.png",
        textura => {
          this.caja.material.map = textura;
          this.caja.material.needsUpdate = true;
        }
      );
    }
  }

  crouch() {
    if(this.direccion == "derecha") {
      new THREE.TextureLoader().load(
        "../img/crouchRight.png",
        textura => {
          this.caja.material.map = textura;
          this.caja.material.needsUpdate = true;
        }
      );
    } else if(this.direccion == "izquierda") {
      new THREE.TextureLoader().load(
        "../img/crouchLeft.png",
        textura => {
          this.caja.material.map = textura;
          this.caja.material.needsUpdate = true;
        }
      );
    }
  }

  update() {
    this.position.x = this.x;
    this.position.y = this.y;
  }
}

export { Personaje }