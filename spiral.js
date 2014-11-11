var spiral = { 
    N : 120, 
    M : 60,  
    a : 2,   // big radius 'a' from prompt
    b : 1,   // small radius 'b' from prompt
    p : 2, 
    q : 8, 
    R : 0.5, //tube radius

    verts : null,
    normals : null,

//Attribute functions I made in order to create the geometry
//calculates derivative and 2nd derivative from equations
//given in the assignment prompt
    x : function(t){
       return (this.a + this.b*Math.cos(this.q*t))*Math.cos(this.p*t);
    },

    y : function(t){
       return (this.a + this.b*Math.cos(this.q*t))*Math.sin(this.p*t);
    },

    z : function(t){
       return this.b*Math.sin(this.q*t);
    },

    dx : function(t){
       return -1*this.p*this.y(t)-this.b*this.q*Math.sin(this.q*t)*Math.cos(this.p*t);
    },

    dy : function(t){
       return this.p*this.x(t)-this.b*this.q*Math.sin(this.q*t)*Math.sin(this.p*t);
    },

    dz : function(t){
       return this.b*this.q*Math.cos(this.q*t);
    },

    ddx : function(t){
       return -1*this.p*this.dy(t)+this.b*this.q*(this.p*Math.sin(this.q*t)*Math.sin(this.p*t)-this.q*Math.cos(this.q*t)*Math.cos(this.p*t));
    },

    ddy : function(t){
       return this.p*this.dx(t)-this.b*this.q*(this.p*Math.sin(this.q*t)*Math.cos(this.p*t)+this.q*Math.cos(this.q*t)*Math.sin(this.p*t));
    },

    ddz : function(t){
       return -1*this.q*this.q*this.b*Math.sin(this.q*t);
    },
    

    createGeometry : function() {
	//pulled from the assignment prompt      
        this.verts = new Float32Array((this.N+1)*(this.M+1)*3);
        this.normals = new Float32Array((this.N+1)*(this.M+1)*3);
        var n = 0;
        var dt = 2*Math.PI/this.N, du = 2*Math.PI/this.M;
        for (var i = 0, t = 0.0; i <= this.N; i++, t += dt) {
           if (i == this.N) t == 0.0; // wrap around
           var C = [this.x(t), this.y(t), this.z(t)];
           var T = [this.dx(t), this.dy(t), this.dz(t)];
           var A = [this.ddx(t), this.ddy(t), this.ddz(t)];
           var B = cross3(T, A);
           norm3(T); //changed for Dr. Cochran's library
           norm3(B); //""
           var N_ = cross3(B,T);
           for (var j = 0, u = 0.0; j <= this.M; j++, u += du) {
              if (j == this.M) u = 0.0; // wrap around
              var cosu = Math.cos(u), sinu = Math.sin(u);
              for (var k = 0; k < 3; k++) {
                 this.normals[n] = cosu*N_[k] + sinu*B[k];
                 this.verts[n] = C[k] + this.R*this.normals[n]; //added
                 n++;
              }
           }
        }
     },

    triangleStrip: null,
   //Doing triangle strips is slightly different from torus
   //such as connecting the indices and their values are different
    createTriangleStrip : function() {
	var M = this.M, N = this.N;
	var numIndices = N*(M+2)*2 - 2;
	if (!this.triangleStrip || this.triangleStrip.length != numIndices)
	    this.triangleStrip = new Uint16Array(numIndices);
	var index = function(i, j) {
	    return i*(M+1) + j;
	}
	var n = 0;
	for (var i = 0; i < N; i++) {
	    if (i > 0)  // degenerate connecting index
		this.triangleStrip[n++] = index(i,0);
	    for (var j = 0; j <= M; j++) {
		this.triangleStrip[n++] = index(i,j);
		this.triangleStrip[n++] = index(i+1,j);
	    }
	    if (i < N-1) // degenerate connecting index
		this.triangleStrip[n++] = index(i+1,M)
	}
    },

    wireframe : null, // Uint16Array  (line indices)

    createWireFrame : function() {
	var lines = [];
	lines.push(this.triangleStrip[0], this.triangleStrip[1]);
	var numStripIndices = this.triangleStrip.length;
	for (var i = 2; i < numStripIndices; i++) {
	    var a = this.triangleStrip[i-2];
	    var b = this.triangleStrip[i-1];
	    var c = this.triangleStrip[i];
	    if (a != b && b != c && c != a)
		lines.push(a, c, b, c);
	}
	this.wireframe = new Uint16Array(lines);
    },    
};





































