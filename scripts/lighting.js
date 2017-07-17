
function Lighting (pl, ka, ia, kd, od, ks, il, n){
    this.pl = pl;
    this.ka = ka;
    this.ia = ia;
    this.kd = kd; 
    this.od = od; 
    this.ks = ks; 
    this.il = il; 
    this.n = n; 
    
    this.stand_vector = function(){
        this.ia = this.ia.normalization();
        this.od = this.od.normalization();
    }
    
    
}