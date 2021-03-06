WireframeWorldLookAndFeel = function() {
  WorldLookAndFeel.call(this);
  
  this.dir = undefined;
  
  this.scene_objs = [];
  this.hex_colors.selected = 0xff5da9;  

}
WireframeWorldLookAndFeel.prototype = Object.create(WorldLookAndFeel.prototype);
WireframeWorldLookAndFeel.prototype.constructor = WireframeWorldLookAndFeel;

WireframeWorldLookAndFeel.prototype.load = function() {
  var models = this.models = {};
  
  var up_mat = new THREE.Matrix4().makeTranslation(0, 1, 0);

  var critter = models.critter = [];
  critter[0] = {};
  critter[1] = {};
  critter[2] = {};
  critter[3] = {};
  critter[0].geometry = new THREE.CylinderGeometry(0, 1, 2, 6, 1, true); 
  critter[0].geometry.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/2));
  critter[0].geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI));
  critter[0].geometry.applyMatrix(up_mat);
  critter[0].material = new THREE.MeshBasicMaterial({wireframe:true, color : 0xff0000});
  critter[1].material = new THREE.MeshBasicMaterial({wireframe:true, color : 0xffff00});
  critter[2].material = new THREE.MeshBasicMaterial({wireframe:true, color : 0x00ff00});
  critter[3].material = new THREE.MeshBasicMaterial({wireframe:true, color : 0x0000ff});
  var rock = models.rock = []; 
  rock[0] = {};
  rock[0].geometry = new THREE.IcosahedronGeometry(1, 0);
  rock[0].geometry.applyMatrix(up_mat);
  rock[0].material = new THREE.MeshBasicMaterial({wireframe:true, color : 0x999999});
  
  var energy = models.energy = [];
  energy[0] = {};
  energy[0].geometry = new THREE.BoxGeometry(1,1,1); 
  energy[0].geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,0.5,0));
  energy[0].material = new THREE.MeshBasicMaterial({wireframe:true, color : 0x00ffff});
}

// all hexes same color
WireframeWorldLookAndFeel.prototype.getHexWire = function(xy_pos, radius, buffer) {
  var c = new THREE.Color();
  c.setHSL(Math.random() * 0.1 + 0.70, 1, 0.2);
  var hex = c.getHex();


  var mesh = WorldLookAndFeel.prototype.getHexWire(xy_pos, hex, radius, buffer);
  return mesh;

  ////////////////////////////////// 
  var material = new THREE.LineBasicMaterial({color: c});
    var xyPoint = xy_pos;

    var xoffset = (xyPoint.x * radius) * 1.5;
    var yoffset = xyPoint.y * radius * Math.sqrt(3) - buffer / 2;

  var group = new THREE.Object3D();
    for (var i = 0; i < 6; i+=2) {
      var geometry = new THREE.Geometry();
    for (var j = 0; j < 2; j++) {

      var pos = i + j; 
      var xPoint = (xoffset + (radius-buffer-.25) * Math.cos(pos * 2 * Math.PI / 6));
      var yPoint = (yoffset + (radius-buffer-.25) * Math.sin(pos * 2 * Math.PI / 6));
      geometry.vertices.push(new THREE.Vector3(yPoint, 0.04, xPoint));
    }
      var wire = new THREE.Line(geometry, material);
      group.add(wire);
    }

    group.origColor = hex;
    return group;
 }

WireframeWorldLookAndFeel.prototype.getDecorations = function() {
  return [];
}
WireframeWorldLookAndFeel.prototype.getCritter = function(species, subtype) {
  // ALWAYS GEOMETRY 0
  var geometry = this.models.critter[0].geometry;
  var material = this.models.critter[species].material;
  return new THREE.Mesh(geometry, material);
}
WireframeWorldLookAndFeel.prototype.getRock = function(size) {
  size = 1;
  var geometry = this.models.rock[0].geometry;
  var material = this.models.rock[0].material;
  return new THREE.Mesh(geometry, material);
}

WireframeWorldLookAndFeel.prototype.getEnergy = function(size) {
  size = 1;
  var geometry = this.models.energy[0].geometry;
  var material = this.models.energy[0].material;
  return new THREE.Mesh(geometry, material);
}
// adds misc other things global to the scene
WireframeWorldLookAndFeel.prototype.addSceneModels = function(scene) {
  var geometry = new THREE.IcosahedronGeometry(500, 1);
  var material = new THREE.MeshBasicMaterial({wireframe:true, color : 0x000815});
  scene.add(new THREE.Mesh(geometry, material)); 
}
