var zbuffer = [];

function initZbuffer(){
	for(var i = 0; i<width; i++){
		zbuffer.push([]); 
		for(var j = 0; j<height; j++){
			zbuffer[zbuffer.length-1].push(+Infinity); 
		}
	}
}

function processTriangle (triangle){
    console.log(triangle); 
    var p1 = triangle.a;
    var p2 = triangle.b; 
    var p3 = triangle.c; 
    
    var orient = Math.floor((p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x));

      var aux;
      if(orient < 0){
          /* The triangle is okay to be set */
      } else if (orient > 0) {
        aux = p2;
        p2 = p3;
        p3 = aux;
      } else if (p2.x < p1.x && p3.x < p1.x) {
        /* The triangle is okay to be set */
      } else if (p2.x > p1.x && p3.x > p1.x) {
        aux = p2;
        p2 = p3;
        p3 = aux;
      } else if (p2.x < p3.x) {
      } else {
        aux = p2;
        p2 = p3;
        p3 = aux;
      }

      triangle.p1 = p1;
      triangle.p2 = p2;
      triangle.p3 = p3;

      var ymin = p1.y;
      var ymax = Math.max(p2.y, p3.y);
      var xmin = p1.x;
      var xmax = p1.x;

      a12 = (p2.y - p1.y) / (p2.x - p1.x);
      a13 = (p3.y - p1.y) / (p3.x - p1.x);
      a23 = (p3.y - p2.y) / (p3.x - p2.x);

      var alt = true;

      if(Math.abs(p1.y - p2.y) == 0) {
        xmin = Math.min(p1.x, p2.x);
        xmax = Math.max(p1.x, p2.x);

        a12 = a23;
        alt = false;
      } else if (Math.abs(p1.y - p3.y) == 0) {
        xmin = Math.min(p1.x, p3.x);
        xmax = Math.max(p1.x, p3.x);

        a13 = a23;
        alt = false;
      }

    
    for (var y = ymin; y < ymax; y++){
        scanline(y, Math.floor(xmin), Math.floor(xmax),p1, p2, p3);
        if(alt && (y == p2.y || y == p3.y)) {
            if(y == p2.y) a12 = a23;
            else a13 = a23;
    
          alt = false;
        }
    
        if(a12 != Infinity && a12 != -Infinity && a12 != 0 && !isNaN(a12)) {
          xmin += 1 / a12;
        }
    
        if(a13 != Infinity && a13 != -Infinity && a13 != 0 && !isNaN(a13)) {
          xmax += 1 / a13;
        }  
    }
}
 

//ajeitar a classe triangulo para retornar as coordenadas baricentricas, nao o ponto ja multiplicado. 
function scanline (y, xmin, xmax,p1, p2, p3){
    for (var x = xmin; x<=xmax; x++){
        if(x < 0 || y < 0 || x >= width || y >= height) continue;
        
        
        var p = new Point2D(x, y, new Point3D(0,0,0)); 
        triangle = new Triangle2D(p1,p2,p3);
        bar = triangle.barCoord(p);
        var p13D = p1.threeD; 
        var p23D = p2.threeD;
        var p33D = p3.threeD; 
        
        var px = p13D.x*bar[0] + p23D.x*bar[1] + p33D.x*bar[2];
        var py = p13D.y*bar[0] + p23D.y*bar[1] + p33D.y*bar[2];
        var pz = p13D.z*bar[0] + p23D.z*bar[1] + p33D.z*bar[2];
        
        var p3D = new Point3D(px, py, pz);
 
        var a, b; 
        a = Math.floor(x); 
        b = Math.floor(y); 
        if(zbuffer[a][b] > p3D.z){
            zbuffer[a][b] = p3D.z; 
            
            var nx = triangle.a.normal.x*bar[0] + triangle.b.normal.x*bar[1] + triangle.c.normal.x*bar[2];
            var ny = triangle.a.normal.y*bar[0] + triangle.b.normal.y*bar[1] + triangle.c.normal.y*bar[2];
            var nz = triangle.a.normal.z*bar[0] + triangle.b.normal.z*bar[1] + triangle.c.normal.z*bar[2];
            
            var n = new Vector(nx, ny, nz); 
            p3D.normal = n; 
            
            var v = new Vector (-p3D.x, -p3D.y, -p3D.z); 
            var lp = lighting.pl;
            var l = new Vector(lp.x - p3D.x, lp.y - p3D.y, lp.z - p3D.z); 
            
            n = n.normalize(); 
            v = v.normalize();
            l = l.normalize(); 
       
             if(v.scalarProduct(n) < 0){
                var aux = n; 
                n = new Vector (-aux.x, -aux.y, -aux.z); 
            }
            
            if(!type){
                var barS = p13D.s*bar[0] + p23D.s*bar[1] + p33D.s*bar[2];
                var barT = p13D.t*bar[0] + p23D.t*bar[1] + p33D.t*bar[2];  
                lighting.ia = texture.getRGB(barS, barT);
                lighting.ka = 0.5;
            }
            var color = lighting.phong(n, v, l);
            paint(x, yscan, color); 
        }
        
    }
   
}