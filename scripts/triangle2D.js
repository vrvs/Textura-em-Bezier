function Triangle2D(a, b, c){
    
    //Construtor da classe triangulo
    this.a = a;     //Ponto A do triangulo
    this.b = b;     //Ponto B do triangulo
    this.c = c;     //Ponto C do triangulo
    this.normal;    //Vetor normal do triangulo
    
    this.barCoord = function(p){
        
      var denom = (this.a.x - this.c.x) * (this.b.y - this.c.y) - (this.b.x - this.c.x) * (this.a.y - this.c.y);

	    var	alfa = ((p.x - this.c.x) * (this.b.y - this.c.y) - (this.b.x - this.c.x) * (p.y - this.c.y)) / denom;
	    var	beta = ((this.a.x - this.c.x) * (p.y - this.c.y) - (p.x - this.c.x) * (this.a.y - this.c.y)) / denom;
	    var	gama = 1.0 - alfa - beta;

        
        return [alfa, beta, gama]; 
    };
    
    this.sort = function(){
        var aux;
      if(this.a.y > this.b.y) {
        aux = this.a;
        this.a = this.b;
        this.b = aux;
      }
      if(this.a.y > this.c.y) {
        aux = this.a;
        this.a = this.c;
        this.c = aux;
      }
      if(this.b.y > this.c.y) {
        aux = this.b;
        this.b = this.c;
        this.c = aux;
      }
    };
    
    this.clone = function(){
        return (new Triangle(this.a, this.b, this.c));
    };
}