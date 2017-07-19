var width;
var height;
var canvas;
var ctx;
var texture;

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
	if(camera != null && surface != null){
		var points = surface.mesh;
		ctx.fillStyle = '#FFFFFF';
	
		for(var i=0 ; i<points.length ; i++){
			for(var j=0 ; j<points[0].length ; j++){
				var p = points[i][j];
				console.log("Point surface.mesh: " + p.x + " " + p.y + " " + p.z);
				p = camera.changeCoord(p);
				console.log("Point changeCoord: " + p.x + " " + p.y + " " + p.z);
				p = camera.projectize(p);
				console.log("Point projectize: " + p.x + " " + p.y + " " + p.z);
				ctx.fillRect(p.x, p.y, 1, 1);
			}
		}
	}
}

initCanvas();
initGrid();


