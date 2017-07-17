
function Vector(x, y, z){
	this.x = x;
	this.y = y;
	this.z = z; 
	
	this.scalar_product = function(a){
		var result = this.x*a.x + this.y*a.y + this.z*a.z; 
		return result; 
	}
	this.vector_product = function(b){
		var result = new Vector;
		result.x = this.y*b.z - this.z*b.y;
		result.y = this.x*b.z - this.z*b.x;
		result.z = this.x*b.y - this.y*b.x; 
		return result; 
	}

	this.normalization = function(){
		var norma = this.norma(); 
		this.x = this.x/norma;
		this.y = this.y/norma;
		this.z = this.z/norma; 
	}

	this.gram_schmidt = function(v){
		var u2 = new Vector;
		var aux = this.projection(v);
		u2 = this.sub(v, aux); 

		return u2; 
	}

	this.projection = function(b){

		var result = new Vector; 
		var scalar; 

		scalar = this.scalar_product(b)/b.scalar_product(b); 
		result.x = scalar*b.x;
		result.y = scalar*b.y;
		result.z = scalar*b.z;

		return result;  
	}

	this.add = function(a,b){
		var result = new Vector; 

		result.x = a.x + b.x; 
		result.y = a.y + b.y; 
		result.z = a.z + b.z; 

		return result; 
	}

	this.sub = function(a,b){
		var result = new Vector; 

		result.x = a.x - b.x; 
		result.y = a.y - b.y; 
		result.z = a.z - b.z; 

		return result; 
	}
	
	this.cosine = function(b){
		var result = 0; 
		var scalar = this.scalar_product(b); 
		var norma1 = this.normalization(); 
		var norma2 = b.normalization(); 
		
		result = scalar/(norma1*norma2); 
		
		return result; 
	}
	
	this.kroneck_product = function(b){
		var result = new Vector(this.x*b.x, this.y*b.y, this.z*b.z); 
		return result; 
	}
	
	this.norma = function(){
		var result = this.scalar_product(this);
		var norma = Math.sqrt(result);
		return norma; 
	}
	
}

