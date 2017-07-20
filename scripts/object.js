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