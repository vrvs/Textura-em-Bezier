
function Lighting (pl, ka, ia, kd, od, ks, il, n){
    this.pl = pl;   //posicao da luz em coordenadas de mundo
    this.ka = ka;   //reflexao ambiental
    this.ia = ia;   //vetor cor ambiental
    this.kd = kd;   //constante difusa 
    this.od = od;   //vetor difuso
    this.ks = ks;   //constante especular 
    this.il = il;   //cor da fonte de luz
    this.n = n;     //constante de rugosidade 
    
    this.stand_vector = function(){
        this.ia = this.ia.normalization();
        this.od = this.od.normalization();
    };
    
    this.phong = function(n, v, l, p, x, y){
        var env, fuzzy, specular, proKrc, color; 
        var  compDifusa, coss, aux; 
        fuzzy = new Vector(0,0,0);
        specular = new Vector(0,0,0);  
        proKrc = new Vector(0,0,0); 
        color = new Vector(0,0,0);
        
        env = this.ia.scalar_product(this.ka);  
        compDifusa = n.scalar_product(l); 
        coss = n.cosine(l); 
        aux = this.kd*compDifusa; 
        proKrc = this.od.kroneck_product(this.il); 
        aux = aux/coss; 
        fuzzy.x = aux*proKrc.x; 
        fuzzy.y = aux*proKrc.y;
        fuzzy.z = aux*proKrc.z; 
        
        
    };
    
}