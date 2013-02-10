var Class = require('../../core/class');
var Container = require('../../core/container');
var Node = require('./node');

module.exports = Class(Node, Container, {
	
	initialize: function(width, height){
		this.width = width;
		this.height = height;
		this.children = [];
	},
	
	// rendering
	
	renderLayerTo: function(context, xx, yx, xy, yy, x, y){
		if (this._invisible) return null;

		x = xx * this.x + xy * this.y + x;
		y = yx * this.x + yy * this.y + y;

		var t = xx;
		xx = t * this.xx + xy * this.yx;
		xy = t * this.xy + xy * this.yy;
		t = yx;
		yx = t * this.xx + yy * this.yx;
		yy = t * this.xy + yy * this.yy;

		var children = this.children, hitTarget;
		for (var i = 0, l = children.length; i < l; i++){
			var hit = children[i].renderTo(context, xx, yx, xy, yy, x, y);
			if (hit) hitTarget = hit;
		}
		return hitTarget;
	}

});
