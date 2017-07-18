function initGrid(){
	var color = '#34495e';
	var vLeft = [-0.86602540, -0.25];
	var vRight = [0.86602540, -0.25];
	var cPoint = [width/2, height/2];
	ctx.lineWidth = 1.1;
	
	var x0 = cPoint[0];
	var y0 = cPoint[1];
	while(x0<=width && y0<=height){
		ctx.beginPath();
		ctx.moveTo(x0, y0);
		ctx.lineTo(x0, 0);
		ctx.strokeStyle = color;
		ctx.stroke();
		ctx.closePath();
		
		x0 += -vLeft[0]*35;
		y0 += -vLeft[1]*35;
	}
	
	x0 = cPoint[0];
	y0 = cPoint[1];
	var xf = cPoint[0] + (-vLeft[0]*3000);
	var yf = cPoint[1] + (-vLeft[1]*3000);
	while(yf>=0){
		ctx.beginPath();
		ctx.moveTo(x0, y0);
		ctx.lineTo(xf, yf);
		ctx.strokeStyle = color;
		ctx.stroke();
		ctx.closePath();
		
		y0 -= 35;
		yf -= 35;
	}
	
	x0 = cPoint[0];
	y0 = cPoint[1];
	while(x0>=0 || y0<=height){
		ctx.beginPath();
		ctx.moveTo(x0, y0);
		ctx.lineTo(x0, 0);
		ctx.strokeStyle = color;
		ctx.stroke();
		ctx.closePath();
		
		x0 += -vRight[0]*35;
		y0 += -vRight[1]*35;
	}
	
	x0 = cPoint[0];
	y0 = cPoint[1];
	xf = cPoint[0] + (-vRight[0]*3000);
	yf = cPoint[1] + (-vRight[1]*3000);
	while(yf>=0){
		ctx.beginPath();
		ctx.moveTo(x0, y0);
		ctx.lineTo(xf, yf);
		ctx.strokeStyle = color;
		ctx.stroke();
		ctx.closePath();
		
		y0 -= 35;
		yf -= 35;
	}
	
	x0 = cPoint[0];
	y0 = cPoint[1];
	xf = cPoint[0] + (-vLeft[0]*3000);
	yf = cPoint[1] + (-vLeft[1]*3000);
	var x = 0;
	var y = 0;
	while(y<=height){
		ctx.beginPath();
		ctx.moveTo(x0 + x, y0 + y);
		ctx.lineTo(xf + x, yf + y);
		ctx.strokeStyle = color;
		ctx.stroke();
		ctx.closePath();
		
		x -= vRight[0]*35;
		y += -vRight[1]*35;
	}
	
	x0 = cPoint[0];
	y0 = cPoint[1];
	xf = cPoint[0] + (-vRight[0]*3000);
	yf = cPoint[1] + (-vRight[1]*3000);
	x = 0;
	y = 0;
	while(y<=height){
		ctx.beginPath();
		ctx.moveTo(x0 + x, y0 + y);
		ctx.lineTo(xf + x, yf + y);
		ctx.strokeStyle = color;
		ctx.stroke();
		ctx.closePath();
		
		x -= vLeft[0]*35;
		y += -vLeft[1]*35;
	}
	
	ctx.lineWidth = 1.0;
}