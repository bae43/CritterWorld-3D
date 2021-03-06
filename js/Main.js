function init() {

  // Lights
  world.scene.add(new THREE.AmbientLight(0xcccccc));

  spotLight = new THREE.SpotLight(0xaaaaaa);
  spotLight.position.set(1000, 500, 1000);
  spotLight.castShadow = true;
  spotLight.shadowCameraNear = 500;
  spotLight.shadowCameraFov = 70;
  spotLight.shadowBias = 0.001;
  spotLight.shadowMapWidth = 1024;
  spotLight.shadowMapHeight = 1024;
  world.scene.add(spotLight);

  /*
   var skyGeometry = new THREE.CubeGeometry(1500, 1500, 1500);

   var sky_path = "/rsc/textures/sky2_ENV/cloudy_";
   var directions = ["xp", "xn", "yp", "yn", "zp", "zn"];
   var extension = ".png";

   var materialArray = [];
   for (var i = 0; i < 6; i++)
   materialArray.push(new THREE.MeshBasicMaterial({
   map : THREE.ImageUtils.loadTexture(sky_path + directions[i] + extension),
   side : THREE.BackSide,
   // fog: new THREE.fog(0xffffff,1000,1600)
   }));
   var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
   var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
   world.scene.add(skyBox);

   */

  world.renderer = new THREE.WebGLRenderer();
  world.renderer.setSize(window.innerWidth, window.innerHeight);
  world.renderer.setClearColor(world.map.skyColor, 0.6)

  world.container.appendChild(world.renderer.domElement);

  world.stats = new Stats();
  world.stats.domElement.style.position = 'absolute';
  world.stats.domElement.style.top = '0px';
  world.container.appendChild(world.stats.domElement);

  //

  window.addEventListener('resize', onWindowResize, false);
  controls = new THREE.OrbitControls(world.camera, world.renderer.domElement);

  /*
   * Run the animation loop
   */
  animate()

}

function onWindowResize() {

  world.camera.aspect = window.innerWidth / window.innerHeight;
  world.camera.updateProjectionMatrix();

  world.renderer.setSize(window.innerWidth, window.innerHeight);

  world.SCREEN_WIDTH = window.innerWidth;
  world.SCREEN_HEIGHT = window.innerHeight;

}

//

function animate() {

  requestAnimationFrame(animate);

  // update positions if inbetween turn animations exist
  if (world.animated && world.turn_occurring) {

    // update all map movement animated objects
    var l = world.animations.length;
    for (var i = 0; i < l; i++) {
      world.animations[i].update();
    }

  }

  render();
  world.stats.update();

}

function render() {

  world.renderer.render(world.scene, world.camera);
  controls.update();
}
