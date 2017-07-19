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
	        texture = canvas.getContext("2d");
	        texture.drawImage(image, 0, 0);
        };
    })(file);
    reader.readAsDataURL(file);
}