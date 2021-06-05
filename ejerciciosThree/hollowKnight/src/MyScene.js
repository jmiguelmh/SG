class MyScene extends Physijs.Scene {
    constructor(my_canvas) {
      Physijs.scripts.worker = '../libs/physijs_worker.js';
      Physijs.scripts.ammo = '../libs/ammo.js';
  
      super();
      this.puedeSaltar = false;
      this.renderer = this.createRenderer(my_canvas);
      this.setGravity(new THREE.Vector3(0, -10, 0));

      // Personaje
      this.personaje = new Personaje();
      var geometriaCaja = new THREE.BoxGeometry(1,2,0.1);
      var materialInvisible = new THREE.MeshBasicMaterial({transparent: true, opacity: 0.0});
      var materialFisico = Physijs.createMaterial(materialInvisible,1,0);
      this.personajeFisico = new Physijs.BoxMesh(geometriaCaja,materialFisico,1.0);
      this.personajeFisico.add(this.personaje);
      this.add(this.personajeFisico);
      var that = this;
      this.personajeFisico.addEventListener('collision',function(){that.puedeSaltar = true;});
      this.personajeFisico.position.y = 50.0;
      this.personajeFisico.__dirtyPosition = true;

      //Linea para el desarrollo de createStageHitBoxes, quitar despues, tambien descomentar this.simulate
      //this.personajeFisico.position.set(38.75,19.25,0);

      // Escenario
      this.escenario = new Escenario();
      this.add(this.escenario);
      this.createStageHitBoxes();

      this.createLights();
      this.createCamera();

    }

    createStageHitBoxes() {
      var materialInvisible = new THREE.MeshNormalMaterial({transparent: true, opacity: 0.0});
      var suelo, pared;

      // Suelo 1
      suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(75,1,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      suelo.position.x = 29;
      suelo.position.y = -2;
      this.add(suelo);

      // Suelo 2
      suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(20,1,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      suelo.position.x = 83;
      suelo.position.y = -2;
      this.add(suelo);

      // Suelo 3
      suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(4,1,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      suelo.position.x = 96;
      suelo.position.y = -5;
      this.add(suelo);

      // Suelo 4
      suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(16,1,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      suelo.position.x = 106;
      suelo.position.y = -7.5;
      this.add(suelo);

      // Suelo 5
      suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(3.5,0.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      suelo.position.x = 99.5;
      suelo.position.y = -0.5;
      this.add(suelo);

      // Suelo 6
      suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(2,0.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      suelo.position.x = 105.25;
      suelo.position.y = 1.5;
      this.add(suelo);

      // Suelo 7
      suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(2,0.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      suelo.position.x = 109;
      suelo.position.y = 5.5;
      this.add(suelo);

      // Suelo 8
      suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(2,0.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      suelo.position.x = 103.5;
      suelo.position.y = 9.75;
      this.add(suelo);

      // Suelo 9
      suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(2,0.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      suelo.position.x = 97;
      suelo.position.y = 8.5;
      this.add(suelo);

      // Suelo 10
      suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(4,0.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      suelo.position.x = 90.25;
      suelo.position.y = 10.25;
      this.add(suelo);

      // Suelo 11
      suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(3,0.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      suelo.position.x = 86;
      suelo.position.y = 14;
      this.add(suelo);

      // Suelo 12
      suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(28,0.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      suelo.position.x = 70.5;
      suelo.position.y = 18;
      this.add(suelo);

      // Suelo 13
      suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(22,0.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      suelo.position.x = 45.5;
      suelo.position.y = 14;
      this.add(suelo);

      // Suelo 14
      suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(2,0.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      suelo.position.x = 43.5;
      suelo.position.y = 21.5;
      this.add(suelo);

      // Suelo 15
      suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(2,0.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      suelo.position.x = 49.25;
      suelo.position.y = 24.5;
      this.add(suelo);

      // Suelo 16
      suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(2,0.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      suelo.position.x = 53;
      suelo.position.y = 27.5;
      this.add(suelo);

      // Suelo 17
      suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(3,0.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      suelo.position.x = 46.25;
      suelo.position.y = 29.75;
      this.add(suelo);

      // Suelo 18
      suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(3.25,0.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      suelo.position.x = 41;
      suelo.position.y = 33.5;
      this.add(suelo);

      // Suelo 19
      suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(3.25,0.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      suelo.position.x = 37.5;
      suelo.position.y = 35.25;
      this.add(suelo);

      // Suelo 20
      suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(4,0.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      suelo.position.x = 33.75;
      suelo.position.y = 38.25;
      this.add(suelo);

      // Suelo 21
      suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(2,0.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      suelo.position.x = 30.25;
      suelo.position.y = 42;
      this.add(suelo);

      // Suelo 22
      suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(17,0.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      suelo.position.x = 20.5;
      suelo.position.y = 44;
      this.add(suelo);

      // Suelo 23
      suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(11,0.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      suelo.position.x = 41.5;
      suelo.position.y = 45.5;
      this.add(suelo);

      // Suelo 24
      suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(6,0.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      suelo.position.x = 49.5;
      suelo.position.y = 47.25;
      this.add(suelo);

      // Suelo 25
      suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(98,0.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      suelo.position.x = 101.25;
      suelo.position.y = 48.5;
      this.add(suelo);

      // Suelo 26
      suelo = new Physijs.BoxMesh(new THREE.BoxGeometry(2.5,0.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      suelo.position.x = 38.75;
      suelo.position.y = 18;
      this.add(suelo);

      // Pared 1
      pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1,60,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      pared.position.x = -8;
      pared.position.y = 28.5;
      this.add(pared);

      // Pared 2
      pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1,53,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      pared.position.x = 8;
      pared.position.y = 32;
      this.add(pared);

      // Pared 3
      pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1,4,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      pared.position.x = 93.5;
      pared.position.y = -3.5;
      this.add(pared);

      // Pared 4
      pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1,3.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      pared.position.x = 98;
      pared.position.y = -6.25;
      this.add(pared);

      // Pared 5
      pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1,27,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      pared.position.x = 114.5;
      pared.position.y = 5.5;
      this.add(pared);

      // Pared 6
      pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1,4,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      pared.position.x = 91.75;
      pared.position.y = 8;
      this.add(pared);

      // Pared 7
      pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1,4,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      pared.position.x = 87.75;
      pared.position.y = 12.25;
      this.add(pared);

      // Pared 8
      pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1,4,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      pared.position.x = 84;
      pared.position.y = 16;
      this.add(pared);

      // Pared 9
      pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1,4,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      pared.position.x = 57;
      pared.position.y = 15.75;
      this.add(pared);

      // Pared 10
      pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1,16.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      pared.position.x = 34;
      pared.position.y = 22;
      this.add(pared);

      // Pared 11
      pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1,16.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      pared.position.x = 34;
      pared.position.y = 22;
      this.add(pared);

      // Pared 12
      pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1,2,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      pared.position.x = 39;
      pared.position.y = 34.5;
      this.add(pared);

      // Pared 13
      pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1,3,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      pared.position.x = 35.25;
      pared.position.y = 36.5;
      this.add(pared);

      // Pared 14
      pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1,4,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      pared.position.x = 31.25;
      pared.position.y = 40.25;
      this.add(pared);

      // Pared 15
      pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1,2.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      pared.position.x = 28.75;
      pared.position.y = 43;
      this.add(pared);

      // Pared 16
      pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1,12.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      pared.position.x = 12;
      pared.position.y = 50;
      this.add(pared);

      // Pared 17
      pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1,1.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      pared.position.x = 47;
      pared.position.y = 46.25;
      this.add(pared);

      // Pared 18
      pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1,1.5,10),new Physijs.createMaterial(materialInvisible,1,0),0);
      pared.position.x = 52.75;
      pared.position.y = 48;
      this.add(pared);

       // Pared 19
       pared = new Physijs.BoxMesh(new THREE.BoxGeometry(1,12,10),new Physijs.createMaterial(materialInvisible,1,0),0);
       pared.position.x = 150;
       pared.position.y = 54.25;
       this.add(pared);
    }
  
    createCamera() {
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 10000);
      this.camera.position.set(this.personajeFisico.position.x, this.personajeFisico.position.y, 30);
      var look = new THREE.Vector3(this.personajeFisico.position.x, this.personajeFisico.position.y, 0);
      this.camera.lookAt(look);
      this.add(this.camera);
    }
  
    renderViewport(escena, camara, left, top, width, height){
      var l = left*window.innerWidth;
      var t = top*window.innerHeight;
      var w = width*window.innerWidth;
      var h = height*window.innerHeight;
  
      this.renderer.setViewport(l, t, w, h);
      this.renderer.setScissor(l, t, w, h);
      this.renderer.setScissorTest(true);
  
      camara.aspect = w/h;
      camara.updateProjectionMatrix();
      this.renderer.render(escena, camara);
    }
  
    createLights() {
      var ambientLight = new THREE.AmbientLight(0xccddee, 1.0);

      this.add(ambientLight);
    }
  
    createRenderer(my_canvas) {
      var renderer = new THREE.WebGLRenderer();
      renderer.setClearColor(new THREE.Color(0x000000), 1.0);
      renderer.setSize(window.innerWidth, window.innerHeight);
      $(my_canvas).append(renderer.domElement);
  
      return renderer;
    }
  
    getCamera(){
      return this.camera;
    }
  
    setCameraAspect(ratio) {
      this.camera.aspect = ratio;
      this.camera.updateProjectionMatrix();
    }
  
    cameraUpdate(){
      this.camera.position.set(this.personajeFisico.position.x, this.personajeFisico.position.y, 30);
      var look = new THREE.Vector3(this.personajeFisico.position.x, this.personajeFisico.position.y, 0);
      this.camera.lookAt(look);
    }
  
    onWindowResize() {
      this.setCameraAspect(window.innerWidth/window.innerHeight);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  
    update() {
      requestAnimationFrame(()=>this.update())
      this.personaje.update();
      
      this.cameraUpdate();
      this.renderViewport(this, this.camera, 0, 0, 1, 1);
      this.simulate();
      this.personajeFisico.rotation.x = 0.0;
      this.personajeFisico.rotation.y = 0.0;
      this.personajeFisico.rotation.z = 0.0;
      this.personajeFisico.__dirtyRotation = true;
      console.log(this.personajeFisico.position.y);
      if(this.personajeFisico.position.y < -30)
        this.respawn();
    }

    mover(event) {
      //Tecla a
      if(event.keyCode == "65" || event.keyCode == "97") {
        this.personaje.faceLeft();
        if(this.personajeFisico.getLinearVelocity().x > 0.0)
        this.personajeFisico.setLinearVelocity({x: 0.0, y: this.personajeFisico.getLinearVelocity().y, z: 0.0})
        else
          this.personajeFisico.setLinearVelocity({x: -7.5, y: this.personajeFisico.getLinearVelocity().y, z: 0.0})
      } 
      //Tecla d
      else if(event.keyCode == "68" || event.keyCode == "100") {
        this.personaje.faceRight();
        if(this.personajeFisico.getLinearVelocity().x < 0.0)
          this.personajeFisico.setLinearVelocity({x: 0.0, y: this.personajeFisico.getLinearVelocity().y, z: 0.0})
        else
          this.personajeFisico.setLinearVelocity({x: 7.5, y: this.personajeFisico.getLinearVelocity().y, z: 0.0})
      }
      //Tecla w
      else if(event.keyCode == "87" || event.keyCode == "119") {
        this.personaje.lookUp();
        this.saltar();
      }
      //Tecla s
      else if(event.keyCode == "83" || event.keyCode == "115") {
        this.personaje.crouch();
      }
      //Barra espaciadora
      else if(event.keyCode == "32") {
        this.personaje.position.z = 0.0;
      }
    }

    stop() {
      this.personajeFisico.setLinearVelocity({x: 0.0, y: 0.0, z: 0.0});
    }

    saltar()
    {
      if(this.puedeSaltar) {
        this.puedeSaltar = false;
        var fuerza = 10;
        var direccion = new THREE.Vector3(0,1,0);
        var efecto = direccion.normalize().multiplyScalar(fuerza);
        this.personajeFisico.applyCentralImpulse(efecto);
      }
    }

    respawn() {
      this.personajeFisico.position.x = 0.0;
      this.personajeFisico.position.y = 50.0;
      this.personajeFisico.position.x = 0.0;
      this.personajeFisico.__dirtyPosition = true;
    }
  }
  
  $(function(){
    var scene = new MyScene("#WebGL-output");
    window.addEventListener("resize", ()=>scene.onWindowResize());
    window.addEventListener("keypress", (event)=>scene.mover(event));
    window.addEventListener("keyUp", (event) =>scene.stop());
    scene.update();
  });
  