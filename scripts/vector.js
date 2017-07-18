function Vector(x, y, z){
	
	//Construtor da classe vetor
	this.x = x;		//Coordenada X do vetor
	this.y = y;		//Coordenada Y do vetor
	this.z = z;		//Coordenada Z do vetor
	
	//Metodo que realiza o produto escalar de vetores
	this.scalarProduct = function(v){
		var result = this.x*v.x + this.y*v.y + this.z*v.z;
		return result;
	};
	
	//Metodo que realiza o produto vetorial de vetores
	this.vectorProduct = function(v){
		var nX = this.y*v.z - this.z*v.y;
		var nY = this.x*v.z - this.z*v.x;
		var nZ = this.x*v.y - this.y*v.x; 
		return (new Vector(nX, -nY, nZ)); 
	};
		
	//Metodo que realiza a normalização do vetor
	this.normalize = function(){
		var norma = this.norma();
		var nX = this.x/norma;
		var nY = this.y/norma;
		var nZ = this.z/norma;
		return (new Vector(nX, nY, nZ));
	};

	//Metodo que realiza a operação de ortogonalização de Gram-Schimdt
	this.gramSchmidt = function(v){
		var u = v.projectize(this);
		var w = v.sub(u);
		return w;
	};

	//Metodo que realiza a projeção de um vetor
	this.projectize = function(v){
		var scalar = this.scalarProduct(v)/v.scalarProduct(v); 
		var nX = scalar*v.x;
		var nY = scalar*v.y;
		var nZ = scalar*v.z;
		return (new Vector(nX, nY, nZ));  
	};

	//Medoto que realiza a soma de dois vetores
	this.add = function(v){
		var nX = this.x + v.x;
		var nY = this.y + v.y;
		var nZ = this.z + v.z;
		return (new Vector(nX, nY, nZ)); 
	};

	//Medoto que realiza a subtração0 de dois vetores
	this.sub = function(v){
		var nX = this.x - v.x;
		var nY = this.y - v.y; 
		var nZ = this.z - v.z;
		return (new Vector(nX, nY, nZ));
	};
	
	//Metodo que realiza o calculo de coseno entre dois vetores 
	this.cosine = function(v){ 
		var scalar = this.scalarProduct(v);
		var norma1 = this.norma();
		var norma2 = v.norma();
		var result = scalar/(norma1*norma2);
		return result; 
	};
	
	//Metodo que calcula o produto Kroneck de vetores
	this.kroneckProduct = function(b){
		var result = new Vector(this.x*b.x, this.y*b.y, this.z*b.z); 
		return result; 
	};
	
	//Metodo que retira a norma de um vetor
	this.norma = function(){
		var sProd = this.scalarProduct(this);
		var norma = Math.sqrt(sProd);
		return norma; 
	};
}