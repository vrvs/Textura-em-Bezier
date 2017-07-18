function Surface (controlPoint, index){
    this.index = index; 
    this.controlPoints = controlPoint; 
    this.sufacePoints = []; 
    this.mesh = [];
    this.meshTri = []; 
    
    this.pascal = function(n){
        var pascal = [];
        for(var i=0; i<=n; i++){
            pascal[i] = []; 
        }

        for(var i=0; i<=n; i++){
            pascal[i][0]=1; 
            for (var j = 1; j<=n+1; j++){
                pascal[i][j]=0;
                if (i == j) pascal[i][j] = 1; 
            }
        }
        
        for(var i = 1; i<=n; i++){
            for (var j=1; j<i; j++){
                if (pascal[i][j] == 0) pascal[i][j] = pascal[i-1][j] + pascal[i-1][j-1];
            }
        }
        
        return pascal[n];
    };
    
    
    this.bernstein = function(n, u){
        var pascal = this.pascal(n);
        var result = [];
        for (var i = 0; i<=n; i++){
            result[i] = pascal[i]*Math.pow((1-u),n-i)*Math.pow(u,i);
        }
       return result; 
    };
    
    this.tensor = function(){
        var n = controlPoints.length();
        var m  = controlPoints[0].length();
        for (var i=0; i<n; i++){
            this.mesh[i] = []; 
        }
        for (var s = 0; s<1; s += 1/this.index){
            var berS = bernstein(n,s);
            
            for(var t = 0; t<1; t += 1/this.index){
                var berT = bernstein(m,t);
                aux = new Point3D(0,0,0);
                aux2 = new Point3D(0,0,0);
                
                for (var k=0; k<n; k++){
                    for (var l=0; l<m; l++){
                        aux2 = aux2.add(controlPoints[k][l].scalarMult(berT[l]*berS[k]));           
                    }
                    aux = aux.add(aux2);
                }
                this.mesh[s][t] = aux; 
            }
        }
    };
    
    this.triangularize = function(){
        var n = controlPoints.length();
        var m  = controlPoints[0].length();
        var aux = [];

        for (var i=0; i<2; i++){
            aux[i] = []; 
        }
       
        for (var i = 0; i<n-1; i++){
            for(var j = 0; j<m-1; j++){
                //aux[i][j] = this.mesh[i][j];
                //aux[i+1][j] = this.mesh[i+1][j];
                //aux[i][j+1] = this.mesh[i][j+1];
                //aux[i+1][j+1] = this.mesh[i+1][j+1]; 
                var t1 = new Triangle(this.mesh[i][j], this.mesh[i+1][j], this.mesh[i][j+1]);
                var t2 = new Triangle(this.mesh[i+1][j+1], this.mesh[i+1][j], this.mesh[i][j+1]);
                this.meshTri.push(t1);
                this.meshTri.push(t2); 
            }
        }
    };
    
    this.scarline = function(){
        
    }
    
}