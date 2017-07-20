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
    
    var xmin = 0;
    var xmax = 0;
    var ymin = 0;
    var ymax = 0;
    var a12 = 0;
    var a13 = 0;
    var a23 = 0;
    var aXmax = 0;
    var aXmin = 0;
    
    xmin = Math.min(p2.x, p3.x);
    xmax = p3.x;
    
    ymin = Math.min(p2.y, p3.y);
    ymax = p1.y;
    
    if(p2.x != p1.x){
        a12 = (p1.y - p2.y)/(p1.x - p2.x);
    }else {
        a12 = 0; 
    }if (p3.x != p2.x){
        a23 = (p2.y - p3.y)/(p2.x - p3.x);
    }else {
        a23 = 0; 
    }if(p3.x != p1.x){
        a13 = (p1.y - p3.y)/(p1.x - p3.x);
    }else {
        a13 = 0; 
    }
    
    if((p3.y - p2.y) == 0){
        aXmin = a12;
        aXmax = a13;
    }else{
        aXmin = a23;
        aXmax = a13;
    }
    
    
    for (var yscan = ymin; yscan < ymax; yscan++){
        
        if(yscan == p2.y) aXmin = a12;
        //if(yscan == p3.y) aXmax = a12;
        
        if(yscan >= height || yscan < 0){
            continue; 
        }
        
        scanline(yscan, Math.floor(xmin), Math.floor(xmax), triangle);
        /*if ( (yscan == p2.y || yscan == p3.y)){
            if((yscan-p2.y)==0){
                a12 = a23;
            }else{
                a13 = a23; 
            } 
        }*/
        if(aXmin != 0) xmin += 1/aXmin;
        if(aXmax != 0) xmax += 1/aXmax;
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
            console.log('aq');
            var color = lighting.phong(n, v, l);  
            console.log(color);
            paint(x, yscan, color); 
            console.log(count++);
        }
    }
    
}