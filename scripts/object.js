function Object(points, pointsTriangle) {
    
    //Contrutor da classe objeto
    this.points = points;                       //Array de pontos dos triangulos 
    this.pointsTriangle = pointsTriangle;       
    this.triangles = [];
    
    this.calcTriangle = function(){
        var triangle;
        for(var i=0; i<this.pointsTriangle.length; i++){
            var ia = this.pointsTriangle[i][0]-1;
            var ib = this.pointsTriangle[i][1]-1;
            var ic = this.pointsTriangle[i][2]-1;
            var a = this.points[ia];
            var b = this.points[ib];
            var c = this.points[ic];
            triangle = new Triangle(a, b, c);
            if(triangle.isTriangle()){
                this.points[ia].normal = this.points[ia].normal.add(triangle.normal);
                this.points[ib].normal = this.points[ib].normal.add(triangle.normal);
                this.points[ic].normal = this.points[ic].normal.add(triangle.normal);
            }
        }
        for(var i=0; i<this.pointsTriangle.length; i++){
            var a = this.points[this.pointsTriangle[i][0]-1];
            var b = this.points[this.pointsTriangle[i][1]-1];
            var c = this.points[this.pointsTriangle[i][2]-1];
            triangle = new Triangle(a, b, c);
            if(triangle.isTriangle()){
                this.triangles.push(triangle);
            }
        }
    };
    this.calcTriangle();
}

var object = null;

//Funcão que atualiza os dados da camera segundo os dados da entrada.
document.getElementById('object').addEventListener('change', loadObject, false);
function loadObject(event){
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
            
            var numberPoints = input[count++];
            var numberTriangles = input[count++];
            
            var points = [];
            for(var i=0 ; i<numberPoints ; i++){
                var x = input[count++];
                var y = input[count++];
                var z = input[count++];
                
                points.push(new Point3D(x, y, z));
            }
            
            var pointsTriangle = [];
            for(var i=0 ; i<numberTriangles ; i++){
                var a = input[count++];
                var b = input[count++];
                var c = input[count++];
                
                pointsTriangle.push([a, b, c]);
            }
            
            object = new Object(points, pointsTriangle);
        };
    })(file);
    reader.readAsText(file);
}