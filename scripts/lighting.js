function Lighting (pl, ka, ia, kd, od, ks, il, n){
    
    //Construtor da classe de iluminação
    this.pl = pl;   //posicao da luz em coordenadas de mundo
    this.ka = ka;   //reflexao ambiental
    this.ia = ia;   //vetor cor ambiental
    this.kd = kd;   //constante difusa 
    this.od = od;   //vetor difuso
    this.ks = ks;   //constante especular 
    this.il = il;   //cor da fonte de luz
    this.n = n;     //constante de rugosidade 
    
    this.phong = function(n, v, l, p, x, y){
        var env, fuzzy, specular, proKrc, color; 
        var  compDifusa, coss, aux; 
        fuzzy = new Vector(0,0,0);
        specular = new Vector(0,0,0);  
        proKrc = new Vector(0,0,0); 
        color = new Vector(0,0,0);
        
        env = this.ia.scalar_product(this.ka);  
        compDifusa = n.scalar_product(l); 
        coss = n.cosine(l); 
        aux = this.kd*compDifusa; 
        proKrc = this.od.kroneck_product(this.il); 
        aux = aux/coss; 
        fuzzy.x = aux*proKrc.x; 
        fuzzy.y = aux*proKrc.y;
        fuzzy.z = aux*proKrc.z; 
    };
}

var lighting = null;

//Funcão que atualiza os dados da camera segundo os dados da entrada.
document.getElementById('lighting').addEventListener('change', loadLighting, false);
function loadLighting(event){
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
                    input.push(parseFloat(values[j]));
                }
            }
            
            var pl = new Point3D(input[count++], input[count++], input[count++]);
            var ka = input[count++];
            var ia = new Vector(input[count++], input[count++], input[count++]);
            var kd = input[count++];
            var od = new Vector(input[count++], input[count++], input[count++]);
            var ks = input[count++]; 
            var il = new Vector(input[count++], input[count++], input[count++]);
            var n = input[count++]; 
            
            lighting = new Lighting (pl, ka, ia, kd, od, ks, il, n);
        };
    })(file);
    reader.readAsText(file);
}