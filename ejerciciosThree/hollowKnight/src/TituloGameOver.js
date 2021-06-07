class tituloGameOver extends THREE.Object3D {
    constructor(numeroMonedas) {
        super();

        this.monedas = numeroMonedas;

        var that = this;

        var loader1 = new THREE.FontLoader();

        loader1.load('../fonts/miFuente.json', function (font) {

            var geometriaTexto = new THREE.TextGeometry('Game Over', {
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
            that.texto.position.set(1.5, 1, 0);

            that.add(that.texto);
        });

        var loader2 = new THREE.FontLoader();

        loader2.load('../fonts/miFuente.json', function (font) {

            var geometriaTexto = new THREE.TextGeometry('Has recogido ' + that.monedas + ' monedas', {
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
            that.texto.position.set(1.5, -1, 0);

            that.add(that.texto);
        });
        
    }

    update() {
        
    }
}