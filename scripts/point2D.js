<<<<<<< HEAD
function Point2D (x,y,p) {
=======
function Point2D (x, y) {
>>>>>>> e7014680a2766d7f24db170956a568e53605a0a8
    
    //Construtor da classe Point2D
    this.x = x;                         //Coordenada x do ponto
    this.y = y;                         //Coordenada y do ponto
    this.threeD = p;                     //referencia ao ponto 3D correspondente 
    this.normal = new Vector(0,0,0);    //Vetor normal do ponto no 
}
