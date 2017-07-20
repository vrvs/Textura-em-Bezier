function Point2D (x,y,p) {
    
    //Construtor da classe Point2D
    this.x = x;                         //Coordenada x do ponto
    this.y = y;                         //Coordenada y do ponto
    this.threeD = p;                     //referencia ao ponto 3D correspondente 
    this.normal = new Vector(0,0,0);    //Vetor normal do ponto no 
}