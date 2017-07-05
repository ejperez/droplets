var mainCanvas = document.querySelector("#myCanvas");
var mainContext = mainCanvas.getContext("2d");

var canvasWidth = mainCanvas.width;
var canvasHeight = mainCanvas.height;

var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

var circles = [];
var circlesForCleanup = [];

var createCircle = function (evt) {
    var mousePos = getMousePos(mainCanvas, evt);
    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;

    var random = Math.round(Math.random())

    if (random === 0) {
        var circle = new Circle(mousePos.x, mousePos.y, generateRandomInt(50, 200));
    } else {
        var circle = new MovingCircle(mousePos.x, mousePos.y, generateRandomInt(mousePos.x - 10, mousePos.x + 10), generateRandomInt(mousePos.y - 10, mousePos.y + 10), generateRandomInt(50, 200))
    }

    circle.maxAlpha = 0.1;

    circles.push(circle);
};

mainCanvas.addEventListener('mousemove', throttle(createCircle, 1), false);

function draw() {
    mainContext.clearRect(0, 0, canvasWidth, canvasHeight);

    // Color in the background
    mainContext.fillStyle = "#111";
    mainContext.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw the circles
    circles.forEach(function (circle, index) {
        if (circle !== null && circle.isActive) {
            circle.draw(mainContext);
        } else {
            circlesForCleanup.push(index);
        }
    });

    // Cleanup the inactive circles
    var currentcircleIndex = circlesForCleanup.pop();
    while (currentcircleIndex !== undefined) {
        circles.splice(currentcircleIndex, 1);
        currentcircleIndex = circlesForCleanup.pop();
    }

    console.log(circles.length);

    requestAnimationFrame(draw);
}

draw();