import * as THREE from '../../libs/three.module.js'
import { GUI } from '../../libs/dat.gui.module.js'
import { TrackballControls } from '../../libs/TrackballControls.js'

import { Personaje } from './Personaje.js'
import { Escenario } from './Escenario.js'

class MyScene extends THREE.Scene {
  constructor(my_canvas) {
    super();
    this.renderer = this.createRenderer(my_canvas);
    this.escenario = new Escenario();
    this.add(this.escenario);
    this.personaje = new Personaje();
    this.add(this.personaje);
    this.createLights();
    this.createCamera();
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
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.75);
    this.add(ambientLight);
    this.spotLight = new THREE.SpotLight(0xD9B3FF, 0.5);
    this.spotLight.position.set(60, 60, 40);
    this.add(this.spotLight);
  }

  createRenderer(my_canvas) {
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000), 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    $(my_canvas).append(renderer.domElement);

    return renderer;
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 10000);
    this.camera.position.set(this.personaje.x, this.personaje.y, 30);
    var look = new THREE.Vector3(this.personaje.x, this.personaje.y, 30);
    this.camera.lookAt(look);
    this.add(this.camera);
  }

  getCamera(){
    return this.camera;
  }

  setCameraAspect(ratio) {
    this.camera.aspect = ratio;
    this.camera.updateProjectionMatrix();
  }

  cameraUpdate(){
    this.camera.position.set(this.personaje.x, this.personaje.y, 30);
    var look = new THREE.Vector3(this.personaje.x, this.personaje.y, 30);
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
  }

  mover(event) {
    //Tecla a
    if(event.keyCode == "65" || event.keyCode == "97") {
      this.personaje.x -= 0.25;
      this.personaje.faceLeft();
    } 
    //Tecla d
    else if(event.keyCode == "68" || event.keyCode == "100") {
      this.personaje.x += 0.25;
      this.personaje.faceRight();
    }
    //Tecla w
    else if(event.keyCode == "87" || event.keyCode == "119") {
      this.personaje.lookUp();
    }
    //Tecla s
    else if(event.keyCode == "83" || event.keyCode == "115") {
      this.personaje.crouch();
    }
  }
}

$(function(){
  var scene = new MyScene("#WebGL-output");
  window.addEventListener("resize", ()=>scene.onWindowResize());
  window.addEventListener("keypress", (event)=>scene.mover(event));
  scene.update();
});