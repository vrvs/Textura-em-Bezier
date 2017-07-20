 function Point3D(x, y, z, s, t){
    
    //Construtor da classe de Pontos 3D
    this.x = x;                             //valor de X do ponto corrente
    this.y = y;                             //valor de Y do ponto corrente
    this.z = z;                             //valor de Z do ponto corrente
    this.s = s;                             //valor da porcentagem em sentido de S
    this.t = t;                             //valor da porcentagem em sentido de T
    this.normal = new Vector(0, 0, 0);      //vetor normal ao ponto
    
    //Metodo que realiza a multiplicação por escalar em um ponto
    this.scalarMulti = function(k){
        return (new Point3D(this.x*k, this.y*k, this.z*k)); 
    };
    
    //Metodo que realiza a soma de dois pontos
    this.add = function(a){
        return (new Point3D(this.x + a.x, this.y + a.y, this.z + a.z)); 
    };
    
    //Metodo que translada um ponto com relação a outro
    this.translate = function(a){
        var p = new Point3D(this.x - a.x, this.y - a.y, this.z - a.z);
        p.normal = this.normal;
        return p; 
    };
    
    //Metodo que retorna o vetor da diferença de dois pontos
    this.sub = function(a){
        return (new Vector(this.x - a.x, this.y - a.y, this.z - a.z)); 
    };
}