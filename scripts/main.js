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
		if(camera != null && lighting != null && object != null){
			triangles = object.triangles;
			changeDimension(triangles);
			
			ctx.fillStyle = '#FFFFFF';
			constObject(triangles2D);
		}	
	} else {
		if(camera != null && lighting != null && surface != null && texture != null){
			triangles = surface.meshTri;
			changeDimension(triangles);
			ctx.fillStyle = '#FFFFFF';
			constObject(triangles2D);
		}
	}
}


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
		triangles2D.push(triangle.sort()); 
		
	}
}

function paint(x, y, color) {
  ctx.fillStyle = "rgb(" + color.x + ", " + color.y + ", " + color.z + ")";
  ctx.fillRect(x, y, 1, 1);
}


initCanvas();
initGrid();
initZbuffer();
