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


var points = [[new Point3D(1,-1,0), new Point3D(0,-1,0), new Point3D(-1,-1,0)], 
			  [new Point3D(1,0,2), new Point3D(0,0,0), new Point3D(-2,0,1)],
			  [new Point3D(2,1,-1), new Point3D(-1,1,-1), new Point3D(-1,1,0)]];

var supf = new Surface(points, 2);

var mesh = supf.mesh;
console.log("Point mesh: " + mesh[1][1].x + " " + mesh[1][1].y + " " + mesh[1][1].z);

for(var i = 0; i<=2; i++){
	var str = "";
	for(var j=0; j<=i ; j++){
		str = str + supf.pascal[i][j] + " ";
	}
	console.log(str);
}
