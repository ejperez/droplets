function Droplet() {
    this.colorRGB = '255,255,255';
    this.currentRadius = 0;
    this.maxRadius = 200;
    this.xPosition = 255;
    this.yPosition = 255;
    this.alpha = 1;
    this.incrementAmount = 5;
    this.isActive = true;
    this.update = function () {
        var midRadius = (this.maxRadius * 1.0) / 2;

        // When midRadius is reached, begin to fade
        if (this.currentRadius >= midRadius) {
            this.alpha = (midRadius - (this.currentRadius - midRadius)) / midRadius;
            this.currentRadius += (this.incrementAmount / 2);
        } else {
            this.alpha = this.currentRadius / midRadius;
            this.currentRadius += this.incrementAmount;
        }

        if (this.currentRadius >= this.maxRadius) {
            this.isActive = false;
        }
    };
    this.draw = function (context) {
        if (!this.isActive) {
            return;
        }

        this.update();

        // draw the circle
        context.beginPath();

        // context.arc(this.xPosition, this.yPosition, this.radius, 0, Math.PI * 2, false);
        context.arc(this.xPosition, this.yPosition, this.currentRadius, 0, Math.PI * 2, false);
        context.closePath();

        // color in the circle
        context.fillStyle = 'rgba(' + this.colorRGB + ',' + this.alpha + ')';
        context.fill();
    }
};