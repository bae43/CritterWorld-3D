CritterControls = function(world) {
	this.world = world;
  this.currentHex = null;

}

CritterControls.prototype = {
  setSelected : function(hex) {
    if (this.currentHex) {
      this.currentHex.wire.material.color.setHex(this.world.scene.map.hexColor);
    }
    this.currentHex = hex;
    this.currentHex.wire.material.color.setHex(this.world.scene.map.selectedHexColor);
    document.getElementById("current-hex").innerHTML = ("("+this.currentHex.location.c+","+this.currentHex.location.r+")");
  	hex.addCritter();
  }
}

world.critterControls = new CritterControls(world);
