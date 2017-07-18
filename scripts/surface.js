function Surface (controlPoint, index){
    this.index = index; 
    this.controlPoints = controlPoint; 
    
    this.pascal = function(n){
        var pascal = [[]];
        pascal[0][0] = 0;  
        for(var i  = 0;i<=n; i++){
            for (var j = 0; j<=n; j++){
                pascal[i][j]=0; 
            }
        }
        for(var i  = 0;i<=n; i++){
            for (var j = 0; j<=n; j++){
                pascal[0][i]=1; 
                if (i == j)pascal[i][j] = 1; 
            }
        }
        
        for(var i  = 1;i<=n; i++){
            for (var j = 1; j<=i; j++){
                if (pascal[i][j] == 0) pascal[i][j] = pascal[i-1][j] + pascal[i-1][j-1];
            }
        }
        
    };
}