class MyScene extends Physijs.Scene {
  constructor(my_canvas) {
    Physijs.scripts.worker = '../libs/physijs_worker.js';
    Physijs.scripts.ammo = '../libs/ammo.js';

    super();
    this.puedeSaltar = false;
    this.gameOver = false;
    this.renderer = this.createRenderer(my_canvas);
    this.setGravity(new THREE.Vector3(0, -10, 0));

    // Personaje
    this.personaje = new Personaje();
    var geometriaCaja = new THREE.BoxGeometry(1, 2, 1);
    var materialInvisible = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.0 });
    var materialFisico = Physijs.createMaterial(materialInvisible, 1, 0);
    this.personajeFisico = new Physijs.BoxMesh(geometriaCaja, materialFisico, 1.0);
    this.personajeFisico.add(this.personaje);
    this.add(this.personajeFisico);
    var that = this;
    this.personajeFisico.addEventListener('collision', function () { that.puedeSaltar = true; });
    this.personajeFisico.position.y = 50.0;
    this.personajeFisico.__dirtyPosition = true;

    //Linea para el desarrollo de createStageHitBoxes, quitar despues, tambien descomentar this.simulate
    //this.personajeFisico.position.set(140, 50, 1);

    // Monedas
    this.createCoins();

    // ContadorMonedas
    this.contadorMonedas = new ContadorMonedas(this.personaje.monedas.toString());
    this.add(this.contadorMonedas);
    this.contadorMonedas.position.set(this.personajeFisico.position.x, this.personajeFisico.position.y, 10);

    // Escenario
    this.escenario = new Escenario();
    this.add(this.escenario);
    this.createStageHitBoxes();

    this.createLights();
    this.createCamera();

    // Musica
    this.listener = new THREE.AudioListener();
    this.musica = new THREE.Audio(this.listener);
    var audioLoaderMusic = new THREE.AudioLoader();
    var that = this;
    audioLoaderMusic.load('../audio/Greenpath.mp3', function (buffer) {
      that.musica.setBuffer(buffer);
      that.musica.setLoop(true);
      that.musica.setVolume(0.1);
      that.musica.play();
    })

    // Efectos de sonido
    this.sonidoMoneda = new THREE.Audio(this.listener);
    var audioLoaderSfx = new THREE.AudioLoader();
    audioLoaderSfx.load('../audio/dream_orb_pickup.wav', function (buffer) {
      that.sonidoMoneda.setBuffer(buffer);
      that.sonidoMoneda.setLoop(false);
      that.sonidoMoneda.setVolume(0.2);
    })

  }

  createCoins() {
    var materialInvisible = new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.0 });

    // Moneda 1
    var moneda1 = new Moneda();
    var monedaFisica1 = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 1, 1), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    monedaFisica1.position.set(51, 4, 0);
    monedaFisica1.add(moneda1);
    this.add(monedaFisica1);
    var that = this;
    monedaFisica1.addEventListener('collision', function () { monedaFisica1.position.y = -100; monedaFisica1.__dirtyPosition = true; that.personaje.monedas++; that.textUpdate(); that.sonidoMoneda.play(); });

    // Moneda 2
    var moneda2 = new Moneda();
    var monedaFisica2 = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 1, 1), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    monedaFisica2.position.set(53, 5, 0);
    monedaFisica2.add(moneda2);
    this.add(monedaFisica2);
    monedaFisica2.addEventListener('collision', function () { monedaFisica2.position.y = -100; monedaFisica2.__dirtyPosition = true; that.personaje.monedas++; that.textUpdate(); that.sonidoMoneda.play(); });

    // Moneda 3
    var moneda3 = new Moneda();
    var monedaFisica3 = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 1, 1), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    monedaFisica3.position.set(55, 4, 0);
    monedaFisica3.add(moneda3);
    this.add(monedaFisica3);
    monedaFisica3.addEventListener('collision', function () { monedaFisica3.position.y = -100; monedaFisica3.__dirtyPosition = true; that.personaje.monedas++; that.textUpdate(); that.sonidoMoneda.play(); });


    // Moneda 4
    var moneda4 = new Moneda();
    var monedaFisica4 = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 1, 1), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    monedaFisica4.position.set(103, -5, 0);
    monedaFisica4.add(moneda4);
    this.add(monedaFisica4);
    monedaFisica4.addEventListener('collision', function () { monedaFisica4.position.y = -100; monedaFisica4.__dirtyPosition = true; that.personaje.monedas++; that.textUpdate(); that.sonidoMoneda.play(); });

    // Moneda 5
    var moneda5 = new Moneda();
    var monedaFisica5 = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 1, 1), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    monedaFisica5.position.set(105, -5, 0);
    monedaFisica5.add(moneda5);
    this.add(monedaFisica5);
    monedaFisica5.addEventListener('collision', function () { monedaFisica5.position.y = -100; monedaFisica5.__dirtyPosition = true; that.personaje.monedas++; that.textUpdate(); that.sonidoMoneda.play(); });

    // Moneda 6
    var moneda6 = new Moneda();
    var monedaFisica6 = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 1, 1), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    monedaFisica6.position.set(107, -5, 0);
    monedaFisica6.add(moneda6);
    this.add(monedaFisica6);
    monedaFisica6.addEventListener('collision', function () { monedaFisica6.position.y = -100; monedaFisica6.__dirtyPosition = true; that.personaje.monedas++; that.textUpdate(); that.sonidoMoneda.play(); });

    // Moneda 7
    var moneda7 = new Moneda();
    var monedaFisica7 = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 1, 1), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    monedaFisica7.position.set(68, 23, 0);
    monedaFisica7.add(moneda7);
    this.add(monedaFisica7);
    monedaFisica7.addEventListener('collision', function () { monedaFisica7.position.y = -100; monedaFisica7.__dirtyPosition = true; that.personaje.monedas++; that.textUpdate(); that.sonidoMoneda.play(); });

    // Moneda 8
    var moneda8 = new Moneda();
    var monedaFisica8 = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 1, 1), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    monedaFisica8.position.set(70, 24, 0);
    monedaFisica8.add(moneda8);
    this.add(monedaFisica8);
    monedaFisica8.addEventListener('collision', function () { monedaFisica8.position.y = -100; monedaFisica8.__dirtyPosition = true; that.personaje.monedas++; that.textUpdate(); that.sonidoMoneda.play(); });

    // Moneda 9
    var moneda9 = new Moneda();
    var monedaFisica9 = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 1, 1), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    monedaFisica9.position.set(72, 23, 0);
    monedaFisica9.add(moneda9);
    this.add(monedaFisica9);
    monedaFisica9.addEventListener('collision', function () { monedaFisica9.position.y = -100; monedaFisica9.__dirtyPosition = true; that.personaje.monedas++; that.textUpdate(); that.sonidoMoneda.play(); });

    // Moneda 10
    var moneda10 = new Moneda();
    var monedaFisica10 = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 1, 1), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    monedaFisica10.position.set(18.5, 45, 0);
    monedaFisica10.add(moneda10);
    this.add(monedaFisica10);
    monedaFisica10.addEventListener('collision', function () { monedaFisica10.position.y = -100; monedaFisica10.__dirtyPosition = true; that.personaje.monedas++; that.textUpdate(); that.sonidoMoneda.play(); });
  }

  createStageHitBoxes() {
    var materialInvisible = new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.0 });
    var suelo, pared;

    // Suelo 1
    suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(75, 1, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    suelo.position.x = 29;
    suelo.position.y = -2;
    this.add(suelo);

    // Suelo 2
    suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(20, 1, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    suelo.position.x = 83;
    suelo.position.y = -2;
    this.add(suelo);

    // Suelo 3
    suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(4, 1, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    suelo.position.x = 96;
    suelo.position.y = -5;
    this.add(suelo);

    // Suelo 4
    suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(16, 1, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    suelo.position.x = 106;
    suelo.position.y = -7.5;
    this.add(suelo);

    // Suelo 5
    suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(3.5, 0.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    suelo.position.x = 99.5;
    suelo.position.y = -0.5;
    this.add(suelo);

    // Suelo 6
    suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(2, 0.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    suelo.position.x = 105.25;
    suelo.position.y = 1.5;
    this.add(suelo);

    // Suelo 7
    suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(2, 0.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    suelo.position.x = 109;
    suelo.position.y = 5.5;
    this.add(suelo);

    // Suelo 8
    suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(2, 0.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    suelo.position.x = 103.5;
    suelo.position.y = 9.75;
    this.add(suelo);

    // Suelo 9
    suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(2, 0.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    suelo.position.x = 97;
    suelo.position.y = 8.5;
    this.add(suelo);

    // Suelo 10
    suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(4, 0.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    suelo.position.x = 90.25;
    suelo.position.y = 10.25;
    this.add(suelo);

    // Suelo 11
    suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(3, 0.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    suelo.position.x = 86;
    suelo.position.y = 14;
    this.add(suelo);

    // Suelo 12
    suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(28, 0.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    suelo.position.x = 70.5;
    suelo.position.y = 18;
    this.add(suelo);

    // Suelo 13
    suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(22, 0.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    suelo.position.x = 45.5;
    suelo.position.y = 14;
    this.add(suelo);

    // Suelo 14
    suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(2, 0.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    suelo.position.x = 43.5;
    suelo.position.y = 21.5;
    this.add(suelo);

    // Suelo 15
    suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(2, 0.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    suelo.position.x = 49.25;
    suelo.position.y = 24.5;
    this.add(suelo);

    // Suelo 16
    suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(2, 0.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    suelo.position.x = 53;
    suelo.position.y = 27.5;
    this.add(suelo);

    // Suelo 17
    suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(3, 0.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    suelo.position.x = 46.25;
    suelo.position.y = 29.75;
    this.add(suelo);

    // Suelo 18
    suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(3.25, 0.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    suelo.position.x = 41;
    suelo.position.y = 33.5;
    this.add(suelo);

    // Suelo 19
    suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(3.25, 0.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    suelo.position.x = 37.5;
    suelo.position.y = 35.25;
    this.add(suelo);

    // Suelo 20
    suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(4, 0.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    suelo.position.x = 33.75;
    suelo.position.y = 38.25;
    this.add(suelo);

    // Suelo 21
    suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(2, 0.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    suelo.position.x = 30.25;
    suelo.position.y = 42;
    this.add(suelo);

    // Suelo 22
    suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(17, 0.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    suelo.position.x = 20.5;
    suelo.position.y = 44;
    this.add(suelo);

    // Suelo 23
    suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(11, 0.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    suelo.position.x = 41.5;
    suelo.position.y = 45.5;
    this.add(suelo);

    // Suelo 24
    suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(6, 0.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    suelo.position.x = 49.5;
    suelo.position.y = 47.25;
    this.add(suelo);

    // Suelo 25
    suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(98, 0.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    suelo.position.x = 101.25;
    suelo.position.y = 48.5;
    this.add(suelo);

    // Suelo 26
    suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(2.5, 0.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    suelo.position.x = 38.75;
    suelo.position.y = 18;
    this.add(suelo);

    // Pared 1
    pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 60, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    pared.position.x = -8;
    pared.position.y = 28.5;
    this.add(pared);

    // Pared 2
    pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 53, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    pared.position.x = 8;
    pared.position.y = 32;
    this.add(pared);

    // Pared 3
    pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 4, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    pared.position.x = 93.5;
    pared.position.y = -3.5;
    this.add(pared);

    // Pared 4
    pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 3.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    pared.position.x = 98;
    pared.position.y = -6.25;
    this.add(pared);

    // Pared 5
    pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 27, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    pared.position.x = 114.5;
    pared.position.y = 5.5;
    this.add(pared);

    // Pared 6
    pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 4, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    pared.position.x = 91.75;
    pared.position.y = 8;
    this.add(pared);

    // Pared 7
    pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 4, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    pared.position.x = 87.75;
    pared.position.y = 12.25;
    this.add(pared);

    // Pared 8
    pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 4, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    pared.position.x = 84;
    pared.position.y = 16;
    this.add(pared);

    // Pared 9
    pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 4, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    pared.position.x = 57;
    pared.position.y = 15.75;
    this.add(pared);

    // Pared 10
    pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 16.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    pared.position.x = 34;
    pared.position.y = 22;
    this.add(pared);

    // Pared 11
    pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 16.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    pared.position.x = 34;
    pared.position.y = 22;
    this.add(pared);

    // Pared 12
    pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 2, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    pared.position.x = 39;
    pared.position.y = 34.5;
    this.add(pared);

    // Pared 13
    pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 3, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    pared.position.x = 35.25;
    pared.position.y = 36.5;
    this.add(pared);

    // Pared 14
    pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 4, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    pared.position.x = 31.25;
    pared.position.y = 40.25;
    this.add(pared);

    // Pared 15
    pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 2.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    pared.position.x = 28.75;
    pared.position.y = 43;
    this.add(pared);

    // Pared 16
    pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 12.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    pared.position.x = 12;
    pared.position.y = 50;
    this.add(pared);

    // Pared 17
    pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 1.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    pared.position.x = 47;
    pared.position.y = 46.25;
    this.add(pared);

    // Pared 18
    pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 1.5, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    pared.position.x = 52.75;
    pared.position.y = 48;
    this.add(pared);

    // Pared 19
    pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 12, 10), new Physijs.createMaterial(materialInvisible, 1, 0), 0);
    pared.position.x = 150;
    pared.position.y = 54.25;
    this.add(pared);
  }

  createCamera() {
    // Camara 1
    this.camera1 = new THREE.OrthographicCamera(0, window.innerWidth / 50, window.innerHeight / 50, 0, -5);
    this.camera1.position.set(this.personajeFisico.position.x, this.personajeFisico.y, 50, 0);
    var look = new THREE.Vector3(this.personajeFisico.position.x, this.personajeFisico.position.y, 0);
    this.camera1.lookAt(look);
    this.add(this.camera1);

    // Camara 2
    this.camera2 = new THREE.OrthographicCamera(0, 167, 75, 0, -10);
    this.camera2.position.set(-10, -5, 0);
    this.add(this.camera2);
  }

  renderViewport(escena, camara, left, top, width, height) {
    var l = left * window.innerWidth;
    var t = top * window.innerHeight;
    var w = width * window.innerWidth;
    var h = height * window.innerHeight;

    this.renderer.setViewport(l, t, w, h);
    this.renderer.setScissor(l, t, w, h);
    this.renderer.setScissorTest(true);

    camara.aspect = w / h;
    camara.updateProjectionMatrix();
    this.renderer.render(escena, camara);
  }

  createLights() {
    // AmbientLight
    var ambientLight = new THREE.AmbientLight(0xccddee, 1);
    this.add(ambientLight);

    // SpotLight 1
    var spotLight1 = new THREE.SpotLight(0xfffff, 20, 0, 0.1);
    spotLight1.position.set(-5, 150, 1);
    this.add(spotLight1);

    // SpotLight 2
    var spotLight2 = new THREE.SpotLight(0xfffff, 3, 0, 0.75);
    spotLight2.position.set(53, 10, 1);
    var target2 = new THREE.Object3D();
    target2.position.set(53, 0, 1);
    spotLight2.target = target2;
    this.add(target2);
    this.add(spotLight2);

    // SpotLight 3
    var spotLight3 = new THREE.SpotLight(0xfffff, 4, 0, 0.75);
    spotLight3.position.set(72, 12, 1);
    var target3 = new THREE.Object3D();
    target3.position.set(72, 0, 1);
    spotLight3.target = target3;
    this.add(target3);
    this.add(spotLight3);

    // SpotLight 4
    var spotLight4 = new THREE.SpotLight(0xfffff, 2, 0, 0.75);
    spotLight4.position.set(70, 30, 1);
    var target4 = new THREE.Object3D();
    target4.position.set(70, 20, 1);
    spotLight4.target = target4;
    this.add(target4);
    this.add(spotLight4);

    // PointLight
    var pointLight = new THREE.PointLight(0x0000ff, 10.0, 5, 1.0);
    pointLight.position.set(18.25, 49.5, 1);
    this.add(pointLight);
  }

  createRenderer(my_canvas) {
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x00000), 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    $(my_canvas).append(renderer.domElement);

    return renderer;
  }

  getCamera() {
    return this.camera;
  }

  setCameraAspect(ratio) {
    this.camera1.aspect = ratio;
    this.camera1.updateProjectionMatrix();

    this.camera2.aspect = ratio;
    this.camera2.updateProjectionMatrix();
  }

  cameraUpdate() {
    // Camara 1
    this.camera1.position.set(this.personajeFisico.position.x - window.innerWidth / 100, this.personajeFisico.position.y - window.innerHeight / 100, 30);
    var look = new THREE.Vector3(this.personajeFisico.position.x - window.innerWidth / 100, this.personajeFisico.position.y - window.innerHeight / 100, 30);
    this.camera1.lookAt(look);
  }

  onWindowResize() {
    this.setCameraAspect(window.innerWidth / window.innerHeight);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  textUpdate() {
    this.remove(this.contadorMonedas);
    this.contadorMonedas = new ContadorMonedas(this.personaje.monedas.toString());
    this.add(this.contadorMonedas);
  }

  tituloGameOverUpdate() {
    this.tituloGameOver.position.set(this.personajeFisico.position.x, this.personajeFisico.position.y + 7, 10);
  }

  update() {
    requestAnimationFrame(() => this.update())
    this.personaje.update();
    this.contadorMonedas.position.set(this.personajeFisico.position.x - 14, this.personajeFisico.position.y + 7, 10);
    this.cameraUpdate();
    if(this.gameOver)
      this.tituloGameOverUpdate();
    this.renderViewport(this, this.camera1, 0, 0, 1, 1);
    this.renderViewport(this, this.camera2, 0.05, 0.1, 0.3, 0.3);
    this.simulate();
    this.personajeFisico.rotation.x = 0.0;
    this.personajeFisico.rotation.y = 0.0;
    this.personajeFisico.rotation.z = 0.0;
    this.personajeFisico.__dirtyRotation = true;
    if (this.personajeFisico.position.y < -30)
      this.respawn();
    
    if(this.personajeFisico.position.x > 140 && this.personajeFisico.position.y > 45 && !this.gameOver)
    {
      this.gameOver = true;
      this.tituloGameOver = new tituloGameOver(this.personaje.monedas.toString());
      this.tituloGameOver.position.set(this.personajeFisico.position.x, this.personajeFisico.position.y + 7, 10);
      this.add(this.tituloGameOver);
    }
  }

  mover(event) {
    //Tecla a
    if (event.keyCode == "65" || event.keyCode == "97") {
      this.personaje.faceLeft();
      if (this.personajeFisico.getLinearVelocity().x > 0.0)
        this.personajeFisico.setLinearVelocity({ x: 0.0, y: this.personajeFisico.getLinearVelocity().y, z: 0.0 })
      else
        this.personajeFisico.setLinearVelocity({ x: -7.5, y: this.personajeFisico.getLinearVelocity().y, z: 0.0 })
    }
    //Tecla d
    else if (event.keyCode == "68" || event.keyCode == "100") {
      this.personaje.faceRight();
      if (this.personajeFisico.getLinearVelocity().x < 0.0)
        this.personajeFisico.setLinearVelocity({ x: 0.0, y: this.personajeFisico.getLinearVelocity().y, z: 0.0 })
      else
        this.personajeFisico.setLinearVelocity({ x: 7.5, y: this.personajeFisico.getLinearVelocity().y, z: 0.0 })
    }
    //Tecla w
    else if (event.keyCode == "87" || event.keyCode == "119") {
      this.personaje.lookUp();
      this.saltar();
    }
    //Tecla s
    else if (event.keyCode == "83" || event.keyCode == "115") {
      this.personaje.crouch();
    }
  }

  stop() {
    this.personajeFisico.setLinearVelocity({ x: 0.0, y: 0.0, z: 0.0 });
  }

  saltar() {
    if (this.puedeSaltar) {
      this.puedeSaltar = false;
      var fuerza = 10;
      var direccion = new THREE.Vector3(0, 10, 0);
      var efecto = direccion.normalize().multiplyScalar(fuerza);
      this.personajeFisico.applyCentralImpulse(efecto);
    }
  }

  respawn() {
    this.personajeFisico.position.x = 0.0;
    this.personajeFisico.position.y = 50.0;
    this.personajeFisico.position.z = 0.0;
    this.personajeFisico.__dirtyPosition = true;
  }
}

$(function () {
  var scene = new MyScene("#WebGL-output");
  window.addEventListener("resize", () => scene.onWindowResize());
  window.addEventListener("keypress", (event) => scene.mover(event));
  window.addEventListener("keyUp", (event) => scene.stop());
  scene.update();
});
