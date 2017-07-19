 function Point3D(x, y, z, s = 0, t = 0){
    
    //Construtor da classe de Pontos 3D
    this.x = x;     //valor de X do ponto corrente
    this.y = y;     //valor de Y do ponto corrente
    this.z = z;     //valor de Z do ponto corrente
    this.s = s;     //valor da porcentagem em sentido de S
    this.t = t;     //valor da porcentagem em sentido de T
    this.normal;    //vetor normal ao ponto
    
    this.scalarMulti = function(k){
        return (new Point3D(this.x*k, this.y*k, this.z*k)); 
    };
    
    this.add = function(a){
        return (new Point3D(this.x + a.x, this.y + a.y, this.z + a.z)); 
    };
    
    this.sub = function(a){
        return (new Point3D(this.x - a.x, this.y - a.y, this.z - a.z)); 
    };
}