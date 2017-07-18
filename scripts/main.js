var width;
var height;
var canvas;
var ctx;

function initCanvas(){
	width = document.getElementById('main').offsetWidth;
	height = document.getElementById('main').offsetHeight;
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	canvas.width = width;
	canvas.height = height;
}

document.getElementById("draw").addEventListener('click', draw);
function draw(){
	
}

initCanvas();
initGrid();

var v = new Vector( 1, 2, 3);
var w = new Vector( 3, 2, 1);

var vec = v.vectorProduct(w);
console.log("result = " + vec.x + " " + vec.y + " " + vec.z);
