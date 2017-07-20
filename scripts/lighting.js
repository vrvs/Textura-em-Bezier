
function Lighting (pl, ka, ia, kd, od, ks, il, n){
    this.pl = pl;   //posicao da luz em coordenadas de mundo
    this.ka = ka;   //reflexao ambiental
    this.ia = ia;   //vetor cor ambiental
    this.kd = kd;   //constante difusa 
    this.od = od;   //vetor difuso
    this.ks = ks;   //constante especular 
    this.il = il;   //cor da fonte de luz
    this.n = n;     //constante de rugosidade 
    
    this.phong = function(n, v, l, p, x, y){
        var ambient = this.ia;
        var diffuse = this.od;
        var specular = this.il; 
        var color = new Vector(0,0,0);
        var r,aux; 
        n = n.normalize();
        l = l.normalize();
        v = v.normalize();
        ambient.x *= this.ka;
        ambient.y *= this.ka;
        ambient.z *= this.ka;
        var nl = n.scalarProduct(l);
        diffuse.x = diffuse.x*this.il.x*nl*kd;
        diffuse.y = diffuse.y*this.il.y*nl*kd;
        diffuse.z = diffuse.z*this.il.z*nl*kd;
        if(nl < 0){
            diffuse = new Vector(0,0,0); 
            specular = new vector(0,0,0); 
        }else{
            r = n;
            r.x = 2*nl*n.x; 
            r.y = 2*nl*n.y; 
            r.z = 2*nl*n.z; 
            r = r.sub(l);
            r = r.normalize(); 
            if(r.scalarProduct(v) < 0){
                diffuse = new Vector(0,0,0);
                aux = this.ks * Math.pow(r.scalarProduct(v),this.n);
                specular.x *= aux;
                specular.y *= aux;
                specular.z *= aux
            }
        }
        color.add(ambient);
        color.add(diffuse);
        color.add(specular);
        color.x = Math.floor(Math.min(color.x,255));
        color.y = Math.floor(Math.min(color.y,255));
        color.z = Math.floor(Math.min(color.z,255));
        return color;
    };
    
}