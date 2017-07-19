function Surface(controlPoints, evaluation){
    
    //Contrutor da superficie de bezier
    this.controlPoints = controlPoints;      //Pontos de controle da superficie de Bezier
    this.evaluation = evaluation;           //Numero de avaliações
    this.meshTri = [];                      //Malha de triangulos da superfice de Bezier
    this.mesh = [];                         //Malha de pontos da superficie de Bezie
    this.pascal;                            //Produz o trigulo de pascal
    
    //Metodo que calcula a piramide de pascal com base nos limites do ponto de controle
    this.calcPascal = function(){
        var max = Math.max(controlPoints[0].length, controlPoints.length) - 1;
        
        var pascal = [];
        for(var n=0 ; n<=max ; n++){
            pascal.push([1, 0]);
            for(var p=1 ; p<=n ; p++){
                pascal[n][p] = pascal[n-1][p-1] + pascal[n-1][p];
                pascal[n].push(0);
            }
        }
        this.pascal = pascal;
    };
    this.calcPascal();
    
    //Metodo que realiza o calculo de bernstein
    this.bernstein = function(n, i, u){
       var result = this.pascal[n][i] * Math.pow((1-u),n-i) * Math.pow(u,i);
       return result;
    };
    
    //Metodo que calcula o delta(1,0)
    this.deltaS = function(i,j) {
      var result = new Vector(0,0,0);
      result.x = controlPoints[i+1][j].x - controlPoints[i][j].x;
      result.y = controlPoints[i+1][j].y - controlPoints[i][j].y;
      result.z = controlPoints[i+1][j].z - controlPoints[i][j].z;
      return result;
    };
    
    //Metodo que calcula a derivada da superficie em relação a s
    this.partialDerivativeS = function(s,t) {
        var result = new Vector(0,0,0);
        var bernsteinS, bernsteinT,delta;
        var n = controlPoints.length()-1;
        var m = controlPoints[0].length()-1;
        for(var i=0; i<=n-1; i++) {
            bernsteinS = this.bernstein(n-1,i,s);
            for(var j=0; j<=m; j++) {
                bernsteinT = this.bernstein(m,j,t);
                delta = this.deltaS(i,j);
                result.x += bernsteinS*bernsteinT*delta.x;
                result.y += bernsteinS*bernsteinT*delta.y;
                result.z += bernsteinS*bernsteinT*delta.z;
            }
        }
        result.x *= n;
        result.y *= n;
        result.z *= n;
        return result;
    };
    
    //Metodo que calcula o delta(0,1)
    this.deltaT = function(i,j) {
      var result = new Vector(0,0,0);
      result.x = controlPoints[i][j+1].x - controlPoints[i][j].x;
      result.y = controlPoints[i][j+1].y - controlPoints[i][j].y;
      result.z = controlPoints[i][j+1].z - controlPoints[i][j].z;
      return result;
    };
    
    //Metodo que calcula a derivada da superficie em relação a t
    this.partialDerivativeT = function(s,t) {
        var result = new Vector(0,0,0);
        var bernsteinS, bernsteinT,delta;
        var n = controlPoints.length()-1;
        var m = controlPoints[0].length()-1;
        for(var i=0; i<=n; i++) {
            bernsteinS = this.bernstein(n,i,s);
            for(var j=0; j<=m-1; j++) {
                bernsteinT = this.bernstein(m-1,j,t);
                delta = this.deltaT(i,j);
                result.x += bernsteinS*bernsteinT*delta.x;
                result.y += bernsteinS*bernsteinT*delta.y;
                result.z += bernsteinS*bernsteinT*delta.z;
            }
        }
        result.x *= m;
        result.y *= m;
        result.z *= m;
        return result;
    };
    
    //Metodo que calcula os pontos de malha da superficie
    this.calcMesh = function(){
        var n = controlPoints.length-1;
        var m = controlPoints[0].length-1;
        var step = 1/this.evaluation;
        
        for(var s=0 ; s<=1 ; s+=step){
            this.mesh.push([]);
            for(var t=0 ; t<=1 ; t+=step){
                var point = new Point3D(0, 0, 0);
                for (var i=0; i<=n; i++){
                    for (var j=0; j<=m; j++){
                        var bern = this.bernstein(n, i, s) * this.bernstein(m, j, t);
                        point = point.add(controlPoints[i][j].scalarMulti(bern));
                    }
                }
                this.mesh[this.mesh.length-1].push(point);
            }
        }
    };
    this.calcMesh();
    
    //Metodo que processa os pontos da malha e cria os triangulos da superficie
    this.calcTriangle = function(){
        var maxS = this.mesh.length - 1;
        var maxT = this.mesh[0].length - 1;

        for (var i=0 ; i<maxS ; i++){
            for(var j=0 ; j<maxT ; j++){
                var t1 = new Triangle(this.mesh[i][j], this.mesh[i+1][j], this.mesh[i][j+1]);
                var t2 = new Triangle(this.mesh[i+1][j+1], this.mesh[i+1][j], this.mesh[i][j+1]);
                if(t1.isTriangle()){
                    this.meshTri.push(t1);
                }
                if(t2.isTriangle()){
                    this.meshTri.push(t2); 
                }
            }
        }
    };
    this.calcTriangle();
}

var surface = null;

//Funcão que atualiza os dados da superficie segundo os dados da entrada.
document.getElementById('surface').addEventListener('change', loadSurface, false);
function loadSurface(event){
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (function(file) {
        return function(event) {
            var count = 0;
            var input = [];
            var data = this.result.split('\n');
            for(var i=0 ; i<data.length ; i++){
                var values  = data[i].split(' ');
                for(var j=0 ; j<values.length ; j++){
                    input.push(parseInt(values[j]));
                }
            }
            
            var s = input[count++];
            var t = input[count++];
            var evaluation = input[count++];
            var controlPoints = [];
            
            count++;
            for(var i=0 ; i<=s ; i++){
                controlPoints.push([]);
                for(var j=0 ; j<=t ; j++){
                    var x = input[count++];
                    var y = input[count++];
                    var z = input[count++];
                    controlPoints[controlPoints.length-1].push(new Point3D(x, y, z));
                }
            }
            
            surface = new Surface(controlPoints, evaluation);
        };
    })(file);
    reader.readAsText(file);
}