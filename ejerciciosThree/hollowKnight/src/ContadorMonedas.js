class ContadorMonedas extends THREE.Object3D {
    constructor(numeroMonedas) {
        super();
        this.monedas = numeroMonedas;
        var geometriaCaja = new THREE.BoxBufferGeometry(2, 2, 0.001);
        var loaderTexture = new THREE.TextureLoader();
        var textura = loaderTexture.load('../img/moneda.png');
        var materialCaja = new THREE.MeshPhongMaterial({ map: textura, transparent: true });
        this.caja = new THREE.Mesh(geometriaCaja, materialCaja);
        this.add(this.caja);

        var that = this;

        var loader = new THREE.FontLoader();

        loader.load('../fonts/miFuente.json', function (font) {

            var geometriaTexto = new THREE.TextGeometry(that.monedas, {
                font: font,
                size: 1,
                height: 0.2,
                curveSegments: 10,
                bevelEnabled: true,
                bevelThickness: 0.001,
                bevelSize: 0.001,
                bevelOffset: 0,
                bevelSegments: 2
            });

            that.texto = new THREE.Mesh(geometriaTexto, new THREE.MeshBasicMaterial({ color: 0xffffff }));
            that.texto.position.set(1.5, -0.5, 0);

            that.add(that.texto);
        });
    }

    update() {
        
    }
}