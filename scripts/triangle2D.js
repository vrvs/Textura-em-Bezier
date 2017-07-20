function Triangle2D(a, b, c){
    
    //Construtor da classe triangulo
    this.a = a;     //Ponto A do triangulo
    this.b = b;     //Ponto B do triangulo
    this.c = c;     //Ponto C do triangulo
    this.normal;    //Vetor normal do triangulo
    
    this.barCoord = function(p){
        var dX = this.a.x - this.c.x;
        var dY = this.a.y - this.c.y;
        
        var beta = ((p.y - this.c.y)*dX - (p.x - this.c.x)*dY)/((this.b.y - this.c.y)*dX - (this.b.x - this.c.x)*dY);
        var alfa = ((p.x - this.c.x) - (this.b.x - this.c.x)*beta)/dX;
        var gama = 1 - beta - alfa;
        
        return [alfa, beta, gama]; 
    };
    
    this.sort = function(){
        var t = this.clone();
        var aux;
        
        if(t.a.y < t.b.y){
            aux = t.a;
            t.a = t.b;
            t.b = aux;
        } else if(t.a.y === t.b.y && t.a.x > t.b.x){
            aux = t.a;
            t.a = t.b;
            t.b = aux;
        }
        if(t.a.y < t.c.y){
            aux = t.a;
            t.a = t.c;
            t.c = aux;
        } else if(t.a.y === t.c.y && t.a.x > t.c.x){
            aux = t.a;
            t.a = t.c;
            t.c = aux;
        }
        if(t.b.y < t.c.y){
            aux = t.b;
            t.b = t.c;
            t.c = aux;
        } else if(t.b.y === t.c.y && t.b.x > t.c.x){
            aux = t.b;
            t.b = t.c;
            t.c = aux;
        }
        return t;
    };
    
    this.clone = function(){
        return (new Triangle(this.a, this.b, this.c));
    };
    
    
}