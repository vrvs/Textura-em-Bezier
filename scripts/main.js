var width;
var height;
var canvas;
var ctx;
var points = [];
var points2D = []; 

function initCanvas(){
	width = document.getElementById('main').offsetWidth;
	height = document.getElementById('main').offsetHeight;
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	canvas.width = width;
	canvas.height = height;
}

function constObject (triangles){
	for(var i = 0; i<triangles.length; i++){
		processTriangle(triangles[i]); 
	}
}

document.getElementById("draw").addEventListener('click', draw);
function draw(){
	if(camera != null && surface != null){
		var points = surface.mesh;
		var triangles = surface.meshTri;
		ctx.fillStyle = '#FFFFFF';
	

		constObject(triangles);
	}
}

function paint(x, y, color) {
  ctx.fillStyle = "rgb(" + color.x + ", " + color.y + ", " + color.z + ")";
  ctx.fillRect(x, y, 1, 1);
}


initCanvas();
initGrid();
initZbuffer();
