class Escenario extends THREE.Object3D {
  constructor() {
    super();
    var geometriaCaja = new THREE.BoxBufferGeometry(167,75,0.001);
    geometriaCaja.translate(0,0,-2);
    var loader = new THREE.TextureLoader();
    var textura = loader.load('../img/escenario.png');
    var materialCaja = new THREE.MeshPhongMaterial({map: textura, transparent: true});
    this.caja = new THREE.Mesh(geometriaCaja,materialCaja);
    this.add(this.caja);
    this.position.x = 75.0;
    this.position.y = 29.0;
  }

  update() {
    
  }
}