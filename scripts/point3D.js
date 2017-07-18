import Vector from 'vector.js'; 
import Point2D from 'Point2D.js';  
function Point3D(x, y, z){
    this.x = x; 
    this.y = y; 
    this.z = z; 
    this.normal = new Vector(0,0,0);
    
    this.getViewPoint = function(camera){
        var xp = (point3D.x*camera.d)/(point3D.z*camera.hx); 
        var yp = ((point3D.x*camera.d)/point3D.z*camera.hy);
        var p = new Point2D(xp, yp);
        p.x = (p.x + 1)*(camera.width/2); 
        p.y = (1-p.y)*(camera.height/2); 
        p.normal = point3D.normal; 
        return p; 
    };
    
    this.scalarMult = function(a){
        return new Point3D(this.x*a, this.y*a, this.z*a); 
    };
    
    this.add = function(a){
        return new Point3D(this.x + a.x, this.y + a.y, this.z + a.z); 
    };
    
    
}