/**
 * Controls for operating the side panel and moving critters
 * @param {Object} world
 */

CritterControls = function(world) {
  this.world = world;
  this.currentSelected = null;
  this.currentHovered = null;

  this.hexHoverColor = 0xffffff;
  this.hexSelectedColor = 0xffbe10;
  this.hexBaseColor = this.world.scene.map.hexColor;

  $(document).keypress( function(event) {

    // add critter
    if (this.currentSelected) {
      if (event.which === KEYS.C && this.currentSelected.type === 0) {
        this.currentSelected.addCritter();
        this.updateStats(this.currentSelected);

        // move
      } else {
        if (this.currentSelected.type === 2) {
          if (event.which === KEYS.UP) {
            world.turnOccurring = true;
            this.currentSelected.critter.moveForward();
          } else if (event.which === KEYS.DOWN) {
            world.turnOccurring = true;
            this.currentSelected.critter.moveBackward();
          } else if (event.which === KEYS.RIGHT) {
            world.turnOccurring = true;
            this.currentSelected.critter.turnRight();
          } else if (event.which === KEYS.LEFT) {
            world.turnOccurring = true;
            this.currentSelected.critter.turnLeft();
          }
        }
      }
    }
  }.bind(this));

}

CritterControls.prototype = {

  setHovered : function(hex) {
    //on same hex
    if (hex === this.currentHovered) {
      return;
    }

    if (this.currentHovered) {

      // highlighting selected
      if (this.currentHovered === this.currentSelected) {
        this.currentHovered.wire.material.color.setHex(this.hexSelectedColor);

        // leaving a selected hex
      } else {
        this.currentHovered.wire.material.color.setHex(this.hexBaseColor);
      }
    }

    this.currentHovered = hex;
    hex.wire.material.color.setHex(this.hexHoverColor);
  },

  setSelected : function(hex) {

    // unselect previous
    if (this.currentSelected) {
      this.currentSelected.wire.material.color.setHex(this.hexBaseColor);
    }

    // change selected and update panel
    this.currentSelected = hex;
    this.currentSelected.wire.material.color.setHex(this.hexSelectedColor);
    document.getElementById("current-hex").innerHTML = ("(" + this.currentSelected.location.c + "," + this.currentSelected.location.r + ")");
    this.updateStats(hex);

  },

  updateStats : function(hex) {
    if (hex.type === 0) {
      document.getElementById("current-hex-type").innerHTML = (" ");
    } else if (hex.type === 1) {
      document.getElementById("current-hex-type").innerHTML = ("Rock");
    } else if (hex.type === 2) {
      document.getElementById("current-hex-type").innerHTML = ("Critter");
    }
  }
}

world.critterControls = new CritterControls(world);
