//var opbeat = require('opbeat').start()
var glob_debug_flag=false;
var global_stars_in_sky = 40;
// var mod_rio = require('./lib/mod_rio');
// var mod_up = require('./lib/mod_up');
// var mod_mirror = require('./lib/mod_mirror');
// //var mod_half = require('./lib/mod_half');
// //var mod_axes = require('./lib/mod_axes');
// var mod_generate_random_seed = require('./lib/mod_generate_random_seed');
// var mod_inverse = require('./lib/mod_inverse');
// var mod_random = require('./lib/mod_random');
// var mod_median = require('./lib/mod_median');
// var mod_magik_rotate = require('./lib/mod_magik_rotate');
// var mod_step_colors = require('./lib/mod_step_colors');
// var mod_destroy_colors = require('./lib/mod_destroy_colors');
// var mod_odin_dva_colors = require('./lib/mod_odin_dva_colors');
// var mod_cryptography = require('./lib/mod_cryptography');
// var mod_join_colors = require('./lib/mod_join_colors');
// var mod_colors = require('./lib/mod_colors');
// var mod_rotate_ff = require('./lib/mod_rotate_ff');
// var mod_gcombo = require('./lib/mod_gcombo');
// var mod_brain = require('./lib/mod_brain');
// var mod_min_colors = require('./lib/mod_min_colors');
// var mod_razn_colors = require('./lib/mod_razn_colors');
// var mod_axes = require('./lib/mod_axes');
// var mod_black_white = require('./lib/mod_black_white');
// var mod_smooth = require('./lib/mod_smooth');
// var mod_nineth = require('./lib/mod_nineth');
// var mod_maximus = require('./lib/mod_maximus');
// var mod_paint_over = require('./lib/mod_paint_over');
// var mod_rotate_any = require('./lib/mod_rotate_any');
// var mod_md5 = require('./lib/mod_md5');

// var PNG = require('pngjs').PNG;
// var md5 = require('js-md5');
// var express = require('express');
// var bodyParser = require('body-parser');
// var app = express();  
// var fs = require('fs');
// //var bodyParser = require('body-parser');
// var Readable = require('stream').Readable;
// var qs = require('querystring');
// app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.bodyParser());
//app.use(bodyParser.json()); // support json encoded bodies
//app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/***
app.post('/api/users', function(req, res) {
    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;

    res.send(user_id + ' ' + token + ' ' + geo);
});
***/

//We can test this using POSTman and send information as application/x-www-form-urlencoded:
//https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters



// app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // next();
// });








// app.set('port', (process.env.PORT || 3000));

// app.use(express.static(__dirname + '/public'));
// //app.use(opbeat.middleware.express())

// app.use(function(err, req, res, next) {
  // // log the error, treat it like a 500 internal server error
  // // maybe also log the request so you have more debug information
  // //log.error(err, req);
 
  // // during development you may want to print the errors to your console
  // console.log(err.stack);
 
  // // send back a 500 with a generic message
  // res.status(500);
  // res.send('error');
// });

// // views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');



// app.get('/', function(request, response) {
  // response.render('pages/index');
// });

// app.get('/palette', function(request, response) {
  // response.render('pages/palette');
// });

// app.get('/labirint', function(request, response) {
  // response.render('pages/labirint');
// });

// app.get('/images/labirint.png', function(request, response) {
  // //response.render('pages/labirint');
 // fs.createReadStream('images/labirint.png').pipe( new PNG() ).on('parsed', function() {

	// //inversing - for example
	// /*****
    // for (var y = 0; y < this.height; y++) {
        // for (var x = 0; x < this.width; x++) {
            // var idx = (this.width * y + x) << 2;

            // // invert color
            // this.data[idx] = 255 - this.data[idx];
            // this.data[idx+1] = 255 - this.data[idx+1];
            // this.data[idx+2] = 255 - this.data[idx+2];

            // // and reduce opacity
            // this.data[idx+3] = this.data[idx+3] >> 1;
        // }
    // }
	// *******/
	
		// sendImage( this.pack(), response, "\nImage labirint.png loaded\n" );
    
	// });
// });

function logger_console_log(s)
{
	if(glob_debug_flag) console.log(s);
}

function getSeedListFromFS()
{
	var s = '';
	var img_tmpl = '';
	var arr = fs.readdirSync( __dirname + '/public/sims');
	for(var i=0;i<arr.length;i++)
	{
		img_tmpl = '<img src="[img-path]" width="20" height="20" seed-clicked="true"> ';
		img_tmpl = img_tmpl.replace("[img-path]", '/sims/'+arr[i]);
		s += img_tmpl;
	}
	return JSON.stringify(arr);
}



// app.post('/load_div_first', function(request, response) {
  

	// fs.readFile( __dirname + '/views/pages/index.html', 'utf8', function (err,data) {
	  
	  // if (err) {  
	  
		// logger_console_log(err);
		// response.writeHead(500, {  'Content-Type': 'text/html' } );
		// response.end("/load_div_first: error: "+err);

	  // }
	  // else
	  // {

		  // var strData = data.toString();
		  // strData = strData.replace("[seed-list]",getSeedListFromFS());
		  // strData = strData.replace("[init-path]","/initial-image.png");
		  // data = new Buffer(strData); 
		  
		  // response.writeHead(200, {  'Content-Type': 'text/html' } );
		  // response.end(data);
	  
	  // }
	  
	// });
  
  
// });



function sendImage(result_png, res, msg)
{
	result_png.pack();
	res.writeHead( 200, {  'Content-Type': 'blob' } ); 
	result_png.pipe(res);
			
	result_png.on('end', function()	{
		logger_console_log(msg);
	});
}

function sendText(result_text, response, msg)
{
	logger_console_log(msg);
	response.writeHead(200, {  'Content-Type': 'text/html' } );
	response.end(result_text); 
}

function multiply(req, res)
{
	
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		
		if(this.width * 2 > 1200 || this.height * 2 > 1200 )
		{
			
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
			res.end("multi: error: too big size (need result width * 2 or height * 2 <= 1200)");
			return;
			
		}
		
		var newpng = new PNG ( {
			
				width: this.width*2,
				height: this.height*2,
				filterType: 4
		} );
		
		

			for (var y = 0; y < this.height; y++) {
				
				for (var x = 0; x < this.width; x++) {
					
					var idx = (this.width * y + x) << 2;
					
					var new_idx1 = newpng.width * (y) + (x) << 2;
					
					var new_idx2 = (newpng.width * (y) + (x)+this.width << 2);
					
					var new_idx3 = newpng.width * (y+this.height) + (x) << 2;
					
					var new_idx4 = newpng.width * (y+this.height) + (x)+this.width << 2;
					
					newpng.data[new_idx1+0] = this.data[idx];
					newpng.data[new_idx1+1] = this.data[idx+1];
					newpng.data[new_idx1+2] = this.data[idx+2];
					newpng.data[new_idx1+3] = this.data[idx+3];
					
					newpng.data[new_idx2+0] = this.data[idx];
					newpng.data[new_idx2+1] = this.data[idx+1];
					newpng.data[new_idx2+2] = this.data[idx+2];
					newpng.data[new_idx2+3] = this.data[idx+3];
					
					newpng.data[new_idx3+0] = this.data[idx];
					newpng.data[new_idx3+1] = this.data[idx+1];
					newpng.data[new_idx3+2] = this.data[idx+2];
					newpng.data[new_idx3+3] = this.data[idx+3];
					
					newpng.data[new_idx4+0] = this.data[idx];
					newpng.data[new_idx4+1] = this.data[idx+1];
					newpng.data[new_idx4+2] = this.data[idx+2];
					newpng.data[new_idx4+3] = this.data[idx+3];
					
				}
				
			}
			
			sendImage(newpng, res, "\nImage multiplied\n" );
			
			
		});
}


function __rotateff( oldpng, newpng )
{

	/*****
	
	var r = context.getImageData(0,0,1,1).data[0];
	var g = context.getImageData(0,0,1,1).data[1];
	var b = context.getImageData(0,0,1,1).data[2];
	contextRes.fillStyle = "rgba("+r+","+g+","+b+",255)";
	contextRes.fillRect(0,0,2,2);
	
	*****/
	
	
	var arr_points = [];
	
	var n=0;
	
	for(n=2;n<oldpng.height+2;n++)
	{
		//logger_console_log("---- "+n+" ----");
		var y=n-2;
		for(var x=0;x<n-1;x++)
		{
			//logger_console_log("[x,y]=["+x+","+y+"]");
			
			var idx = (oldpng.width * y + x) << 2;
					
			var new_idx1 = newpng.width * (y*2) + (x*2) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng.data[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng.data[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng.data[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng.data[idx+3];
			
			var new_idx1 = newpng.width * (y*2) + (x*2+1) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng.data[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng.data[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng.data[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng.data[idx+3];
			
			var new_idx1 = newpng.width * (y*2+1) + (x*2) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng.data[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng.data[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng.data[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng.data[idx+3];
			
			var new_idx1 = newpng.width * (y*2+1) + (x*2+1) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng.data[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng.data[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng.data[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng.data[idx+3];
				
			/*****	
			var imgData = context.getImageData(x,y,1,1);
			var r = imgData.data[0];
			var g = imgData.data[1];
			var b = imgData.data[2];
			
			contextRes.fillStyle = "black";//"rgba("+r+","+g+","+b+",255)";
			contextRes.fillRect(x*2,y*2,2,2);
			
			//logger_console_log([x,y]);
			*****/
			
			arr_points.push([x,y]);
			
			
			y--;
		}
		
		//if(n>=4) break;
		
	}
	
	//return;
	
	
	
	
	
	
	var half_value = arr_points.length;
	

	var w = oldpng.width;
	var h = oldpng.height;
	
	var lim2 = 1;
	var lim4 = 1;
	
	while(true)
	{
	
	y=h-lim4;
	x=lim2;
	while(true)
	{
	
	
		
			/*****
			var imgData = context.getImageData(x,y,1,1);
			var r = imgData.data[0];
			var g = imgData.data[1];
			var b = imgData.data[2];
			contextRes.fillStyle = "black";//"rgba("+r+","+g+","+b+",255)";
			contextRes.fillRect(x*2,y*2,2,2);
			*****/
			
			var idx = (oldpng.width * y + x) << 2;
					
			var new_idx1 = newpng.width * (y*2) + (x*2) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng.data[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng.data[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng.data[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng.data[idx+3];
				
			var new_idx1 = newpng.width * (y*2) + (x*2+1) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng.data[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng.data[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng.data[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng.data[idx+3];
			
			var new_idx1 = newpng.width * (y*2+1) + (x*2) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng.data[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng.data[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng.data[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng.data[idx+3];
			
			var new_idx1 = newpng.width * (y*2+1) + (x*2+1) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng.data[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng.data[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng.data[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng.data[idx+3];
	
	
			
			
			arr_points.push([x,y]);
		
		
		x++;
		y--;
		
		if(x>=oldpng.width) break;
	}
	
	lim2++;
			
	if(y>=oldpng.height)	break;	

		if(lim2 > oldpng.width)
		{
			break;
		}
	
	}	
		
	
	logger_console_log("Data of rotated image inputed");
	
	/******************************************************************************/
	/******************************************************************************/
	/******************************************************************************/
	
	
	
	
	
	
	
	
	
	var w = newpng.width;
	
	
	//**  this only one duxel outputting
	var n=0;
	
	
	var x = arr_points[0][0];
	var y = arr_points[0][1];

	var idx = (oldpng.width * x + y) << 2;
		
    var x1 = w/2-1;			
	var y1=0;
	
	var new_idx1 = newpng.width * (y1) + (x1) << 2;
			
	newpng.data[new_idx1+0] = oldpng.data[idx+0];
	newpng.data[new_idx1+1] = oldpng.data[idx+1];
	newpng.data[new_idx1+2] = oldpng.data[idx+2];
	newpng.data[new_idx1+3] = oldpng.data[idx+3];
	
	newpng.data[new_idx1+4] = oldpng.data[idx+0];
	newpng.data[new_idx1+5] = oldpng.data[idx+1];
	newpng.data[new_idx1+6] = oldpng.data[idx+2];
	newpng.data[new_idx1+7] = oldpng.data[idx+3];

	
	n++;
	
	//**** now we take two duxel
	
	y1++;
	x1--;
	
	//
	
	var x = arr_points[n][0];
	var y = arr_points[n][1];
	
	var idx = (oldpng.width * x + y) << 2;
		
    var new_idx1 = newpng.width * (y1) + (x1) << 2;
			
	newpng.data[new_idx1+0] = oldpng.data[idx+0];
	newpng.data[new_idx1+1] = oldpng.data[idx+1];
	newpng.data[new_idx1+2] = oldpng.data[idx+2];
	newpng.data[new_idx1+3] = oldpng.data[idx+3];
	
	newpng.data[new_idx1+4] = oldpng.data[idx+0];
	newpng.data[new_idx1+5] = oldpng.data[idx+1];
	newpng.data[new_idx1+6] = oldpng.data[idx+2];
	newpng.data[new_idx1+7] = oldpng.data[idx+3];
	
	
	n++;
	
	var x = arr_points[n][0];
	var y = arr_points[n][1];
	
	var idx = (oldpng.width * x + y) << 2;
	
	var new_idx1 = newpng.width * (y1) + (x1+2) << 2;
	
	newpng.data[new_idx1+0] = oldpng.data[idx+0];
	newpng.data[new_idx1+1] = oldpng.data[idx+1];
	newpng.data[new_idx1+2] = oldpng.data[idx+2];
	newpng.data[new_idx1+3] = oldpng.data[idx+3];
	
	newpng.data[new_idx1+4] = oldpng.data[idx+0];
	newpng.data[new_idx1+5] = oldpng.data[idx+1];
	newpng.data[new_idx1+6] = oldpng.data[idx+2];
	newpng.data[new_idx1+7] = oldpng.data[idx+3];

	
		
	//contextRes.fillStyle = "red";//"rgba("+r+","+g+","+b+",255)";
	//contextRes.fillRect(x1+6,y1,2,1);
	

	
	
	
	y1++;
	x1--;
	
	for(j=0;j<3;j++)
	{
		
		
		n++;
	
		var x = arr_points[n][0];
		var y = arr_points[n][1];
		
		var idx = (oldpng.width * x + y) << 2;
		
		var new_idx1 = newpng.width * (y1) + (x1+(j*2)) << 2;
		
		newpng.data[new_idx1+0] = oldpng.data[idx+0];
		newpng.data[new_idx1+1] = oldpng.data[idx+1];
		newpng.data[new_idx1+2] = oldpng.data[idx+2];
		newpng.data[new_idx1+3] = oldpng.data[idx+3];
		
		newpng.data[new_idx1+4] = oldpng.data[idx+0];
		newpng.data[new_idx1+5] = oldpng.data[idx+1];
		newpng.data[new_idx1+6] = oldpng.data[idx+2];
		newpng.data[new_idx1+7] = oldpng.data[idx+3];
		
			
		
		
	}
	

	
	var counter=4;
	var exit_cycle=false;
	
	while(true)
	{
		
		y1++;
		x1--;
		
		for(j=0;j<counter;j++)
		{
			
			
			
			
			n++;
			
		//	logger_console_log(n);
		//	logger_console_log(arr_points.length);
		//	if(n >= arr_points.length / 2 ) { exit_cycle=true; break; }
	
			var x = arr_points[n][0];
			var y = arr_points[n][1];
			
			var idx = (oldpng.width * x + y) << 2;




			var new_idx1 = newpng.width * (y1) + (x1+(j*2)) << 2;
			
			newpng.data[new_idx1+0] = oldpng.data[idx+0];
			newpng.data[new_idx1+1] = oldpng.data[idx+1];
			newpng.data[new_idx1+2] = oldpng.data[idx+2];
			newpng.data[new_idx1+3] = oldpng.data[idx+3];
			
			newpng.data[new_idx1+4] = oldpng.data[idx+0];
			newpng.data[new_idx1+5] = oldpng.data[idx+1];
			newpng.data[new_idx1+6] = oldpng.data[idx+2];
			newpng.data[new_idx1+7] = oldpng.data[idx+3];
		
		

	
				
		
			
		}
		
		counter++;
		//logger_console_log("counter="+counter);
		if(counter>=newpng.height/2+1) break;
		
	/******
	
		if(exit_cycle==true) break;
		
		logger_console_log("n="+n);
		
		
		
		//if(n >= arr_points.length/2 ) break;
		
	******/	
		
	 
	}
	
	
				
	
	//logger_console_log("n="+n);
	
	//logger_console_log("counter="+counter);
	
	//logger_console_log("x1="+x1);
	//logger_console_log("y1="+y1);
	
	//logger_console_log(arr_points[n]);
	
	

	
	
	
		
	
	//n--;
	
	//var counter=4; counter==half_value
	var exit_cycle=false;
	var lim2=1;
	//y1--;
	var nn=1;
	var lim4=newpng.width-2;
	while(true)
	{
		
		y1++;
		
		
		for(x1=lim2;x1<lim4;x1+=2)
		{
			
			
			
			n++;
			
			
			//logger_console_log(n);
			//logger_console_log(arr_points.length);
			
			 
	
			var x = arr_points[n][0];
			var y = arr_points[n][1];
			
			
			var idx = (oldpng.width * x + y) << 2;




			var new_idx1 = newpng.width * (y1) + (x1) << 2;
			
			newpng.data[new_idx1+0] = oldpng.data[idx+0];
			newpng.data[new_idx1+1] = oldpng.data[idx+1];
			newpng.data[new_idx1+2] = oldpng.data[idx+2];
			newpng.data[new_idx1+3] = oldpng.data[idx+3];
			
			newpng.data[new_idx1+4] = oldpng.data[idx+0];
			newpng.data[new_idx1+5] = oldpng.data[idx+1];
			newpng.data[new_idx1+6] = oldpng.data[idx+2];
			newpng.data[new_idx1+7] = oldpng.data[idx+3];
		
			
			
			
			
			
			/****
			
			var imgData = context.getImageData(x,y,1,1);
			var r = imgData.data[0];
			var g = imgData.data[1];
			var b = imgData.data[2];
				
			contextRes.fillStyle = "rgba("+r+","+g+","+b+",255)";
			contextRes.fillRect(x1,y1,2,1);
			
			*****/
			
			//	 { exit_cycle=true; break; }
			
			
			
			
			
			
			
	
	
		
			
		}
		
	
	
	
		lim2++;
		lim4--;
		
		if(exit_cycle==true) break;
		
		//counter--;
		
		//x1 = nn++;
		
		//if(counter>=canvasRes.height/2) break;
		
		if(lim2>oldpng.height) { exit_cycle=true; break; }
		
		//if(nn>canvas.height-1) { exit_cycle=true; break; }
		
		if(lim4 < 0) break;

		//if(n>=arr_points.length-1) break;
		
	}
	
		
	return newpng;
	
	/********
 
	
	
	
		
	canvas.width = canvasRes.width;
	canvas.height = canvasRes.height;
	canvas.getContext("2d").putImageData(canvasRes.getContext("2d").getImageData(0,0,canvasRes.width,canvasRes.height),0,0);
	
	
	
	*****/
	
	
	
	
}

function rotateff(req, res)
{
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		if(this.width * 2 > 1200 || this.height * 2 > 1200 )
		{
			
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
			res.end("rotateff: error: too big size (need result width * 2 or height * 2 <= 1200)");
			return;
			
		}
		
		var newpng = new PNG ( {
			
				width: this.width*2,
				height: this.height*2,
				filterType: 4
		} );
		
		
		
		sendImage( __rotateff( this, newpng ), res, "\nImage rotated 45 degree\n" );
		
		
		
		
		
		/*********

			for (var y = 0; y < this.height; y++) {
				
				for (var x = 0; x < this.width; x++) {
					
					var idx = (this.width * y + x) << 2;
					
					var new_idx1 = newpng.width * (y) + (x) << 2;
					
					var new_idx2 = (newpng.width * (y) + (x)+this.width << 2);
					
					var new_idx3 = newpng.width * (y+this.height) + (x) << 2;
					
					var new_idx4 = newpng.width * (y+this.height) + (x)+this.width << 2;
					
					newpng.data[new_idx1+0] = this.data[idx];
					newpng.data[new_idx1+1] = this.data[idx+1];
					newpng.data[new_idx1+2] = this.data[idx+2];
					newpng.data[new_idx1+3] = this.data[idx+3];
					
					newpng.data[new_idx2+0] = this.data[idx];
					newpng.data[new_idx2+1] = this.data[idx+1];
					newpng.data[new_idx2+2] = this.data[idx+2];
					newpng.data[new_idx2+3] = this.data[idx+3];
					
					newpng.data[new_idx3+0] = this.data[idx];
					newpng.data[new_idx3+1] = this.data[idx+1];
					newpng.data[new_idx3+2] = this.data[idx+2];
					newpng.data[new_idx3+3] = this.data[idx+3];
					
					newpng.data[new_idx4+0] = this.data[idx];
					newpng.data[new_idx4+1] = this.data[idx+1];
					newpng.data[new_idx4+2] = this.data[idx+2];
					newpng.data[new_idx4+3] = this.data[idx+3];
					
				}
				
			}
			
			sendImage(newpng, res, "\nImage multiplied\n" );
			
			
			*********/
			
			
		});
}


function __getCountOfColors(im0)
{
	
	var w = im0.width;
	var h = im0.height;
	
		
			var obj = {};
			//var colors = [];

			for (var y = 0; y < h; y++) {
		

				for (var x = 0; x < w; x++) {
				
					
					var idx = (w * y + x) << 2;
					
					var key = ""+im0.data[idx]+"-"+im0.data[idx+1]+"-"+im0.data[idx+2]+"-"+im0.data[idx+3];
					if (obj[key]==undefined)obj[key]=0;
					obj[key]++;
					// if (obj[key]==undefined) { 
					
						
						// var col = [im0.data[idx], im0.data[idx+1],im0.data[idx+2],im0.data[idx+3]]; 
						// colors.push(col); 
						// obj[key]= {cnt:1,arr:col};
					
					// }
					// else
					// {
						// var obj4 = {cnt:obj[key].cnt+1,arr:obj[key].arr};
						// obj[key] = obj4;
					// }
					
					
					
					
					
				}
			}
			var n=0;
			for(var p in obj){n++;
			//console.log (p +" ="+obj[p]);
			}
			
			return n;
}

function borderplus(req, res)
{
	
		req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		if(this.width + 2 > 1200 || this.height + 2 > 1200 )
		{
			
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
			logger_console_log("borderplus: error: too big size (need result width * height <= 1200)");
			res.end("borderplus: error: too big size (need result width * height <= 1200)");
			//req.connection.destroy();
			return;
			
		}
		
			var newpng = new PNG ( {
				
					width: this.width+2,
					height: this.height+2,
					filterType: 4
			} );
		
			for (var y = 0; y < newpng.height; y++) {
				
				for (var x = 0; x < newpng.width; x++) {
					
					
					
					var new_idx1 = newpng.width * (y) + (x) << 2;
					
					newpng.data[new_idx1+0] = 255;
					newpng.data[new_idx1+1] = 255;
					newpng.data[new_idx1+2] = 255;
					newpng.data[new_idx1+3] = 255;
					
				}
				
			}
		

			for (var y = 0; y < this.height; y++) {
				
				for (var x = 0; x < this.width; x++) {
					
					var idx = this.width * y + x << 2;
					
					var new_idx1 = newpng.width * (y+1) + (x+1) << 2;
					
					newpng.data[new_idx1+0] = this.data[idx];
					newpng.data[new_idx1+1] = this.data[idx+1];
					newpng.data[new_idx1+2] = this.data[idx+2];
					newpng.data[new_idx1+3] = this.data[idx+3];
					
				}
				
			}
			
			sendImage(newpng, res, "\nImage border minused\n" );
			
			
		});
}

function borderminus(req, res)
{
	
		req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		
		
			var newpng = new PNG ( {
				
					width: this.width-2,
					height: this.height-2,
					filterType: 4
			} );
		
		

			for (var y = 1; y < this.height-1; y++) {
				
				for (var x = 1; x < this.width-1; x++) {
					
					var idx = this.width * y + x << 2;
					
					var new_idx1 = newpng.width * (y-1) + (x-1) << 2;
					
					newpng.data[new_idx1+0] = this.data[idx];
					newpng.data[new_idx1+1] = this.data[idx+1];
					newpng.data[new_idx1+2] = this.data[idx+2];
					newpng.data[new_idx1+3] = this.data[idx+3];
					
				}
				
			}
			
			sendImage(newpng, res, "\nImage border minused\n" );
			
			
		});
}

function minus( req, res )
{

	req.pipe( new PNG ( {filterType: 4} ) ).on('parsed', function() {
		
		//here we create new png (same as result bufferedImage (in java))
		var newpng = new PNG ( {
			
				width: this.width/2|0,
				height: this.height/2|0,
				filterType: 4
		} );
		

		for (var y = 0; y < this.height; y+=2) {
			for (var x = 0; x < this.width; x+=2) {
				
				var idx = (this.width * y + x) << 2;
				
				var new_idx = newpng.width * (y/2) + (x/2) << 2;
				//var new_idx2 = newpng.width * (y*2+1) + (x*2) << 2;
				
				newpng.data[new_idx] = this.data[idx];
				newpng.data[new_idx+1] = this.data[idx+1];
				newpng.data[new_idx+2] = this.data[idx+2];
				newpng.data[new_idx+3] = this.data[idx+3];

				
				
			}
		}
		
		sendImage(newpng, res, "\nImage minused\n" );
	
			
	});
}

function __plus(img)
{
	
			//here we create new png (same as result bufferedImage (in java))
		var newpng =createImageData(img.width*2, img.height*2);
			
				
		

			for (var y = 0; y < img.height; y++) {
				for (var x = 0; x < img.width; x++) {
					
					var idx = (img.width * y + x) << 2;
					
					var new_idx = newpng.width * (y*2) + (x*2) << 2;
					var new_idx2 = newpng.width * (y*2+1) + (x*2) << 2;
					
					newpng.data[new_idx] = img.data[idx];
					newpng.data[new_idx+1] = img.data[idx+1];
					newpng.data[new_idx+2] = img.data[idx+2];
					newpng.data[new_idx+3] = img.data[idx+3];
					
					newpng.data[new_idx+4] = img.data[idx];
					newpng.data[new_idx+5] = img.data[idx+1];
					newpng.data[new_idx+6] = img.data[idx+2];
					newpng.data[new_idx+7] = img.data[idx+3];
					
					newpng.data[new_idx2] = img.data[idx];
					newpng.data[new_idx2+1] = img.data[idx+1];
					newpng.data[new_idx2+2] = img.data[idx+2];
					newpng.data[new_idx2+3] = img.data[idx+3];
					
					newpng.data[new_idx2+4] = img.data[idx];
					newpng.data[new_idx2+5] = img.data[idx+1];
					newpng.data[new_idx2+6] = img.data[idx+2];
					newpng.data[new_idx2+7] = img.data[idx+3];
					
					
				}
			}
	
	return newpng;
}

function plus( req, res)
{


		req.pipe( new PNG({filterType: 4}) ).on('parsed', function() {
			
		if(this.width * 2 > 1200 || this.height * 2 > 1200 )
		{
			
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
			res.end("plus: error: too big size (need result width * 2 <= 1200 or height * 2 <= 1200 )");
			return;
			
		}
			
			//here we create new png (same as result bufferedImage (in java))
		var newpng = __plus(this);

			newpng.pack(); //pack result, write head to response, pipe result to response, when 'end' bla-bla-bla to log 
			res.writeHead( 200, {  'Content-Type': 'blob' } ); 
			newpng.pipe(res);
			newpng.on('end', function() {
				
				logger_console_log("Image plused");
				
			});
			
	
			
			//dummy(res);
			
		});
}






function cryptography( req, res )
{
			
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
			
		sendImage( mod_cryptography.dark_lord(this), res, '' );
					
	});
		
}


function blackwhite( req, res )
{
	
		
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
			
		sendImage( mod_black_white.black_white(this), res, 'black white' );
		
			
			
	});
		
}












function inverse( req, res )
{
	
		
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
			
			var result_png = new PNG ( {
						
							width: this.width,
							height: this.height,
							filterType: 4
					} );

			for (var y = 0; y < this.height; y++) {
				for (var x = 0; x < this.width; x++) {
					var idx = (this.width * y + x) << 2;

					// invert color
					result_png.data[idx] = 255 - this.data[idx];
					result_png.data[idx+1] = 255 - this.data[idx+1];
					result_png.data[idx+2] = 255 - this.data[idx+2];

					// and reduce opacity
					//this.data[idx+3] = this.data[idx+3] >> 1;
					
					result_png.data[idx+3] = this.data[idx+3];
				}
			}
			
			
			result_png.pack();
			
			res.writeHead( 200, {  'Content-Type': 'blob' } );
			
			result_png.pipe(res);
			
			result_png.on('end', function(){
				
				logger_console_log("Image inverted");
				
			});
			
	});
		
}

function get_main_image1(obj)
{
	var el = document.getElementById("canvas0");
	return el.getContext("2d").getImageData(0,0,el.width,el.height)}
function get_coordinates(w,h)
{

	
	if(w != h) {  logger_console_log('error: width of image != height of image'); return null; }
	
	
	if(w == 11) return [3,3,11,11];
	if(w == 10) return [2,2,10,10];
	if(w == 9) return [2,2,5,5];
	if(w == 8) return [2,2,4,4];
	if(w==7) return [2,2,3,3];
	if(w==6) return [1,1,4,4];
	if(w==5) return [1,1,3,3];
	if(w==4) return [1,1,2,2];
	if(w==3) return [1,1,1,1];
	
	
	if(w % 2 == 0) //when even
	{
		var tmp = w/2;
		
		if(tmp % 2 == 0)  return [ tmp/2, tmp/2, tmp, tmp];
		
		
		var t1 = Math.abs(w-(tmp+1)*2); 
		var t2 = Math.abs(w-(tmp-1)*2); 
		
		if(t1==t2) return [ tmp/2|0, tmp/2|0,tmp+1,tmp+1];
		
		logger_console_log("\n\nmedian().get_coordinates(...).error: Not implemented for: "+w);
		logger_console_log("width of full image="+w);
		logger_console_log("t1="+t1);
		logger_console_log("t2="+t2);
		logger_console_log("\n\n");
		
		return [0,0,w,h];
		
		
	}
	else //when odd
	{
		
		var tmpOdd = w/2|0;
		if(tmpOdd % 2 == 1)  return [ (tmpOdd/2|0)+1, (tmpOdd/2|0)+1, tmpOdd, tmpOdd];
		
		return [ tmpOdd/2, tmpOdd/2, tmpOdd+1,tmpOdd+1];
		
		/***********
		var t1 = Math.mod(w-(tmpOdd+1)*2); //mod(17-(8+1)*2) = 1
		var t2 = Math.mod(w-(tmpOdd-1)*2); //mod(17-(8-1)*2) = 3
		
		//0 1 2 3 4 5 6 7 (8) 9 10 11 12 13 14 15 16
		if(t1=<t2)
		
		return [ tmpOdd/2|0, tmpOdd/2|0,tmpOdd-1,tmpOdd-1];
		*********/
		
	}
}	

function old_median( req, res )
{
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		
		var arr = get_coordinates(this.width, this.height);
		if(arr == null) return; 
		
		var newpng = new PNG ( {
			
				width: arr[2],
				height: arr[3],
				filterType: 4
		} );
		
		var limy = arr[1]+arr[3];
		var limx = arr[0]+arr[2];
		var n=0;
		var m=0;

			for (var y = arr[1]; y < limy; y++) {
				n=0;
				for (var x = arr[0]; x < limx; x++) {
					var idx = (this.width * y + x) << 2;
					var idx2 = (newpng.width * m + n) << 2;
					
					// invert color
					newpng.data[idx2] = this.data[idx];
					newpng.data[idx2+1] = this.data[idx+1];
					newpng.data[idx2+2] = this.data[idx+2];
					
					newpng.data[idx2+3] = this.data[idx+3];
					n++;
				}
				m++;
			}
			
			sendImage(newpng,res,"\nImage was medianed\n");
						
		});
}

function smooth(req, res)
{
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		sendImage(mod_smooth.smooth(this),res,"\nsmooth");
		
	});
		
}

function create_png_from_global(ind)
{

		var old_png =  new PNG({
			
			width: global_memory[ind].img.width,
			height: global_memory[ind].img.height,
			filterType: 4
			
			
			});
		
		
		
		
		var arr = global_memory[ind].img.data;
		
		
		//	var arr=[];
						for(var j=0;j<old_png.height;j++)
						{
							for(var i=0;i<old_png.width;i++)
							{
								var idx = (old_png.width * j + i) << 2;	
							
							//	logger_console_log('\n'+idx+'\n');
								old_png.data[idx]=arr[idx];
								old_png.data[idx+1]=arr[idx+1];
								old_png.data[idx+2]=arr[idx+2];
								old_png.data[idx+3]=arr[idx+3];
							}
						}
		return old_png;
}
		

function execute_script(req, res)
{
	logger_console_log('execute_script:');
	var s = '';
	for(var key in req.body)	{ 
		s +='\nreq.body['+key+']: '+req.body[key];
		
	}
	logger_console_log(s); 
	
	var arr = req.body['commands'].split(",");
	var res_png=null;
	var ind=null;
	var md5=req.body['md5'];
	logger_console_log(md5); 
	if(md5 != null)
	{
		ind = isDataPNGObjectByMD5(md5);
		if(ind==null)
		{
			logger_console_log('execute_script: not found obj with this md5:'+md5);
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end('execute_script: not found obj with this md5:'+md5);
				req.connection.destroy();
				return;
		}
		else 
		{
			res_png =  create_png_from_global(ind);
			
			
		}
	
	
	
	}
	
	
	for(var i=0;i<arr.length;i++)
	{
		arr[i]=arr[i].trim();
		logger_console_log("executing ["+arr[i]+"]"); 
		
		if(arr[i].indexOf("generate random seed")===0)
		{
			var t = arr[i].replace("generate random seed",'');
			t=t.trim();
			var params=null;
			if(t.length>0)
			{
				params=t.split(" ");
				if(params.length>0)
				{
					for(var ii=0;ii<params.length;ii++) params[ii]=Number(params[ii]);
					
				}
				else
				{
					params =[15,3];
				}
			}
			else
			{
				params =[15,3];
			}
			res_png = mod_generate_random_seed.generate_random_seed(params);
			
			
		}
		else if(arr[i]=="median")
		{
			
			res_png = mod_median.__median(res_png);
			
		}
		else if(arr[i]=="cryptographic method two")
		{
			res_png = mod_cryptography.dark_lord(res_png);
		}
		else if(arr[i].indexOf("magik rotate")===0)
		{
			var t = arr[i].replace("magik rotate",'');
			t=t.trim();
			var params=null;
			if(t.length>0)
			{
				params=Number(t);
				
			}
			else
			{
				params =1;
			}
			res_png = mod_magik_rotate.magik_rotate(res_png,params);
			
		}
		else if(arr[i]=="up")
		{
			res_png = mod_up.upForImageData(res_png);
		}
		else if(arr[i]=="smooth")
		{
			
			res_png = mod_smooth.smooth(res_png);
			
		}
		else if(arr[i]=="rotate plus 45")
		{
			res_png = mod_rotate_ff.rotate_ff(res_png);
		}
		else if(arr[i]=="paint over")
		{
		
			res_png = mod_paint_over.paint_over(res_png);
		
		}
		else if(arr[i]=="nineth")
		{
		
			res_png = mod_nineth.nineth(res_png);
		
		}
		else if(arr[i]=="nonineth")
		{
		
			res_png = mod_nineth.nonineth(res_png);
		
		}
		else if(arr[i]=="maximus")
		{
		
			res_png = mod_maximus.maximus(res_png);
		
		}
		else if(arr[i]=="plus")
		{
			if(res_png.width * 2 > 1200 || res_png.height * 2 > 1200 )
			{
				
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end("plus: error: too big size (need result width * 2 <= 1200 or height * 2 <= 1200 )");
				return;
				
			}
			
			res_png = __plus(res_png);
			
			
		}
		
		else if(arr[i]=="mirror right")
		{
			if(res_png.width * 2 > 1200  )
			{
				
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end("mright: error: too big size (need result width * 2 <= 1200 )");
				return;
				
			}
			
			res_png = mod_mirror.mirror_right(res_png);
			
			
			
		}
		else if(arr[i]=="mirror down")
		{
			
			if( res_png.height * 2 > 1200 )
			{
				
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end("mdown: error: too big size (need result height * 2 <= 1200)");
				return;
				
			}
			
			res_png = mod_mirror.mirror_down(res_png);
			
			
		}
		
		else if(arr[i]=="axes minus")
		{
		
		
		
			res_png = mod_axes.bothAxesMinus(res_png);
		
		
		
		}
		
		
	}
	
	if(ind !=null) global_memory.splice(ind,1);
	
	sendImage( res_png, res, 'script executed' );
	
}


function maximus(req, res)
{
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		sendImage(mod_maximus.maximus(this),res,"maximus");
		
	});
		
}
function nonineth(req, res)
{
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		sendImage(mod_nineth.nonineth(this),res,"\nnonineth");
		
	});
		
}

function nineth(req, res)
{
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		sendImage(mod_nineth.nineth(this),res,"\nnineth");
		
	});
		
}

function paint_over(req, res)
{
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		sendImage(mod_paint_over.paint_over(this),res,"\npaint over");
		
	});
		
}


function getDataTxtObjectByMD5(md5)
{
	var arr = fs.readdirSync('./memory');
	for(var i=0;i<arr.length;i++)
	{
		if(arr[i]==(''+md5+'.id'))
		{
			var s = fs.readFileSync( './memory/'+arr[i]);
			return JSON.parse(s);
		}
	  
	}
	return null;
	
}

function isDataPNGObjectByMD5(md5)
{
	//var arr = fs.readdirSync('./memory');
	for(var i=0;i<global_memory.length;i++)
	{
		//logger_console_log('test '+arr[i]);
		if(global_memory[i].id===md5)
		{
			
			return i;
		}
	  
	}
	return null;
	
}



function pre_rotate_any(req, res)
{
	
	logger_console_log('pre_rotate_any:');
	for(var key in req.body)	logger_console_log('req.body['+key+']: '+req.body[key]);
	
	var s = (''+req.body['md5']).trim();
	
	
	var ind = isDataPNGObjectByMD5(s);
		if(ind==null)
		{
			logger_console_log('pre_rotate_any:error: not found obj with this md5:'+s);
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end('pre_rotate_any:error:  not found obj with this md5:'+s);
				req.connection.destroy();
				return;
		}
	
	var obj = global_memory[ind];
	obj.hash = s;
	obj.degree = req.body['degree'];
	// fs.writeFile("./memory/"+s+'.id', JSON.stringify(obj), function(err) {
		// if(err) {
			// return logger_console_log(err);
		// }

		// logger_console_log("The file was saved!");
	//}); 
	
	
	res.writeHead(200, {  'Content-Type': 'text/html' } );
	res.end('ok');
	
}
function rotate_any(req, res)
{
	
	logger_console_log('rotate_any:');
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		var s = get_md5_hex(this.data);
		var ind = isDataPNGObjectByMD5(s);
		if(ind==null)
		{
			logger_console_log('rotate_any: not found obj with this md5:'+s);
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end('rotate_any: not found obj with this md5:'+s);
				req.connection.destroy();
				return;
		}
		else 
		{
			var respng = mod_rotate_any.rotate_any(this,global_memory[ind]);
			global_memory.splice(ind,1);
			sendImage(respng,res,"\nrotate_any");
		}
		
	});
	
}

function rotate_ff(req, res)
{
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		sendImage(mod_rotate_ff.rotate_ff(this),res,"\nImage was ff rotated\n");
		
	});
}

function median(req, res)
{
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		sendImage(mod_median.__median(this),res,"\nImage was medianed\n");
		
	});
		
}



	function getColDec( cccol, cccol1 )
	{
		var cccol2=0;
		if(cccol+cccol1>255) cccol2=    ((cccol+cccol1)-255)+10;
		else cccol2=cccol+cccol1;
		return cccol2;
	}
	

	function getRandomInt(min, max) 
	{
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}





function error( req, res, msg )
{
	res.writeHead( 500, { 'Content-Type':'text/plain' } );
	res.end( msg );
	//req.connection.destroy();
	return;	
}




var num_colors=null;
function set_num_colors(request, res)
{
	var body = [];
  request.on('error', function (err) {
    console.error(err);
  });
  
  
  request.on('data',  function (chunk){
    body.push(chunk);
  });
  
  
   request.on('end', function() {
    body = Buffer.concat(body).toString();
	
	 var obj = JSON.parse(body);
	   num_colors=obj.num_colors;
	   logger_console_log(body);
	   logger_console_log(''+body);
	    logger_console_log(''+JSON.parse(body));
		 logger_console_log(''+JSON.parse(body).num_colors);
	   sendText(""+num_colors, res, 'set num colors '+num_colors );
	
   });

  
   
}


function get_md5_hex(data)
{
		var s =md5(data);
		//logger_console_log('In get_md5_hex:'+s);
		return s;
		
		
	
		
}

function unident(req, res)
{
	
   var filepath = './server/upload/my.csv';
   fs.stat(filepath, function (err, stats) {
   
			logger_console_log(stats);//here we got all information of file in stats variable

		   if (err) {
			   return console.error(err);
		   }

		   fs.unlink(filepath,function(err){
				if(err) return logger_console_log(err);
				logger_console_log('file deleted successfully');
		   });  
	});
}

var global_memory=[];

function ident(req, res)
{
	var png = new PNG({filterType: 4});
	req.pipe(png).on( 'parsed', function()  {
		
		var d = new Date();
		var ms = d.getTime();
		var md5 = get_md5_hex(this.data);
		var obj2 ={};
		obj2.width=this.width;
		obj2.height=this.height;
		
			var arr=[];
						for(var j=0;j<this.height;j++)
						{
							for(var i=0;i<this.width;i++)
							{
								var idx = (this.width * j + i) << 2;	
							
								
								arr.push(this.data[idx]);
								arr.push(this.data[idx+1]);
								arr.push(this.data[idx+2]);
								arr.push(this.data[idx+3]);
							}
						}
		
		
		
		
		
		obj2.data=arr;
		var obj = {};
		obj.id = md5;
		obj.img= obj2;
		global_memory.push(obj);
		
		//png.pack().pipe(fs.createWriteStream("memory/"+md5+".png"));
		
		
		
		
		
		logger_console_log('\nIn ident(...)\nmd5='+md5);
		res.writeHead( 200, { 'Content-Type':'text/plain' } );
		res.end(""+md5);
		
					
	});				
					
}

//-------------------------------------------------------------------
//---------------------  SHOW PIXELS FUNCTIONS ----------------------
//-------------------------------------------------------------------


//var global_memory=[];

function array_buffer_to_server(buffer)
{
		

		//logger_console_log(buffer.length);
		

					var md5 = generate_md5_id();	
					var obj = {};
		obj.id = md5;
		obj.png = buffer;
		obj.im=buffer;
		global_memory.push(obj);
		
		
		logger_console_log('\nIn blob_to_server(...)\nin memory we store buffer\n(and we need w&h for transform to png)\nid of obj='+md5+'\nindex in global_memory unknown');
		return md5;
			
}


function createImageData(w,h)
{
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	return ctx.createImageData(w,h);
	
}
	
function s_pixelsPro_redrawPixels_main(obj, x,y,pixelsPro_pg_main_image)
{
	var nn=obj.glob_pixelsPro_pg_pixels_scale;
	var newpng = createImageData( 150*nn, 150*nn );  
	for(var i=0;i<newpng.width;i++)
	{
		for(var j=0;j<newpng.height;j++)
		{
			
			var index2 = newpng.width * j + i << 2;
			
			newpng.data[index2+0] = 127;
			newpng.data[index2+1] = 127;
			newpng.data[index2+2] = 127;
			newpng.data[index2+3] = 255;
			
			
		}
	}		
	
	
	
	for(var i=-7;i<	8;i++)
	{
		for(var j=-7;j<	8;j++)
		{
			if((y+j)<0) continue;
			if((y+j)>=pixelsPro_pg_main_image.height) continue;
			if((x+i)<0) continue;
			if((x+i)>=pixelsPro_pg_main_image.width) continue;
			var index = pixelsPro_pg_main_image.width * (y+j) + (x+i) << 2;
			
			var index2 = newpng.width * (j+7)*10*nn + (i+7)*10*nn << 2;
			
			var color = [pixelsPro_pg_main_image.data[index+0],pixelsPro_pg_main_image.data[index+1],pixelsPro_pg_main_image.data[index+2],pixelsPro_pg_main_image.data[index+3]];
			
			fillRectanglePro(newpng, (i+7)*10*nn, (j+7)*10*nn, 10*nn, 10*nn, newpng.width, color);
			
			newpng.data[index2+0] = pixelsPro_pg_main_image.data[index+0];
			newpng.data[index2+1] = pixelsPro_pg_main_image.data[index+1];
			newpng.data[index2+2] = pixelsPro_pg_main_image.data[index+2];
			newpng.data[index2+3] = pixelsPro_pg_main_image.data[index+3];
			
			//logger_console_log('i='+i+' j='+j);
		}
	}
	
	
	

	return drawRedPoint(newpng,(7)*10*nn, (7)*10*nn, 10*nn, 10*nn);
	/***
	for(var i=0;i<150;i++)
	{
		for(var j=0;j<150;j++)
		{
			
			var index2 = newpng.width * j + i << 2;
			
			newpng.data[index2+0] = arr[index2+0];
			newpng.data[index2+1] = arr[index2+1];
			newpng.data[index2+2] = arr[index2+2];
			newpng.data[index2+3] = arr[index2+3];
			
			
		}
	}
	
	return newpng;
	***/
	
}



function blob_to_server_and_echo_from_server(buffer)
{

		//logger_console_log(buffer.length);
		//var s='';
		//for(var i=0;i<2500;i++){s+='[';for(var j=0;j<4;j++)s+=buffer[i*4+j]+',';s+=']\n';} logger_console_log(s);
        //logger_console_log(buffer.toString('base64'));
		
		
					var newpng = createImageData(248,248);
					
		
					for(var j=0;j<newpng.height;j++)
					{
						for(var i=0;i<newpng.width;i++)
						{
							
								
								var idx = newpng.width * j + i << 2;
								
								newpng.data[idx+0] = buffer[idx];
								newpng.data[idx+1] = buffer[idx+1];
								newpng.data[idx+2] = buffer[idx+2];;
								newpng.data[idx+3] = buffer[idx+3];;
								
								
						}
					}
					
					for(var j=0;j<10;j++)
					{
						for(var i=0;i<10;i++)
						{
							
								
								var idx = newpng.width * j + i << 2;
								
								newpng.data[idx+0] = 0;
								newpng.data[idx+1] = 0;
								newpng.data[idx+2] = 0;
								newpng.data[idx+3] = 255;
								
								
						}
					}
					
					
					return newpng
	
	
	
	// var reader = fs.createReadStream();
	// reader.readAsArrayBuffer(req.body);
	
 // reader.addEventListener("loadend", function() {
	// var s='';
   // for(var i=0;i<40;i++)s+=''+reader.result[i]; logger_console_log(s);
 // });
	
	// reader.on('readable', function(){
		// var data = reader.read();
		// logger_console_log('['+data+']');
	// });
	
	// req.pipe(reader).on('end', function(){
		// logger_console_log("THE END");
	// });
	
	/*****************
	req.pipe(reader).on( 'parsed', function()  {
		
	});
	
// reader.addEventListener("loadend", function() {
	
// });
// reader.readAsArrayBuffer(req.body);
	
	var png = new PNG({filterType: 4});
	req.pipe(png).on( 'parsed', function()  {
		
	
		var md5 = generate_md5_id();
		//var obj2 ={};
		//obj2.width=this.width;
		//obj2.height=this.height;
		
			// var arr=[];
						// for(var j=0;j<this.height;j++)
						// {
							// for(var i=0;i<this.width;i++)
							// {
								// var idx = (this.width * j + i) << 2;	
							
								
								// arr.push(this.data[idx]);
								// arr.push(this.data[idx+1]);
								// arr.push(this.data[idx+2]);
								// arr.push(this.data[idx+3]);
							// }
						// }
		
		
		
		
		
		//obj2.data=arr;
		var obj = {};
		obj.id = md5;
		obj.img= png;
		global_memory.push(obj);
		
		
		logger_console_log('\nIn blob_to_server(...)\nin memory (this is not index)md5='+md5);
		res.writeHead( 200, { 'Content-Type':'text/plain' } );
		res.end(""+md5);
		
					
	});				
	******************/				
}


function test245(buffer)
{

	//	logger_console_log(buffer.length);
		
		
		var newpng = createPNGfromBuffer(248,248,buffer);
					
					for(var j=0;j<10;j++)
					{
						for(var i=0;i<10;i++)
						{
							
								
								var idx = newpng.width * j + i << 2;
								
								newpng.data[idx+0] = 0;
								newpng.data[idx+1] = 0;
								newpng.data[idx+2] = 0;
								newpng.data[idx+3] = 255;
								
								
						}
					}
				
					var buffer2 = createBufferfromPNG(newpng);
					
					return createPNGfromBuffer(248,248,buffer2)
	
	
	
}



function blob_from_server(post)
{

			
			
			var md5 =  post['md5'];
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				logger_console_log('blob_from_server:error: not found obj with this md5:'+md5);
				
				return null;
			}
		
			var obj = glob_labirint_memory[ind];
			//logger_console_log(obj);
			var pixelsPro_pg_main_image= get_main_image(obj);
			//logger_console_log("----------------->  "+pixelsPro_pg_main_image);
			if(pixelsPro_pg_main_image==null)
			{
				
					logger_console_log('blob_from_server:error: may be white');
					
					return null;
				
			}
		
		logger_console_log('\nIn blob_from_server(...)\nmd5='+md5);
		
		 return pixelsPro_pg_main_image;
				
					
}

function get_main_image(obj, w, h)
{
	
		
	try{
	var id = obj.glob_pixelsPro_pg_main_image_id;
	
	var buf = get_array_buffer_by_id(id);
	
	var ind = get_index_of_main_image(id);
	if((w!=undefined)&&(h!=undefined)&&(ind!=null))
	{
		global_patterns_objects_array[ind].width=w;
		global_patterns_objects_array[ind].height=h;
	}
	
	
	// var el=document.getElementById("canvas0");
	// var im = el.getContext("2d").getImageData(0,0,el.width,el.height);
	// return im;
	
	return buf;
	
	
	//return createPNGfromBuffer(global_patterns_objects_array[ind].width, global_patterns_objects_array[ind].height, buf);
	}
	catch(e)
	{
		logger_console_log('catch err in  get_main_image');
		logger_console_log('id='+ obj.glob_pixelsPro_pg_main_image_id);
		logger_console_log('ind='+get_index_of_main_image(id));
	
		return null;
	}
}

function all_buzy_free()
{
	 global_buzy_object = null;
}

var global_buzy_object = null;
function is_buzy(pat_id,set_id)
{
	if(global_buzy_object==null) { global_buzy_object = [{ pat_id:pat_id,set_id:set_id,buzy:false }]; return false; }
	else if(global_buzy_object.length==0) { global_buzy_object.push({ pat_id:pat_id,set_id:set_id,buzy:false }); return false; }
	else {
		
		for(var i=0;i<global_buzy_object.length;i++)
		{
			if(global_buzy_object[i].buzy)
			{
				if(global_buzy_object[i].pat_id==pat_id)
				{
					if(global_buzy_object[i].set_id!=set_id) return true;
					
					global_buzy_object[i].buzy=false; //we yesterday buzy this channel and now free it
					
					return false; 
				}
			}
		}
		
		for(var i=0;i<global_buzy_object.length;i++)
		{
			
				if(global_buzy_object[i].pat_id==pat_id)
				{
					if(global_buzy_object[i].set_id==set_id) return false;
					
				}
			
		}
		
		global_buzy_object.push({ pat_id:pat_id,set_id:set_id,buzy:false });
		return false;
	}
}

function clear_buzy(pat_id,set_id)
{
	for(var i=0;i<global_buzy_object.length;i++)
	{
		if(global_buzy_object[i].pat_id==pat_id)
		{
			if(global_buzy_object[i].set_id==set_id) {

				//logger_console_log();
				global_buzy_object[i].buzy=false;
				return;
			
			}
			
		}
	}
}
function show_users()
{
	var s='<div class="flex_container">';
	for(var i=0;i<glob_labirint_memory.length;i++)
	{
		
		s+='<div>'+glob_labirint_memory[i].id+'</div>'+'<div>Image ID: '+glob_labirint_memory[i].glob_pixelsPro_pg_main_image_id+'</div>';
		
		
	}
	s+='</div>';
	return ""+s;
}

function show_buzy()
{
	var s='<div class="flex_container">';
	if(global_buzy_object==null){}
	else
	{
	
	for(var i=0;i<global_buzy_object.length;i++)
	{
		
		s+='<div>'+global_buzy_object[i].pat_id+'</div>'+'<div>'+global_buzy_object[i].set_id+'</div>';
		
		
	}
	}
	s+='</div>';
	
	return ""+s;
		
}

function is_buzzy(post)
{		
		
		
			
			var md5 =  post['md5'];
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				logger_console_log('is_buzzy:error: not found obj with this md5:'+md5);
				
				return null;
			}
		
			var obj = glob_labirint_memory[ind];
			var buzy = is_buzy(obj.glob_pixelsPro_pg_main_image_id,obj.id);	

			return ""+buzy;
		
			
		
}

function commit_labirints_changes(md5, im)
{
		
			logger_console_log("changes start to commit");
		
			//var md5 =  post['md5'];
			// // var rnd= post['rnd_pattern_schema'];
			// // logger_console_log('height='+he);
			//var wi= +post['wi'];
			// // logger_console_log('width='+wi);
			//var he= +post['he'];
			// // logger_console_log('height='+he);
			 var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
					logger_console_log('commit_labirints_changes:error: not found obj with this md5:'+md5);
					
				return null;
					
			}
			
		
			var obj = glob_labirint_memory[ind];
			
			
			var ind = get_index_of_main_image(obj.glob_pixelsPro_pg_main_image_id);
			var obj2 = global_patterns_objects_array[ind];
			obj2.im = obj.copy_image(im);
			obj2.width=im.width;
			obj2.height=im.height;
			global_patterns_objects_array[ind]=obj2;
			
			
			
			
			// var nm1 =  post['data_id'];
			// logger_console_log('nm1='+nm1);
			
			// var ind_new=isDataPNGObjectByMD5(nm1);
					// if(ind_new!=null)
					// {
						// var obj2  = global_memory[ind_new];
						// //var w = obj.glob_pixelsPro_pg_main_image.width;
						// //var h = obj.glob_pixelsPro_pg_main_image.height;
						// var png = createPNGfromBuffer(wi, he, obj2.png);
	
				//		obj.glob_pixelsPro_pg_main_image = obj.copy_image(im);
						// global_memory.splice(ind_new,1);
					// }
			
			return "changes commited. png is white";
			
			
			// // logger_console_log(global_memory[nm1]);
			// //now we can to check semaphorus of right access
			// if(is_buzy(obj.glob_pixelsPro_pg_main_image_id,obj.id)==false)
			// {
					// var pixelsPro_pg_main_image= get_main_image(obj);;
					// if(pixelsPro_pg_main_image==null)
					// {
						
						// logger_console_log('commit_labirints_changes:error: may be white');
						// glob_labirint_memory.splice(ind,1);
						
						// return 'get_chaosed_labirint:error: may be white'
						
					// }
					// else
					// {
						// if(combo_old_main_image_and_changed_main_image(obj.glob_pixelsPro_pg_main_image_id,nm1))
						// //if(set_buffer_by_id(obj.glob_pixelsPro_pg_main_image_id,nm1))
						// {
							// clear_buzy(obj.glob_pixelsPro_pg_main_image_id,obj.id);
							// logger_console_log(global_buzy_object);
							// logger_console_log("changes commited");
						    // return "changes commited";
						// }
						// else{
							// clear_buzy(obj.glob_pixelsPro_pg_main_image_id,obj.id);
							// logger_console_log(global_buzy_object);
							// logger_console_log("changes commited. new png is not old png");
						
							// return "changes commited. png is white";
							
						// }
					// }
			// }
		
	
	
	
}

////////////////////////////////////////////
var glob_labirint_memory=[]; 
var global_patterns_objects_array=[];
////////////////////////////////////////////
function get_index_of_main_image(main_image_id)
{
	for(var i=0;i<global_patterns_objects_array.length;i++)
	{
		var obj = global_patterns_objects_array[i];
		if(obj.white) continue;
		if(obj.id==main_image_id) return i;
		
	}
	return null;
}

function get_array_buffer_by_id(main_image_id)
{
	for(var i=0;i<global_patterns_objects_array.length;i++)
	{
		var obj = global_patterns_objects_array[i];
		if(obj.white) continue;
		if(obj.count<5) 
		{
			
			if(obj.id==main_image_id) return obj.im;//obj.png
			
			
		}
		
	}
	return null;
}
function createBufferfromPNG(newpng)
{
	
	var buffer = createImageData(newpng.width,newpng.height)//new ArrayBuffer(newpng.width*newpng.height*4);
	//var buf8 = new Uint8ClampedArray(buffer);
	
					
		
					for(var j=0;j<newpng.height;j++)
					{
						for(var i=0;i<newpng.width;i++)
						{
							
								
								var idx = newpng.width * j + i << 2;
								
								buffer[idx]=newpng.data[idx+0];
								buffer[idx+1]=newpng.data[idx+1];
								buffer[idx+2]=newpng.data[idx+2];
								buffer[idx+3]=newpng.data[idx+3];
								
								
						}
					}
					
					return buffer;
}

function createPNGfromBuffer(w,h,buffer)
{
	var newpng = createImageData(w, h );
					
		
					for(var j=0;j<newpng.height;j++)
					{
						for(var i=0;i<newpng.width;i++)
						{
							
								
								var idx = newpng.width * j + i << 2;
								
								newpng.data[idx+0] = buffer[idx];
								newpng.data[idx+1] = buffer[idx+1];
								newpng.data[idx+2] = buffer[idx+2];;
								newpng.data[idx+3] = buffer[idx+3];;
								
								
						}
					}
					
					return newpng;
}

function colors_equals(old_png,idx,new_png,idx)
{
	if(  
			(old_png.data[idx] == new_png.data[idx]) &&
			(old_png.data[idx+1] == new_png.data[idx+1]) &&
			(old_png.data[idx+2] == new_png.data[idx+2]) &&
			(old_png.data[idx+3] == new_png.data[idx+3])
	)
	{
		return true;
	}
	
	return false;
}

function is_white(old_png,idx)
{
	if(  
			(old_png.data[idx] == 255) &&
			(old_png.data[idx+1] == 255) &&
			(old_png.data[idx+2] == 255) &&
			(old_png.data[idx+3] == 255)
	)
	{
		return true;
	}
	
	return false;
}









function set_buffer_by_id(where_png_id,in_memory_id)
{

	for(var i=0;i<global_patterns_objects_array.length;i++)
	{
		var obj = global_patterns_objects_array[i];
		if(obj.white) continue;
			
		if(obj.id==where_png_id) {
			
			
					var ind=isDataPNGObjectByMD5(in_memory_id);
					if(ind!=null)
					{
						//	obj.width=	 //old value or unknown
						//	obj.height=		//old value or unknown			
						obj.png = global_memory[ind].png; //we buffer have here
						obj.im = global_memory[ind].im;
						return true;
					}
					else
					{
						logger_console_log("set_buffer_by_id:in global_memory not found object with id:"+in_memory_id);
						return false;
					}
			
			}
		
	}
	
	
	return false;
}


function is_white(color2)
{
	var color=getWhiteSpaceColor();
	if(
					(color2[0] == color[0]) &&
					(color2[1] == color[1]) &&
					(color2[2] == color[2]) &&
					(color2[3]== color[3])
					
		) 
			{
				return true;
			}
			return false;

}

function check_is_white(png)
{
	
	var imgData0 = png;
	
	for(var ind=0;ind<imgData0.data.length;ind+=4)
	{
		
		var arr0 = [];
		arr0[0] = imgData0.data[ind];	
		arr0[1] = imgData0.data[ind+1];	
		arr0[2] = imgData0.data[ind+2];
		arr0[3] = imgData0.data[ind+3];	
				
		if(is_white(arr0)==false) return false;
	}
	
	return true;
	
}	


function change_colors_to_razn_colors(im0) {
	
	var colors = getArrayOfAllColors(im0);
	console.log("=============== IN CHANGE COLORS 2 RAZN COLORS =================");
	console.log(colors);
	var razn_colors = get_razn_colors_pro(colors);
	console.log("=============== IN CHANGE COLORS 2 RAZN COLORS =================");
	console.log(razn_colors);
	
	var w = im0.width;
	var h = im0.height;
	
		
	for (var y = 0; y < h; y++) {
		

				for (var x = 0; x < w; x++) {
				
					
					var idx = (w * y + x) << 2;
					
					//var key = ""+im0.data[idx]+"_"+im0.data[idx+1]+"_"+im0.data[idx+2]+"_"+im0.data[idx+3];
					
					//if (obj[key]==undefined) { 
					
						
						var col = [im0.data[idx], im0.data[idx+1],im0.data[idx+2],im0.data[idx+3]]; 
					//}
					
					var ind = getIndexOfColor(colors, col);
					im0.data[idx] = razn_colors[ind][0];
					im0.data[idx+1] = razn_colors[ind][1];
					im0.data[idx+2] = razn_colors[ind][2];
					im0.data[idx+3] = razn_colors[ind][3];
					
					
				}
	}
	
	
	
	
	
	
	
	
	
	
	return im0;

}
	
function  get_allowed_pattern_id(rnd)
{
	var ind=null;
	for(var i=0;i<global_patterns_objects_array.length;i++)
	{
		var obj = global_patterns_objects_array[i];
		if(obj.white) continue;
		if(obj.count<5)
		{
			ind=i; 
			break;
		}
		
	}
	//////////////
	//splice from global_patterns_objects_array all whole white
	/////////////////
	if(ind==null)
	{
		
		var obj = {};
		obj.id=generate_md5_id();
		obj.count=4;
		obj.white=false;
		//var rnd='number of pattern schema';
		var png = generate_new_pattern(rnd); //new PNG({filterType: 4});
		if(png == null) return null;

		png = change_colors_to_razn_colors(png);
		
		obj.width = png.width;
		obj.height = png.height;
		obj.im=png;
		// obj.png=createBufferfromPNG(png);
		global_patterns_objects_array.push(obj);
		
		return obj.id;
	}
	
	
	return global_patterns_objects_array[ind].id;
	
}






function __execute_script(commands)
{
	logger_console_log('In __execute_script:');
		
	var arr = commands.split(",");
	var res_png=null;
	res_png =  createImageData(100, 100 );//new PNG({filterType: 4});
		
	
	for(var i=0;i<arr.length;i++)
	{
		arr[i]=arr[i].trim();
		logger_console_log("executing ["+arr[i]+"]"); 
		
		if(arr[i].indexOf("generate random seed")===0)
		{
			var t = arr[i].replace("generate random seed",'');
			t=t.trim();
			var params=null;
			if(t.length>0)
			{
				params=t.split(" ");
				if(params.length>0)
				{
					for(var ii=0;ii<params.length;ii++) params[ii]=Number(params[ii]);
					
				}
				else
				{
					params =[15,3];
				}
			}
			else
			{
				params =[15,3];
			}
			res_png = mod_generate_random_seed_generate_random_seed(params);
			
			
		}
		else if(arr[i]=="median")
		{
			
			res_png = mod_median__median(res_png);
			
		}
		else if(arr[i].indexOf("magik rotate")===0)
		{
			var t = arr[i].replace("magik rotate",'');
			t=t.trim();
			var params=null;
			if(t.length>0)
			{
				params=Number(t);
				
			}
			else
			{
				params =1;
			}
			res_png = mod_magik_rotate_magik_rotate(res_png,params);
			
		}
		else if(arr[i]=="up")
		{
			res_png = mod_up_upForImageData(res_png);
		}
		else if(arr[i]=="smooth")
		{
			
			res_png = mod_smooth_smooth(res_png);
			
		}
		else if(arr[i]=="rotate plus 45")
		{
			res_png = mod_rotate_ff_rotate_ff(res_png);
		}
		else if(arr[i]=="paint over")
		{
		
			res_png = mod_paint_over_paint_over(res_png);
		
		}
		else if(arr[i]=="nineth")
		{
		
			res_png = mod_nineth_nineth(res_png);
		
		}
		else if(arr[i]=="nonineth")
		{
		
			res_png = mod_nineth_nonineth(res_png);
		
		}
		else if(arr[i]=="maximus")
		{
		
			res_png = mod_maximus_maximus(res_png);
		
		}
		else if(arr[i]=="plus")
		{
			if(res_png.width * 2 > 1200 || res_png.height * 2 > 1200 )
			{
				
				
				return null;
				
			}
			
			res_png = __plus(res_png);
			
			
		}
		
		else if(arr[i]=="mirror right")
		{
			if(res_png.width * 2 > 1200  )
			{
				
				
				return null;
				
			}
			
			res_png = mod_mirror_mirror_right(res_png);
			
			
			
		}
		else if(arr[i]=="mirror down")
		{
			
			if( res_png.height * 2 > 1200 )
			{
				
				
				return null;
				
			}
			
			res_png = mod_mirror_mirror_down(res_png);
			
			
		}
		
		else if(arr[i]=="axes minus")
		{
		
		
		
			res_png = mod_axes_bothAxesMinus(res_png);
		
		
		
		}
		
		
	}
	
	return res_png;
	
}

function generate_new_pattern(num)
{
	if(num==undefined) num=0;
	num = ''+num;
	var regexp = /^\d$/;
	logger_console_log( num.search(regexp) );
	if(num.search(regexp)==-1) num='0';
	// var str = "45"//Я люблю56 JavaScript!"; // будем искать в этой строке
    // var regexp = /^\d$/;
    // logger_console_log( str.search(regexp) ); // -1
	num=Number(''+num);
	
	if(num<0) num=0;
	if(num>4) num = 4;
	var txt=[];
	txt[0] = "generate random seed 9 5, mirror right, mirror down, axes minus, axes minus, mirror right, mirror down, axes minus, plus,median,rotate plus 45,median,plus";
	txt[1] = "generate random seed, mirror right, mirror down, axes minus, plus, plus, plus, plus, median, median,rotate plus 45,median, mirror right, mirror down";
	txt[2] = "generate random seed 9 5, mirror right, mirror down, axes minus, axes minus, mirror right, mirror down, axes minus, plus,median,rotate plus 45,median,plus,plus,plus";
	txt[3] = "generate random seed 9 5, plus, mirror right, mirror down, plus, plus,median,plus";
	txt[4] = "generate random seed 9 5, plus, rotate plus 45, median, rotate plus 45, median";
	console.log("[num]="+num);
	
	return __execute_script(txt[num]);
	
	
}


function pixelsPro_array_equals(color,color2)
{
	for (var i = 0;  i < color.length; i++) 
	{
		if(Number(color[i])!=Number(color2[i])) return false;
		
	}
	return true;
}




function getRndColor()
{
	var r = getRandomInt(0, 256);
	var g = getRandomInt(0, 256);
	var b = getRandomInt(0, 256);
	var a = 255;
	
	return [r,g,b,a];
	
}
/***
function copy_image(oldpng)
{
	//logger_console_log('\nIn copy_image(...)\n');
	
		
	var newpng = new PNG(
	{
		width: oldpng.width,
		height: oldpng.height,
		filterType: 4
	});
	
	for(var i=0;i<newpng.width;i++)
	{
		for(var j=0;j<newpng.height;j++)
		{
			
			var index = newpng.width * j + i << 2;
			
			newpng.data[index] = oldpng.data[index];
			newpng.data[index+1] = oldpng.data[index+1];
			newpng.data[index+2] = oldpng.data[index+2];
			newpng.data[index+3] = oldpng.data[index+3];
			
			
		}
	}	
	
	return newpng;
			
}
***/


function s_set_xy_labirint(md5,x,y) {
	
	
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				logger_console_log('set_xy_labirint:error: not found obj with this md5:'+md5);
				
					return 'set_xy_labirint:error:  not found obj with this md5:'+md5;
					
			}
		
			var obj = glob_labirint_memory[ind];
			
			obj.glob_pixelsPro_x_left_top=x;
			obj.glob_pixelsPro_y_left_top=y;
			glob_labirint_memory[ind]=obj;
	return '{"x":'+obj.glob_pixelsPro_x_left_top+',"y":'+obj.glob_pixelsPro_y_left_top+',"nn":'+obj.glob_pixelsPro_pg_pixels_scale+'}'
}



function s_get_xy_labirint(md5) {
	

	
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				logger_console_log('get_xy_labirint:error: not found obj with this md5:'+md5);
				 return 'get_xy_labirint:error:  not found obj with this md5:'+md5;
					
			}
		
			var obj = glob_labirint_memory[ind];
	
	
	return '{"x":'+obj.glob_pixelsPro_x_left_top+',"y":'+obj.glob_pixelsPro_y_left_top+',"nn":'+obj.glob_pixelsPro_pg_pixels_scale+'}';
}





function s_get_array_of_all_generated_stones(md5) {

logger_console_log(md5);
	var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				logger_console_log('get_array_of_all_generated_stones:error: not found obj with this md5:'+md5);
				
					return 'get_array_of_all_generated_stones:error:  not found obj with this md5:'+md5;
					
			}
		
			var obj = glob_labirint_memory[ind];

	
	var res=JSON.stringify(obj.global_inside_stones);
	return res;
}

function get_chaosed_labirint(md5)
{
	
	logger_console_log('\nIn get_chaosed_labirint(...)\n');
	
		
		
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				logger_console_log('get_chaosed_labirint:error: not found obj with this md5:'+md5);
				
					return 'get_chaosed_labirint:error:  not found obj with this md5:'+md5;
			}
		
			var obj = glob_labirint_memory[ind];
	
	var pixelsPro_pg_main_image= get_main_image(obj);
			if(pixelsPro_pg_main_image==null)
			{
				
				//logger_console_log('get_chaosed_labirint:error: may be white\n'+JSON.stringify(obj);
				glob_labirint_memory.splice(ind,1); 
				return init_pixels(md5);
			//	res.writeHead( 500, { 'Content-Type':'text/plain' } );
			//		res.end('get_chaosed_labirint:error: may be white');
			//		req.connection.destroy();
			//		return;
				
			}
	//obj.glob_pixelsPro_pg_map_image = obj.copy_image(pixelsPro_pg_main_image);
	//pixelsPro_pg_main_image = setChaosPixels(obj);
				
	return obj.copy_image(pixelsPro_pg_main_image);	
}

// function init_boh_pixels(req, res)
// {
	// logger_console_log('\nIn init_boh_pixels(...)\n');
	
		// if(glob_pixelsPro_pg_main_image==null)
		// {
			
			
		// }
		// else
		// {
			
			
			// var newpng = new PNG(
			// {
				// width: glob_pixelsPro_pg_main_image.width,
				// height: glob_pixelsPro_pg_main_image.height,
				// filterType: 4
			// });
			
			// for(var i=0;i<glob_pixelsPro_pg_main_image.width;i++)
			// {
				// for(var j=0;j<glob_pixelsPro_pg_main_image.height;j++)
				// {
					
					// var index2 = glob_pixelsPro_pg_main_image.width * j + i << 2;
					
					// newpng.data[index2+0] = 127;
					// newpng.data[index2+1] = 127;
					// newpng.data[index2+2] = 127;
					// newpng.data[index2+3] = 255;
					
					
				// }
			// }	
			// global_karman_stones=[];
			// global_inside_stones=[];
			// var w = glob_pixelsPro_pg_main_image.width;
			// var h = glob_pixelsPro_pg_main_image.height;
			// var n=glob_num_of_strawbery;
			// for(var i=0;i<n;i++)
			// {
				// var rx = getRandomInt(0, w);
				// var ry = getRandomInt(0, h);
				// var rgba = getRndColor();
				// var ind = ry*w + rx << 2;
				// newpng.data[ind] = rgba[0];
				// newpng.data[ind+1] = rgba[1];
				// newpng.data[ind+2] = rgba[2];
				// newpng.data[ind+3] = rgba[3];
				// if(stone_in_array(rx,ry,rgba)==false)
				// addStone(rx,ry,cloneColor(rgba),global_inside_stones);
			// }
	
		
		// }
		
		// glob_pixelsPro_pg_boh_image = newpng;
		
		// /***
		// var x=glob_pixelsPro_x_left_top;
		// var y=glob_pixelsPro_y_left_top;
		
		// var index = glob_pixelsPro_pg_main_image.width * (y) + (x) << 2;
				// var color = [
					// glob_pixelsPro_pg_main_image.data[index],
					// glob_pixelsPro_pg_main_image.data[index+1],
					// glob_pixelsPro_pg_main_image.data[index+2],
					// glob_pixelsPro_pg_main_image.data[index+3]
				// ];
				// glob_pixelsPro_pg_main_color=color;
		// // res.writeHead( 200, { 'Content-Type':'text/plain' } );
		// // res.end("ok");
		// sendImage(glob_pixelsPro_pg_main_image,res,'\nLabirint initiation success\n');
		// ***/
		
				
					
// }

function add_boh_pixel(post)
{
	logger_console_log('\nIn add_boh_pixel(...)\n');
	
		
			
		
		//	var post = qs.parse(body);
			
			
			var md5 =  post['md5'];
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				logger_console_log('add_boh_pixel:error: not found obj with this md5:'+md5);
				
					return 'add_boh_pixel:error:  not found obj with this md5:'+md5;
			}
		
			var obj = glob_labirint_memory[ind];
			
		
			var x =  +post['x'];
			var y =  +post['y'];
			var nx=6;
			var ny=6;
			logger_console_log("x="+x);
			logger_console_log("y="+y);
			//obj.glob_pixelsPro_x_left_top=x;
			//obj.glob_pixelsPro_y_left_top=y;
			 // +post['scale_koeficient'];
			var nn = obj.glob_pixelsPro_pg_pixels_scale;//=nn;
			obj.glob_num_of_strawbery =  +post['num_of_strawbery'];
			
			
			
			var pixelsPro_pg_main_image= get_main_image(obj);
			if(pixelsPro_pg_main_image==null)
			{
				logger_console_log('add_boh_pixel:error: may be white');
				
					return 'add_boh_pixel:error: may be white';
			}
			obj.glob_pixelsPro_pg_map_image = obj.copy_image(pixelsPro_pg_main_image);
			
			
			var newpng =  createImageData(pixelsPro_pg_main_image.width, pixelsPro_pg_main_image.height );
			
			
			for(var i=0;i<pixelsPro_pg_main_image.width;i++)
			{
				for(var j=0;j<pixelsPro_pg_main_image.height;j++)
				{
					
					var index2 = pixelsPro_pg_main_image.width * j + i << 2;
					
					newpng.data[index2+0] = 127;
					newpng.data[index2+1] = 127;
					newpng.data[index2+2] = 127;
					newpng.data[index2+3] = 255;
					
					
				}
			}	
			//global_karman_stones=[];
			//global_inside_stones=[];
			var w = pixelsPro_pg_main_image.width;
			var h = pixelsPro_pg_main_image.height;
			var n=obj.glob_num_of_strawbery;
			
			var rgba = getRndColor();
				var ind = (y)*w + x << 2;
				newpng.data[ind] = rgba[0];
				newpng.data[ind+1] = rgba[1];
				newpng.data[ind+2] = rgba[2];
				newpng.data[ind+3] = rgba[3];
				if(stone_in_array(obj,x,y,rgba)==false)
				addStone(obj,x,y,cloneColor(rgba),obj.global_inside_stones);
			
			
			
			/***
			
			
			
			for(var i=1;i<n;i++)
			{
				var kx = getRandomInt(0, 2);
				var ky = getRandomInt(0, 2);
				if(kx==0)kx=-1;
				if(ky==0)ky=-1;
				var rx = getRandomInt(2, nx)*kx+x;
				var ry = getRandomInt(2, ny)*ky+y;
				var rgba = getRndColor();
				var ind = ry*w + rx << 2;
				newpng.data[ind] = rgba[0];
				newpng.data[ind+1] = rgba[1];
				newpng.data[ind+2] = rgba[2];
				newpng.data[ind+3] = rgba[3];
				if(stone_in_array(obj,rx,ry,rgba)==false)
				addStone(obj,rx,ry,cloneColor(rgba),obj.global_inside_stones);
			}
			
			***/
	
			obj.glob_pixelsPro_pg_boh_image = newpng;
		
		
			pixelsPro_pg_main_image = setChaosPixels(obj);
				
			var result_png = pixelsPro_redrawPixels_main(obj,x,y,pixelsPro_pg_main_image);
								
			return result_png;
			
			
			
			
			
		
		
		
		/***
		var x=glob_pixelsPro_x_left_top;
		var y=glob_pixelsPro_y_left_top;
		
		var index = glob_pixelsPro_pg_main_image.width * (y) + (x) << 2;
				var color = [
					glob_pixelsPro_pg_main_image.data[index],
					glob_pixelsPro_pg_main_image.data[index+1],
					glob_pixelsPro_pg_main_image.data[index+2],
					glob_pixelsPro_pg_main_image.data[index+3]
				];
				glob_pixelsPro_pg_main_color=color;
		// res.writeHead( 200, { 'Content-Type':'text/plain' } );
		// res.end("ok");
		sendImage(glob_pixelsPro_pg_main_image,res,'\nLabirint initiation success\n');
		***/
		
				
					
}


function take_stone(post)
{
		logger_console_log('\nIn take_stone(...)\n');
		
		
			var md5 =  post['md5'];
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				logger_console_log('take_stone:error: not found obj with this md5:'+md5);
				
					return 'take_stone:error:  not found obj with this md5:'+md5;
			}
		
		
			var obj = glob_labirint_memory[ind];
			
			

			console.log('x='+post['x']);
			console.log('y='+post['y']);
			console.log('color='+post['color']);
			
			take_chaos(obj,post['x'],post['y'],post['color']);	
		
			
			
			
	
		 return 'new stone taken';
			
		
}


function clear_stones(post)
{
		logger_console_log('\nIn clear_stones(...)\n');
		
		
			
			var md5 =  post['md5'];
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				logger_console_log('clear_stones:error: not found obj with this md5:'+md5);
				
					return 'clear_stones:error:  not found obj with this md5:'+md5;
			}
		
			var obj = glob_labirint_memory[ind];
			
			if(obj.global_inside_stones.length==0)
			{logger_console_log('\nIn clear_stones(...)');
				obj.number_of_collected_stones=obj.global_karman_stones.length;
				obj.global_karman_stones=[];
				obj.global_inside_stones=[];
				glob_labirint_memory[ind]=obj;
			}
			
			
		res.writeHead( 200, { 'Content-Type':'text/plain' } );
		 return 'cleared';
		
			
}




function stone_in_array(obj,rx,ry,rgba)
{
	for(var n=0;n<obj.global_inside_stones.length;n++)
	{
		
		var i=obj.global_inside_stones[n].x;
		var j=obj.global_inside_stones[n].y;
		var c=obj.global_inside_stones[n].color;
		if((i==rx)&&(j==ry))
		{
			
			if(pixelsPro_array_equals(c,rgba))return true;
		}
	}
		return false;		
}



			
function pixelsPro_getNeighborsColorsAllArray(obj,x,y,pixelsPro_pg_main_image)
{
	var x0=x-1;
	var x1=x+1;
	var y0=y-1;
	var y1=y+1;
	var colors=[];
	//if(color==undefined)colors.push(color);
	
	
		var index = pixelsPro_pg_main_image.width * (y) + (x0) << 2;
				color = [
					pixelsPro_pg_main_image.data[index],
					pixelsPro_pg_main_image.data[index+1],
					pixelsPro_pg_main_image.data[index+2],
					pixelsPro_pg_main_image.data[index+3]
				];
				
				
	 colors.push(color);
				
				index = pixelsPro_pg_main_image.width * (y) + (x1) << 2;
				color = [
					pixelsPro_pg_main_image.data[index],
					pixelsPro_pg_main_image.data[index+1],
					pixelsPro_pg_main_image.data[index+2],
					pixelsPro_pg_main_image.data[index+3]
				];

				colors.push(color);
				
				index = pixelsPro_pg_main_image.width * (y0) + (x) << 2;
				color = [
					pixelsPro_pg_main_image.data[index],
					pixelsPro_pg_main_image.data[index+1],
					pixelsPro_pg_main_image.data[index+2],
					pixelsPro_pg_main_image.data[index+3]
				];
				
	 colors.push(color);
				
				index = pixelsPro_pg_main_image.width * (y1) + (x) << 2;
				var color = [
					pixelsPro_pg_main_image.data[index],
					pixelsPro_pg_main_image.data[index+1],
					pixelsPro_pg_main_image.data[index+2],
					pixelsPro_pg_main_image.data[index+3]
				];
				
		 colors.push(color);
				
				//color=glob_pixelsPro_pg_main_color;
				
				var grey_color = [127,127,127,255];
				
				for(var i=0;i<colors.length;i++)
				{
					// if((colors[i][0]==color[0])&&(colors[i][1]==color[1])&&(colors[i][2]==color[2])&&(colors[i][3]==color[3]))
					// {
						
						// colors.splice(i,1);
						// break;
						
					// }
					
					if(pixelsPro_array_equals(colors[i],grey_color)) colors.splice(i,1);
				}
				
				return colors;
	
}



			
function pixelsPro_getNeighborsColors(obj,x,y,color,pixelsPro_pg_main_image)
{
	var x0=x-1;
	var x1=x+1;
	var y0=y-1;
	var y1=y+1;
	var colors=[];
	//if(color==undefined)colors.push(color);
	
	
		var index = pixelsPro_pg_main_image.width * (y) + (x0) << 2;
				color = [
					pixelsPro_pg_main_image.data[index],
					pixelsPro_pg_main_image.data[index+1],
					pixelsPro_pg_main_image.data[index+2],
					pixelsPro_pg_main_image.data[index+3]
				];
				
				
	var f=false;
	for(var i=0;i<colors.length;i++)
	{
		if((colors[i][0]==color[0])&&(colors[i][1]==color[1])&&(colors[i][2]==color[2])&&(colors[i][3]==color[3]))
		{
			f=true;
			break;
		}
	}
	if(f==false) colors.push(color);
				
				index = pixelsPro_pg_main_image.width * (y) + (x1) << 2;
				color = [
					pixelsPro_pg_main_image.data[index],
					pixelsPro_pg_main_image.data[index+1],
					pixelsPro_pg_main_image.data[index+2],
					pixelsPro_pg_main_image.data[index+3]
				];
				
				f=false;
	for(var i=0;i<colors.length;i++)
	{
		if((colors[i][0]==color[0])&&(colors[i][1]==color[1])&&(colors[i][2]==color[2])&&(colors[i][3]==color[3]))
		{
			f=true;
			break;
		}
	}
	if(f==false) colors.push(color);
				
				index = pixelsPro_pg_main_image.width * (y0) + (x) << 2;
				color = [
					pixelsPro_pg_main_image.data[index],
					pixelsPro_pg_main_image.data[index+1],
					pixelsPro_pg_main_image.data[index+2],
					pixelsPro_pg_main_image.data[index+3]
				];
				
				f=false;
				for(var i=0;i<colors.length;i++)
				{
					if((colors[i][0]==color[0])&&(colors[i][1]==color[1])&&(colors[i][2]==color[2])&&(colors[i][3]==color[3]))
					{
						f=true;
						break;
					}
				}
				if(f==false) colors.push(color);
				
				index = pixelsPro_pg_main_image.width * (y1) + (x) << 2;
				var color = [
					pixelsPro_pg_main_image.data[index],
					pixelsPro_pg_main_image.data[index+1],
					pixelsPro_pg_main_image.data[index+2],
					pixelsPro_pg_main_image.data[index+3]
				];
				
				f=false;
				for(var i=0;i<colors.length;i++)
				{
					if((colors[i][0]==color[0])&&(colors[i][1]==color[1])&&(colors[i][2]==color[2])&&(colors[i][3]==color[3]))
					{
						f=true;
						break;
					}
				}
				if(f==false) colors.push(color);
				
				//color=glob_pixelsPro_pg_main_color;
				
				var grey_color = [127,127,127,255];
				
				for(var i=0;i<colors.length;i++)
				{
					// if((colors[i][0]==color[0])&&(colors[i][1]==color[1])&&(colors[i][2]==color[2])&&(colors[i][3]==color[3]))
					// {
						
						// colors.splice(i,1);
						// break;
						
					// }
					
					if(pixelsPro_array_equals(colors[i],grey_color)) colors.splice(i,1);
				}
				
				return colors;
	
}

// function define_color_for_pass(x,y,color)
// {
	// var colors = pixelsPro_getNeighborsColors(x,y,color);
	// if(colors.length==0) return [];
	// return colors[getRandomInt(0,colors.length)];
// }

// function get_color_for_pass(req, res)
// {
	// if(glob_pixelsPro_color_for_pass.length==0) result_text='255,255,255,255';
	// else result_text=glob_pixelsPro_color_for_pass.join(",");
	// sendText(result_text, res, 'get_color_for_pass');
// }

function getIndexObjectByMD5(md5)
{
	
	for(var i=0;i<glob_labirint_memory.length;i++)
	{
		
		if(glob_labirint_memory[i].id===md5)
		{
			
			return i;
		}
	  
	}
	return null;
	
}

function generate_md5_id()
{
	
	var d = new Date();
	var ms = d.getTime();
	var s = '';
	var arr = ['a','b','c','d','e','f','g','h','i','j','K','L','M','N','O','P',')','[',']',')','0','4','7'];
	for(var i=0;i<16;i++)
	{
		var rnd=Math.floor(Math.random() * (arr.length - 0)) + 0;
		
		s += arr[rnd];
	}
	return get_md5_hex(''+s+''+ms);
	
}

function init_pixels(post)
{
	logger_console_log('\nIn init_pixels(...)\n');
	
	
	
			var md5 =  post['md5'];
			var rnd =  post['rnd_pattern_schema'];
			
			logger_console_log('rnd='+rnd);
			if(rnd==undefined) rnd=0;
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
		//	console.log('in init_pixels md5='+md5);
	/////////////////////////////////////////
	//create_glob_labirint_memory_object();
	/////////////////////////////////////////
	logger_console_log('create_glob_labirint_memory_obj');
	var obj = {};
	obj.id = generate_md5_id();
	obj.glob_pixelsPro_x_left_top = 0;
	obj.glob_pixelsPro_y_left_top = 0;
	obj.glob_pixelsPro_point = null;
	obj.glob_pixelsPro_collected = [];
	obj.glob_pixelsPro_pg_main_color = null;
	obj.glob_pixelsPro_showing_scale_div = false;
	obj.glob_pixelsPro_scale_div = null;
	obj.global_karman_stones=[];
	obj.global_inside_stones=[];
	obj.number_of_collected_stones=0;
	obj.glob_pixelsPro_errorMessage='none';
	obj.glob_pixelsPro_pg_boh_image = null;
	obj.glob_pixelsPro_pg_map_image = null;
	obj.glob_pixelsPro_pg_pixels_scale = 2;
	
	obj.copy_image = function(oldpng)
	{
		//logger_console_log('\nIn copy_image(...)\n');
	
		
		var newpng =  createImageData(oldpng.width, oldpng.height );
		
		for(var i=0;i<newpng.width;i++)
		{
			for(var j=0;j<newpng.height;j++)
			{
				
				var index = newpng.width * j + i << 2;
				
				newpng.data[index] = oldpng.data[index];
				newpng.data[index+1] = oldpng.data[index+1];
				newpng.data[index+2] = oldpng.data[index+2];
				newpng.data[index+3] = oldpng.data[index+3];
				
				
			}
		}	
		
		return newpng;
			

	}
	
	obj.glob_pixelsPro_pg_main_image_id = get_allowed_pattern_id(rnd);
	logger_console_log('init_pixels:obj.glob_pixelsPro_pg_main_image_id ='+obj.glob_pixelsPro_pg_main_image_id );	
	if(obj.glob_pixelsPro_pg_main_image_id==null)
	{
		
		return "init_pixels: error: something wrong";	
	}
	
	var pixelsPro_pg_main_image = get_main_image(obj);
	if(pixelsPro_pg_main_image==null)
			{
				logger_console_log('init_pixels:error: may be white');
				
					return 'init_pixels:error: may be white';
			}
	obj.glob_pixelsPro_pg_map_image = obj.copy_image(pixelsPro_pg_main_image);
	//req.pipe(obj.glob_pixelsPro_pg_main_image).on( 'parsed', function()  {
		
	
		var x=obj.glob_pixelsPro_x_left_top;
		var y=obj.glob_pixelsPro_y_left_top;
		
		var index = pixelsPro_pg_main_image.width * (y) + (x) << 2;
				var color = [
					pixelsPro_pg_main_image.data[index],
					pixelsPro_pg_main_image.data[index+1],
					pixelsPro_pg_main_image.data[index+2],
					pixelsPro_pg_main_image.data[index+3]
				];
				obj.glob_pixelsPro_pg_main_color=color;
				
				obj.glob_pixelsPro_pg_map_image = obj.copy_image(pixelsPro_pg_main_image);
				
				obj.glob_pixelsPro_x_left_top = 0;
				obj.glob_pixelsPro_y_left_top = pixelsPro_pg_main_image.height-1;
				
				
				glob_labirint_memory.push(obj);
				
				ind = getIndexObjectByMD5(obj.id);		
			
				//obj.glob_pixelsPro_color_for_pass = obj.define_color_for_pass(x,y,color);
	
				
		}
			
		
				var obj = glob_labirint_memory[ind];
				
						
				
				return""+obj.id;	
						
			
		
	
}

function get_labirint_settings(post)
{
	
	
			
		var md5 =  post['md5'];
		var ind = getIndexObjectByMD5(md5);
		if(ind==null)
		{
			logger_console_log('get_labirint_settings:error: not found obj with this md5:'+md5);
			
				return 'get_labirint_settings:error:  not found obj with this md5:'+md5;
		}
	
		var obj = glob_labirint_memory[ind];
		
		
		var pixelsPro_pg_main_image= get_main_image(obj);
		if(pixelsPro_pg_main_image==null)
		{
			logger_console_log('get_labirint_settings:error: not found labirint with this md5:'+md5);
		
			return 'get_labirint_settings:error: not found labirint with this md5:'+md5;
			
		}
		obj.glob_pixelsPro_pg_map_image = obj.copy_image(pixelsPro_pg_main_image);
		
			// var x =  +post['x'];
			// var y =  +post['y'];
			
			// logger_console_log("x="+x);
			// logger_console_log("y="+y);
			// obj.glob_pixelsPro_x_left_top=x;
			// obj.glob_pixelsPro_y_left_top=y;
			var nn =  +post['scale_koeficient'];
			obj.glob_pixelsPro_pg_pixels_scale = nn;
			obj.glob_num_of_strawbery =  +post['num_of_strawbery'];
				
				var newpng =  createImageData(pixelsPro_pg_main_image.width, pixelsPro_pg_main_image.height ); 
				
			
			for(var i=0;i<pixelsPro_pg_main_image.width;i++)
			{
				for(var j=0;j<pixelsPro_pg_main_image.height;j++)
				{
					
					var index2 = pixelsPro_pg_main_image.width * j + i << 2;
					
					newpng.data[index2+0] = 127;
					newpng.data[index2+1] = 127;
					newpng.data[index2+2] = 127;
					newpng.data[index2+3] = 255;
					
					
				}
			}	
			obj.global_karman_stones=[];
			obj.global_inside_stones=[];
			var w = pixelsPro_pg_main_image.width;
			var h = pixelsPro_pg_main_image.height;
			var n=obj.glob_num_of_strawbery;
			for(var i=0;i<n;i++)
			{
				var rx = getRandomInt(0, w);
				var ry = getRandomInt(0, h);
				var rgba = getRndColor();
				var ind = ry*w + rx << 2;
				newpng.data[ind] = rgba[0];
				newpng.data[ind+1] = rgba[1];
				newpng.data[ind+2] = rgba[2];
				newpng.data[ind+3] = rgba[3];
				if(stone_in_array(obj,rx,ry,rgba)==false)
				addStone(obj,rx,ry,cloneColor(rgba),obj.global_inside_stones);
			}
	
		
	
		
		obj.glob_pixelsPro_pg_boh_image = newpng;
	
			pixelsPro_pg_main_image = setChaosPixels(obj);
				
			var result_png = pixelsPro_redrawPixels_main(obj,x,y,pixelsPro_pg_main_image);
								
			return result_png;
	
					
}

function init_labirint_settings(post)
{
	

			
		var md5 =  post['md5'];
		var ind = getIndexObjectByMD5(md5);
		if(ind==null)
		{
			logger_console_log('init_labirint_settings:error: not found obj with this md5:'+md5);
			
				return 'init_labirint_settings:error:  not found obj with this md5:'+md5;
		}
	
		var obj = glob_labirint_memory[ind];
		
		
		var pixelsPro_pg_main_image= get_main_image(obj);
		if(pixelsPro_pg_main_image==null)
		{
			logger_console_log('init_labirint_settings:error: not found labirint with this md5:'+md5);
			
			return 'init_labirint_settings:error: not found labirint with this md5:'+md5;
			
		}
		obj.glob_pixelsPro_pg_map_image = obj.copy_image(pixelsPro_pg_main_image);
		
			var x =  +post['x'];
			var y =  +post['y'];
			
			logger_console_log("x="+x);
			logger_console_log("y="+y);
			obj.glob_pixelsPro_x_left_top=x;
			obj.glob_pixelsPro_y_left_top=y;
			var nn =  +post['scale_koeficient'];
			obj.glob_pixelsPro_pg_pixels_scale = nn;
			obj.glob_num_of_strawbery =  +post['num_of_strawbery'];
				
				// var newpng =  createImageData(pixelsPro_pg_main_image.width, pixelsPro_pg_main_image.height );
				
			
			// for(var i=0;i<pixelsPro_pg_main_image.width;i++)
			// {
				// for(var j=0;j<pixelsPro_pg_main_image.height;j++)
				// {
					
					// var index2 = pixelsPro_pg_main_image.width * j + i << 2;
					
					// newpng.data[index2+0] = 127;
					// newpng.data[index2+1] = 127;
					// newpng.data[index2+2] = 127;
					// newpng.data[index2+3] = 255;
					
					
				// }
			// }	
			// obj.global_karman_stones=[];
			// obj.global_inside_stones=[];
			// var w = pixelsPro_pg_main_image.width;
			// var h = pixelsPro_pg_main_image.height;
			// var n=obj.glob_num_of_strawbery;
			// for(var i=0;i<n;i++)
			// {
				// var rx = getRandomInt(0, w);
				// var ry = getRandomInt(0, h);
				// var rgba = getRndColor();
				// var ind = ry*w + rx << 2;
				// newpng.data[ind] = rgba[0];
				// newpng.data[ind+1] = rgba[1];
				// newpng.data[ind+2] = rgba[2];
				// newpng.data[ind+3] = rgba[3];
				// if(stone_in_array(obj,rx,ry,rgba)==false)
				// addStone(obj,rx,ry,cloneColor(rgba),obj.global_inside_stones);
			// }
	
		
	
		
		// obj.glob_pixelsPro_pg_boh_image = newpng;
	
			// pixelsPro_pg_main_image = setChaosPixels(obj);
				
			var result_png = pixelsPro_redrawPixels_main(obj,x,y,pixelsPro_pg_main_image);
								
			 return result_png;
	
					
}


function setChaosPixels(obj)
{
		
	var copy_map_image = obj.copy_image(obj.glob_pixelsPro_pg_map_image);
	
	
		
					for(var n=0;n<obj.global_inside_stones.length;n++)
					{
						
						var i=obj.global_inside_stones[n].x;
						var j=obj.global_inside_stones[n].y;
							
						var index = copy_map_image.width * j + i << 2;
						
						copy_map_image.data[index] = obj.global_inside_stones[n].color[0];
						copy_map_image.data[index+1] = obj.global_inside_stones[n].color[1];
						copy_map_image.data[index+2] = obj.global_inside_stones[n].color[2];
						copy_map_image.data[index+3] = obj.global_inside_stones[n].color[3];
						
					
				}
				
			
			return copy_map_image;
}


function get_error_message(md5)	
{			


		
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				logger_console_log('get_error_message:error: not found obj with this md5:'+md5);
			
					return 'get_error_message:error:  not found obj with this md5:'+md5;
			}
		
			var obj = glob_labirint_memory[ind];


					
		logger_console_log("\nIn get_error_message: "+obj.glob_pixelsPro_errorMessage);
		
		var msh=""+obj.glob_pixelsPro_errorMessage;
		
		obj.glob_pixelsPro_errorMessage='none';		return msh;
}

function get_qty_neighbours(post)	
{
		logger_console_log("\nIn get_qty_neighbours: ");
		
	
				var md5 = post['md5'];
				//var md5 =  (''+req.body['md5']).trim();
		
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				logger_console_log('get_qty_neighbours:error: not found obj with this md5:'+md5);
			
					return 'get_qty_neighbours:error:  not found obj with this md5:'+md5;
			}
		
			var obj = glob_labirint_memory[ind];
				
			var pixelsPro_pg_main_image= get_main_image(obj);
			if(pixelsPro_pg_main_image==null)
			{
				logger_console_log('get_qty_neighbours:error: may be white');
				
					return ('get_qty_neighbours:error: may be white');
			}
			obj.glob_pixelsPro_pg_map_image = obj.copy_image(pixelsPro_pg_main_image);	
				
				logger_console_log(post);
				
				var x =  +post['x'];
				var y =  +post['y'];
				
				
				
				logger_console_log('Before: \n'+pixelsPro_pg_main_image.width);
				
				pixelsPro_pg_main_image = setChaosPixels(obj);
				logger_console_log('After: \n'+pixelsPro_pg_main_image.width);
				logger_console_log('-=7878=-');
				
				var arr = pixelsPro_getNeighborsColorsAllArray(obj,x,y,pixelsPro_pg_main_image);
				logger_console_log("arr.length="+arr.length);
				
				
				var res0=JSON.stringify(arr);
				return (res0);
				
				
	
}


function s_pixels(post)	
{								
		logger_console_log("\nIn pixels");
		
		
			
			
			var md5 = post['md5'];
			//var md5 =  (''+req.body['md5']).trim();
		
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				logger_console_log('pixels:error: not found obj with this md5:'+md5);
				
					return 'pixels:error:  not found obj with this md5:'+md5;
			}
		
			var obj = glob_labirint_memory[ind];
			
			var pixelsPro_pg_main_image=get_main_image(obj);// get_main_image(obj);

				if(pixelsPro_pg_main_image==null)
				{
					
					logger_console_log('pixels:error: may be white');
				
					return ('pixels:error: may be white');
					
				}
	obj.glob_pixelsPro_pg_map_image = obj.copy_image(pixelsPro_pg_main_image);
			
			
			
			logger_console_log(post);
			
			var x =  +post['x'];
			var y =  +post['y'];
			
			
			
			pixelsPro_pg_main_image = setChaosPixels(obj);
			logger_console_log('-=7878=-');
			
			
			
			if( is_color_ishodn(obj,pixelsPro_getColorArrayFromImageData(obj,x,y,pixelsPro_pg_main_image))==false)
			{
				logger_console_log('-=7979=-');
				var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
				
				obj.glob_pixelsPro_errorMessage='1. labirint not ok';
				 return result_png;
			}
			
			else if(x<0||x>=pixelsPro_pg_main_image.width) {
				
				var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
				
				obj.glob_pixelsPro_errorMessage='2. labirint not ok';
				 return result_png;
				
				
				
			}
			else if(y<0||y>=pixelsPro_pg_main_image.height) {
				
				var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
			obj.glob_pixelsPro_errorMessage='3. labirint not ok';
				 return result_png;
			}
			
			
			
			
			
			var color_prev = pixelsPro_getColorArrayFromImageData(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
				var color = pixelsPro_getColorArrayFromImageData(obj,x,y,pixelsPro_pg_main_image);
				if(pixelsPro_array_equals(color_prev,color)==false)
				{
					logger_console_log('-=791791=-');
					
					
					
					if(left(obj,x,y,pixelsPro_pg_main_image)||right(obj,x,y,pixelsPro_pg_main_image)||floor(obj,x,y,pixelsPro_pg_main_image))
					{
						logger_console_log('-=79999=-');
						if(stone_neighbours_of(obj,x,y)==0)
						{
							logger_console_log('-=7988889=-');
							var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
					obj.glob_pixelsPro_errorMessage='6.1.27 stone_neighbours_of not ok';
								 return result_png;
						}
						else{
						
						logger_console_log('-=7988fmhfvuff889=-');
						obj.glob_pixelsPro_x_left_top = x;
						obj.glob_pixelsPro_y_left_top = y;
						 
					
						obj.glob_pixelsPro_pg_main_color = color;
						
						pixelsPro_pg_main_image = setChaosPixels(obj);
			
						var result_png = pixelsPro_redrawPixels_main(obj,x,y,pixelsPro_pg_main_image);
					obj.glob_pixelsPro_errorMessage='6.1.255. labirint ok';
						 return result_png;
						
						}
						
					}
					else
					{
					
						
								var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
					obj.glob_pixelsPro_errorMessage='6.1.25 labirint not ok';
								 return result_png;
					}
								
					
					return;
				}
			
			
			
			
			
			
			
			
			
			
			if((Math.abs(x-obj.glob_pixelsPro_x_left_top)>1)||(Math.abs(y-obj.glob_pixelsPro_y_left_top)>1)){
				
				// if(xy_is_near_karman_points(x,y)==false)
			
				
					if(left(obj,x,y,pixelsPro_pg_main_image)||right(obj,x,y,pixelsPro_pg_main_image)||floor(obj,x,y,pixelsPro_pg_main_image))
					{
						
						
						var color_prev = pixelsPro_getColorArrayFromImageData(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
						var color = pixelsPro_getColorArrayFromImageData(obj,x,y,pixelsPro_pg_main_image);
						if(pixelsPro_array_equals(color_prev,color)==false)
						{
						
							
							var neh = pixelsPro_getNeighborsColors(obj,x,y,color,pixelsPro_pg_main_image);
							logger_console_log("neh.length="+neh.length);
							var f=false;
							for(var inh=0;inh<neh.length;inh++)
							{
								for(var in2=0;in2<obj.global_inside_stones.length;in2++)
								{
									if(pixelsPro_array_equals(obj.global_inside_stones[in2].color,neh[inh])==true) {f=true;break;}
								}
								if(f)break;
							}
							
							if(f==false)
							{
								var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
					obj.glob_pixelsPro_errorMessage='6.1.23 labirint not ok';
								 return result_png;
							}
							
							
						
						}
						else{
							
							
							
							
							
								
						obj.glob_pixelsPro_x_left_top = x;
						obj.glob_pixelsPro_y_left_top = y;
						 
						var color =  pixelsPro_getColorArrayFromImageData(obj,x,y,pixelsPro_pg_main_image);
						obj.glob_pixelsPro_pg_main_color = color;
			
						logger_console_log("testing 8888.000");	

						
			
						pixelsPro_pg_main_image = setChaosPixels(obj);
						
						logger_console_log("testing 8888.222");
						
						var result_png = pixelsPro_redrawPixels_main(obj,x,y,pixelsPro_pg_main_image);
						
						logger_console_log("testing 8888.111");
						//obj.glob_pixelsPro_color_for_pass = define_color_for_pass(x,y,color);
				//		logger_console_log("testing 222 "+glob_pixelsPro_color_for_pass);
				logger_console_log("testing 8888.77777");
				obj.glob_pixelsPro_errorMessage='5. labirint ok';
						 return result_png;	
							
						}
									
					
					}
					else
					{
						//var result_png = pixelsPro_redrawPixels_main(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top);
						var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
						obj.glob_pixelsPro_errorMessage='6. labirint not ok';
						 return result_png;	
					}
					return;
				}
				
			
				
				

					if(left(obj,x,y,pixelsPro_pg_main_image)||right(obj,x,y,pixelsPro_pg_main_image)||floor(obj,x,y,pixelsPro_pg_main_image))
					{
						
						
						
							
			var color_prev = pixelsPro_getColorArrayFromImageData(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
				var color = pixelsPro_getColorArrayFromImageData(obj,x,y,pixelsPro_pg_main_image);
				if(pixelsPro_array_equals(color_prev,color)==false)
				{
					
					
					
					
					var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
			obj.glob_pixelsPro_errorMessage='6.4321 labirint not same colors';
						 return result_png;
					
					
					
				}
					
						
						
						obj.glob_pixelsPro_x_left_top = x;
						obj.glob_pixelsPro_y_left_top = y;
						 
					
						obj.glob_pixelsPro_pg_main_color = color;
						
						pixelsPro_pg_main_image = setChaosPixels(obj);
			
						var result_png = pixelsPro_redrawPixels_main(obj,x,y,pixelsPro_pg_main_image);
					obj.glob_pixelsPro_errorMessage='5.7777ab labirint not ok';
						 return result_png;
					}
					else
					{
						var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
			obj.glob_pixelsPro_errorMessage='6.7777ab labirint not ok';
						 return result_png;
					}
				
		
}

// function drakon()
// {
	// var colors = pixelsPro_getNeighborsColors(x,y,color);
	// //glob_pixelsPro_pg_main_image
// }






function right_pixels(post)	
{								
		logger_console_log("\nIn right_pixels");
		
		

			
			
			var md5 = post['md5'];
			//var md5 =  (''+req.body['md5']).trim();
		
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				logger_console_log('right_pixels:error: not found obj with this md5:'+md5);
				
					return ('right_pixels:error:  not found obj with this md5:'+md5);
			}
		
			var obj = glob_labirint_memory[ind];
			
			var pixelsPro_pg_main_image= get_main_image(obj);
			if(pixelsPro_pg_main_image==null)
			{
				
				logger_console_log('right_pixels:error: may be white');
			
					return ('right_pixels:error: may be white');
				
			}
	obj.glob_pixelsPro_pg_map_image = obj.copy_image(pixelsPro_pg_main_image);
			
			
			logger_console_log(post);
			
			var x =  +post['x'];
			var y =  +post['y'];
			var color = null;
			
			
			
				
			pixelsPro_pg_main_image = setChaosPixels(obj); 
			
			var neh = pixelsPro_getNeighborsColors(obj,x,y,color,pixelsPro_pg_main_image);
			logger_console_log("neh.length="+neh.length);
			
			var color = pixelsPro_getColorArrayFromImageData(obj,x,y,pixelsPro_pg_main_image);
			if( post['color'] ) color = cloneColor( post['color'].split(',') );
			var color_on_place = pixelsPro_getColorArrayFromImageData(obj,x,y,pixelsPro_pg_main_image);
		
			
				
			
			if(x<0||x>=pixelsPro_pg_main_image.width) {
				logger_console_log("y444");
				var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
			obj.glob_pixelsPro_errorMessage='1. chaos not ok';
				 return result_png;
				
			}
			else if(y<0||y>=pixelsPro_pg_main_image.height) {
				logger_console_log("y15555");
				var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
			obj.glob_pixelsPro_errorMessage='2. chaos not ok';
				 return result_png;
				
			}
			
			
			else	
			{
				if(is_color_ishodn(obj,color_on_place)==true)
				{
					
					
					
					return  __set__collected__pixels(post,obj,x,y,color);
					
				
					
				}
				
			
				else
				{ 
				
					if(is_color_ishodn(obj,color_on_place)||is_color_in(getColors(obj.glob_pixelsPro_pg_map_image),color_on_place))
					{
						
						
						logger_console_log("y1888");
						
						var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
					obj.glob_pixelsPro_errorMessage='3. chaos not ok';
						 return result_png;	
						
						return;
				
					}
					
					var ctrlz = obj.copy_image(pixelsPro_pg_main_image);
					
					
							take_chaos(obj,x,y,color_on_place);	
									
							pixelsPro_pg_main_image = setChaosPixels(obj);
									
							var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
									
						var x2=x;
						var y2=y;
						
						x=obj.glob_pixelsPro_x_left_top;
						y=obj.glob_pixelsPro_y_left_top;
									
					if(left(obj,x,y,pixelsPro_pg_main_image)||right(obj,x,y,pixelsPro_pg_main_image)||floor(obj,x,y,pixelsPro_pg_main_image))
					{
					
							

						obj.glob_pixelsPro_errorMessage='4. chaos ok';
								
							 return result_png;
							
					}
					
					else{
						
						
						
						 throw_collected(obj,x2,y2,color_on_place);
						pixelsPro_pg_main_image=ctrlz;
						var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
						obj.glob_pixelsPro_errorMessage='5. chaos not ok';
							 return result_png;
					}
					
					
				
				}
						
						
					
			}								
								
			
			
		
		
}


function getColors(im0)
{
	
	var w = im0.width;
	var h = im0.height;
	
		
			var obj = {};
			var colors = [];

			for (var y = 0; y < im0.data.length; y+=4) {
		
				
					
					var idx = y;
					
					var key = ""+im0.data[idx]+"-"+im0.data[idx+1]+"-"+im0.data[idx+2]+"-"+im0.data[idx+3];
					
					if (obj[key]==undefined) { 
					
						
						var col = [im0.data[idx], im0.data[idx+1],im0.data[idx+2],im0.data[idx+3]]; 
						colors.push(col); 
						obj[key]= true;
					
					}
					
					
				}
			
			
		//console.log ( "count="+colors.length);
			
			return colors;
}




function is_color_in(colors,color)
{
	for(var i=0;i<colors.length;i++)
	{
		if(pixelsPro_array_equals(colors[i],color)) return true;
	}
	
	return false;
	
}

function is_color_ishodn(obj,color)
{
	var colors=getColors(obj.glob_pixelsPro_pg_map_image);
	
	for(var i=0;i<colors.length;i++)
	{
		if(pixelsPro_array_equals(color,colors[i])) return true;
	}
	
	return false;
	
}

function set_collected_pixels(post)	
{								
		logger_console_log("\nIn set_collected_pixels");
		
	
			
			
			var md5 = post['md5'];
			//var md5 =  (''+req.body['md5']).trim();
		
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				logger_console_log('set_collected_pixels:error: not found obj with this md5:'+md5);
				
					return ('set_collected_pixels:error:  not found obj with this md5:'+md5);
			}
	
	
			var obj = glob_labirint_memory[ind];
			
			
			
			//logger_console_log("22");
			logger_console_log(post);
			
			var x =  +post['x'];
			var y =  +post['y'];
			var color = post['color'].split(',');

			return __set__collected__pixels(post,obj,x,y,color);
				
		
		
}

function __set__collected__pixels(post,obj,x,y,color)
{
			color=cloneColor(color);
			
			// logger_console_log("x="+x);
			// logger_console_log("y="+y);
			// logger_console_log("color="+color);
			
			
			var pixelsPro_pg_main_image= get_main_image(obj);
			if(pixelsPro_pg_main_image==null)
			{
				
				logger_console_log('set_collected_pixels:error: may be white');
				
					return ('set_collected_pixels:error: may be white');
				
			}
			obj.glob_pixelsPro_pg_map_image = obj.copy_image(pixelsPro_pg_main_image);	
			
			pixelsPro_pg_main_image = setChaosPixels(obj);
			
			if(x<0||x>=pixelsPro_pg_main_image.width) {
				
				var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
			
				//sendImage(result_png, res, '\nset_collected_pixels not ok\n');	
				 return result_png;
				
			}
			else if(y<0||y>=pixelsPro_pg_main_image.height) {
				
				var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
			
				//sendImage(result_png, res, '\nset_collected_pixels not ok\n');
				return result_png;				
				
			}
			
			// else if((Math.abs(x-glob_pixelsPro_x_left_top)>1)||(Math.abs(y-glob_pixelsPro_y_left_top)>1)){
				
				// var result_png = pixelsPro_redrawPixels_main(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top);
			
				// sendImage(result_png, res, '\n444.1 set_collected_pixels not ok\n');	
				
			// }
			
			else if(obj.global_karman_stones.length==0)
			{
				if((is_color_ishodn(obj,color)||is_color_in(getColors(obj.glob_pixelsPro_pg_map_image),color))==false)
				{
						take_chaos(obj,x,y,color);
				
				
						pixelsPro_pg_main_image = setChaosPixels(obj);
						
						var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
						
						//sendImage(result_png, res, '\ntake stone ok\n');	
						 return result_png;
						
				}
				
				else
				
				{
					
					
					
					
								var neh = pixelsPro_getNeighborsColors(obj,x,y,color,pixelsPro_pg_main_image);
							logger_console_log("neh.length="+neh.length);
							var f=false;
							for(var inh=0;inh<neh.length;inh++)
							{
								for(var in2=0;in2<obj.global_inside_stones.length;in2++)
								{
									if(pixelsPro_array_equals(obj.global_inside_stones[in2].color,neh[inh])==true) {f=true;break;}
								}
								if(f)break;
							}
							
							if(f==false)
							{
								
					var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
				
					//sendImage(result_png, res, '\n544.1 set_collected_pixels not ok\n');	
					 return result_png;
					
								
							}
							
					
					
					
					
					
				}
			}
			
			else
			{ 
				
						//glob_pixelsPro_pg_boh_image = 
						throw_collected(obj,x,y,color);	
						
						pixelsPro_pg_main_image = setChaosPixels(obj);
						
						var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
						
						//sendImage(result_png, res, '\nset stone ok\n');	
						
						 return result_png;
				
			}
}

function get_collected(md5)
{
	
	
		
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				logger_console_log('get_collected:error: not found obj with this md5:'+md5);
				
					return ('get_collected:error:  not found obj with this md5:'+md5);
			}
		
			var objj = glob_labirint_memory[ind];
	
	
	var s='';
	for(var i=0;i<objj.glob_pixelsPro_collected.length;i++)
	{
		var obj = objj.glob_pixelsPro_collected[i];
		var rgba = 'rgba('+obj.color[0]+','+obj.color[1]+','+obj.color[2]+','+(obj.color[3]/255)+')';
		var idd = 'span_collected_pixels'+i;
		var attr_color=obj.color.join(',');
		s += '<span class=\'flex-item\' attr_color=\''+attr_color+'\' id=\''+idd;
		// s += '\' style=\'margin:2px;border:2px solid '+rgba+';width:20px;height:20px;display: inline-block;background-color: '+rgba+'\' >';
		s += '\' style=\'width:20px;height:20px;display: inline-block;background-color: '+rgba+'\' >';
		s += '</span>';
	}
	 
		 
		  return (s);

	
}

function throw_collected(objj,x,y,color)
{
	///////////////////////
	addStone(objj,x,y,color,objj.global_inside_stones);
	removeStone(objj,x,y,color,objj.global_karman_stones);
	///////////////////////
	for(var i=0;i<objj.glob_pixelsPro_collected.length;i++)
	{
		var obj = objj.glob_pixelsPro_collected[i];
		if( pixelsPro_array_equals(obj.color,color)==true )
		{
			objj.glob_pixelsPro_collected.splice(i,1);
			break;
		}
	}
	
	// var index2 = glob_pixelsPro_pg_boh_image.width * y + x << 2;
	// glob_pixelsPro_pg_boh_image.data[index2] = color[0];
	// glob_pixelsPro_pg_boh_image.data[index2+1] = color[1];
	// glob_pixelsPro_pg_boh_image.data[index2+2] = color[2];
	// glob_pixelsPro_pg_boh_image.data[index2+3] = color[3];
	

	
	// return glob_pixelsPro_pg_boh_image;
}

function stone_neighbours_of(objj,x,y)
{
	var n=0;
	for(var i=0;i<objj.global_inside_stones.length;i++)
	{
		var obj = objj.global_inside_stones[i];
		if((Math.abs(Number(obj.x)-Number(x))<=1)&&(Math.abs(Number(obj.y)-Number(y))<=1)) n++;
		
	}
	return n;
}

function take_chaos(objj,x,y,color)
{
	// var color = [];
	// var index = glob_pixelsPro_pg_map_image.width * y + x << 2;
	// color[0] = glob_pixelsPro_pg_map_image.data[index];
	// color[1] = glob_pixelsPro_pg_map_image.data[index+1];
	// color[2] = glob_pixelsPro_pg_map_image.data[index+2];
	// color[3] = glob_pixelsPro_pg_map_image.data[index+3];
	
	// var color2 = [];
	// var index2 = glob_pixelsPro_pg_boh_image.width * y + x << 2;
	// color2[0] = glob_pixelsPro_pg_boh_image.data[index2];
	// color2[1] = glob_pixelsPro_pg_boh_image.data[index2+1];
	// color2[2] = glob_pixelsPro_pg_boh_image.data[index2+2];
	// color2[3] = glob_pixelsPro_pg_boh_image.data[index2+3];
	
	var obj = {};
	obj.x = Number(x);
	obj.y = Number(y);
	obj.color = color;
	objj.glob_pixelsPro_collected.push(obj);
	
	////////////////////////
	addStone(objj,x,y,color,objj.global_karman_stones);
	removeStone(objj,x,y,color,objj.global_inside_stones);
	///////////////////////
	
	//var color = [];
	/***
	var index = glob_pixelsPro_pg_boh_image.width * y + x << 2;
	glob_pixelsPro_pg_boh_image.data[index]=color[0];
	glob_pixelsPro_pg_boh_image.data[index+1]=color[1];
	glob_pixelsPro_pg_boh_image.data[index+2]=color[2];
	glob_pixelsPro_pg_boh_image.data[index+3]=color[3];
	***/	
	// glob_pixelsPro_pg_boh_image.data[index]=127;
	// glob_pixelsPro_pg_boh_image.data[index+1]=127;
	// glob_pixelsPro_pg_boh_image.data[index+2]=127;
	// glob_pixelsPro_pg_boh_image.data[index+3]=255;
	
	// return glob_pixelsPro_pg_boh_image;
}

function cloneColor(color2)
{
	return [Number(color2[0]),Number(color2[1]),Number(color2[2]),Number(color2[3])];
}

function addStone(objj,x,y,color7,arr)
{
	arr.push({x:Number(x),y:Number(y),color:cloneColor(color7)});
	
}

function removeStone(objj,x,y,color,arr)
{
	for(var i=0;i<arr.length;i++)
	{
		if( pixelsPro_array_equals(arr[i].color,color)==true )
		{
			arr.splice(i,1);
			break;
		}
	}
}


// function is_grey(x,y)
// {
	// var color = [];
	// var index = glob_pixelsPro_pg_boh_image.width * y + x << 2;
					
					
					// color[0] = glob_pixelsPro_pg_boh_image.data[index];
					// color[1] = glob_pixelsPro_pg_boh_image.data[index+1];
					// color[2] = glob_pixelsPro_pg_boh_image.data[index+2];
					// color[3] = glob_pixelsPro_pg_boh_image.data[index+3];
					
	// var grey_color = [127,127,127,255];
	// return pixelsPro_array_equals(color,grey_color);
// }


function left(obj,x,y,p1)
{
	var color = pixelsPro_getColorArrayFromImageData(obj,x,y,p1);
	if(x-1<0)return true;
	var color2 = pixelsPro_getColorArrayFromImageData(obj,x-1,y,p1);
	return !pixelsPro_array_equals(color,color2);
}

function right(obj,x,y,p1)
{
	var color = pixelsPro_getColorArrayFromImageData(obj,x,y,p1);
	if(x+1>=obj.glob_pixelsPro_pg_map_image.width)return true;
	var color2 = pixelsPro_getColorArrayFromImageData(obj,x+1,y,p1);
	return !pixelsPro_array_equals(color,color2);
}

function floor(obj,x,y,p1)
{
	var color = pixelsPro_getColorArrayFromImageData(obj,x,y,p1);
	if(y+1>=obj.glob_pixelsPro_pg_map_image.height)return true;
	var color2 = pixelsPro_getColorArrayFromImageData(obj,x,y+1,p1);
	return !pixelsPro_array_equals(color,color2);
}

function pixelsPro_getColorArrayFromImageData(obj,x,y,pixelsPro_pg_main_image)
{
	/* var c2 = document.getElementById("pixels");
	var ctx = c2.getContext("2d");
	return ctx.getImageData(x,y,1,1).data; */
	
	var index = pixelsPro_pg_main_image.width * (y) + (x) << 2;
	var color = [
		pixelsPro_pg_main_image.data[index],
		pixelsPro_pg_main_image.data[index+1],
		pixelsPro_pg_main_image.data[index+2],
		pixelsPro_pg_main_image.data[index+3]
	];	
	return color;
}
		
function pixelsPro_redrawPixels_main(obj, x,y,pixelsPro_pg_main_image)
{
	var nn=obj.glob_pixelsPro_pg_pixels_scale;
	var newpng = createImageData( 150*nn, 150*nn );  
	for(var i=0;i<newpng.width;i++)
	{
		for(var j=0;j<newpng.height;j++)
		{
			
			var index2 = newpng.width * j + i << 2;
			
			newpng.data[index2+0] = 127;
			newpng.data[index2+1] = 127;
			newpng.data[index2+2] = 127;
			newpng.data[index2+3] = 255;
			
			
		}
	}		
	
	
	
	for(var i=-7;i<	8;i++)
	{
		for(var j=-7;j<	8;j++)
		{
			if((y+j)<0) continue;
			if((y+j)>=pixelsPro_pg_main_image.height) continue;
			if((x+i)<0) continue;
			if((x+i)>=pixelsPro_pg_main_image.width) continue;
			var index = pixelsPro_pg_main_image.width * (y+j) + (x+i) << 2;
			
			var index2 = newpng.width * (j+7)*10*nn + (i+7)*10*nn << 2;
			
			var color = [pixelsPro_pg_main_image.data[index+0],pixelsPro_pg_main_image.data[index+1],pixelsPro_pg_main_image.data[index+2],pixelsPro_pg_main_image.data[index+3]];
			if(is_white(color) ) fillRectangleStarSkyPro(newpng, (i+7)*10*nn, (j+7)*10*nn, 10*nn, 10*nn, newpng.width, color);
			else 
			fillRectanglePro(newpng, (i+7)*10*nn, (j+7)*10*nn, 10*nn, 10*nn, newpng.width, color);
			
			newpng.data[index2+0] = pixelsPro_pg_main_image.data[index+0];
			newpng.data[index2+1] = pixelsPro_pg_main_image.data[index+1];
			newpng.data[index2+2] = pixelsPro_pg_main_image.data[index+2];
			newpng.data[index2+3] = pixelsPro_pg_main_image.data[index+3];
			
			//logger_console_log('i='+i+' j='+j);
		}
	}
	
	
	

	return drawRedPoint(newpng,(7)*10*nn, (7)*10*nn, 10*nn, 10*nn);
	/***
	for(var i=0;i<150;i++)
	{
		for(var j=0;j<150;j++)
		{
			
			var index2 = newpng.width * j + i << 2;
			
			newpng.data[index2+0] = arr[index2+0];
			newpng.data[index2+1] = arr[index2+1];
			newpng.data[index2+2] = arr[index2+2];
			newpng.data[index2+3] = arr[index2+3];
			
			
		}
	}
	
	return newpng;
	***/
	
}


function fillRectangleRndNoisePro(imgData2, i0, j0, n, m, width, col)
{
	
	
	for(var j=j0;j<j0+m;j++)
	{
		for(var i=i0;i<i0+n;i++)
		{
			var idx2 = (width * j + i ) << 2;
			imgData2.data[idx2] = getRandomInt(0,256);
			imgData2.data[idx2+1] = getRandomInt(0,256);
			imgData2.data[idx2+2] = getRandomInt(0,256);
			imgData2.data[idx2+3] = col[3];
			
		}
	}
	
	return imgData2;

}

function fillRectangleStarSkyPro(imgData2, i0, j0, n, m, width, col)
{
	
	
	for(var j=j0;j<j0+m;j++)
	{
		for(var i=i0;i<i0+n;i++)
		{
			var idx2 = (width * j + i ) << 2;
			
			var t = getRandomInt(0,global_stars_in_sky);
			if(t==4) {
				imgData2.data[idx2] = getRandomInt(0,256);
				imgData2.data[idx2+1] = getRandomInt(0,256);
				imgData2.data[idx2+2] = getRandomInt(0,256);
				imgData2.data[idx2+3] = col[3];
			}
			else {
			imgData2.data[idx2] = col[0];
				imgData2.data[idx2+1] = col[1];
				imgData2.data[idx2+2] = col[2];
				imgData2.data[idx2+3] = col[3];
			}
			
		}
	}
	
	return imgData2;

}



function fillRectanglePro(imgData2, i0, j0, n, m, width, col)
{
	
	
	for(var j=j0;j<j0+m;j++)
	{
		for(var i=i0;i<i0+n;i++)
		{
			var idx2 = (width * j + i ) << 2;
			imgData2.data[idx2] = col[0];
			imgData2.data[idx2+1] = col[1];
			imgData2.data[idx2+2] = col[2];
			imgData2.data[idx2+3] = col[3];
			
		}
	}
	
	return imgData2;
	
	/***
	
	for(var i=0;i<imgData2.width;i++)
	{
		for(var j=0;j<imgData2.height;j++)
		{
			
			var index2 = imgData2.width * j + i << 2;
			
			data[index2+0] = imgData2.data[index2+0];
			data[index2+1] = imgData2.data[index2+1];
			data[index2+2] = imgData2.data[index2+2];
			data[index2+3] = imgData2.data[index2+3];
			
			
		}
	}
	
	return data;
	
	***/
}


function drawRedPoint(newpng,xn, xm, w, h)
{
	var color = [255,0,0,255];
	return fillRectanglePro(newpng, xn, xm, w, h, newpng.width, color);
}



function get_url_to_ws(req,res)	
{								
		logger_console_log("\nIn get_url_to_ws");
		
		
		var body = '';

		req.on('data', function (data) {
			
					
			body += data;

			// Too much POST data, kill the connection!
			// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
			if (body.length > 99)
			{
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end("get_url_to_ws: error: data.length > 99 too big");
				req.connection.destroy();
				return;
			}
			
		});

		req.on('end', function () {
			
			var post = qs.parse(body);
			
			
			var md5 = post['md5'];
			
			var data = listener.address();//location.origin.replace(/^http/, 'ws');
			data='{"url":"'+data.address+'","port":"'+data.port+'"}';
			logger_console_log("\nIn get_url_to_ws: url=["+data+"]");
		  res.writeHead(200, {  'Content-Type': 'text/html' } );
		  res.end(data);	
			
			
		});
		
}

/*******
function pixelsPro_whenClickedOnCanvas(e)
{
			
	evt = (e) ? e : event;   
	if(evt.button == 0) 
	{
		
		var x = e.offsetX==undefined?e.layerX:e.offsetX;
		var y = e.offsetY==undefined?e.layerY:e.offsetY;
		
		glob_pixelsPro_x_left_top = x;
		glob_pixelsPro_y_left_top = y;
						
		var context = e.target.getContext("2d");
		var imageData = context.getImageData(x,y,1,1);
			
		glob_pixelsPro_pg_main_color = ""+imageData.data[0]+","+imageData.data[1]+","+imageData.data[2]+","+imageData.data[3];
		
		pixelsPro_showScaleDiv(e.target,x,y);
		pixelsPro_redrawPixels_main(context, x,y);
		
	}
			
}	

function pixelsPro_getColorArrayFromImageData(x,y)
{
	var c2 = document.getElementById("pixels");
	var ctx = c2.getContext("2d");
	return ctx.getImageData(x,y,1,1).data;
}


	
function pixelsPro_setEventListenersOnPixels()
		{
			var pcnv = document.getElementById("pixels");
			pcnv.onclick = function(e)
			{
				//var el = document.getElementById("fixed");
				//if(el.innerHTML == ' FIXED ')
				{
					e = (e) ? e : event;   
					if(e.button == 2) return;
						
					var x = e.offsetX==undefined?e.layerX:e.offsetX;
					var y = e.offsetY==undefined?e.layerY:e.offsetY;
					var n = (x/10|0)-7;
					var m = (y/10|0)-7;
					
					var color = pixelsPro_getColorArrayFromImageData(x,y);
					var all_ok=false;
					if(glob_pixelsPro_point==null)all_ok=true;
					else if(pixelsPro_array_equals(color,glob_pixelsPro_point.color)) all_ok=true;
					
					if(all_ok) {
					
						glob_pixelsPro_point={};
						glob_pixelsPro_point.xy=[x,y];
						glob_pixelsPro_point.nm=[n,m];
						glob_pixelsPro_point.color=color;
						glob_pixelsPro_x_left_top += n;
						glob_pixelsPro_y_left_top += m;
						
						pixelsPro_redrawPixels_main(document.getElementById("canvas").getContext("2d"),  glob_pixelsPro_x_left_top, glob_pixelsPro_y_left_top );
					}
				//	updatePatternProps();
					
				}
			}
		
			pcnv.onmousemove = function(e)
			{
					e = (e) ? e : event;   
								
					var x = e.offsetX==undefined?e.layerX:e.offsetX;
					var y = e.offsetY==undefined?e.layerY:e.offsetY;
					var n = (x/10|0)-7;
					var m = (y/10|0)-7;
					
				//	updatePatternProps(x_left_top + n, y_left_top + m);
				
				
			}
		}
		
		
		
function pixelsPro_initModPixels()
{
	var scale_div = document.getElementById('scale_div');
	scale_div.style.visibility = 'hidden'; //visible
		
	pixelsPro_setEventListenersOnTri_Btns();
	pixelsPro_setEventListenersOnPixels();
}		
		
function pixelsPro_showScaleDiv(target,x,y)
{
	
	var el = document.getElementById('scale_div');
	el.style.border = "";
    el.style.visibility='visible';
	el.style.display="inline-block";
	document.getElementById('canvas_width_height').innerHTML = ""+document.getElementById('canvas').width+" x "+document.getElementById('canvas').height;
	//el.style.position='fixed';
	//el.style.left="200px";
	//el.style.top="200px";
	document.getElementById('selected_x_y').innerHTML = ""+x+", "+y;
	
}



function pixelsPro_setEventListenersOnTri_Btns()
{
		var btn = document.getElementById("btn_lt");
		btn.onclick = function()
		{
			
			server_crop(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top,1);
			//document.getElementById("scale_div").style.border = '';
			document.getElementById("scale_div").style.visibility = 'hidden';
			
			
		}
		
		btn = document.getElementById("btn_rb");
		btn.onclick = function()
		{
			
			server_crop(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top,2);
			//document.getElementById("scale_div").style.border = '';
			document.getElementById("scale_div").style.visibility = 'hidden';
			
		}
		
		var btn = document.getElementById("btn_esc");
		btn.onclick = function()
		{
			//document.getElementById("scale_div").style.border = '';
			document.getElementById("scale_div").style.visibility = 'hidden'; //visible
		
		}

}


***/

/*******/

// function pixelsPro_crop(x,y,flag)
// {
	
	
	// var sx,sy,w,h;
	// var canvas =  document.getElementById("canvas");
	
	// if(flag == 1)
	// {
		// sx = x;
		// sy = y;
		// w = canvas.width - sx;
		// h = canvas.height - sy;
	// }
	// else
	// {
		// sx = 0;
		// sy = 0;
		// w = x+1;
		// h = y+1;
	// }
	
	
	// var context = canvas.getContext("2d");
	// var imageData = context.getImageData(sx, sy, w, h);
	
	// ///////
	// //var buffer = imageData.data.buffer;  // ArrayBuffer
	// //////
	
	// canvas.width = w;
	// canvas.height = h;
	// canvas.getContext("2d").putImageData(imageData,0,0);
	
	// /*********
	// var imageData = context.createImageData(w, h);
	// imageData.data.set(buffer);
	
	// var params = [];
			
	// params['x']= x;
	// params['y']= y;
	// params['flag']= flag;
	// params['imgdata_base64']= dataurl;
			
	// sendPostWithParametersOnServer( params ); 
	// *********/
	
// }


// function pixelsPro_sendPostWithParametersOnServer( action, params  )
// {
	
				
	// var xhr = new XMLHttpRequest();
	
	// xhr.open('POST', action, true);
////	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	// xhr.responseType = "blob";
	
	// xhr.onload = function(e) {  
		
			// if (xhr.readyState != 4) return;
			
			// if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; throw new Error(error);  }

			// /*******
    
            // var buffer = xhr.response;
            // var dataview = new DataView(buffer);
            // var ints = new Uint8ClampedArray(buffer.byteLength);
            // for (var i = 0; i < ints.length; i++) {
                // ints[i] = dataview.getUint8(i);
            // }
			
			// alert(ints[10]);
			
			// ************/
            // var blob = xhr.response;
			// getImageFromBlob( blob, function( img ) {	imageToCanvas( img, "canvas" ); } );
			
	// }

	// xhr.send(params);
	
// }


// function pixelsPro_server_crop(x,y,flag)
// {
	
	// var canvas =  document.getElementById("canvas");

	// var w = canvas.width;
	// var h = canvas.height;
	// var params = 'x='+x+'&y='+y+'&w='+w+'&h='+h+'&flag='+flag;		
	
	// var xhr = new XMLHttpRequest();
	// xhr.open('POST', '/precrop', true);
////	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	
	// xhr.onload = function(e) {  
		
			// if (xhr.readyState != 4) return;
			
			// if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; throw new Error(error);  }

			// /*******
    
            // var buffer = xhr.response;
            // var dataview = new DataView(buffer);
            // var ints = new Uint8ClampedArray(buffer.byteLength);
            // for (var i = 0; i < ints.length; i++) {
                // ints[i] = dataview.getUint8(i);
            // }
			
			// alert(ints[10]);
			
			// ************/
			
            // transform("canvas",'/crop');
			
	// }

	// xhr.send(params);
	
	
// }




/***==============***/


// var listener = app.listen(app.get('port'), function() {
  // logger_console_log('Node app is running on port', app.get('port'));
  // //console.log('Node app is running on port', listener.address());
// });

// const WebSocket = require('ws');

// const wss = new WebSocket.Server({ server:listener });

// // // Broadcast to all.
// // wss.broadcast = function broadcast(data) {
 
// // };

// wss.on('connection', function connection(ws) {
	// ws.on('error', function(error) {
    // console.log(error);
    // // delete clients[id];
   // });
  // ws.on('message', function incoming(data) {
    // // Broadcast to everyone else.
    // wss.clients.forEach(function each(client) {
      // if (client !== ws && client.readyState === WebSocket.OPEN) {
        // client.send(data);
      // }
    // });
  // });
// });

// // var WebSocketServer = new require('ws').Server;

// // // подключенные клиенты
// // var clients = {};
// // //
// // // WebSocket-сервер на порту 8081
// // var webSocketServer = new WebSocketServer({server:app});
// // app.on('upgrade', webSocketServer.handleUpgrade);
// // webSocketServer.on('connection', function(ws) {

  // // var id = Math.random();
  // // clients[id] = ws;
  // // console.log("новое соединение " + id);

  // // ws.on('message', function(message) {
    // // // logger_console_log('получено сообщение ' + message);

    // // // for (var key in clients) {
      // // // clients[key].send(message);
    // // // }
  // // });

  // // ws.on('close', function() {
    // // console.log('соединение закрыто ' + id);
    // // delete clients[id];
  // // });
  
 
  
// // });



// //setInterval(  () => { for (var key in clients) {  clients[key].send(''+new Date());	}  },  1000  );
 function when_commit_labirints_changes()
 {
	 // console.log("when_commit_labirints_changes");
	  // wss.clients.forEach(function each(client) {
    // if (client.readyState === WebSocket.OPEN) {
      // client.send('Take last update, please, from '+new Date());
    // }
  // });
	// // wss.broadcast();
	// //for (var key in clients) {  clients[key].send('Take last update, please, from '+new Date());	}
}











function create_glob_labirint_memory_obj(rnd,wi,he)
{			
				
	console.log('in create_glob_labirint_memory_obj: ');
	
	var obj = {};
	obj.id = generate_md5_id();
	obj.glob_pixelsPro_x_left_top = 0;
	obj.glob_pixelsPro_y_left_top = 0;
	obj.glob_pixelsPro_point = null;
	obj.glob_pixelsPro_collected = [];
	obj.glob_pixelsPro_pg_main_color = null;
	obj.glob_pixelsPro_showing_scale_div = false;
	obj.glob_pixelsPro_scale_div = null;
	obj.global_karman_stones=[];
	obj.global_inside_stones=[];
	obj.number_of_collected_stones=0;
	obj.glob_pixelsPro_errorMessage='none';
	obj.glob_pixelsPro_pg_boh_image = null;
	obj.glob_pixelsPro_pg_map_image = null;
	obj.glob_pixelsPro_pg_pixels_scale = 2;
	
	obj.copy_image = function(oldpng)
	{
		//logger_console_log('\nIn copy_image(...)\n');
	
		
		var newpng = createImageData( oldpng.width, oldpng.height );
		
		
		for(var i=0;i<newpng.width;i++)
		{
			for(var j=0;j<newpng.height;j++)
			{
				
				var index = newpng.width * j + i << 2;
				
				newpng.data[index] = oldpng.data[index];
				newpng.data[index+1] = oldpng.data[index+1];
				newpng.data[index+2] = oldpng.data[index+2];
				newpng.data[index+3] = oldpng.data[index+3];
				
				
			}
		}	
		
		return newpng;
			

	}
	
	if(rnd==undefined) rnd=0;
	obj.glob_pixelsPro_pg_main_image_id = get_allowed_pattern_id(rnd);
	logger_console_log('create_glob_labirint_memory_obj:obj.glob_pixelsPro_pg_main_image_id ='+obj.glob_pixelsPro_pg_main_image_id );	
	if(obj.glob_pixelsPro_pg_main_image_id==null)
	{
		
		logger_console_log("create_glob_labirint_memory_obj: error: obj.glob_pixelsPro_pg_main_image_id==null");
		
		return null;;	
	}
	
	var pixelsPro_pg_main_image = get_main_image(obj,wi,he);
	if(pixelsPro_pg_main_image==null)
			{
				logger_console_log('create_glob_labirint_memory_obj:error: pixelsPro_pg_main_image==null');
				
					return null;
			}
	obj.glob_pixelsPro_pg_map_image = obj.copy_image(pixelsPro_pg_main_image);
	//req.pipe(obj.glob_pixelsPro_pg_main_image).on( 'parsed', function()  {
		
	
		var x=obj.glob_pixelsPro_x_left_top;
		var y=obj.glob_pixelsPro_y_left_top;
		
		var index = pixelsPro_pg_main_image.width * (y) + (x) << 2;
				var color = [
					pixelsPro_pg_main_image.data[index],
					pixelsPro_pg_main_image.data[index+1],
					pixelsPro_pg_main_image.data[index+2],
					pixelsPro_pg_main_image.data[index+3]
				];
				obj.glob_pixelsPro_pg_main_color=color;
				
				obj.glob_pixelsPro_pg_map_image = obj.copy_image(pixelsPro_pg_main_image);
				
				glob_labirint_memory.push(obj);
				
				return getIndexObjectByMD5(obj.id);		
	}	