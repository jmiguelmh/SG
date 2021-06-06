class Moneda extends THREE.Object3D {
    constructor() {
        super();
        var geometriaCaja = new THREE.BoxBufferGeometry(1, 1, 0.1);
        var loader = new THREE.TextureLoader();
        var textura = loader.load('../img/moneda.png');
        var materialCaja = new THREE.MeshPhongMaterial({ map: textura, transparent: true });
        this.caja = new THREE.Mesh(geometriaCaja, materialCaja);
        this.add(this.caja);
    }

    update() {

    }
}