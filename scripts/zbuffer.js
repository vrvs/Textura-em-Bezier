function processTriangle (triangle, index){
    
    var p1 = triangle.a;
    var p2 = triangle.b; 
    var p3 = triangle.c; 
    
    var minY = p1.y; 
    var maxY = Math.max(p2.y, p3.y); 
    var minX = p1.x; 
    var maxX = p1.x;
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
    if((p1.y - p2.y) == 0){
        minX = Math.min(p1.x, p2.x);
        maxX = Math.max(p1.x, p2.x); 
    }else if ((p1.y - p3.y) == 0){
        minX = Math.min(p1.x, p3.x);
        maxX = Math.max(p1.x, p3.x);
    }
    
    for (var yscan = ymin; yscan < ymax; yscan++){
        if(yscan >= width || yscan < 0){
            continue; 
        }
        scanline(yscan, Math.floor(xmin), Math.floor(xmax), triangle, index);
        if(ang12 != 0){
            minX += 1/ang12; 
        }
        if(ang31 != 0){
            maxX += 1/ang31;  
        }
    }
    
}
//ajeitar a classe triangulo para retornar as coordenadas baricentricas, nao o ponto ja multiplicado. 
function scanline (yscan, xmin, xmax, triangle, index){
    var bar = []; 
    for (var x = xmin; x<xmax; x++){
        if(x<0 || x>= width ){
            continue; 
        }

        var p = new Point2D(x, yscan); 
        bar = triangle.barCoord(p); 
        var p3D = new Point3D(bar[0]*triangle.p1, bar[1]*triangle.p2, bar[2]*triangle.p3);
        
        if(zbuffer[p3D.x][p3D.y] > p3D.z){
            zbuffer[p3D.x][p3D.y] = p3D.z; 
            
            var nx = triangle.a.normal.x*bar[0] + triangle.b.normal.x*bar[1] + triangle.c.normal.x*bar[2];
            var ny = triangle.a.normal.y*bar[0] + triangle.b.normal.y*bar[1] + triangle.c.normal.y*bar[2];
            var nz = triangle.a.normal.z*bar[0] + triangle.b.normal.z*bar[1] + triangle.c.normal.z*bar[2];
            
            var n = new vector(nx, ny, nz); 
            p3D.normal = n; 
            
            var v = new Vector (-p3D.x, -p3D.y, -p3D.z); 
            var l = new Vector (plVista.x - p3D.x, plVista.y - p3D.y, plVista.z - p3D.z); 
            
            n = n.normalize(); 
            v = v.normalize();
            l = l.normalize(); 
       
             if(v.scalarProduct(n) < 0){
                var aux = n; 
                n = new Vector (-n.x, -n.y, -n.z); 
            }
            color = ligthing.phong(n, v, l, p3D, x, yscan);  
            paint(x, yscan, color); 
        }
    }
    
}