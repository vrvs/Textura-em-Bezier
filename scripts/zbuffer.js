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
    
    var p1 = triangle.a;
    var p2 = triangle.b; 
    var p3 = triangle.c; 
    
    var ymax = p1.y; 
    var ymin = Math.min(p2.y, p3.y); 
    var xmin = p1.x; 
    var xmax = p1.x;
    var ang12, ang23, ang31;  
    
    if(p2.x != p1.x){
        ang12 = (p2.y - p1.y)/(p2.x - p1.x);
    }else {
        ang12 = 0; 
    }if (p3.x != p2.x){
        ang23 = (p3.y - p2.y)/(p3.x - p2.x);
    }else {
        ang23 = 0; 
    }if(p3.x != p1.x){
        ang31 = (p3.y - p1.y)/(p3.x - p1.x);
    }else {
        ang31 = 0; 
    }
    var alt = true; 
    if((p3.y - p2.y) == 0){
        xmin = Math.min(p3.x, p2.x);
        xmax = Math.max(p3.x, p2.x); 
        ang23 = ang12; 
        alt = false; 
    }else if ((p1.y - p3.y) == 0){
        xmin = Math.min(p1.x, p3.x);
        xmax = Math.max(p1.x, p3.x);
        ang31 = ang23; 
        alt = false;
    }
    
    
    for (var yscan = ymin; yscan < ymax; yscan++){
        if(yscan >= height || yscan < 0){
            continue; 
        }
        
        scanline(yscan, Math.floor(xmin), Math.floor(xmax), triangle);
        if (alt && (yscan == p2.y || yscan == p3.y)){
            if(yscan-p2.y){
                ang21 = ang23;
            }else{
                ang31 = ang23; 
            }
            alt = false; 
        }
        if(ang12 != 0){
            xmin += 1/ang12; 
        }
        if(ang31 != 0){
            xmax += 1/ang31;  
        }
    }
    
}
var count=0; 

//ajeitar a classe triangulo para retornar as coordenadas baricentricas, nao o ponto ja multiplicado. 
function scanline (yscan, xmin, xmax, triangle){
    var bar; 
    for (var x = xmin; x<=xmax; x++){
        if(x<0 || x>= width ){
            continue; 
        }
        
        var p = new Point2D(x, yscan, new Point3D(0,0,0)); 
        bar = triangle.barCoord(p); 
        var p13D = triangle.a.threeD; 
        var p23D = triangle.b.threeD;
        var p33D = triangle.c.threeD; 
        
        var px = p13D.x*bar[0] + p23D.x*bar[1] + p33D.x*bar[2];
        var py = p13D.y*bar[0] + p23D.y*bar[1] + p33D.y*bar[2];
        var pz = p13D.z*bar[0] + p23D.z*bar[1] + p33D.z*bar[2];
        
        var p3D = new Point3D(px, py, pz);
 
        var a, b; 
        a = Math.floor(x); 
        b = Math.floor(yscan); 
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