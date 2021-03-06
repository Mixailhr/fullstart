﻿
var canvas = document.getElementById('canvas'),
	 ctx = canvas.getContext('2d');

// Set to size of browser
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var centerX = canvas.width/2,
	 centerY = canvas.height/2;

var squares = [],
	 colors = ['242, 56, 90', '245, 165, 3', '74, 217, 217', '54, 177, 191'],
	 totalSquares = randomNumber(190, 230);


for (var i = 0; i < totalSquares; i++) {
	
	var p = Math.random(),
		 x = centerX,
		 y = centerY;
	
	var square = new Square(x,y,colors[Math.floor(i%colors.length)], randomNumber(3, 14), randomNumber(0.5, 1));

	square.innerX = x;
   square.innerY = y;

	squares.push(square);
}

// Draw squares
function Square(x, y, color, size, alpha) {
	
	var _this = this;
	
	_this.x = x || null;
	_this.y = y || null;
	_this.color = color || null;
	_this.size = size || null;
	_this.alpha = alpha || null;
	
	this.draw = function(ctx) {
		ctx.beginPath();
		ctx.rect(_this.x, _this.y, _this.size, _this.size);
		ctx.fillStyle = 'rgba('+_this.color+', '+_this.alpha+')';
		ctx.fill();
	}
	
}

function loop() {
	
	ctx.clearRect(0,0,canvas.width, canvas.height);
  	
	for(var i = 0; i < squares.length; i++) {
   	squares[i].draw(ctx);
  	}
 	
	requestAnimationFrame(loop);
}

loop();

function randomNumber(min, max) {
   return Math.random() * (max - min) + min;
}

var longestReturnDuration = 0,
	 returnDuration = 0;

function tweenSquares(square) {
	
	returnDuration = 1.5 + Math.random();
	
	// Keep longest duration to use for delay
	if (returnDuration > longestReturnDuration) {
		longestReturnDuration = returnDuration; 
	}
	
	TweenMax.to(square, 0.7 + Math.random(), {
		x: randomNumber(0, canvas.width),  
		y: randomNumber(0, canvas.height),
		width: 20, 
		delay: longestReturnDuration + .75,
		ease: Cubic.easeInOut,
		onComplete: function() {

			TweenMax.to(square, longestReturnDuration, {
				x: centerX,
				y: centerY,
				width: 5, 
				ease: Cubic.easeInOut,
				onComplete: function() {
					tweenSquares(square);
				}
			})
		}
	});
}

for (var i = 0; i < squares.length; i++) {
	tweenSquares(squares[i]);
}