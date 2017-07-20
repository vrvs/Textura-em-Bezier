 function Point3D(x, y, z){
    
    //Construtor da classe de Pontos 3D
    this.x = x;                         //valor de X do ponto corrente
    this.y = y;                         //valor de Y do ponto corrente
    this.z = z;                         //valor de Z do ponto corrente
    this.normal = new Vector(0,0,0);    //vetor normal ao ponto
    
    this.getViewPoint = function(camera){
        var xp = (point3D.x*camera.d)/(point3D.z*camera.hx); 
        var yp = ((point3D.x*camera.d)/point3D.z*camera.hy);
        var p = new Point2D(xp, yp);
        p.x = (p.x + 1)*(camera.width/2); 
        p.y = (1-p.y)*(camera.height/2); 
        p.normal = point3D.normal; 
        return p; 
    };
    
    this.scalarMulti = function(k){
        return (new Point3D(this.x*k, this.y*k, this.z*k)); 
    };
    
    this.add = function(a){
        return (new Point3D(this.x + a.x, this.y + a.y, this.z + a.z)); 
    };
    
    
}