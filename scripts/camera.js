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
    
    this.calcCamera = function(){
        this.n = this.n.normalize();                    //Normaliza o vetor N
        this.v = this.n.gramSchmidt(this.v);            //Ortagonaliza V com relação a N com Gram-Schimidt 
        this.v = this.v.normalize();                
        var u = this.n.vectorProduct(this.v);
        this.ssc.push([u.x, u.y, u.z]);
        this.ssc.push([this.v.x, this.v.y, this.v.z]); 
        this.ssc.push([this.n.x, this.n.y, this.n.z]);     
    };
    this.calcCamera();
    
    this.changeCoord = function(p){
        p = p.translate(this.cam_p);
        var x = this.ssc[0][0]*p.x + this.ssc[0][1]*p.y + this.ssc[0][2]*p.z;
        var y = this.ssc[1][0]*p.x + this.ssc[1][1]*p.y + this.ssc[1][2]*p.z;
        var z = this.ssc[2][0]*p.x + this.ssc[2][1]*p.y + this.ssc[2][2]*p.z;
        var a = new Point3D(x, y, z);
        a.normal = p.normal;
        return a;
    };
    
    this.projectize = function(a){
        var xp = (a.x*this.d)/(a.z*this.hx); 
        var yp = (a.y*this.d)/(a.z*this.hy);
        var p = new Point2D(xp, yp);
        p.x = (p.x + 1)*(this.width/2); 
        p.y = (1 - p.y)*(this.height/2);
        p.normal = a.normal;
        return p;
    };
}

var camera = null;

//Funcão que atualiza os dados da camera segundo os dados da entrada.
document.getElementById('camera').addEventListener('change', loadCamera, false);
function loadCamera(event){
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
            
            var cam_p = new Point3D(input[count++], input[count++], input[count++]);
            var n = new Vector(input[count++], input[count++], input[count++]);
            var v = new Vector(input[count++], input[count++], input[count++]);
            var d = input[count++];
            var hx = input[count++];
            var hy = input[count++];
            var height = document.getElementById('main').offsetHeight;
            var width = document.getElementById('main').offsetWidth;
            
            camera = new Camera(cam_p, n, v, hx, hy, d, width, height);
        };
    })(file);
    reader.readAsText(file);
}