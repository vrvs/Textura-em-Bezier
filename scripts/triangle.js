
function Triangle (a, b, c){
    this.a = a;
    this.b = b;
    this.c = c; 
    this.normal = new Vector(0,0,0);
    //vcetor normal do triangulo 
    this.getNormal = function(){
        var normal; 
        var vec1; 
        var vec2; 
        
        vec1 = new Vector (this.b.x - this.a.x, this.b.y - this.a.y, this.b.z - this.a.z); 
        vec2 = new Vector (this.c.x - this.a.x, this.c.y - this.a.y, this.c.z - this.a.z); 
        normal = vec1.vector_product(vec2);
        this.normal = normal.normalization(); 
    }
    
    this.getCord_bar = function(p){
        var alfa = 0; 
        var gama = 0; 
        var beta = 0; 
        var dem = 0; 
        var result = [];
        
        dem = ((this.b.y - this.c.y)*(this.a.x - this.c.x)) - ((this.b.x - this.c.x)*(this.a.y - this.c.y));
        beta = ((p.y*(this.a.x - this.c.x)) - (p.x*(this.a.y - this.c.y)))/dem; 
        alfa = (p.x - beta*(this.b.x - this.c.x))/(this.a.x - this.c.x); 
        gama = 1 - (beta + alfa);
        result.push(alfa);
        result.push(beta);
        result.push(gama);
        
        return result; 
    }
    
    this.getArea = function(){
        var vec1 = new Vector (this.b.x-this.a.x, this.b.y-this.a.y, this.b.z-this.a.z);
        var vec2 = new Vector (this.b.x-this.c.x, this.b.y-this.c.y, this.b.z-this.c.z);
        var normal = vec1.vector_product(vec2); 
        var area = Math.abs(normal.norma())/2; 
    }
    
}