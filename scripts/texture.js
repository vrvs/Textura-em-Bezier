function Texture(context, width, height){
    this.img = context;
    this.height = height;
    this.width = width;
    
    this.getRGB = function(s, t){
        var canvasColor = this.img.getImageData(s*this.width, t*this.height, 1, 1).data;
        var r = canvasColor[0];
        var g = canvasColor[1];
        var b = canvasColor[2];
        return (new Vector( r, g, b));
    };
}

var texture = null;

document.getElementById('texture').addEventListener('change', loadTexture, false);
function loadTexture(event){
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (function(file) {
        return function(event) {
            var data = this.result;
            image = new Image();
            image.src = data;
            var canvas = document.createElement("canvas");
	        canvas.width = image.width;
	        canvas.height = image.height;
	        var context = canvas.getContext("2d");
	        ctx.drawImage(image, 0, 0);
	        context.drawImage(image, 0, 0);
	        texture = new Texture(context, image.width, image.height);
        };
    })(file);
    reader.readAsDataURL(file);
}