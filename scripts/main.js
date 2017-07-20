var type = false;
var height;
var canvas;
var width;
var ctx;
var triangles2D = []; 
var triangles = []; 


function initCanvas(){
	width = document.getElementById('main').offsetWidth;
	height = document.getElementById('main').offsetHeight;
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	canvas.width = width;
	canvas.height = height;
}
function constObject (triangles2D){
	for(var i = 0; i<triangles2D.length; i++){
		console.log(triangles2D[i]);
		processTriangle(triangles2D[i]); 
	}
}

document.getElementById("typeObject").style.display = 'none';
document.getElementById("cbObject").addEventListener('change', toggleType);
function toggleType(){
	type = !type;
	if(type){
		document.getElementById("typeSurface").style.display = 'none';
		document.getElementById("typeObject").style.display = 'block';
	} else {
		document.getElementById("typeSurface").style.display = 'block';
		document.getElementById("typeObject").style.display = 'none';
	}
}

document.getElementById("draw").addEventListener('click', draw);
function draw(){
	if(type){
		if(camera != null && object != null){
			var points = object.points;
			ctx.fillStyle = '#FFFFFF';
			
			for(var i=0 ; i<points.length ; i++){
				var p = points[i];
				p = camera.changeCoord(p);
				p = camera.projectize(p);
				ctx.fillRect(p.x, p.y, 1, 1);
			}
		}	
	} else {
		if(camera != null && surface != null && lighting != null){
			var points = surface.mesh;
			var pl = camera.changeCoord(lighting.pl);
			
			for(var i=0 ; i<points.length ; i++){
				for(var j=0 ; j<points[0].length ; j++){
					var p = points[i][j];
					p = camera.changeCoord(p);
					
					var v = camera.cam_p.sub(p);
					var l = pl.sub(p);
					
					var color = lighting.phong(p.normal, v, l);
					
					p = camera.projectize(p);
					
					ctx.fillStyle = "rgb(" + color.x + ", " + color.y + ", " + color.y + ")";
					ctx.fillRect(p.x, p.y, 1, 1);
				}
			}
		}
	}
}
//tranformar os pontos 3D em 2D

function changeDimension (triangles){
	for(var i = 0; i<triangles.length; i++){
		
		var aux = triangles[i];
		
		var a = aux.a;
		var b = aux.b;
		var c = aux.c; 
		var aCameraCoord = camera.changeCoord(a); 
		var bCameraCoord = camera.changeCoord(b);
		var cCameraCoord = camera.changeCoord(c);
		
		var a2D = camera.projectize(aCameraCoord); 
		var b2D = camera.projectize(bCameraCoord);
		var c2D = camera.projectize(cCameraCoord); 
		var triangle = new Triangle2D(a2D, b2D, c2D); 
		triangles2D.push(triangle); 
		
	}
}

function paint(x, y, color) {
  ctx.fillStyle = "rgb(" + color.x + ", " + color.y + ", " + color.z + ")";
  ctx.fillRect(x, y, 1, 1);
}


initCanvas();
initGrid();
initZbuffer();
