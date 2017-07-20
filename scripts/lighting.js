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
        var ambient = this.ia;
        var diffuse = this.od;
        var specular = this.il; 
        var color = new Vector(0,0,0);
        var r,aux; 
        n = n.normalize();
        l = l.normalize();
        v = v.normalize();
        ambient.x *= this.ka;
        ambient.y *= this.ka;
        ambient.z *= this.ka;
        var nl = n.scalarProduct(l);
        diffuse.x = diffuse.x*this.il.x*nl*kd;
        diffuse.y = diffuse.y*this.il.y*nl*kd;
        diffuse.z = diffuse.z*this.il.z*nl*kd;
        if(nl < 0){
            diffuse = new Vector(0,0,0); 
            specular = new vector(0,0,0); 
        }else{
            r = n;
            r.x = 2*nl*n.x; 
            r.y = 2*nl*n.y; 
            r.z = 2*nl*n.z; 
            r = r.sub(l);
            r = r.normalize(); 
            if(r.scalarProduct(v) < 0){
                diffuse = new Vector(0,0,0);
                aux = this.ks * Math.pow(r.scalarProduct(v),this.n);
                specular.x *= aux;
                specular.y *= aux;
                specular.z *= aux
            }
        }
        color.add(ambient);
        color.add(diffuse);
        color.add(specular);
        color.x = Math.floor(Math.min(color.x,255));
        color.y = Math.floor(Math.min(color.y,255));
        color.z = Math.floor(Math.min(color.z,255));
        return color;
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