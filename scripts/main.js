var type = false;
var height;
var canvas;
var width;
var ctx;

function initCanvas(){
	width = document.getElementById('main').offsetWidth;
	height = document.getElementById('main').offsetHeight;
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	canvas.width = width;
	canvas.height = height;
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
		if(camera != null && surface != null && texture != null){
			var points = surface.mesh;
			var pl = camera.changeCoord(lighting.pl);
			
			for(var i=0 ; i<points.length ; i++){
				for(var j=0 ; j<points[0].length ; j++){
					var p = points[i][j];
					
					var color = texture.getRGB(p.s, p.t);
					p = camera.changeCoord(p);
					
					//var v = camera.cam_p.sub(p);
					//var l = pl.sub(p);
					
					//var color = lighting.phong(p.normal, v, l);
					
					p = camera.projectize(p);
					
					console.log("rgb(" + color.x + ", " + color.y + ", " + color.z + ")");
					ctx.fillStyle = "rgb(" + color.x + ", " + color.y + ", " + color.z + ")";
					ctx.fillRect(p.x, p.y, 1, 1);
				}
			}
		}
	}
}

initCanvas();
initGrid();


