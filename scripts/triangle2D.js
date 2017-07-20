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
    this.clone = function(){
        return (new Triangle(this.a, this.b, this.c));
    };
    
    
}