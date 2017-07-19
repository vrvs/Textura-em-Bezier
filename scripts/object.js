function Object(points, pointsTriangle) {
    
    this.points = points;
    this.pointsTriangle = pointsTriangle;
    this.triangles = [];
    
    this.calcTriangle = function() {
        var triangle;
        for(var i=0; i<this.pointsTriangle.length; i++) {
            triangle = new Triangle(this.pointsTriangle[i][0],this.pointsTriangle[i][1],this.pointsTriangle[i][2]);
            if(triangle.isTriangle()) {
                this.triangles.push(triangle);
            }
        }
    };
    this.calcTriangle();
    
}