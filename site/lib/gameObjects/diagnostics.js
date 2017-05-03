function Diagnostics(mainCanvas) {
    this.overlayCanvas = document.createElement('canvas');
    this.overlayCanvas.style.zIndex="1000";
    this.overlayCanvas.style.position = 'absolute';
    this.overlayCanvas.style.left = '0px';
    this.overlayCanvas.style.top = '0px';
    this.overlayCanvas.width = 1024;
    this.overlayCanvas.height = 768;
    mainCanvas.appendChild(this.overlayCanvas);
	
	this.ctx = this.overlayCanvas.getContext("2d");
}

Diagnostics.prototype.process = function(time, delta) {
	this.ctx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);
	
	this.ctx.fillStyle = "#FF0000";
	this.ctx.font = "30px Arial";
	
	this.ctx.fillText((1 / delta).toFixed(2) + "fps", 20, 80);
}