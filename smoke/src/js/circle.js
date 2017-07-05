class Circle {
    constructor(xPosition, yPosition, maxRadius) {
        this.colorRGB = '255,255,255';
        this.currentRadius = 0;
        this.maxRadius = maxRadius;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.currentAlpha = 0;
        this.maxAlpha = 1;
        this.incrementAmount = 5;
        this.isActive = true;
    }

    update() {
        var midRadius = (this.maxRadius * 1.0) / 2;

        // When midRadius is reached, begin to fade       
        if (this.currentRadius >= midRadius) {
            var percentRadius = (midRadius - (this.currentRadius - midRadius)) / midRadius;
            this.currentAlpha = this.maxAlpha * percentRadius;

            // Slow down on growing
            this.currentRadius += (this.incrementAmount / 2);
        } else {
            var percentRadius = this.currentRadius / midRadius;
            this.currentAlpha = this.maxAlpha * percentRadius;
            this.currentRadius += this.incrementAmount;
        }

        if (this.currentRadius >= this.maxRadius) {
            this.isActive = false;
        }
    }

    draw(context) {
        if (!this.isActive) {
            return;
        }

        this.update();

        // Draw the circle
        context.beginPath();
        context.arc(this.xPosition, this.yPosition, this.currentRadius, 0, Math.PI * 2, false);
        context.closePath();

        // Color in the circle
        context.fillStyle = 'rgba(' + this.colorRGB + ',' + this.currentAlpha + ')';
        context.fill();
    }
}

class MovingCircle extends Circle {
    constructor(xPosition, yPosition, destXPosition, destYPosition, maxRadius) {
        super(xPosition, yPosition, maxRadius);

        this.positionChangeAmount = 1;
        // Calculate slope      
        this.slope = (destYPosition - this.yPosition) / (destXPosition - this.xPosition);
        // Calculate direction, 1 = right, 0 = left
        this.direction = Math.round(Math.random());
    }

    update() {
        super.update();

        // Calculate new coordinates
        var x;
        if (this.direction === 0) {
            x = this.xPosition - this.positionChangeAmount;
        } else {
            x = this.xPosition + this.positionChangeAmount;
        }

        // Solve for y
        var y = this.slope * (x - this.xPosition) + this.yPosition;

        // Update coordinates
        this.xPosition = x;
        this.yPosition = y;
    }
}