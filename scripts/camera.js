import Vector from 'Vector.js'; 
import Point3D from 'Point3D.js'; 
import Point2D from 'Point2D.js'; 

function Camera (cam_p, n, v, hx, hy, d, width, height){
    //ponto da camera 
    this.cam_p = cam_p;
    this.n = n; 
    this.v = v; 
    this.hx = hx; 
    this.hy = hy;
    this.width = width;
    this.height = height; 
    //distancia do plano de projecao a origem do sistemas de coordenadas
    this.d = d; 
    //matriz de mudanca de base de coordenada universal para a coordenada da camera
    this.ssc = []; 
    
    this.getCordSist = function(){
        this.n = this.n.normalization();
        //faz a projecao de v em n para obter uma diretiz de v ortogonal a n
        this.v = this.v.gram_schmidt(this.n);
        this.n = v.normalization();
        var u = this.n.vector_product(this.v);
        this.ssc.push([u.x, u.y, u.z]);
        this.ssc.push([this.v.x, this.v.y, this.v.z]); 
        this.ssc.push([this.n.x, this.n.y, this.n.z]);     
    }
    this.getChangeCord = function(p){
        var cam_cord = p.sub(p, this.cam_p); 
        var returnPoint = [];
        returnPoint.push(this.d[0][0]*p[0]+d[0][1]*p[1]+d[0][2]*p[2]);
        returnPoint.push(this.d[1][0]*p[0]+d[1][1]*p[1]+d[1][2]*p[2]);
        returnPoint.push(this.d[2][0]*p[0]+d[2][1]*p[1]+d[2][2]*p[2]);
        return returnPoint;
    }
    
    this.getProjection = function(point3D){
        return point3D.getViewPoint(this); 
    }
    
}