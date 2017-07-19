function Camera (cam_p, n, v, hx, hy, d, width, height){
    
    this.cam_p = cam_p;     //Ponto da camera
    this.n = n;             //Direção da camera
    this.v = v;             //Define o plano vertical da camera
    this.hx = hx;           //Distancia da camera na horizontal
    this.hy = hy;           //Distancia da camera na vertical
    this.d = d;             //Distancia do plano de projecao a origem do sistemas de coordenadas
    this.width = width;     //Comprimento da tela do canvas
    this.height = height;   //Altura da tela do canvas
    this.ssc = [];          //Matriz de mudanca de base de coordenada universal para a coordenada da camera
    
    this.getCordSist = function(){
        this.n = this.n.normalization();                //Normaliza o vetor N
        this.v = this.v.gram_schmidt(this.n);           //Ortagonaliza V com relação a N com Gram-Schimidt 
        this.v = this.v.normalization();                
        var u = this.n.vector_product(this.v);
        this.ssc.push([u.x, u.y, u.z]);
        this.ssc.push([this.v.x, this.v.y, this.v.z]); 
        this.ssc.push([this.n.x, this.n.y, this.n.z]);     
    };
    
    this.getChangeCord = function(p){
        var cam_cord = p.sub(p, this.cam_p); 
        var returnPoint = [];
        returnPoint.push(this.d[0][0]*p[0]+d[0][1]*p[1]+d[0][2]*p[2]);
        returnPoint.push(this.d[1][0]*p[0]+d[1][1]*p[1]+d[1][2]*p[2]);
        returnPoint.push(this.d[2][0]*p[0]+d[2][1]*p[1]+d[2][2]*p[2]);
        return returnPoint;
    };
    
    this.getProjection = function(point3D){
        return point3D.getViewPoint(this); 
    };
}