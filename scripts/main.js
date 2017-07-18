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
var a = [[3,2,1], [1,2,3]]; 
var surf = new Surface(a, 1);
var pascal = surf.pascal(3);
var ber = surf.bernstein(3, 0.5); 

for(var i = 0; i<=3; i++){
	console.log(pascal[i] + "");
	console.log(ber[i] + " ");
}
