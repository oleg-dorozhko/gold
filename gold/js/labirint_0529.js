var global_seed_size = 17;
var glob_allowed_copy_center = false;
var global_max_seed_size = 71;
var global_selected_seed = null;
var global_arr_objects = null;
var glob_colors = null;
var global_first_seed_image_data = null;
var glob_allowed_copy_right = false;
var global_bottom_selected = null;
var global_red_ghost = null;
var global_galerka_selected = null;
var first_click = false;
var second_click = false;
var global_color_fields_array = [];
var global_last_selected_object=null;
var global_mapped_colors = null;
var global_loading_new = true;
var glob_canvas_selected = null;
var glob_sound_off = false;
var glob_float_mode = true;
var glob_koloda = null;
var glob_selected_kard=-1;
var glob_colored_special_arr = null;
//сначала надо вытащить магию а потом с помощью магии можно уже мувить и джампить
// window.onload = function()
// {
	// glob_canvas_selected = "left_canvas";
	
	// CLIPBOARD_CLASS("left_canvas", true); //not works not checheked not tested
		
	// clearAll();
	
	// loadLabirint(  all_down );
	// fill_global_arr_objects();
	
	// //alert(document.getElementById("right_canvas").width);
	
	// //document.getElementById("next").onclick = whenUserClickNext;
	// //document.getElementById("set").onclick = whenSetClicked;
	
	// document.getElementById("left_canvas").onclick = whenUserLeftClickOnLeftCanvas;
	// document.getElementById("left_canvas").onselectstart = function(){return false};
	// document.getElementById("left_canvas").onmousedown = function(){return false};
	// document.getElementById("left_canvas").oncontextmenu = whenUserRightClickOnLeftCanvas;
	
	// //document.getElementById("center_canvas").ondblclick = whenUserDblClickOnLeftCanvas;
	// document.getElementById("center_canvas").oncontextmenu = whenUserOnContextMenuCenterCanvas;
	// document.getElementById("right_canvas").oncontextmenu = whenUserOnContextMenuRightCanvas;
	// document.getElementById("background_canvas").onclick = inverse;
	// document.getElementById("background_canvas").oncontextmenu = addStopSymbol;
	
	// //document.getElementById("allowed_seed_sizes").onchange = whenUserChangeSeedSize;
	
// /****
	// document.getElementById("radio0").checked = true;
	// document.getElementById("qflag1").checked = false;
	// ***/
	// /****
	// document.getElementById("radio51").onchange = function(){
		
		// document.getElementById("qflag1").checked = false;
		
	// }
	// document.getElementById("qflag1").onclick = function() {
		
		// if(document.getElementById("radio51").checked) document.getElementById("qflag1").checked = false;
		
	// }
	// ***/
	// //document.getElementById("right_canvas").onclick = whenUserLeftClickOnRightCanvas;
	
	
	
// }

function whenUserOnContextMenuRightCanvas(e)
{
	if(glob_allowed_copy_right==false) { e.preventDefault(); return false; }
}

function whenUserOnContextMenuCenterCanvas(e)
{
	if(glob_allowed_copy_center==false) { e.preventDefault(); return false; }
}

function clearAll()
{
	//global_seed_size = 17;
	global_selected_seed = null;
	global_arr_objects = null;
	glob_colors = null;
	global_first_seed_image_data = null;
	global_bottom_selected = null;
	glob_allowed_copy_center = false;
	glob_allowed_copy_right = false;
	glob_colored_special_arr = null;
	glob_colored_adding_counter=0;
	
	//global_last_selected_object=null;
	//global_red_ghost = null; //we need hide ghost here
	
	global_galerka_selected = null;
		
	var el = document.getElementById("allowed_seed_sizes");
	if(el != null) el.value = global_seed_size;
	
	arr_gun = null;
	arr_gun = [];
}

function selectBackground(size)
{
	var canvas = document.getElementById("background_canvas");
	canvas.width = size;
	canvas.height = size;
    canvas.getContext("2d").fillStyle = "rgba(190,190,190,127)";
	canvas.getContext("2d").fillRect(0,0,size,size);
	
}

function getBackgroundColor()
{
	var canvas = document.getElementById("background_canvas");
    var context = canvas.getContext("2d");
	var imageData = context.getImageData(1,1,1,1);
	return "rgba("+imageData.data[0]+','+imageData.data[1]+','+imageData.data[2]+','+imageData.data[3]+')';
	
}

function isCellBackground(id,n,m)
{
	var bgcolor = getBackgroundColor();
	var canvas = document.getElementById(id);
	var context = canvas.getContext("2d");
	var imageData = context.getImageData(n*global_seed_size,m*global_seed_size,1,1);
	var cl = "rgba("+imageData.data[0]+','+imageData.data[1]+','+imageData.data[2]+','+imageData.data[3]+')';
	return (cl==bgcolor);
    
}

function isImageDataCellBackground(imageData)
{
	var bgcolor = getBackgroundColor();
	
	var cl = "rgba("+imageData.data[0]+','+imageData.data[1]+','+imageData.data[2]+','+imageData.data[3]+')';
	
	return (cl==bgcolor);
    
}

function whenSetClicked()
{
	var el = document.getElementById("allowed_seed_sizes");
	global_seed_size = Number(el.value);
	this.value = "set";
	
}

/***
//TODO
нарушение симметрии это стенки лабиринта
свертывание это процесс обратный копированию
***/

function setupSeedSize()
{
	//var el = document.getElementById("allowed_seed_size");
	//if(i == global_seed_size) option.selected = true;
		
	 
		
}

function define_seed_size(canvas)
{
	/*****
		var n=0;	
		if(canvas.width % 2 == 0)
		{
			n = Math.sqrt(canvas.width);
			if(n-(n|0)!=0)
			{
				n = Math.sqrt(canvas.width/2);
				if(n-(n|0)!=0)
				{
					n = Math.sqrt(canvas.width/4);
					if(n-(n|0)!=0)
					{
						var s = prompt("Enter seed size",""+n);
						if(s==null) return;
						n = Number(s);
					}
					else n=n*4;
					
				}
				else n=n*2;
			}
			
		}
		else 
		{
			var n = Math.sqrt(canvas.width);
			if(n-(n|0)!=0)
			{
				var s = prompt("Enter seed size",""+n);
				if(s==null) return;
				n = Number(s);
			}
		}

		*****/
		
		//var s = prompt("Enter seed size (1-71)","17");
		//if(s==null) return;
		var n = 17;//Number(s);
				
		//var n = findSymmetry();
		//if(n < 6) n=10;
		
		if(n>0 && n<global_max_seed_size)
		{
			global_seed_size = Number(n);
			if(canvas.width % global_seed_size != 0)
			{
				//alert("for the best use: image width should be equal some N*global_seed_size ");
				//return;
			}
			
			var el = document.getElementById("allowed_seed_sizes");
	
			//el.selectedIndex = Number(el.value); // п
			
			el.value = global_seed_size;
			
			
			
			fill_global_arr_objects();
			
		}
		else{
			//alert('need seeed size < 71');
		}
		
	
	
}

function checkAllowedSidesSize(w,h)
{
	if(w < 10) { 
	//alert('Sorry, not allowed, seed size < 10'); 
	return false; }
	
	if(w == h) return true;
	
	if(w > h)
	{
		if((w / h) - ( w / h | 0) == 0 ) return true;
	}
	else  
	{
		if((h / w ) - ( h / w | 0) == 0 ) return true;
		
	}
	
	return false;
}

function copyPasteCheck(id, img)
{
	if(id == "left_canvas")
	{
		var canvas = document.getElementById("left_canvas");
	/*****
		if(checkAllowedSidesSize(canvas.width,canvas.height)==false)
		{
			alert('This width and height not allowed. Only size > 9 , square or proportional');	
			loadLabirint( randomize );
			return;
		}
	********/	
		if(img.width != img.height)
		{
			alert('This width and height not equal. Not allowed, sorry ');	
			loadLabirint( randomize );
			return -1;
		}
		
		if( img.width > 625 )
		{
			alert('This width or height > 25. This is very big image. Not allowed, sorry ');	
			loadLabirint( randomize );
			return -1;
		}
		
		//alert("paste ok?");
		
		return 0;
	}
	
	if(id == "center_canvas")
	{
		
		
		var canvas = document.getElementById("center_canvas");
	/*****
		if(checkAllowedSidesSize(canvas.width,canvas.height)==false)
		{
			alert('This width and height not allowed. Only size > 9 , square or proportional');	
			loadLabirint( randomize );
			return;
		}
	********/	
		if(img.width != img.height)
		{
			alert('This width and height not equal. Not allowed, sorry ');	
			loadLabirint( randomize );
			return -1;
		}
		
		if( img.width > 25 )
		{
			alert('This width or height > 25. This is very big image. Not allowed, sorry ');	
			loadLabirint( randomize );
			return -1;
		}
		
		//alert("paste ok?");
		
		return 0;
		
		/*****
		select_fill_podbor_sizes(canvas.width);
		
		var canvas = document.getElementById("left_canvas");
		var rcanvas = document.getElementById("right_canvas");	
		rcanvas.width = canvas.width;
		rcanvas.height = canvas.height;
		rcanvas.getContext("2d").putImageData(canvas.getContext("2d").getImageData(0,0,canvas.width,canvas.height),0,0);
			
		randomize();	
		
		******/
	
	}
}


function copyPasteFinished(id)
{
	
	var canvas = document.getElementById("center_canvas");
	canvas.height= 0;
	canvas.height= 0;
	
	canvas = document.getElementById("right_canvas");
	canvas.height= 0;
	canvas.height= 0;
	
	var myNode = document.getElementById("seeds");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
	
	if(id == "left_canvas") 
	{ 
		var num = Number(prompt("Enter seed size"));
		if(num==null) return;
		global_seed_size = num;//Math.sqrt(document.getElementById("left_canvas").width); 
		
		
		
			var canvas = document.getElementById("left_canvas");
			
			clear_koloda();
	
			select_fill_podbor_sizes(canvas.width);
			
			mapColorToImageData();
			
			loadRightCanvas();
			
					
			draw_center_canvas2();
			
			selectBackground(global_seed_size);
				
			all_down(); 
			
			prepare_koloda();
			
		
	
	}
	
	/********
	if(id == "center_canvas")
	{
		var canvas = document.getElementById("center_canvas");
		var cnv = multy(canvas,1,canvas.width);
		canvas.width = canvas.width*canvas.width;
		canvas.height = canvas.height*canvas.height;
		canvas.getContext("2d").drawImage(cnv,0,0);
	}
	
	********/
	
//		clearAll();
	/****	
		var canvas = document.getElementById("center_canvas");
	
		if(canvas.width != canvas.height)
		{
			alert('This width and height not equal. Not allowed, sorry ');	
			loadLabirint( randomize );
			return;
		}
		
		if( canvas.width > 25 )
		{
			alert('This width or height > 25. This is very big image. Not allowed, sorry ');	
			loadLabirint( randomize );
			return;
		}
	*****/	
		//alert("paste ok?");
		
		/*****
		select_fill_podbor_sizes(canvas.width);
		
		var canvas = document.getElementById("left_canvas");
		var rcanvas = document.getElementById("right_canvas");	
		rcanvas.width = canvas.width;
		rcanvas.height = canvas.height;
		rcanvas.getContext("2d").putImageData(canvas.getContext("2d").getImageData(0,0,canvas.width,canvas.height),0,0);
			
		randomize();	
		
		******/
	
//	}

/**********

	else
		
		{



			var lc = document.getElementById("left_canvas");
				var canvas = document.getElementById("right_canvas");
			canvas.width = lc.width;
			canvas.height = lc.height;
			canvas.getContext("2d").drawImage(lc,0,0);
				
				
				//setTimeout( function() {
				
				
				var lim = countPatternedInRightCanvas();
				
				//alert(countColoredInCenterCanvas());
				//alert();
					
				
				var n=0;
				do
				{
					mapColorToImageData();
								
					var lim2 = countColoredInCenterCanvas();
					
					n++;
				}
				while(( lim2 != global_mapped_colors.length ) || n> 100) 
					
				
				draw_center_canvas();
				
				callback(1); 

		}



***********/





}

function get_labirint_image_path(callback)
{
	var labirint_name = null;
	var arr = (''+window.location).split("/");
	if(arr.length == 5) labirint_name = encodeURIComponent(arr[4]);
	else labirint_name = encodeURIComponent("random");
	
	if(labirint_name=="") labirint_name = encodeURIComponent("random");
	
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'php/get_labirint_image_path.php?labirint='+labirint_name, true);
	xhr.onload = function(e) {  
	
		if (xhr.readyState != 4) return;
		
		if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; throw new Error(error);  }
		
		if(xhr.responseText.indexOf("get_labirint_image_path:error: #1: unknown")==-1)
		{
			callback(xhr.responseText);
		}
		else
		{
			alert(xhr.responseText);
		}
	}
	xhr.send();
					
}

function select_fill_podbor_sizes(sz)
{
	
	//<select id="allowed_seed_sizes"><option value="1">1</option>
	var arr = [];
	var m=10;
	
	while(true)
	{
		
		var n1 = sz / m;
		var n2 = sz / m | 0;
		
		if(n1-n2==0) 
		{
			//first test passed but we need and second test passed
			 if( check_on_seed(m)==true) arr.push(m);
			//if( m % 2 == 0 )	
			//if(m==42) return;
		}
		
		m++;
		
		if(m >= global_max_seed_size) break;
	}
	
	var sele = document.getElementById("allowed_seed_sizes");
	if(sele != null) document.getElementById("seed_sizes").removeChild(sele);
	
	sele = document.createElement("select");
	sele.id = "allowed_seed_sizes";
		
	 
	if( (arr.length > 0) && (arr.indexOf(global_seed_size)== -1) )
	{
		
			
		for(var i=0;i<arr.length;i++)
		{
			var opt = document.createElement("option");
			opt.value = arr[i];
			opt.text = arr[i];
			sele.appendChild(opt);
		}
		
		global_seed_size = arr[arr.length-1];
		
	}
	else
	{
		
		
		sele = document.createElement("select");
		sele.id = "allowed_seed_sizes";
		var opt = document.createElement("option");
		opt.value = global_seed_size;
		opt.text = global_seed_size;
		
		sele.appendChild(opt);
		
		
	}
	
	sele.hidden=true;
	document.getElementById("seed_sizes").appendChild(sele);
	
	
	document.getElementById("allowed_seed_sizes").value = global_seed_size;
}

function filename_with_global_size_correct(sz)
{
	
	
	
}

function loadRightCanvas()
{
	var rcanvas = document.getElementById("right_canvas");
	var rcontext = rcanvas.getContext("2d");
	
	var canvas = document.getElementById("left_canvas");
	rcanvas.width = canvas.width;
	rcanvas.height = canvas.height;
	
	//var context = canvas.getContext("2d");
	rcontext.drawImage(canvas,0,0);
	
	var cnv = document.getElementById("fourth_canvas");
	cnv.width = canvas.width;
	cnv.height = canvas.height;
	var cnt = cnv.getContext("2d");
	cnt.fillStyle = getBackgroundColor();
	cnt.fillRect(0,0,cnv.width, cnv.height);
	
	/****
	
	var controls = document.getElementById("controls");
		if(controls.childNodes.length==0)
		{
			var plus = create_button(1,1,"+");
			//var sp = document.createElement("span");
			//sp.appendChild(plus);
			controls.appendChild(plus);
			
			var exe = create_button(1,1,"E");
			controls.appendChild(exe);
			
		}
	
	****/
	
}

function get_random_width_height_canvas(cnv)
{
	var canvas = document.createElement("canvas");
	canvas.width = cnv.width;
	canvas.height = cnv.height;
	var context = canvas.getContext("2d");
	context.drawImage(cnv,0,0);
	
	var qn = canvas.width / global_seed_size;
	var qm = canvas.height / global_seed_size;
	console.log("get_random_width_height_canvas:qn="+qn);
	console.log("get_random_width_height_canvas:qm="+qm);
	if(qn > 5) qn=5;
	var n = getRandomInt(3,qn);
	var m = n; //getRandomInt(3,5);
	console.log("get_random_width_height_canvas:n="+n);
	console.log("get_random_width_height_canvas:m="+m);
	var nn = getRandomInt(0,qn-n);
	var mm = getRandomInt(0,qm-m);
	console.log("get_random_width_height_canvas:nn="+nn);
	console.log("get_random_width_height_canvas:mm="+mm);
	
	
	//var canvas = document.getElementById("right_canvas");
	//var context = canvas.getContext("2d");
	
	
	
	var canvas2 = document.createElement("canvas");
	canvas2.width = n*global_seed_size;
	canvas2.height = m*global_seed_size;
	var context2 = canvas2.getContext("2d");
	
	
	var x=0;
	var y=0;
	for(var j=mm*global_seed_size;j<(mm+m)*global_seed_size;j+= global_seed_size)
	{
		for(var i=nn*global_seed_size;i<(nn+n)*global_seed_size;i+= global_seed_size)
		{
			
			var imgData = context.getImageData(i,j,global_seed_size,global_seed_size);
			
			context2.putImageData(imgData,x*global_seed_size,y*global_seed_size);
			x++;
		}
		x=0;
		y++;
	}
	
	var ccnnvv = mirror_down(mirror_right(canvas2,global_seed_size),global_seed_size);
	for(var v=0;v<global_seed_size;v++)
	{
		ccnnvv = axes(ccnnvv);
	}
	
	return ccnnvv;
	
	
	//return canvas2;
	
	
	
}

function loadLabirint( callback )
{
	get_labirint_image_path( function( imgpath )
	{
		
		//var imgpath = "images/labirint/labirint_17_size.png";
		
		//alert(""+imgpath+" "+imgpath.indexOf("_size_") + " " + );
		
		var t1 = imgpath.substr(imgpath.indexOf("_size_")+6);
		var t2 = t1.substr(0, t1.indexOf("_size.png"));
		
		//alert(t2);
		
		global_seed_size = Number( t2 ); //(""+imgpath.replace("images/labirint/labirint_","")).replace("_size.png",""));
		
		console.log("global_seed_size="+global_seed_size); 
		
		//setupSeedSize();
		
		var img = new Image();
		img.onload = function()
		{
			
			if(checkAllowedSidesSize(this.width,this.height)==false)
			{
				alert('This width and height not allowed. Only square or proportional');	
				window.location = '/labirint';
				loadLabirint( callback );
				return;
			}
			
			clearAll();
			
			var canvas = document.getElementById("left_canvas");
			canvas.width = this.width;
			canvas.height = this.height;
			
			
			
			var context = canvas.getContext("2d");
			context.drawImage(this,0,0);
			
			select_fill_podbor_sizes(canvas.width);
			
			var arrWL = (""+window.location).split("/");
			//alert(arr);		
			//return;
			var count = 0;
			for(var i=0;i<arrWL.length;i++) if(arrWL[i] != "") count++;
			
			if(count<=3)
			{
				var cnv = get_random_width_height_canvas(canvas);
				
				var canvas = document.getElementById("left_canvas");
				canvas.width = cnv.width;
				canvas.height = cnv.height;
					
				context.drawImage(cnv,0,0);
			}
			
			mapColorToImageData();
			
			fill_glob_colors();
			
			loadRightCanvas();
			
			draw_center_canvas2();
			
			selectBackground(global_seed_size);
				
			all_down(); 
			
			prepare_koloda();
			
			
			
			if( check_not_exist_colored() ) take_a_fifty_colored ();
			
			/**********************************************/
						
			
			do
			{
				
				
				
				var result = set_on_own_place_patterned();
				if(result == true)
				{
					if(is_game_finished()) {  finish_game(); return; } 
				}
				
				if(is_exist_background() == true) 
				{
					var res = take_a_fifty_colored ();
					
					if(res == false) break;
					
				}
				
				break
				
			
			}
			
			while( true );
			/***********************************/
			
			
			
			
			
			
			
			
			//take_a_fifty();
			
			//global_seed_size = Math.sqrt(canvas.width);
			
			/*****
			
			if(canvas.width % global_seed_size != 0)
			{
			//	alert("For the best use: image width should be equal some N*global_seed_size ");
				//return;
			}
			
			*****/
			
			
			
			//define_seed_size(canvas);
			
			//setupSeedSize();

			/****
			canvas2 = document.getElementById("canvas2");
			canvas2.width = this.width;
			canvas2.height = this.height;
			var context2 = canvas2.getContext("2d");
			context2.drawImage(this,0,0);
			canvas2.drawImage(cloneInvertedCanvas(context2.getImageData(0,0,this.width, this.height), 1),0,0);
			*****/
			
			//loadRightCanvas();
			
			//draw_center_canvas0(0,0);
			
			//return;
			
			//setTimeout( function() {
			
			
			//var lim = countPatternedInRightCanvas();
			
			//alert(countColoredInCenterCanvas());
			//alert();
				
			/****
			var n=0;
			do
			{
				mapColorToImageData();
							
				var lim2 = countColoredInCenterCanvas();
				
				n++;
			}
			while(( lim2 != global_mapped_colors.length ) || n> 100) 
				
			
			draw_center_canvas();
			
			callback(10); 
			
			//}, 5000 );
			
			draw_center_canvas0(0,0);
			
			
			***/
			
			
		}
		img.src = imgpath;
		
	});

}



function get_selected_seed(e)
{
	e = (e) ? e : event;   
	if(e.button == 0 || e.button==2) 
	{
		
		var x = e.offsetX==undefined?e.layerX:e.offsetX;
		var y = e.offsetY==undefined?e.layerY:e.offsetY;
		
		
		var n = (x/global_seed_size|0);//-tw;
		var m = (y/global_seed_size|0);//-th;
		
		//console.log("x="+x+" y="+y);
		console.log("n="+n+" m="+m);
		
		return [x,y,n,m];
		
	}
}

function getStrColorFromImageData(imageData)
{
	return "rgba("+imageData.data[0]+','+imageData.data[1]+','+imageData.data[2]+','+imageData.data[3]+')';
}

function countPatternedInRightCanvas()
{
	var arr = [];
	var canvas = document.getElementById("right_canvas");
	var context = canvas.getContext("2d");
	
	for(var j=0;j<canvas.height;j+= global_seed_size)
	{
		for(var i=0;i<canvas.width;i+= global_seed_size)
		{
			
			var imgData = context.getImageData(i,j,global_seed_size,global_seed_size);
			
			var found= false;
			for(var n=0;n<arr.length;n++)
			{
				if(free_image_equal(arr[n], imgData.data)== true) {found=true; break;}
				
			}
			
			if(found==false) { arr.push(cloneImageDataData(imgData.data)); }
			
			
		}
	}
	
	return arr.length;
}

function countColoredInCenterCanvas()
{
	/******
	var arr = [];
	var canvas = document.getElementById("center_canvas");
	var context = canvas.getContext("2d");
	
	for(var j=0;j<canvas.height;j+= global_seed_size)
	{
		for(var i=0;i<canvas.width;i+= global_seed_size)
		{
			
			var imgData = context.getImageData(i+1,j+1,1,1);
			
			var color = getStrColorFromImageData(imgData);
			
			if(arr.indexOf(color)==-1) arr.push(color);
			
			
		}
	}
	******/
	
	var count = 0;
	
	for(var i=0;i<global_mapped_colors.length;i++)
	{
		var color = global_mapped_colors[i].color;
		
		var index = -1;
		for(var j=0;j<global_mapped_colors.length;j++)
		{
			if(i==j) continue;
			
			if(color == global_mapped_colors[j].color) { index = j; break; } 
			
		}	
		
		if(index == -1) count++;
		
		global_mapped_colors[i].color
	}
	
	
	
	
	return count;
}	

function getColorFromLeftCanvas(x,y,i,j)
{
	var cnv = document.getElementById("left_canvas");
	var ctx = cnv.getContext("2d");	
	var imageData = ctx.getImageData(x+i,y+j,1,1);
	return "rgba("+imageData.data[0]+','+imageData.data[1]+','+imageData.data[2]+','+imageData.data[3]+')';

}

function getColorFromCenterCanvas(x,y,i,j)
{
	var cnv = document.getElementById("center_canvas");
	var ctx = cnv.getContext("2d");	
	var imageData = ctx.getImageData(x+i,y+j,1,1);
	return "rgba("+imageData.data[0]+','+imageData.data[1]+','+imageData.data[2]+','+imageData.data[3]+')';

}

function getColorFromRightCanvas(x,y,i,j)
{
	var cnv = document.getElementById("right_canvas");
	var ctx = cnv.getContext("2d");	
	var imageData = ctx.getImageData(x+i,y+j,1,1);
	return "rgba("+imageData.data[0]+','+imageData.data[1]+','+imageData.data[2]+','+imageData.data[3]+')';

}

function getCanvasSeedImage(first_canvas,x,y)
{
	first_canvas.width = global_seed_size;
	first_canvas.height = global_seed_size;
	var first_context = first_canvas.getContext("2d");
	for(var j=0;j<first_canvas.height;j++)
	{
		for(var i=0;i<first_canvas.width;i++)
		{
			first_context.fillStyle = getColorFromLeftCanvas(x,y,i,j);
			first_context.fillRect(i,j,1,1);	
		}
	}
	return first_canvas;
}

function fill_right_canvas( second_seed )
{
	if(global_selected_seed != null)	
	{
		var x = global_selected_seed[2]*global_seed_size;
		var y = global_selected_seed[3]*global_seed_size;
		
		var x2 = second_seed[2]*global_seed_size;
		var y2 = second_seed[3]*global_seed_size;
		
		var first_canvas = getCanvasSeedImage(document.createElement("canvas"),x,y);
		var second_canvas = getCanvasSeedImage(document.createElement("canvas"),x2,y2);
		
		
		
		
		
		
		
	
	
			
				first_canvas.toBlob( function( blob) {
				
					var xhr = new XMLHttpRequest();
					xhr.open('POST', '/send_seed', true);
					xhr.onload = function(e) {  
					
						if (xhr.readyState != 4) return;
						
						if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; throw new Error(error);  }
					 	

						second_canvas.toBlob(  function(blob) { 
							blobToServer( blob, "/fill", function( blob_from_server ) {
								getImageFromBlob( blob_from_server, function(img) {
									imageToCanvas(img, "right_canvas", function() { 
										
									});	
									
								});	
							}, function(msg) {
								
								
								console.log("transform(): Was error: "+msg);
								throw new Error(msg);
								
							}); 
						});
	 
						
					}
					xhr.send(blob);
					
						
				});
				
		
		
		/*****
		var rcnv = document.getElementById("right_canvas");
		rcnv.width = global_seed_size*4;
		rcnv.height = global_seed_size*4;
		var rctx = rcnv.getContext("2d");
		rctx.fillStyle = "blue";
		rctx.fillRect(0,0,rcnv.width,rcnv.height);
		******/

	}
}

function cmp(im1, im2)
{
	return free_image_equal(im1.data, im2.data);
	/***
	if(im1.data[0] != im2.data[0]) return false;
	if(im1.data[1] != im2.data[1]) return false;
	if(im1.data[2] != im2.data[2]) return false;
	if(im1.data[3] != im2.data[3]) return false;
	return true;
	****/
}

function iscellodd(context, x,y, size)
{
	var imgData0 = context.getImageData(x-1,y-1,1,1);
	var imgData1 = context.getImageData(x,y-1,1,1);
	var imgData2 = context.getImageData(x+1,y-1,1,1);
	var imgData3 = context.getImageData(x-1,y,1,1);
	var imgData4 = context.getImageData(x+1,y,1,1);
	var imgData5 = context.getImageData(x-1,y+1,1,1);
	var imgData6 = context.getImageData(x,y+1,1,1);
	var imgData7 = context.getImageData(x+1,y+1,1,1);
	var imgData8 = context.getImageData(x,y,1,1);
	if(cmp(imgData0, imgData1) && cmp(imgData0, imgData2) && cmp(imgData0, imgData3) && cmp(imgData0, imgData4)
		&& cmp(imgData0, imgData5)
	&& cmp(imgData0, imgData6)
	&& cmp(imgData0, imgData7)
	&& cmp(imgData0, imgData8)) return false;
	
	if( cmp(imgData0, imgData2) && cmp(imgData0, imgData7) && cmp(imgData5, imgData7) )
	{
		if( cmp (imgData1, imgData3) && cmp(imgData3, imgData4) && cmp(imgData4, imgData6)) return true;
	}
	return false;
}


function iscelleven(context, x,y,size)
{
/*********
	0 x-1y-1
1 x,y-1
2 x+1,y-1
3 x+2,y-1

4 x-1,y
5 x,y
6 x+1,y
7 x+2,y

8 x-1,y+1
9 x,y+1
10 x+1,y+1
11 x+2,y+1

12 x-1, y+2
13 x, y+2
14 x+1,y+2
15 x+2,y+2
********/

	var imgData0 = context.getImageData(x-size,y-size,size,size);
	var imgData1 = context.getImageData(x,y-size,size,size);
	var imgData2 = context.getImageData(x+size,y-size,size,size);
	var imgData3 = context.getImageData(x+size*2,y-size,size,size);
	var imgData4 = context.getImageData(x-size,y,size,size);
	var imgData5 = context.getImageData(x,y,size,size);
	var imgData6 = context.getImageData(x+size,y,size,size);
	var imgData7 = context.getImageData(x+size*2,y,size,size);
	var imgData8 = context.getImageData(x-size,y+size,size,size);
	var imgData9 = context.getImageData(x,y+size,size,size);
	var imgData10 = context.getImageData(x+size,y+size,size,size);
	var imgData11 = context.getImageData(x+size*2,y+size,size,size);
	var imgData12 = context.getImageData(x-size,y+size*2,size,size);
	var imgData13 = context.getImageData(x,y+size*2,size,size);
	var imgData14 = context.getImageData(x+size,y+size*2,size,size);
	var imgData15 = context.getImageData(x+size*2,y+size*2,size,size);
	
	
	
	
	
	if(cmp(imgData0, imgData1) && cmp(imgData0, imgData2) && cmp(imgData0, imgData3) && cmp(imgData0, imgData4)
		&& cmp(imgData0, imgData5)
	&& cmp(imgData0, imgData6)
	&& cmp(imgData0, imgData7)
	&& cmp(imgData0, imgData8)
	
	&& cmp(imgData0, imgData9) && cmp(imgData0, imgData10) && cmp(imgData0, imgData11)
		&& cmp(imgData0, imgData12)
	&& cmp(imgData0, imgData13)
	&& cmp(imgData0, imgData14)
	&& cmp(imgData0, imgData15)
	
	
	
	
	
	
	) return false;
	
	
	
	
	
	
	if( cmp(imgData0, imgData3) && cmp(imgData0, imgData12) && cmp(imgData0, imgData15) )
	{
		if( cmp (imgData1, imgData2) && cmp(imgData1, imgData13) && cmp(imgData1, imgData14)) 
		{
			if( cmp (imgData5, imgData6) && cmp(imgData5, imgData9) && cmp(imgData5, imgData10)) 
			{
				return true;
			}
		}
	}
	return false;
}

function create_canvas(w,imgData)
{
	var temp_cnv = document.createElement("CANVAS");
	temp_cnv.width = w;
	temp_cnv.height = temp_cnv.width;
	temp_cnv.getContext("2d").putImageData(imgData,0,0);
	return temp_cnv;
}

function mirror_right(cnv,size)
{
	var temp_cnv = document.createElement("CANVAS");
	temp_cnv.width = cnv.width*2;
	temp_cnv.height = cnv.width;
	var ctx2 = temp_cnv.getContext("2d");
	var ctx = cnv.getContext("2d");
	
	for(var j=0;j<cnv.height;j+=size)
	{
		for(var i=0;i<cnv.width;i+=size)
		{
			var imgData = ctx.getImageData(i,j,size,size);
			ctx2.putImageData(imgData,i,j);
		}
		
	}
	//var m = cnv.height-1;
	for(var j=0;j<cnv.height;j+=size)
	{
		var n = cnv.width-size;
		for(var i=0;i<cnv.width;i+=size)
		{
			var imgData = ctx.getImageData(i,j,size,size);
			ctx2.putImageData(imgData,n+cnv.width,j);
			n-=size;
		}
		//m--;
	}
	return temp_cnv;
	
}


function mirror_down(cnv,size)
{
	var temp_cnv = document.createElement("CANVAS");
	temp_cnv.width = cnv.width;
	temp_cnv.height = cnv.height*2;
	var ctx2 = temp_cnv.getContext("2d");
	var ctx = cnv.getContext("2d");
	
	for(var j=0;j<cnv.height;j+=size)
	{
		for(var i=0;i<cnv.width;i+=size)
		{
			var imgData = ctx.getImageData(i,j,size,size);
			ctx2.putImageData(imgData,i,j);
		}
		
	}
	
	var m = cnv.height-size;
	for(var j=0;j<cnv.height;j+=size)
	{
		//var n = cnv.width-1;
		for(var i=0;i<cnv.width;i+=size)
		{
			var imgData = ctx.getImageData(i,j,size,size);
			ctx2.putImageData(imgData,i,m+cnv.height);
			
		}
		m-=size;
	}
	
	return temp_cnv;
	
}

function axes(cnv)
{
	var ctx = cnv.getContext("2d");
	var temp_cnv = document.createElement("CANVAS");
	temp_cnv.width = cnv.width-1;
	temp_cnv.height = cnv.height-1;
	var temp_ctx = temp_cnv.getContext("2d");
	
	if(cnv.width%2==1)
	{
	
		var w = (cnv.width /2|0)+1;
		var h = (cnv.height/2|0)+1;
		
		var imgData0 = ctx.getImageData(0,0,w,h);
		var imgData1 = ctx.getImageData(w,0,w,h);
		var imgData2 = ctx.getImageData(0,h,w,h);
		var imgData3 = ctx.getImageData(w,h,w,h);
		
		temp_ctx.putImageData(imgData0,0,0);
		temp_ctx.putImageData(imgData1,w-1,0);
		temp_ctx.putImageData(imgData2,0,h-1);
		temp_ctx.putImageData(imgData3,w-1,h-1);
	
	}
	else
	{
	
		var w = cnv.width /2;
		var h = cnv.height/2;
		
		var imgData0 = ctx.getImageData(0,0,w,h);
		var imgData1 = ctx.getImageData(w,0,w,h);
		var imgData2 = ctx.getImageData(0,h,w,h);
		var imgData3 = ctx.getImageData(w,h,w,h);
		
		temp_ctx.putImageData(imgData0,0,0);
		temp_ctx.putImageData(imgData1,w-1,0);
		temp_ctx.putImageData(imgData2,0,h-1);
		temp_ctx.putImageData(imgData3,w-1,h-1);
	
	}
	
	
	
	return temp_cnv;
	
}

function cmpCanvas(cnv1,cnv2)
{
	var ctx1 = cnv1.getContext("2d");
	var ctx2 = cnv2.getContext("2d");
	var w = cnv1.width;
	var h = cnv1.height;
	var w2 = cnv2.width;
	var h2 = cnv2.height;
	
	var imgData1 = ctx1.getImageData(0,0,w,h); 
	var imgData2 = ctx2.getImageData(0,0,w2,h2);
	
	return free_image_equal(imgData1.data,imgData2.data);
}
/*****
function findSymmetry()
{
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	
	if(canvas.width != canvas.height) 
	{
		alert("image width != image height");
		return null;
	}
	
	//_findSymmetry(2);
	
	for(i=1; i<17; i+=0)
	{
		var r = _findSymmetry(i);
		if(r != null)
		{
			alert("Size of seed is: "+r);
			return r;
		}
		
		i *= 2;
	}	
	
	
	alert('Not found correct chess board');
}
******/
function check_on_seed(m)
{
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	
	var w =0;
	if(m % 2 == 1) w = (m+1)/2;
	else w = m/2;
	
	var imgData = context.getImageData(0,0,m,m);
	
	var partImgData = context.getImageData(0,0,w,w);
	
	var whole_canvas = document.createElement("canvas");
	whole_canvas.width = m;
	whole_canvas.height = m;
	var whole_context = whole_canvas.getContext("2d");
	
	whole_context.putImageData(imgData,0,0);
	
	
	
	var part_canvas = document.createElement("canvas");
	part_canvas.width = w;
	part_canvas.height = w;
	var part_context = part_canvas.getContext("2d");
	
	part_context.putImageData(partImgData,0,0);
	
	var canvas2 = null;
	if(m%2==1) canvas2 = axes(mirror_down(mirror_right(part_canvas,1),1));
	else canvas2 = mirror_down(mirror_right(part_canvas,1),1);
	
	//context.putImageData(canvas2.getContext("2d").getImageData(0,0,canvas2.width,canvas2.height),0,0);	
	//context.putImageData(whole_canvas.getContext("2d").getImageData(0,0,whole_canvas.width,whole_canvas.height),canvas2.width+5,0);	
	 
	//sravnivaem
	return cmpCanvas(canvas2, whole_canvas);
	
	
	
}

function _findSymmetry(size)
{
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	
	
	
	//var size = 1; //size of point, can be 1 or 2 or 4 or 8 or 16
	
	if(canvas.width % 2 == 1)
	{
		var i=1;		
		for(var j=1;j<canvas.height;j+=size)
		{
			
			//for(var i=0;i<canvas.width;i++)
			{
				if( iscellodd(context, i,j, size))
				{
					
					var whole_seed = create_canvas(i*2+size, context.getImageData(0,0,i*2+size,j*2+size));
					
					/*****
					canvas.width= whole_seed.width;
					canvas.height= whole_seed.height;
					canvas.getContext("2d").drawImage(whole_seed,0,0);
					
					****/
					
					var part_of_canvas = create_canvas(i+size,context.getImageData(0,0,i+size,j+size));
					
					
					/***
					canvas.width= i+size;
					canvas.height= j+size;
					canvas.getContext("2d").drawImage(part_of_canvas,0,0);
					****/
					
					/*****
					canvas.width= part_of_canvas.width*2;
					canvas.height= part_of_canvas.height;
					canvas.getContext("2d").drawImage(mirror_right(part_of_canvas,size),0,0);
					*****/
					
					/****
					canvas.width= part_of_canvas.width;
					canvas.height= part_of_canvas.height*2;
					canvas.getContext("2d").drawImage(mirror_down(part_of_canvas,size),0,0);
					*****/
					//return;
					
					//chetveryaem
					var canvas2 = axes(mirror_down(mirror_right(part_of_canvas,size),size));
					
					/****
					canvas.width= canvas2.width;
					canvas.height= canvas2.height;
					canvas.getContext("2d").drawImage(canvas2,0,0);
					****/
					
					//sravnivaem
					if(cmpCanvas(canvas2, whole_seed)) {  return canvas2.width; }
					
					 
					
				}
				
			}
			i+=size;
		}

		//alert('1');
		return null;	

	}
	else
	{
		
			var i=0;
			for(var j=0;j<canvas.height;j+=size)
			{
				
				
					if( iscelleven(context, i,j, size))
					{
						var whole_seed = create_canvas(i*2+size, context.getImageData(0,0,i*2+size,j*2+size));
						
						/***
						canvas.width= whole_seed.width;
						canvas.height= whole_seed.height;
						canvas.getContext("2d").drawImage(whole_seed,0,0);
						****/
						
						
						var part_of_canvas = create_canvas(i+size,context.getImageData(0,0,i+size,j+size));
						/****
						canvas.width= part_of_canvas.width;
						canvas.height= part_of_canvas.height;
						canvas.getContext("2d").drawImage(part_of_canvas,0,0);
						*****/
						
						var canvas2 = mirror_down(mirror_right(part_of_canvas, size), size);
						var tcanvas = canvas2;
						for(ii=0;ii<size;ii++)
						{
							tcanvas = axes(tcanvas);
						}
						canvas2 = tcanvas;
						//canvas.width= canvas2.width;
						//canvas.height= canvas2.height;
						//canvas.getContext("2d").drawImage(canvas2,0,0);
						
						//return;
						
						//sravnivaem
						if(cmpCanvas(canvas2, whole_seed)) { return canvas2.width; }
						
						//if(canvas2 == whole_seed)  { alert(""+canvas2.width); return canvas2.width; }
						
					}
					
				
				
				i+=size;
			}
		

		return null;		
	}
}

function put_one_seed_into_right_canvas()
{
	console.log('not implementation');
	if(global_selected_seed != null)	
	{
		var x = global_selected_seed[2]*global_seed_size;
		var y = global_selected_seed[3]*global_seed_size;
		var rcnv = document.getElementById("right_canvas");
		rcnv.width = global_seed_size*2;
		rcnv.height = global_seed_size*2;
	    var rctx = rcnv.getContext("2d");
		for(var j=0;j<rcnv.height;j+=2)
		{
			for(var i=0;i<rcnv.width;i+=2)
			{
				rctx.fillStyle = getColorFromLeftCanvas(x,y,i/2,j/2);
				rctx.fillRect(i,j,2,2);	
			}
		}

	}
}

function isAllPointsSame(data)
{
	
	for(var j=4;j<data.length;j+=4)
	{
		if(data[j-4] != data[j])  return false;
		if(data[j-3] != data[j+1])  return false;
		if(data[j-2] != data[j+2])  return false;
		if(data[j-1] != data[j+3])  return false;
		
	}
	return true;
}

function isImageDataAllPointsSame(imageData)
{
	if(isImageDataCellBackground(imageData)) return false;
	
	var data = imageData.data;
	for(var j=4;j<data.length;j+=4)
	{
		if(data[j-4] != data[j])  return false;
		if(data[j-3] != data[j+1])  return false;
		if(data[j-2] != data[j+2])  return false;
		if(data[j-1] != data[j+3])  return false;
		
	}
	return true;
}


function free_image_equal(data1, data2)
{
	if(data1 == null) return;
	if(data2 == null) return;
	if(data1.length != data2.length) return;
			
	for(var j=0;j<data1.length;j++)
	{
		if(data1[j] != data2[j]) return false; 
		
	}
	return true;
}

function findImageDataInGlobalArrObjects( imgData )
{
	var pData = imgData.data;
	for(var i=0;i<global_arr_objects.length;i++)
	{
		if(global_arr_objects[i] == null) continue;
				
		var obj_data = global_arr_objects[i].data;
		
		if(obj_data.length != pData.length) continue;
		 
		if(free_image_equal(obj_data,pData)==true) return global_arr_objects[i]; //i, j is x,y we need to divide on global_seed_size
	}
	
	return null;
}

function findImageDataInArrObjects( arrObjects, data )
{
	for(var i=0;i<arrObjects.length;i++)
	{
		if(arrObjects[i] == null) continue;
		
		var obj_data = arrObjects[i].data;
		
		if(obj_data.length != data.length) continue;
		var result = true;
		for(var j=0;j<data.length;j++)
		{
			if(obj_data[j] != data[j])  
			{
				result=false;
				break;
			}
		}
		if(result==true) return i;
	}
	return null;
}

function cloneImageDataData(data)
{
	var data1 = [];
	for(var j=0;j<data.length;j++)
	{
		data1.push(data[j]);
	}
	return data1;
}

// Возвращает случайное целое число между min (включительно) и max (не включая max)
// Использование метода Math.round() даст вам неравномерное распределение!
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function str_rgba(r,g,b)
{
	return "rgba("+r+","+g+","+b+",255)";
}

function fill_glob_colors()
{
	glob_colors = null;
	glob_colors = [];
	
	
	
	var nn = 250/global_mapped_colors.length|0;
	
	
	for(var r=10;r<250;r+=nn)
	{ 
		for(var g=10;g<250;g+=nn)
		{ 
			for(var b=10;b<250;b+=nn)
			{ 
				glob_colors.push(str_rgba(r,g,b));
			}
		}
	
	}	
	
	//лабиринт колода, ограниченная галерка, мув который не плюс 1, космический свап, 
	//магия, которая накопится в галерке применяется для всей колоды
	/*****
	
	for(var r=10;r<256;r+=nn)
	{ 
		glob_colors.push(str_rgba(r,0,0));
	}
	
	/****

	for(var r=10;r<256;r+=nn)
	{ 
		glob_colors.push(str_rgba(150,r,150));
		
	}	
	
	for(var r=10;r<256;r+=nn)
	{ 
		glob_colors.push(str_rgba(150,150,r));
	}
	
	*****/
	/****
	glob_colors.push(str_rgba(255,0,0));
	
	
	/*** 
	for(var g=10;g<239;g+=nn)
	{ 
		glob_colors.push(str_rgba(255,g,0));
	}
	
	glob_colors.push(str_rgba(255,255,0));
	
	for(var r=239;r<9;r-=nn)
	{
		glob_colors.push(str_rgba(r,255,0));
	}
	*****/
	//glob_colors.push(str_rgba(0,255,0));
	
	/*****
	for(var b=10;b<239;b+=nn)
	{
		glob_colors.push(str_rgba(0,255,b));
		
	}
	
	glob_colors.push(str_rgba(0,255,255));
	
		for(var g=239;g<9;g-=nn)
		{
			glob_colors.push(str_rgba(0,g,255));	
			 
		}
		
		glob_colors.push(str_rgba(0,0,255));
	
	for(var r=10;r<239;r+=nn)
	{ 
		glob_colors.push(str_rgba(r,0,255));
	}
	
	****/
	console.log("glob_colors.length="+glob_colors.length);
	shuffle(glob_colors);

}
	/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}
function getRndColor()
{
	var r = getRandomInt(0, 256);
	var g = getRandomInt(0, 256);
	var b = getRandomInt(0, 256);
	var a = 255;
	
	var s = "rgba("+r+","+g+","+b+","+a+")";
	if(glob_colors == null)
	{
		glob_colors = [];
		glob_colors.push(s);
		return s;
	}
	else
	{
		if(glob_colors.indexOf(s)==-1) { glob_colors.push(s); return s; }
		else return getRndColor();
	}
	
}

function mapColorToImageData()
{
	var arr = [];
	
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
			
	for(var j=0;j<canvas.height;j+=global_seed_size)
	{
		for(var i=0;i<canvas.width;i+=global_seed_size)
		{
			var imageData = context.getImageData(i,j,global_seed_size,global_seed_size);
			
			
				var index = -1;
				for(var t=0;t<arr.length;t++)
				{
					
					if(cmp(arr[t].imgData,imageData))
					{
						index=t;
						break;
					}
					
				}
				
				if(index==-1)
				{
					var n = i/global_seed_size;
					var m = j/global_seed_size;
					
					var x = getRandomInt(0,global_seed_size);
					var y = getRandomInt(0,global_seed_size);
									
					var col  = null; //getStrColorFromImageData(context.getImageData(i+x,j+y,1,1));
					
					var obj = {};
					obj.imgData = cloneImageData(imageData);
					obj.color = col;
					obj.n = n;
					obj.m = m;
					obj.x = x;
					obj.y = y;
										
					arr.push(obj);
				}
				
			
		}
	}
	
	global_mapped_colors = arr;
}

/*******
function mapColorToImageData0()
{
	
	var arrObjects = [];
	
		var canvas = document.getElementById("left_canvas");
		var context = canvas.getContext("2d");
				
		for(var j=0;j<canvas.height;j+=global_seed_size)
		{
			for(var i=0;i<canvas.width;i+=global_seed_size)
			{
				var imageData = context.getImageData(i,j,global_seed_size,global_seed_size);
				
				
				var index = -1;
				for(var t=0;t<arrObjects.length;t++)
				{
					
					if(cmp(arrObjects[t].imgData,imageData))
					{
						index=t;
						break;
					}
					
				}
				
				if(index==-1)
				{
					var n = i/global_seed_size;
					var m = j/global_seed_size;
					
					var obj = {};
					obj.imgData = imageData;
					obj.color = g_etSeedColor(n,m);
					obj.n = n;
					obj.m = m;
					
					arrObjects.push(obj);
				}
				
				
				
			}
		}
		
		console.log(arrObjects);
		
		
		global_mapped_colors = [];
				
		 
		
		for(var j=0;j<canvas.height;j+=global_seed_size)
		{
			for(var i=0;i<canvas.width;i+=global_seed_size)
			{
				var imageData = context.getImageData(i,j,global_seed_size,global_seed_size);
				
				
				
				
				for(var t=0;t<arrObjects.length;t++)
				{
					
					if(cmp(arrObjects[t].imgData,imageData))
					{
						var obj = {};
						obj.color = arrObjects[t].color;
						obj.n = i/global_seed_size;
						obj.m = j/global_seed_size;
						global_mapped_colors.push(obj);		
					}
					
				}
			}
		}		


		
	
				
}

******/

function draw_center_canvas0(n,m)
{
	return;
	/***
	var Lcanvas = document.getElementById("right_canvas");
	var Lcontext = Lcanvas.getContext("2d");
	var imageData = Lcontext.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
	var nn = Lcanvas.width / global_seed_size; //nn==6
	
	
	var cnv = document.createElement("canvas");
	cnv.width = global_seed_size;
	cnv.height = global_seed_size;
	cnv.getContext("2d").putImageData(imageData,0,0);
	
	//10 && 7 = 17 = 34 /2
	
	var cnv4 = document.createElement("canvas");
	cnv4.width = nn*2;
	cnv4.height = nn*2;
	var w = (global_seed_size/2|0)-nn;
	var h=w;
	cnv4.getContext("2d").putImageData(cnv.getContext("2d").getImageData(w,h,nn*2,nn*2),0,0);
	
	
	var cnv2 = multy(cnv4,1,global_seed_size);
	
	var cc = document.getElementById("center_canvas");
	cc.width = Lcanvas.width;
	cc.height = Lcanvas.height;
	var cont = cc.getContext("2d");
	cont.drawImage(cnv4,0,0);
	
	//cont.putImageData(imgData2,0,0);
	
	//var cnv2 = multy(cc,1,global_seed_size);
	//cc.width = cnv2.width;
	//cc.height = cnv2.height;
	
	
	/*****
	var cc = document.getElementById("center_canvas");
	var cont = cc.getContext("2d");
	cc.width = nn;
	cc.height = nn;
	
	/******
	var mm = nn/2|0;
	
	var dd = (global_seed_size/2|0)- mm;
	var rr = dd;
	
	var cnv = document.createElement("canvas");
	cnv.width = global_seed_size;
	cnv.height = global_seed_size;
	cnv.getContext("2d").putImageData(imageData,0,0);
	var imgData2 = cnv.getContext("2d").getImageData(dd,rr,nn,nn);
	
	var cc = document.getElementById("center_canvas");
	var cont = cc.getContext("2d");
	cc.width = nn;
	cc.height = nn;
	cont.putImageData(imgData2,0,0);
	
	var cnv2 = multy(cc,1,global_seed_size);
	cc.width = cnv2.width;
	cc.height = cnv2.height;
	cont.drawImage(cnv2,0,0);
	
	return;
	
	
	/*****
	
	var canvas = document.getElementById("center_canvas");
	canvas.width = Lcanvas.width;
	canvas.height = Lcanvas.height;
	var context = canvas.getContext("2d");
				
	for(var j=0;j<Lcanvas.height;j+=global_seed_size)
	{
		for(var i=0;i<Lcanvas.width;i+=global_seed_size)
		{
			var imageData = Lcontext.getImageData(i,j,global_seed_size,global_seed_size);
							
			for(var n=0;n<global_mapped_colors.length;n++)
			{
				var obj = global_mapped_colors[n];
				if(cmp(obj.imgData, imageData))
				{
					context.fillStyle = obj.color;
					context.fillRect(i,j,global_seed_size,global_seed_size);	
					break;
				}
				
			}
		}
	}
	****/
				
}



function draw_center_canvas2()
{
	var arr = [];
	var nn = global_mapped_colors.length;
	var dd = (glob_colors.length / nn | 0);
	console.log("dd="+dd);
	var dc = getRandomInt( 0, glob_colors.length - dd * nn );
	
	var t = dc; //t < glob_colors.length; 
	for(var n=0;n<global_mapped_colors.length;n++)
	{
	
		
		var obj0 = global_mapped_colors[n]; 
		var obj = {};
				obj.imgData = cloneImageData(obj0.imgData);
				obj.color = glob_colors[ t]; 
				t+=dd;
				obj.n = obj0.n;
				obj.m = obj0.m;
				obj.x = obj0.x;
				obj.y = obj0.y;
									
				arr.push(obj);
					
	}

	global_mapped_colors = arr;
	
	var Lcanvas = document.getElementById("left_canvas");
	var canvas = document.getElementById("center_canvas");
	canvas.width = Lcanvas.width;
	canvas.height = Lcanvas.height;
	var context = canvas.getContext("2d");
	
	glob_colored_special_arr = [];
	
	for(var j=0;j<canvas.height;j+= global_seed_size)
	{
		for(var i=0;i<canvas.width;i+= global_seed_size)
		{
			
			//var imgData = context.getImageData(i+1,j+1,1,1);
			
			var imgData = Lcanvas.getContext("2d").getImageData(i,j,global_seed_size,global_seed_size); 
			
			var color = null;
			for(var ii=0; ii<global_mapped_colors.length; ii++)
			{
				if(cmp(global_mapped_colors[ii].imgData,imgData)) { color = global_mapped_colors[ii].color; break; }
				//getImageDataFrom("left_canvas",n,m);
			}
			
			if(color==null) { alert('imposible in 1834 line'); return; }
			
			//getMappedColor(i/global_seed_size,j/global_seed_size,global_seed_size,global_seed_size);
			context.fillStyle = color;
			context.fillRect(i,j,global_seed_size,global_seed_size);	
			//if(arr.indexOf(color)==-1) arr.push(color);
			
			obj = {};
			obj.frm = "left_canvas";
			obj.nm = [i,j,i/global_seed_size,j/global_seed_size];
			
			var obj2 = {};
			obj2.n = i/global_seed_size;
			obj2.m = j/global_seed_size;
			obj2.color = getBackgroundColor();
			obj2.obj = obj;
			
			glob_colored_special_arr.push(obj2);
			
			
		}
	}
	
				
}

function draw_center_canvas()
{
	var Lcanvas = document.getElementById("left_canvas");
	var Lcontext = Lcanvas.getContext("2d");
	
	var canvas = document.getElementById("center_canvas");
	canvas.width = Lcanvas.width;
	canvas.height = Lcanvas.height;
	var context = canvas.getContext("2d");
				
	for(var j=0;j<Lcanvas.height;j+=global_seed_size)
	{
		for(var i=0;i<Lcanvas.width;i+=global_seed_size)
		{
			var imageData = Lcontext.getImageData(i,j,global_seed_size,global_seed_size);
							
			for(var n=0;n<global_mapped_colors.length;n++)
			{
				var obj = global_mapped_colors[n];
				if(cmp(obj.imgData, imageData))
				{
					context.fillStyle = obj.color;
					context.fillRect(i,j,global_seed_size,global_seed_size);	
					break;
				}
				
			}
		}
	}
	
				
}
	
	function fill_global_arr_objects()
	{
	
		var arrObjects = [];
		var canvas = document.getElementById("left_canvas");
		var context = canvas.getContext("2d");
				
		for(var j=0;j<canvas.height;j+=global_seed_size)
		{
			for(var i=0;i<canvas.width;i+=global_seed_size)
			{
				var imageData = context.getImageData(i,j,global_seed_size,global_seed_size);
				var result = findImageDataInArrObjects( arrObjects, imageData.data );
				if(result==null)
				{
					var obj = {};
					obj.points = [[i,j]];
					obj.data = cloneImageDataData(imageData.data);
					arrObjects.push(obj);
				}
				else
				{
					arrObjects[result].points.push([i,j]);
				}
				
			}
		}
		
		global_arr_objects = arrObjects;
	
	
	}
	
	//I have the sword of Azeroth! I am master of battle!

function findAllCellByColor(cnv, color)
{
	//fill_global_arr_objects();
	
	var canvas2 = document.createElement("canvas");
	canvas2.width = global_seed_size;
	canvas2.height = global_seed_size;
	canvas2.getContext("2d").fillStyle = color;
	canvas2.getContext("2d").fillRect(0,0,global_seed_size,global_seed_size);
	var imgData = canvas2.getContext("2d").getImageData( 0,0,global_seed_size,global_seed_size);
	
	var result = findImageDataInArrObjects( global_arr_objects, imgData.data );
	if(result!=null)
	{
		var canvas = document.getElementById("left_canvas");
	    var context = canvas.getContext("2d");
		//alert(global_arr_objects[result].points);	
		var imgData2 = cnv.getContext("2d").getImageData(0,0,cnv.width,cnv.height);
		for(var i=0;i<global_arr_objects[result].points.length;i++)
		{
			var p = global_arr_objects[result].points[i];
			context.putImageData(imgData2, p[0],p[1]);
			
			
		}
		
		document.getElementById("seeds").removeChild(cnv);
	}
}

/****
function findAllCellByImgData( imgData )
{
	
	
	var arr = [];
	while(true)
	{
		
		var index = findImageDataInArrObjects( global_arr_objects, imgData.data );
		if(index == null) break;
		
		arr.push(index);
		global_arr_objects[index]=null;
		
		
	}
	
	return arr;
	
	
}

****/

	function findAllCellByImgData( imgData2 )
	{
	
		
		
		var arrObjects = [];
		
		if(imgData2 == null) return arrObjects;
		
		var canvas = document.getElementById("left_canvas");
		var context = canvas.getContext("2d");
				
		for(var j=0;j<canvas.height;j+=global_seed_size)
		{
			for(var i=0;i<canvas.width;i+=global_seed_size)
			{
				var imageData = context.getImageData(i,j,global_seed_size,global_seed_size);
				
				var result = true;
				for(var n=0;n<imageData.data.length;n++)
				{
					if(imgData2.data[n] != imageData.data[n])  
					{
						result=false;
						break;
					}
				}
				
				if(result==true) arrObjects.push([i/global_seed_size,j/global_seed_size]);
				
				
				
			}
		}
		
		return arrObjects;
	
	
	}
	
	function getEmptyCellNear(id, obj1, obj2)
	{
		var n = obj1.nm[2];
		var m = obj1.nm[3];
		
	var n2 = obj2.nm[2];
	var m2 = obj2.nm[3];
	
		var canvas = document.getElementById(id);
		if(canvas == null) return null;
		
		var context = canvas.getContext("2d");
				
		for(var j=0;j<canvas.height;j+=global_seed_size)
		{
			for(var i=0;i<canvas.width;i+=global_seed_size)
			{
				var imageData = context.getImageData(i,j,global_seed_size,global_seed_size);
				if(isAllPointsSame(imageData.data)) 
				{
					var obj = {};
					obj.nm = [i,j,i/global_seed_size,j/global_seed_size];
					obj.frm = id;
					
					
					var n0 = obj.nm[2];
					var m0 = obj.nm[3];
					
					if( (n0 < n-1) || (n0 < n2-1)  ) continue;
					if( (n0 > n+1) || (n0 > n2+1)  ) continue;
					if( (m0 < m-1) || (m0 < m2-1)  ) continue;
					if( (m0 > m+1) || (m0 > m2+1)  ) continue;
	
					
					
					
					return obj;
				}
				
			}
		}
		
		return null;
	}
	
	function  getExactOneColorSeedsNM(imgData)
	{
		var arr = [];
		var canvas = document.getElementById("left_canvas");
		var context = canvas.getContext("2d");
				
		for(var j=0;j<canvas.height;j+=global_seed_size)
		{
			for(var i=0;i<canvas.width;i+=global_seed_size)
			{
				var imageData = context.getImageData(i,j,global_seed_size,global_seed_size);
				if(isAllPointsSame(imageData.data))
				{
					if(cmp(imgData, imageData)) arr.push([i,j]);
				}
			}
		}
		
		return arr;
	}	
	
	function  getOneColorSeedsNM()
	{
		var arr = [];
		var canvas = document.getElementById("left_canvas");
		var context = canvas.getContext("2d");
				
		for(var j=0;j<canvas.height;j+=global_seed_size)
		{
			for(var i=0;i<canvas.width;i+=global_seed_size)
			{
				var imageData = context.getImageData(i,j,global_seed_size,global_seed_size);
				if(isAllPointsSame(imageData.data))
				{
					arr.push([i,j]);
				}
			}
		}
		
		return arr;
	}	

/**********
	function  __fillOneColorArrayNM()
	{
		global_color_fields_array = null;
		
		var arr = [];
		var arr2 = [];
		var canvas = document.getElementById("right_canvas");
		var context = canvas.getContext("2d");
				
		for(var j=0;j<canvas.height;j+=global_seed_size)
		{
			for(var i=0;i<canvas.width;i+=global_seed_size)
			{
				var imageData = context.getImageData(i,j,global_seed_size,global_seed_size);
				//if(isAllPointsSame(imageData.data)==false)
				{
					arr.push([i/global_seed_size,j/global_seed_size,imageData,null]);
					
					var index = -1;
					for(var n=0;n<arr2.length;n++)
					{
						if(cmp(arr2[n][0],imageData)) { index=n; break;}
					}
					if(index==-1) arr2.push([imageData,i/global_seed_size,j/global_seed_size,null]);
				}
			}
		}
		
		var index = -1;
		for(var n=0;n<arr2.length;n++)
		{
			
			while(true)
			{
			
				var nn = arr2[n][1];
				var mm = arr2[n][2];
				var color = getSeedColor(nn,mm);
				
				
				
				var index=-1;
				for(var t=0;t<arr2.length;t++)
				{
					if(color == arr2[t][3]) {index=t;break;}
				}
				
				if(index==-1) {arr2[n][3]=color; break;}
			
			}
			
		}
		
		for(var n=0;n<arr.length;n++)
		{
			
			
			for(var t=0;t<arr2.length;t++)
			{
					if(cmp(arr[n][2], arr2[t][0]))
					{
						arr[n][3] = arr2[t][3];
					}
			}
			
		}
		
		global_color_fields_array = arr;
		
		
		return arr;
	}		
	
	********/
	
	function getUnderSeedColor(n,m)
	{
		 var arr = getOneColorSeedsNM();
		 if(arr.length==0) fillOneColorArrayNM();
		 
		for(var t=0;t<global_color_fields_array.length;t++)
		{
			var n1 = global_color_fields_array[t][0];
			var m1 = global_color_fields_array[t][1];
			var color = global_color_fields_array[t][3];
			if(n == n1 && m == m1) return color;
		}
			
		alert('imposible');	
		return null; 
	}
	
	
		
function setMappedColor(n,m)
{

	//return getStrColorFromImageData(context.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size));
	
}

	
function getMappedColor(n,m)
{
	var canvas = document.getElementById("center_canvas");
	var context = canvas.getContext("2d");
	return getStrColorFromImageData(context.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size));
	
}


/*****
function g_etSeedColor(n,m)
{
	var i = getRandomInt(0,global_seed_size);
	var j = getRandomInt(0,global_seed_size);
	var x  = n * global_seed_size;
	var y = m * global_seed_size;
	
	return getColorFromLeftCanvas(x,y,i,j);
}
******/


function getGalerkaCanvasNumber() // check input and then (bayan or wow!) building govnoshar
{
	var counter = 0;
	var list = document.getElementsByTagName("CANVAS");
	for(var i=0;i<list.length;i++)
	{
		if(  (""+list[i].id).indexOf("galerka")==-1  ) continue; 
		counter++;
	}
	return counter;
}

function addInGalerka(param, color, imgData)
{
	if(isAllPointsSame(imgData.data)==true) return null;
	
	if(inGalerkaNotExist(imgData) == false) return null;
	
	var canvas2 = document.createElement("canvas");
	
	var nn = 0;
	while(true)
	{
		if(document.getElementById("galerka_"+nn)!=null) 
		{
			nn++;
			continue;
		}
		break;
	}
	
	
	
	canvas2.id = "galerka_"+nn;
	canvas2.width = global_seed_size;
	canvas2.height = global_seed_size;
	canvas2.getContext("2d").putImageData(imgData, 0,0);
	canvas2.onclick = function(e)
	{
		//alert(this.getAttribute("data-color"));
		//var points = findAllCellByColor(this, this.getAttribute("data-color"));
		//global_bottom_selected = this;
		whenUserClickedGalerka(e);
	}
	
	/**********
	var index = -1;
	for(var i=0;i<global_color_fields_array.length;i++)
	{
		if(cmp(global_color_fields_array[i].imgData,imgData)==true)
		{
			if(global_color_fields_array[i].color == color)
			{
				index=i;
				break;
			}
		}
	}
	
	if(i==-1) 
	{
		var obj = {};
		obj.imgData = cloneImageData(imgData);
		obj.color = color;
		global_color_fields_array.push(obj);
	}
	
	
	***********/
	
	
	canvas2.setAttribute("data-color", color);
	document.getElementById("seeds").appendChild(canvas2);
	
	return color;
}

function allSameToOneColor(e)
{
	global_selected_seed = get_selected_seed(e);
	
	
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var n = global_selected_seed[2];
	var m = global_selected_seed[3];
	var imgData = context.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
	
	if(isAllPointsSame(imgData.data)==true) return; // or here we can change all odtonni
	
	
	
	
	//fill_global_arr_objects();
	
	
	
	
	var result = findImageDataInArrObjects( global_arr_objects, imgData.data );
	if(result!=null)
	{
		//var color = getSeedColor(n,m);
		//canvas2.setAttribute("data-color", color);
		//alert(global_arr_objects[result].points);	
		for(var i=0;i<global_arr_objects[result].points.length;i++)
		{
			var p = global_arr_objects[result].points[i];
			context.fillStyle = addImgDataToGalerka(n,m,imgData);
			context.fillRect(p[0],p[1],global_seed_size,global_seed_size);
			
			
		}
	}
	
	
}

function findColorOnGalerka(imgData)
{
	var list = document.getElementsByTagName("CANVAS");
	for(var i=0;i<list.length;i++)
	{
		if(  (""+list[i].id).indexOf("galerka")==-1  ) continue; 
		
		var imgDataGalerka = list[i].getContext("2d").getImageData(0,0,list[i].width, list[i].height);
		
		if( free_image_equal(imgData.data, imgDataGalerka.data) == true ) 
		{
			return list[i].getAttribute("data-color");
		}
		
		
	}
	
	return null;
	
}


function remove(e)
{
	global_selected_seed = get_selected_seed(e);
	
	
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var n = global_selected_seed[2];
	var m = global_selected_seed[3];
	var imgData = context.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
	
	if(isAllPointsSame(imgData.data)==true) return;
	
	var color = addImgDataToGalerka(n,m,imgData);
	if(color!=null) 
	{	
		context.fillStyle = color;
		context.fillRect(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
	}
	
	
	
}

function multy(canvas, current_seed_size, new_seed_size)
{
	var context = canvas.getContext("2d");
	
	var canvas2 = document.createElement("canvas");
	var context2 = canvas2.getContext("2d");
	canvas2.width = (canvas.width / current_seed_size) * new_seed_size;
	canvas2.height = (canvas.height / current_seed_size) * new_seed_size;
	
		for(var j=0;j<canvas.height;j+=current_seed_size)
		{
			for(var i=0;i<canvas.width;i+=current_seed_size)
			{
				var imageData = context.getImageData(i,j,1,1);
				context2.fillStyle = getStrColorFromImageData(imageData);
				context2.fillRect((i/current_seed_size)*new_seed_size,(j/current_seed_size)*new_seed_size,new_seed_size,new_seed_size);
				
				
			}
		}
		
	return canvas2;	
	
}

/******************************
	//return;
	
	//alert('test ok');
	var rb = document.querySelector('input[name="flags"]:checked').value;
		
	if( rb == "copy allowed" )	
	{
		/****
		var canvas = document.getElementById("left_canvas");
		canvas.width = global_seed_size;
		canvas.height = global_seed_size;
		soundKosh();

		for(var i=0;i<global_mapped_colors.length;i++)
		{
			var obj = global_mapped_colors[i];
			console.log(obj);
		}
		***/
		
		/*****
		
		if(e.target.id == "center_canvas")
		{
			alert('test ok');
		}
		return; 
	}
	
	
	
	/******
		
	global_selected_seed = get_selected_seed(e);
	
	
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var n = global_selected_seed[2];
	var m = global_selected_seed[3];
	var imgData = context.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
	
	var canvas2 = document.createElement("canvas");
	canvas2.id = "galerka_"+getGalerkaCanvasNumber();
	canvas2.width = global_seed_size;
	canvas2.height = global_seed_size;
	canvas2.getContext("2d").putImageData(imgData, 0,0);
	canvas2.onclick = function(e)
	{
		//alert(this.getAttribute("data-color"));
		//var points = findAllCellByColor(this, this.getAttribute("data-color"));
		//global_bottom_selected = this;
		whenUserClickedGalerka(e);
	}
	
	document.getElementById("seeds").appendChild(canvas2);
	
	fill_global_arr_objects();
	
	var color = getSeedColor(n,m);
	context.fillStyle = color;
	context.fillRect(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
	fill_global_arr_objects();
	
	/****
	var result = findImageDataInArrObjects( global_arr_objects, imgData.data );
	if(result!=null)
	{
		
		canvas2.setAttribute("data-color", color);
		//alert(global_arr_objects[result].points);	
		for(var i=0;i<global_arr_objects[result].points.length;i++)
		{
			var p = global_arr_objects[result].points[i];
			context.fillStyle = color;
			context.fillRect(p[0],p[1],global_seed_size,global_seed_size);
			
			
		}
	}
	****/

function whenUserRightClickOnLeftCanvas(e)
{
	
	
	
	
	
	
	
	
	e.preventDefault();
	
	if(arr_gun==null) { arr_gun = null; arr_gun = []; }
	
	if( arr_gun.length < 256 )
	{
		arr_gun.push(get_selected_object(e));
		
	}
	
	else 
	{ 
		
		// arr_gun=null; 
		
		// arr_gun=[];
	}
	//а чебы не показывать? вот и будет тебе магия
	
	render();
	
	// shoot();
	
	// setTimeout( shoot, 1000 );
	
	/***********
		//draw_center_canvas0(global_last_selected_object.nm[2],global_last_selected_object.nm[3]);
	}
	else
	{
		var obj = get_selected_object(e); 
		
		var result = user_move(global_last_selected_object, obj);
		if(result==1) 
		{
			sound();
		}
		else
		{
			//randomize(10);
		}
		
		global_last_selected_object = null;
		
		if(is_game_finished() == true) finish_game();
		
	}
	
	****************/
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/*****
	e.preventDefault();
	
	var nm = get_selected_seed(e);
	var obj = {};
	obj.frm = 'left_canvas';
	obj.nm = nm;
	addMagik(obj);
	
	*********/
}

function highlight()
{
	if(global_selected_seed != null) 
	{
	//alert('test ok');
	//global_selected_seed = get_selected_seed(e);
	
	
		var canvas = document.getElementById("left_canvas");
		var context = canvas.getContext("2d");
		var n = global_selected_seed[2];
		var m = global_selected_seed[3];
		
		var imgData = context.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
		
		global_first_seed_image_data = cloneUnrealImageData(n,m,imgData);
		
		context.fillStyle = "rgba(255,0,255,0.5)";
		context.fillRect(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
		
		global_red_ghost = [n,m];
	
	}
	
	/******
	
	var canvas2 = document.createElement("canvas");
	canvas2.width = global_seed_size;
	canvas2.height = global_seed_size;
	canvas2.getContext("2d").putImageData(imgData, 0,0);
	canvas2.onclick = function()
	{
		//alert(this.getAttribute("data-color"));
		var points = findAllCellByColor(this, this.getAttribute("data-color"));
	}
	document.body.appendChild(canvas2);
	
	fill_global_arr_objects();
	var result = findImageDataInArrObjects( global_arr_objects, imgData.data );
	if(result!=null)
	{
		var color = getRndColor();
		canvas2.setAttribute("data-color", color);
		//alert(global_arr_objects[result].points);	
		for(var i=0;i<global_arr_objects[result].points.length;i++)
		{
			var p = global_arr_objects[result].points[i];
			context.fillStyle = color;
			context.fillRect(p[0],p[1],global_seed_size,global_seed_size);
			
			
		}
	}
	
	e.preventDefault();
	
	*****/
	
}

function inGalerkaNotExist(imgData)
{
	/****
	var list = document.getElementsByTagName("CANVAS");
	for(var i=0;i<list.length;i++)
	{
		if(  (""+list[i].id).indexOf("galerka")==-1  ) continue; 
		
		var imgDataGalerka = list[i].getContext("2d").getImageData(0,0,list[i].width, list[i].height);
		
		if( free_image_equal(imgData.data, imgDataGalerka.data) == true ) return false;
		
		
	}
	****/
	return true;
	
}

function findAllGalerkaCanvas(imgData)
{
	var arr = [];
	var list = document.getElementsByTagName("CANVAS");
	for(var i=0;i<list.length;i++)
	{
		if(  (""+list[i].id).indexOf("galerka")==-1  ) continue; 
		
		var imgDataGalerka = list[i].getContext("2d").getImageData(0,0,list[i].width, list[i].height);
		
		if( free_image_equal(imgData.data, imgDataGalerka.data) == true ) { arr.push( list[i] ); }
		
		
	}
	
	return arr;
	
}


function findGalerkaCanvas(imgData)
{
	
	var list = document.getElementsByTagName("CANVAS");
	for(var i=0;i<list.length;i++)
	{
		if(  (""+list[i].id).indexOf("galerka")==-1  ) continue; 
		
		var imgDataGalerka = list[i].getContext("2d").getImageData(0,0,list[i].width, list[i].height);
		
		if( free_image_equal(imgData.data, imgDataGalerka.data) == true ) return list[i];
		
		
	}
	
	return null;
	
}

function rem_whenUserClickedGalerka(e)
{
	
	e.preventDefault();
	
	//if(checkSideswidthHeight()==false) return;
		
	//put_pattern_to_buffer();
	
	var rb = document.querySelector('input[name="flags"]:checked').value;
	if(rb == "jump" || rb == "pack") //только на поле
	{
		
		{
			var obj =  get_selected_object(e);
			if(document.getElementById("qflag1").checked == true )
				{
					var result = jump_all_back( obj, get_allowed_jump_back(obj) );
					
					
						
					
				}
				else
				{
					
			var result = jump_back(obj, get_allowed_jump_back(obj));
				}
			if(result == -1)  randomize();
			else sound();
			
			if(is_game_finished() == true) finish_game();
			
			global_last_selected_object = null;//obj;
		}
	
		return;
	
	} 
	
	randomize();
	
	return;

			
	e = (e) ? e : event;   
	if(e.button == 0)
	{
		
		
		/******
		if(global_galerka_selected != null)
		{
			
			var rb = document.querySelector('input[name="flags"]:checked').value;	
			if(rb == "remove") 
			{ 
				var galerka_selected_now = e.target.id;
				
				var gc = document.getElementById(global_galerka_selected);
				
				if(gc!=null)
				{
					
					
					var gtx = gc.getContext("2d");
					var imgData = gtx.getImageData(0,0, gc.width, gc.height); //galerka image data
				
					var gc2 = document.getElementById(galerka_selected_now);
					if(gc2 !=null)
					{
						var gtx2 = gc2.getContext("2d");
						var imgData2 = gtx2.getImageData(0,0, gc2.width, gc2.height); //galerka image data
						
						if(free_image_equal(imgData.data, imgData2.data)==true)
						{
							//do svertivanie
							document.getElementById("seeds").removeChild(gc);
							
							first_click = false;
							second_click = false;
			
							return;
						}
					}
				
					
				}
				
			}	
			
			
		}
		********/
		
		
		removeGhost();
		clearAll();
		fill_global_arr_objects();
		global_galerka_selected = e.target.id;
	
			var rb = document.querySelector('input[name="flags"]:checked').value;	
			if(rb == "remove") 
			{ 
		
		
				
				var gc = document.getElementById(global_galerka_selected);
				if(gc!=null)
				{
					var gtx = gc.getContext("2d");
					var imgData = gtx.getImageData(0,0, gc.width, gc.height); //galerka image data
				
					if(isAllPointsSame(imgData.data)==true)
					{
						//do svertivanie
						document.getElementById("seeds").removeChild(gc);
						
						first_click = false;
						second_click = false;
		
						return;
					}
					
					
				}
			
		
			}
		
		
		
		first_click = true;
		second_click = false;
		
		
		
		
		
		/*******
		
		if( global_red_ghost != null && global_first_seed_image_data != null )
		{
			global_galerka_selected = e.target.id;
			
			
			var rb = document.querySelector('input[name="flags"]:checked').value;	
			if(rb == "change") 
			{ 
				var gc = document.getElementById(global_galerka_selected);
				var gtx = gc.getContext("2d");
				var imgData2 = gtx.getImageData(0,0, gc.width, gc.height); //galerka image data
				
					
					
					var canvas = document.getElementById("left_canvas");
					var context = canvas.getContext("2d");
					
					var n = global_red_ghost[0];
					var m = global_red_ghost[1];
					
					
					var tCanvas = document.createElement("canvas");
					tCanvas.width = global_seed_size;
					tCanvas.height = global_seed_size;
					var tContext = tCanvas.getContext("2d");
					tContext.putImageData(global_first_seed_image_data,0,0);
					var tImgData = tContext.getImageData(0,0,tCanvas.width,tCanvas.height);
					
					
					
					context.putImageData( imgData2, n*global_seed_size, m*global_seed_size );
					
					//context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
					
					if( free_image_equal(tImgData.data,imgData2.data) == true )
					{
						//do svertivanie
						document.getElementById("seeds").removeChild(gc);
						return;
					}
					
					
					///var tImgData1 = cloneUnrealImageData(n,m,imgData);
					
					if(inGalerkaNotExist(tImgData)) addInGalerka(tImgData)
					
					first_click = false;
					second_click = false;
					
					global_red_ghost = null;
				
	
				
			}
			else if(rb == "exchange") 
			{ 
				alert('not implemented whenUserClickedGalerka 7');
				//exchangeGalerka(e); 
				
			}
			
			
			
			//removeGhost();
			
			//clearAll();
			
			//fill_global_arr_objects();
			
			
		}
		else
		{
		
		
		}
		
		
		
		
		********/
		
		
		
		
		
		
		
		
		
		
		
		//alert('test ok '+global_galerka_selected);
	}
	else if( e.button==2) 
	{
		/*****
		var x = e.offsetX==undefined?e.layerX:e.offsetX;
		var y = e.offsetY==undefined?e.layerY:e.offsetY;
		
		
		var n = (x/global_seed_size|0);//-tw;
		var m = (y/global_seed_size|0);//-th;
		
		console.log("x="+x+" y="+y);
		console.log("n="+n+" m="+m);
		
		return [x,y,n,m];
		*****/
		
	}
	/******
	global_selected_seed = get_selected_seed(e);
		
		var canvas = document.getElementById("left_canvas");
		var context = canvas.getContext("2d");
		var n = global_selected_seed[2];
		var m = global_selected_seed[3];
		
		var imgData2 = context.getImageData( n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
		
		var imgData = global_bottom_selected.getContext("2d").getImageData(0,0,global_seed_size,global_seed_size);
		
		context.putImageData(imgData, n*global_seed_size,m*global_seed_size);
		
		global_bottom_selected.getContext("2d").putImageData(imgData2, 0, 0);
		
	*****/	
	
}

function removeGalerka(e)
{
	//global_red_ghost=null;
	alert('not implemented removeGalerka');
}



function set(e)
{
	alert('Not implemented');
	console.log('Not implemented');
	return -1;
	
	if(global_first_seed_image_data != null)	
	{
		//alert('test exch ok');
		
		//change can be with galerka
		
		var second_selected_seed = get_selected_seed(e);
		if(second_selected_seed == null) return;	
	
		var canvas = document.getElementById("left_canvas");
		var context = canvas.getContext("2d");
		//alert('test exch ok #2');
		var n2 = second_selected_seed[2];
		var m2 = second_selected_seed[3];
		
		
		
		
		
		var n = global_selected_seed[2];
		var m = global_selected_seed[3];
		
		
		if(n2 < n-1 || n2 > n+1) 
		{
			removeGhost();
			return -1;
		}
		
		if(m2 < m-1 || m2 > m+1) 
		{
			removeGhost();
			return -1;
		}
		
		
		
		/*****
		if(n==n2 && m==m2) 
		{
			context.putImageData(global_first_seed_image_data,n2*global_seed_size,m2*global_seed_size);
			
			global_red_ghost=null;
			//alert('test == ok');
			return -1;
		}
		******/
		
		var imgData2 = context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
		
		if(isAllPointsSame(imgData2.data)==true)
		{
			
			
			
			
			var arr = findAllCellByImgData(imgData2);
		
		if(arr.length > 1)
		{
		


			var tImgData1 = global_first_seed_image_data;//context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
			
			
			
			var tImgData2 = cloneUnrealImageData(n2,m2,imgData2);
			///var tImgData1 = cloneUnrealImageData(n,m,imgData);
			
			//if(inGalerkaNotExist(tImgData2)) addInGalerka(tImgData2);
			
			//510 red
			context.putImageData(tImgData1,n2*global_seed_size,m2*global_seed_size);  //2 <= 1   1<=tim   2?
			
			//context.putImageData(tImgData2,n*global_seed_size,m*global_seed_size);
			
			//context.putImageData(tImgData,n2*global_seed_size,m2*global_seed_size);
			
			
			removeGhost();
		
		


			return;


		
		}
		
		/****
		if (inGalerkaNotExist(imgData2) == true )
		{
			var tImgData2 = cloneUnrealImageData(n2,m2,imgData2);
			 addInGalerka(tImgData2);
			 
			 
			 
			 
			 
			 
			 
			 
		}
		
		***/
		var tImgData1 = global_first_seed_image_data;//context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
			
			
			
			var tImgData2 = cloneUnrealImageData(n2,m2,imgData2);
			///var tImgData1 = cloneUnrealImageData(n,m,imgData);
			
			//if(inGalerkaNotExist(tImgData2)) addInGalerka(tImgData2);
			
			//510 red
			context.putImageData(tImgData1,n2*global_seed_size,m2*global_seed_size);  //2 <= 1   1<=tim   2?
			
			//context.putImageData(tImgData2,n*global_seed_size,m*global_seed_size);
			
			//context.putImageData(tImgData,n2*global_seed_size,m2*global_seed_size);
			
			
			removeGhost();
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		}
		else
		{
		
		var arr = findAllCellByImgData(imgData2);
		
		if((arr.length > 1) || (inGalerkaNotExist(imgData2) == false ))
		{
		


			var tImgData1 = global_first_seed_image_data;//context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
			
			
			
			var tImgData2 = cloneUnrealImageData(n2,m2,imgData2);
			///var tImgData1 = cloneUnrealImageData(n,m,imgData);
			
			//if(inGalerkaNotExist(tImgData2)) addInGalerka(tImgData2);
			
			//510 red
			context.putImageData(tImgData1,n2*global_seed_size,m2*global_seed_size);  //2 <= 1   1<=tim   2?
			
			//context.putImageData(tImgData2,n*global_seed_size,m*global_seed_size);
			
			//context.putImageData(tImgData,n2*global_seed_size,m2*global_seed_size);
			
			
			removeGhost();
		
		


			return;


		
		}
		
		if (inGalerkaNotExist(imgData2) == true )
		{
			var tImgData2 = cloneUnrealImageData(n2,m2,imgData2);
			 addInGalerka(tImgData2);
			 
			 
			 
			 
			 
			 
			 
			 
		}
		
		
		var tImgData1 = global_first_seed_image_data;//context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
			
			
			
			var tImgData2 = cloneUnrealImageData(n2,m2,imgData2);
			///var tImgData1 = cloneUnrealImageData(n,m,imgData);
			
			//if(inGalerkaNotExist(tImgData2)) addInGalerka(tImgData2);
			
			//510 red
			context.putImageData(tImgData1,n2*global_seed_size,m2*global_seed_size);  //2 <= 1   1<=tim   2?
			
			//context.putImageData(tImgData2,n*global_seed_size,m*global_seed_size);
			
			//context.putImageData(tImgData,n2*global_seed_size,m2*global_seed_size);
			
			
			removeGhost();
		
		
		}
		
		
		
	}	
	
}

function whenUserDblClickOnLeftCanvas(e)
{
	e.preventDefault();
	e.cancelBubble=true;
	e.stopPropagation();
	
	return false;
}


function change(e)
{
	if(global_first_seed_image_data != null)	
	{
		//alert('test exch ok');
		
		//change can be with galerka
		
		var second_selected_seed = get_selected_seed(e);
		if(second_selected_seed == null) return;	
	
		var canvas = document.getElementById("left_canvas");
		var context = canvas.getContext("2d");
		//alert('test exch ok #2');
		var n2 = second_selected_seed[2];
		var m2 = second_selected_seed[3];
		
		var n = global_selected_seed[2];
		var m = global_selected_seed[3];
		
		if(n==n2 && m==m2) 
		{
			context.putImageData(global_first_seed_image_data,n2*global_seed_size,m2*global_seed_size);
			
			global_red_ghost=null;
			//alert('test == ok');
			return -1;
		}
		
		var tImgData1 = global_first_seed_image_data;//context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
		
		var imgData2 = context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
		
		var tImgData2 = cloneUnrealImageData(n2,m2,imgData2);
		///var tImgData1 = cloneUnrealImageData(n,m,imgData);
		
		addImgDataToGalerka(n2,m2,tImgData2);
		
		
		//510 red
		context.putImageData(tImgData1,n2*global_seed_size,m2*global_seed_size);  //2 <= 1   1<=tim   2?
		
		//context.putImageData(tImgData2,n*global_seed_size,m*global_seed_size);
		
		//context.putImageData(tImgData,n2*global_seed_size,m2*global_seed_size);
				
		//do red cancel
		context.putImageData(global_first_seed_image_data,n*global_seed_size,m*global_seed_size);
		
		global_red_ghost=null;
		
		//removeGhost();
		
	}	
	
}

function getColoredSpecialCanvasImgData()
{
	var canvas = document.getElementById("center_canvas");
	
	//var ctx = canvas2.getContext("2d");
	//ctx.putImageData(imgData0, 0,0);
	
	var canvas2 = document.createElement("canvas");
	canvas2.width = canvas.width;
	canvas2.height = canvas.height;
	var ctx2 = canvas2.getContext("2d");
	
	//yjglh
	
	for(var j=0;j<canvas2.height;j+= global_seed_size)
	{
		for(var i=0;i<canvas2.width;i+= global_seed_size)
		{
			var n = i/global_seed_size;
			var m = j/global_seed_size;
			
			ctx2.fillStyle = glob_colored_special_arr[ findNMinColoredSpecial(n,m) ].color;
			ctx2.fillRect(n*global_seed_size,m*global_seed_size, global_seed_size, global_seed_size);
			
			
		}
	}
	
	return ctx2.getImageData(0,0,canvas2.width, canvas2.height);
	
}

function changeGalerkaPack(e)
{
	if(global_galerka_selected != null)
	{
		var gc = document.getElementById(global_galerka_selected);
		var gtx = gc.getContext("2d");
		global_first_seed_image_data = gtx.getImageData(0,0, gc.width, gc.height);
		
		
		
		
		if(global_first_seed_image_data != null)	
		{
		
			if(isAllPointsSame(global_first_seed_image_data.data)==true)
			{
				//do svertivanie
				document.getElementById("seeds").removeChild(gc);
				return;
			}

			var second_selected_seed = get_selected_seed(e);
			if(second_selected_seed == null) return;	
		
			var canvas = document.getElementById("left_canvas");
			var context = canvas.getContext("2d");
			//alert('test exch ok #2');
			var n2 = second_selected_seed[2];
			var m2 = second_selected_seed[3];
			
			var tImgData1 = global_first_seed_image_data;//context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
			
			var imgData2 = context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
			
			
			if( free_image_equal(tImgData1.data,imgData2.data) == true )
			{
						//do svertivanie
						document.getElementById("seeds").removeChild(gc);
						
					//if( free_image_equal(tImgData1.data,imgData2.data) == true )
					//{
						//do svertivanie
					//	document.getElementById("seeds").removeChild(gc);
					//	return;
					///}
					
					//var tImgData2 = cloneUnrealImageData(n2,m2,imgData2);
					///var tImgData1 = cloneUnrealImageData(n,m,imgData);
					
					//if(inGalerkaNotExist(tImgData2)) addInGalerka(tImgData2)
						
					//context.putImageData(global_first_seed_image_data,n2*global_seed_size,m2*global_seed_size);
					
					//global_first_seed_image_data=null;
					
					//document.getElementById("seeds").removeChild(gc);
			}
		}	
	}
	
}

function changeGalerka(e)
{
	alert('Not implemented');
	console.log('Not implemented');
	return -1;
	
	if(global_galerka_selected != null)
	{
		var gc = document.getElementById(global_galerka_selected);
		var gtx = gc.getContext("2d");
		global_first_seed_image_data = gtx.getImageData(0,0, gc.width, gc.height);
		if(global_first_seed_image_data != null)	
		{
			
			var second_selected_seed = get_selected_seed(e);
			if(second_selected_seed == null) return;	
		
			var canvas = document.getElementById("left_canvas");
			var context = canvas.getContext("2d");
			//alert('test exch ok #2');
			var n2 = second_selected_seed[2];
			var m2 = second_selected_seed[3];
			
			var tImgData1 = global_first_seed_image_data;//context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
			
			var imgData2 = context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
			
			if(isAllPointsSame(imgData2.data)==true)
			{
				//if( free_image_equal(tImgData1.data,imgData2.data) == true )
				//{
					//do svertivanie
				//	document.getElementById("seeds").removeChild(gc);
				//	return;
				///}
				
				//var tImgData2 = cloneUnrealImageData(n2,m2,imgData2);
				///var tImgData1 = cloneUnrealImageData(n,m,imgData);
				
				//if(inGalerkaNotExist(tImgData2)) addInGalerka(tImgData2)
					
				context.putImageData(global_first_seed_image_data,n2*global_seed_size,m2*global_seed_size);
				
				global_first_seed_image_data=null;
				
				document.getElementById("seeds").removeChild(gc);

			}
			else
			{
			
				//if( free_image_equal(tImgData1.data,imgData2.data) == true )
				//{
					//do svertivanie
				//	document.getElementById("seeds").removeChild(gc);
				//	return;
				///}
				
				var tImgData2 = cloneUnrealImageData(n2,m2,imgData2);
				///var tImgData1 = cloneUnrealImageData(n,m,imgData);
				
				addImgDataToGalerka(n2,m2,tImgData2);
				
				
				//if(inGalerkaNotExist(tImgData2)) addInGalerka(tImgData2)
					
				context.putImageData(global_first_seed_image_data,n2*global_seed_size,m2*global_seed_size);
				
				global_first_seed_image_data=null;
				
				document.getElementById("seeds").removeChild(gc);
			
			}
			
		}	
	}
	
}



function addImgDataToGalerka(n,m,imgData)
{
	//var color = findColorOnGalerka(imgData);
	//if(color==null) color = getSeedColor(n,m);
	var color = getMappedColor(n,m); //getUnderSeedColor(n,m);
	if(inGalerkaNotExist(imgData) && isAllPointsSame(imgData.data)==false) return addInGalerka(null,color,imgData);
	return null;
	
}

function getKardsQuantity()
{
	if(glob_koloda == null) return false;
	if( findFirstNotNullIndex() == -10) return 0; 
	return false;
	
}

function exchange(e)
{
	if(global_first_seed_image_data != null)	
	{
		//alert('test exch ok');
		
		//exchange can be with galerka
		
		var second_selected_seed = get_selected_seed(e);
		if(second_selected_seed == null) return;	
	
		var canvas = document.getElementById("left_canvas");
		var context = canvas.getContext("2d");
		//alert('test exch ok #2');
		var n2 = second_selected_seed[2];
		var m2 = second_selected_seed[3];
		
		var n = global_selected_seed[2];
		var m = global_selected_seed[3];
		
		if(n==n2 && m==m2) 
		{
			context.putImageData(global_first_seed_image_data,n2*global_seed_size,m2*global_seed_size);
			//alert('test == ok');
			
			global_red_ghost = null;
			
			return -1;
		}
		
		if(n2 < n-1 || n2 > n+1) 
		{
			removeGhost();
			return -1;
		}
		
		if(m2 < m-1 || m2 > m+1) 
		{
			removeGhost();
			return -1;
		}
		
		
		if( document.getElementById("qflag1").checked == true )
		{
		
			//alert('test ok');
			//return;
			
			
			var result = findAllCellByImgData( global_first_seed_image_data );
			if(result!=null)
			{
				
				var imgData2 = context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
				
				var result2 = findAllCellByImgData( imgData2 );
				if(result2!=null)
				{
					
					/******/
					console.log(result);
					
					console.log(result2);
					
					return;
					
					
				}
				
				/********
				var color = getSeedColor(n,m);
				//canvas2.setAttribute("data-color", color);
				//alert(global_arr_objects[result].points);	
				for(var i=0;i<global_arr_objects[result].points.length;i++)
				{
					var p = global_arr_objects[result].points[i];
					context.fillStyle = color;
					context.fillRect(p[0],p[1],global_seed_size,global_seed_size);
					
					
				}
				********/
			}
				
			
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		var tImgData1 = global_first_seed_image_data;//context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
		
		var imgData2 = context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
		
		var tImgData2 = cloneUnrealImageData(n2,m2,imgData2);
		///var tImgData1 = cloneUnrealImageData(n,m,imgData);
		
		//510 red
		context.putImageData(tImgData1,n2*global_seed_size,m2*global_seed_size);  //2 <= 1   1<=tim   2?
		
		context.putImageData(tImgData2,n*global_seed_size,m*global_seed_size);
		
		global_red_ghost = null;
		
	}	
	
}



function exchangeGalerka(e)
{
	if(global_galerka_selected != null)
	{
		var gc = document.getElementById(global_galerka_selected);
		var gtx = gc.getContext("2d");
		global_first_seed_image_data = gtx.getImageData(0,0, gc.width, gc.height);
		
		if(global_first_seed_image_data != null)	
		{
			//alert('test exch ok');
			
			//exchange can be with galerka
			
			var second_selected_seed = get_selected_seed(e);
			if(second_selected_seed == null) return;	
		
			var canvas = document.getElementById("left_canvas");
			var context = canvas.getContext("2d");
			//alert('test exch ok #2');
			var n2 = second_selected_seed[2];
			var m2 = second_selected_seed[3];
			
			
			
			var tImgData1 = global_first_seed_image_data;//context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
			
			var imgData2 = context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
			
			var tImgData2 = cloneUnrealImageData(n2,m2,imgData2);
			///var tImgData1 = cloneUnrealImageData(n,m,imgData);
			
			//510 red
			context.putImageData(tImgData1,n2*global_seed_size,m2*global_seed_size);  //2 <= 1   1<=tim   2?
			
			addImgDataToGalerka(n2,m2,tImgData2);
			
									
			
			removeGhost();
			
			document.getElementById("seeds").removeChild(gc);
			
		}	
	}
}


function cloneUnrealImageData(n,m,imgData)
{
	/********
	var second_selected_seed = get_selected_seed(e);
	if(second_selected_seed == null) return;	
	var n = second_selected_seed[2];
	var m = second_selected_seed[3];
	*******/
	
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var imgData0 = context.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
	
	var canvas2 = document.createElement("canvas");
	canvas2.width = global_seed_size;
	canvas2.height = global_seed_size;
	var ctx = canvas2.getContext("2d");
	ctx.putImageData(imgData0, 0,0);
	
	return ctx.getImageData(0,0,global_seed_size,global_seed_size);
	
		
}	

var global_game_finished = false;
function is_game_finished()
{
	if(global_game_finished) return true;
	
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var imgData0 = context.getImageData(0,0,canvas.width, canvas.height);
	
	var rcanvas = document.getElementById("right_canvas");
	var rcontext = rcanvas.getContext("2d");
	var imgData1 = rcontext.getImageData(0,0,rcanvas.width, rcanvas.height);
	
	var ccanvas = document.getElementById("center_canvas");
	var ccontext = ccanvas.getContext("2d");
	var imgData4 = ccontext.getImageData(0,0,ccanvas.width, ccanvas.height);
	
	var imgData3 = getColoredSpecialCanvasImgData();
	
	if((free_image_equal(imgData0.data,imgData1.data)==true) && (free_image_equal(imgData3.data,imgData4.data)==true) && (getGalerkaCanvasNumber()==0) &&(getKardsQuantity()==0)) 
	{ 
		global_game_finished = true;
		return true;
	}
	
	global_game_finished = false;
	return false;
}

function finish_game()
{
	arr_gun = null;
	arr_gun = [];
	
	var myNode = document.getElementById("magik_line0");
		if(myNode != null)
		{
			while (myNode.firstChild) {
				myNode.removeChild(myNode.firstChild);
			}
		}
		
	setTimeout( function() {
	alert('Well done, commander!');
	
	soundMurlMurl();
	}, 1000);
	
}

function is_game_lost()
{
	var num = getGalerkaCanvasNumber();
	if(num==0) return false;
	for(var n=0;n<num;n++)
	{
		var gc = document.getElementById("galerka_"+n);
		if(gc != null)
		{
			var ctx = gc.getContext("2d");
			var imgData = ctx.getImageData(0,0,gc.width,gc.height);
			if(isAllPointsSame(imgData.data)==false) return false;
		}
	}
	return true;
}

function lost_game()
{
	alert('Sorry! Game lost! Try again');
}

function is_this_pattern_repeated()
{
	return false; //TODO
}
/**** check for victory, or may be flawless victory? with new patterns in ***/
function matrixmove()
{
	
	//check on is game finished?
	if(is_game_finished() == true) finish_game();
	/*****
	else if(is_game_lost() == true) lost_game();
	else if(is_this_pattern_repeated() == true) ctrlz();
	
	//check on this situation repeated? if true ctrl-z
	*****/
}	

function copy(e)
{
	
	if(global_red_ghost!=null)
	{
		if(global_first_seed_image_data != null)
		{
			//do red cancel
			context.putImageData(global_first_seed_image_data,n*global_seed_size,m*global_seed_size);
			
			global_red_ghost = null;
		}
		
		else clearAll();
		
		
		
	}
	
	if(global_red_ghost==null)
	{
		global_selected_seed = get_selected_seed(e);
		var n = global_selected_seed[2];
		var m = global_selected_seed[3];
		
		var canvas = document.getElementById("left_canvas");
		var context = canvas.getContext("2d");
		
		global_first_seed_image_data = context.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
		
		if(inGalerkaNotExist(global_first_seed_image_data)==true)	addInGalerka(global_first_seed_image_data);
		
		return -1;
	}
}

function whenUserFirstLeftClickOnLeftCanvas(e)
{
			
	
		
	
	
	var rb = document.querySelector('input[name="flags"]:checked').value;
	
	
		
		if(rb == "remove") 
		{ 
			
			if( document.getElementById("qflag1").checked == true ) 
			{
				allSameToOneColor(e);
			
			}
			else
			{
			
				remove(e); 
				
				
					
			}
			
			return -1;
			
		}
		else if(rb == "copy"	)
		{
			return copy(e);
		}
		else if( rb == "double" )
		{
			return copy(e);
		}
	
		else
		{
			global_selected_seed = get_selected_seed(e);
		
			if(global_red_ghost==null) highlight();
		
		}
		//put_one_seed_into_right_canvas();
	
		//SECOND CLICK
		/*****
		var second_selected_seed = get_selected_seed(e);
		if(second_selected_seed == null) return;	
	
		var canvas = document.getElementById("left_canvas");
		var context = canvas.getContext("2d");
		//alert('test exch ok #2');
		var n2 = second_selected_seed[2];
		var m2 = second_selected_seed[3];
		
		var n = global_selected_seed[2];
		var m = global_selected_seed[3];
		
		if(n==n2 && m==m2) 
		{
			//do red cancel
			context.putImageData(global_first_seed_image_data,n*global_seed_size,m*global_seed_size);
			
			global_red_ghost = null;
			
			return;
			
		}
		else
		{
			//put_one_seed_into_right_canvas(); //zmey za hvost sebya kusaet 
		
		//var second_seed = get_selected_seed(e);
			if( document.getElementById("qflag1").checked == true )
			{
				exchange(e); // if quantor all checked
				clearAll();
				return;
				
				//alert('Not implemented 2');
				//return;
				
				//allSameToOneColor(e);
					
				
				//e.preventDefault();
						
				
				//return;
			}
		
			var rb = document.querySelector('input[name="flags"]:checked').value;
			if(rb == "change") 
			{ 
				change(e); 
				global_selected_seed = null; 
				//do red cancel
				//context.putImageData(global_first_seed_image_data,n*global_seed_size,m*global_seed_size);
				return; 
			}
			else if(rb == "exchange") 
			{ 
				exchange(e); 
				global_selected_seed = null; 
				return; 
			}
			
			//fill_right_canvas( second_seed );
			
			
		}
		
		
		if ( global_red_ghost!=null )
		{
			
			//do red cancel
			context.putImageData(global_first_seed_image_data,n*global_seed_size,m*global_seed_size);
			
			//and now we do red on n2 m2
			global_selected_seed = second_selected_seed;
			
			highlight();
			
		
			
		}
		
		*******/
		
	
	
	
	
	/*******/
	
	// matrixmove();
}

function cloneImageData(imgData)
{
	var tCanvas = document.createElement("canvas");
	tCanvas.width = global_seed_size;
	tCanvas.height = global_seed_size;
	var tContext = tCanvas.getContext("2d");
	tContext.putImageData(imgData,0,0);
	return tContext.getImageData(0,0,tCanvas.width,tCanvas.height);			
}

function exchangeAll(e)
{
	if( global_first_seed_image_data != null) 
	{
		
		var second_selected_seed = get_selected_seed(e);
		if(second_selected_seed == null) return;	
	
		var canvas = document.getElementById("left_canvas");
		var context = canvas.getContext("2d");
		
		//alert('test exch ok #2');
		
		var n2 = second_selected_seed[2];
		var m2 = second_selected_seed[3];
		
		//remove ghost
		var nn = global_selected_seed[2];
		var mm = global_selected_seed[3];
						
		context.putImageData(global_first_seed_image_data,nn*global_seed_size,mm*global_seed_size);
					
		global_red_ghost = null;
		
		
	
			var result = findAllCellByImgData( global_first_seed_image_data );
			if(result!=null)
			{
				
				var imgData2 = context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
				
				var result2 = findAllCellByImgData( imgData2 );
				if(result2!=null)
				{
					
					
					
					/******/
					//console.log(result);
					
					//console.log(result2);
					
					var n1 = result[0][0]; 
					var m1 = result[0][1];
					var imgData1 = context.getImageData(n1*global_seed_size,m1*global_seed_size,global_seed_size,global_seed_size);
					
					var n2 = result2[0][0]; 
					var m2 = result2[0][1];
					var imgData2 = context.getImageData( n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size );
					var tImgData = cloneImageData( imgData2); 
					

					
					for(var j=0;j<result2.length;j++)
					{
						n2 = result2[j][0]; 
						m2 = result2[j][1]; 
						context.putImageData(imgData1,n2*global_seed_size,m2*global_seed_size);
							
					}
					
					
						for(var i =0;i<result.length;i++)
						{
							n1 = result[i][0]; 
							m1 = result[i][1]; 
							context.putImageData(tImgData,n1*global_seed_size,m1*global_seed_size);
							
							
							
						}
					
					
					
					 
					
				}
				
				/********
				var color = getSeedColor(n,m);
				//canvas2.setAttribute("data-color", color);
				//alert(global_arr_objects[result].points);	
				for(var i=0;i<global_arr_objects[result].points.length;i++)
				{
					var p = global_arr_objects[result].points[i];
					context.fillStyle = color;
					context.fillRect(p[0],p[1],global_seed_size,global_seed_size);
					
					
				}
				********/
			}
	}
	else
	{
		alert('not implemented exchange all');
		return -1;
	}
}

function removeAll(e)
{
	alert('not implemented remove all');
	return -1;
}

function changeAll(e)
{
	
	alert('Not implemented');
	console.log('Not implemented');
	return -1;
	
	removeGhost();
	
	
	if(global_first_seed_image_data != null)
	{
		
		
		
		var cloned_image_data = null;
		
		
		//var canvas = document.getElementById("left_canvas");
		//var context = canvas.getContext("2d");
		//var imgData0 = context.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
		
		/****
		var canvas2 = document.createElement("canvas");
		canvas2.width = gc.width;
		canvas2.height = gc.height;
		var ctx2 = canvas2.getContext("2d");
		ctx2.putImageData(global_first_seed_image_data, 0,0);
		
		cloned_image_data = ctx2.getImageData(0,0,canvas2.width, canvas2.height);
		*****/
		
		var second_selected_seed = get_selected_seed(e);
		if(second_selected_seed == null) return;	
	
		var canvas = document.getElementById("left_canvas");
		var context = canvas.getContext("2d");
		
		//alert('test exch ok #2');
		
		var n2 = second_selected_seed[2];
		var m2 = second_selected_seed[3];
		
		var second_seed_image_data = context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
		
		addImgDataToGalerka(n2,m2,second_seed_image_data);
		
			var result = findAllCellByImgData( second_seed_image_data );
			if(result!=null) //result = [n,m]+
			{
			
						for(var i =0;i<result.length;i++)
						{
							n1 = result[i][0]; 
							m1 = result[i][1]; 
							context.putImageData(global_first_seed_image_data,n1*global_seed_size,m1*global_seed_size);
							
							
							
						}
						
				/*******
				var imgData2 = context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
				
				var result2 = findAllCellByImgData( imgData2 );
				if(result2!=null)
				{
					
					
					
					
					console.log(result);
					
					console.log(result2);
					
					var imgData1 = null;
					var tImgData = null;
					
					if(result.length>0)
					{
					
					var n1 = result[0][0]; 
					var m1 = result[0][1];
					imgData1 = context.getImageData(n1*global_seed_size,m1*global_seed_size,global_seed_size,global_seed_size);
					}
					else
					{
					imgData1 = global_first_seed_image_data;	
					}
					
					
					if(result2.length>0)
					{
					
					var n2 = result2[0][0]; 
					var m2 = result2[0][1];
					imgData2 = context.getImageData( n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size );
					
					}
					tImgData = cloneImageData( imgData2); 

					
					for(var j=0;j<result2.length;j++)
					{
						n2 = result2[j][0]; 
						m2 = result2[j][1]; 
						context.putImageData(imgData1,n2*global_seed_size,m2*global_seed_size);
							
					}
					
					
						for(var i =0;i<result.length;i++)
						{
							n1 = result[i][0]; 
							m1 = result[i][1]; 
							context.putImageData(tImgData,n1*global_seed_size,m1*global_seed_size);
							
							
							
						}
					
					
					
					 
					
				}
				
				/********
				var color = getSeedColor(n,m);
				//canvas2.setAttribute("data-color", color);
				//alert(global_arr_objects[result].points);	
				for(var i=0;i<global_arr_objects[result].points.length;i++)
				{
					var p = global_arr_objects[result].points[i];
					context.fillStyle = color;
					context.fillRect(p[0],p[1],global_seed_size,global_seed_size);
					
					
				}
				********/
			}
			
			/****
			while(true)
			{
				var cnv = findGalerkaCanvas(cloned_image_data);
				if(cnv == null) break;
				document.getElementById("seeds").removeChild(cnv);
				
			}
			********/
			
			
	}
	else
	{
		alert('this not implemented in changeAll');
		return -1;
	}
	
}

function changeAllFromGalerka(e)
{
	alert('Not implemented');
	console.log('Not implemented');
	return -1;
	
	removeGhost();
	
	//get from galerka
	if(global_galerka_selected != null)
	{
		
		var gc = document.getElementById(global_galerka_selected);
		var gtx = gc.getContext("2d");
		global_first_seed_image_data = gtx.getImageData(0,0, gc.width, gc.height);
		
		var cloned_image_data = null;
		
		
		//var canvas = document.getElementById("left_canvas");
		//var context = canvas.getContext("2d");
		//var imgData0 = context.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
		
		var canvas2 = document.createElement("canvas");
		canvas2.width = gc.width;
		canvas2.height = gc.height;
		var ctx2 = canvas2.getContext("2d");
		ctx2.putImageData(global_first_seed_image_data, 0,0);
		
		cloned_image_data = ctx2.getImageData(0,0,canvas2.width, canvas2.height);
	
		
		var second_selected_seed = get_selected_seed(e);
		if(second_selected_seed == null) return;	
	
		var canvas = document.getElementById("left_canvas");
		var context = canvas.getContext("2d");
		
		//alert('test exch ok #2');
		
		var n2 = second_selected_seed[2];
		var m2 = second_selected_seed[3];
		
		var second_seed_image_data = context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
		
		addImgDataToGalerka(n2,m2,second_seed_image_data);
		
		
	
	
			var result = findAllCellByImgData( second_seed_image_data );
			if(result!=null) //result = [n,m]+
			{
			
						for(var i =0;i<result.length;i++)
						{
							n1 = result[i][0]; 
							m1 = result[i][1]; 
							context.putImageData(cloned_image_data,n1*global_seed_size,m1*global_seed_size);
							
							
							
						}
						
				/*******
				var imgData2 = context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
				
				var result2 = findAllCellByImgData( imgData2 );
				if(result2!=null)
				{
					
					
					
					
					console.log(result);
					
					console.log(result2);
					
					var imgData1 = null;
					var tImgData = null;
					
					if(result.length>0)
					{
					
					var n1 = result[0][0]; 
					var m1 = result[0][1];
					imgData1 = context.getImageData(n1*global_seed_size,m1*global_seed_size,global_seed_size,global_seed_size);
					}
					else
					{
					imgData1 = global_first_seed_image_data;	
					}
					
					
					if(result2.length>0)
					{
					
					var n2 = result2[0][0]; 
					var m2 = result2[0][1];
					imgData2 = context.getImageData( n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size );
					
					}
					tImgData = cloneImageData( imgData2); 

					
					for(var j=0;j<result2.length;j++)
					{
						n2 = result2[j][0]; 
						m2 = result2[j][1]; 
						context.putImageData(imgData1,n2*global_seed_size,m2*global_seed_size);
							
					}
					
					
						for(var i =0;i<result.length;i++)
						{
							n1 = result[i][0]; 
							m1 = result[i][1]; 
							context.putImageData(tImgData,n1*global_seed_size,m1*global_seed_size);
							
							
							
						}
					
					
					
					 
					
				}
				
				/********
				var color = getSeedColor(n,m);
				//canvas2.setAttribute("data-color", color);
				//alert(global_arr_objects[result].points);	
				for(var i=0;i<global_arr_objects[result].points.length;i++)
				{
					var p = global_arr_objects[result].points[i];
					context.fillStyle = color;
					context.fillRect(p[0],p[1],global_seed_size,global_seed_size);
					
					
				}
				********/
			}
			
			
			
			while(true)
			{
				var cnv = findGalerkaCanvas(cloned_image_data);
				if(cnv == null) break;
				document.getElementById("seeds").removeChild(cnv);
				
			}
			
			
			
	}
	else
	{
		alert('not implemented exchange all');
		return -1;
	}
	
	
	
}
	
	
	
	
	


function whenUserSecondLeftClickOnLeftCanvas(e)
{

	var rb = document.querySelector('input[name="flags"]:checked').value;
	
	if( global_galerka_selected != null )
	{
		
			if( document.getElementById("qflag1").checked == true )
			{
				//alert('Not implemented 1');
				
				//get from galerka
				
				//get from e
				
				if(rb == 'set') 		changeAllFromGalerka(e);
				
				
				//allSameToOneColor(e);
					
				
				//e.preventDefault();
						
				
				//return;
			}
			else if(rb == "pack") 
			{ 
				changeGalerkaPack(e); 
				
			}
			else if(rb == "set") 
			{ 
				changeGalerka(e); 
				
			}
			else if(rb == "change") 
			{ 
				changeGalerka(e); 
				
			}
			else if(rb == "exchange") 
			{ 
				//exchangeGalerka(e); 
				
			}
		
		
	}
	
	
	//SECOND CLICK
	else if( global_first_seed_image_data != null  && global_selected_seed!= null )
	{
	
		var second_selected_seed = get_selected_seed(e);
		if(second_selected_seed == null) return;	
	
		var canvas = document.getElementById("left_canvas");
		var context = canvas.getContext("2d");
		
		//alert('test exch ok #2');
		
		var n2 = second_selected_seed[2];
		var m2 = second_selected_seed[3];
		
		var n = global_selected_seed[2];
		var m = global_selected_seed[3];
		
		if(n==n2 && m==m2) 
		{
			//do red cancel
			//context.putImageData(global_first_seed_image_data,n*global_seed_size,m*global_seed_size);
			
			//global_red_ghost = null;
			removeGhost();
			
		}
		
		
		else if( document.getElementById("qflag1").checked == true )
		{
				//exchange(e); // if quantor all checked
				
				//alert('not implemented 3');
				
				if(rb == "exchange") 
				{ 
					return exchangeAll(e); 
					
				}
				else if(rb == "change") 
				{ 
					return changeAll(e); 
					
				}
				else if(rb == "remove") 
				{ 
					return removeAll(e); 
					
				}
				else if(rb == 'set') 		return changeAll(e);
				
				
		}
		else
		{
	
			var rb = document.querySelector('input[name="flags"]:checked').value;
			if(rb == "change") 
			{ 
				change(e); 
							
				
				//do red cancel
				
				//context.putImageData(global_first_seed_image_data,n*global_seed_size,m*global_seed_size);
			
			}
			else if(rb == "set") 
			{ 
				set(e); 
								
			
			}
			else if(rb == "exchange") 
			{ 
				exchange(e); 
								
			
			}
			
			
			else if ( global_red_ghost != null )
			{
				
				//do red cancel
				context.putImageData(global_first_seed_image_data,n*global_seed_size,m*global_seed_size);
				
				clearAll();
				
				//and now we do red on n2 m2
				global_selected_seed = second_selected_seed;
				
				global_first_seed_image_data = context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
				
				highlight();
				
				return -1; 
				
			}
			
			
		}
			
			
	}
		

}

function removeGhost()
{
	if( global_red_ghost != null && global_first_seed_image_data != null && global_selected_seed!= null )
	{
		var n = global_selected_seed[2];
		var m = global_selected_seed[3];
			
		var canvas = document.getElementById("left_canvas");	
		var context = canvas.getContext("2d");
		context.putImageData(global_first_seed_image_data,n*global_seed_size,m*global_seed_size);
		
		global_red_ghost = null;
	}
	else if( global_red_ghost == null && global_first_seed_image_data == null && global_selected_seed == null )
	{
	}
	else
	{
		//alert('ne remuvitsya');
		console.log('ghost ne remuvitsya');
		console.log(''+global_red_ghost);
		console.log(''+global_selected_seed);
		console.log(''+global_first_seed_image_data);
		
		clearAll();
		global_red_ghost = null;
	}
}

function put_pattern_to_buffer()
{
	
}

function checkSideswidthHeight()
{
	var canvas = document.getElementById("left_canvas");
	if(canvas.width == canvas.height) return true;
	if(canvas.width>canvas.height)
	{
		if((canvas.width / canvas.height) - (canvas.width / canvas.height | 0) == 0 ) return true;
	}
	else if (canvas.width<canvas.height)
	{
		if((canvas.height / canvas.width ) - (canvas.height / canvas.width | 0) == 0 ) return true;
		
	}
	
	return false;
}

function get_selected_object(e)
{
	var obj =  {};
	obj.nm = get_selected_seed(e);
	obj.frm = e.target.id;
	return obj;
}

function rem_whenUserLeftClickOnLeftCanvas(e)
{
	
	e.preventDefault();
	
	var rb = document.querySelector('input[name="flags"]:checked').value;
	if( rb == "copy allowed" )	
	{
		
		if(e.target.id == "left_canvas")
		{
			glob_canvas_selected = "left_canvas";
		}
		/****
		var canvas = document.getElementById("left_canvas");
		canvas.width = global_seed_size;
		canvas.height = global_seed_size;
		soundKosh();

		for(var i=0;i<global_mapped_colors.length;i++)
		{
			var obj = global_mapped_colors[i];
			console.log(obj);
		}
		***/
		
		if(e.target.id == "center_canvas")
		{
			//alert('test ok');
			//document.getElementById("center_canvas").getContext("2d").drawImage(multy(e.target,global_seed_size,5),0,0);
		}
		
		return; 
	}
	
	if(checkSideswidthHeight()==false) return;
		
	put_pattern_to_buffer();
	
	var rb = document.querySelector('input[name="flags"]:checked').value;
	if( rb == "clone" ) //только в соседнюю пустую ячейку
	{
		/*****
		if(global_last_selected_object != null) //second click
		{
			var obj =  get_selected_object(e);
				if(document.getElementById("qflag1").checked == true )
				{
					var result = clone_all( global_last_selected_object, obj );
				}
				else
				{
				
				
					var result = clone( global_last_selected_object, obj );  //клонируем только в соседнюю пустую ячейку
					
				}
				
				if(result == 1) { sound(); }
				else randomize();
				
				global_last_selected_object = null;
				
				//removeGhost();
				
		}
		else
		{
			var obj =  get_selected_object(e);
			
			global_last_selected_object = obj;
			
			//highlight();
						
		}
		*****/
		if(is_game_finished() == true) finish_game();
		
		return;
		
		
		
	}
	//na pasyans pohozhe
	else if( rb == "swap" ) //только если существует хотя бы одна пустая ячейка (возможно определенного цвета)
	{
		if(global_last_selected_object != null) //second click
		{
			//swap_all
			/******
				var obj =  get_selected_object(e);
				
				if(document.getElementById("qflag1").checked == true )
				{
					var result = swap_all( global_last_selected_object, obj );
				}
				else
				{
					var result = swap( global_last_selected_object, obj );  //перемещаем только в соседнюю пустую ячейку
				}
				
				if(result == 1) { sound(); }
				else randomize();
				
				global_last_selected_object = null;
				
				//removeGhost();
			*****/	
				global_last_selected_object = null;
				
		}
		else
		{
			var obj =  get_selected_object(e);
			
			
			if(document.getElementById("qflag1").checked == true )
			{
				var result = swap_all( obj, get_allowed_swap(obj) );
			}
			else
			{
				var result = swap(obj, get_allowed_swap(obj), true);
			}
				if(result == -1) randomize();
			 else sound(); 
			
			global_last_selected_object = null;//obj;
			
			//highlight();
						
		}
		
		if(is_game_finished() == true) finish_game();
		
		return;
	}
	else if( rb == "move" ) //только в соседнюю пустую ячейку
	{
		if(global_last_selected_object != null) //second click
		{
			/****
				var obj =  get_selected_object(e);
				
				var result = move( global_last_selected_object, obj );  //перемещаем только в соседнюю пустую ячейку
				
					if(result == -1) randomize();
				
				global_last_selected_object = null;
				
				//removeGhost();
			****/	
				global_last_selected_object = null; 
				
				
		}
		else
		{
			var obj =  get_selected_object(e);
			
			var result = move( obj, get_allowed_move(obj) );  //перемещаем только в соседнюю пустую ячейку
				
				if(result == -1) randomize();
			else sound(); 
			
			global_last_selected_object = null; //obj;
			
			//highlight();
						
		}
		
		if(is_game_finished() == true) finish_game();
		
		return;
	}
	else if(rb == "jump")
	{
		
		
		
		if(global_last_selected_object != null) //second click
		{
			
			/****
			var obj =  get_selected_object(e);
			
			if(document.getElementById("qflag1").checked == true )
				{
					var result = jump_all_back( global_last_selected_object, obj );
					
					
						
					
				}
				else
				{
				
					
					
					var result = jump_back( global_last_selected_object, obj );  //клонируем только в соседнюю пустую ячейку
					
					
					
					
				}
				
				if(result == 1) { sound(); }
				else randomize();
				
				
				
			****/	global_last_selected_object = null;
		}
		else
		{
		
			var obj =  get_selected_object(e);
			
			if(obj.frm.indexOf("galerka_")==-1)
			{
					
				if(document.getElementById("qflag1").checked == true )
				{
					var result = jump_all( obj );
					
					if(result == 1) { sound(); }
					else randomize();
						
					global_last_selected_object = null;	
				}
				else
				{
					var result = jump( obj );  //прыгаем только на галерку и если не пусты
							
					if(result == 1) { sound(); }
					else randomize();
						
					global_last_selected_object = null;	
				}
			
			}
			
			global_last_selected_object = null;
		
		}		
		
		if(is_game_finished() == true) finish_game();
		
		return;	
	}
	
	else if( rb == "pack" ) //упаковка одинаковых ячеек
	{
		/***
		if(global_last_selected_object != null) //second click
		{
			
				var obj =  get_selected_object(e);
				
				var result = pack ( global_last_selected_object, obj );  //упаковка одинаковых ячеек
				
				if(result == 1) { sound(); }
				else randomize();
				
				global_last_selected_object = null;
				
				//removeGhost();
				
		}
		else
		{
			
			if(document.getElementById("qflag1").checked == true )
			{
				var obj =  get_selected_object(e);
				
				var result = pack_all ( obj );  //упаковка одинаковых ячеек
				
				if(result == 1) { sound(); }
				else randomize();
			
				global_last_selected_object = null;
			}
			else
			{
				var obj =  get_selected_object(e);
			
				global_last_selected_object = obj;
			}
			
			//highlight();
						
		}
		
		****/
		
		if(is_game_finished() == true) finish_game();
		
		return;
	}
	
	//alert('Not implemented');
	
	randomize();
	
	if(is_game_finished() == true) finish_game();
	
	return;
	
	/****
	var rb = document.querySelector('input[name="flags"]:checked').value;
	
	if( rb == "double" )
	{
		
	}
	
	****/
	
	if(first_click == false && second_click == false)
	{
		
		clearAll();
		fill_global_arr_objects();
		//removeGhost();
				
		var success = whenUserFirstLeftClickOnLeftCanvas(e);
		if(success != -1)
		{
			first_click = true;
			second_click = false;
		}
		else 
		soundRem();
	}
	else if(first_click == true && second_click == false)
	{
		if(global_galerka_selected != null && global_red_ghost != null && global_first_seed_image_data != null && global_selected_seed!= null )
		{
			var rb = document.querySelector('input[name="flags"]:checked').value;
			if(rb == "change") 
			{ 
				changeGalerka(e); 
				
			}
			else if(rb == "exchange") 
			{ 
				//exchangeGalerka(e); 
				
			}
			
			removeGhost();
			
			first_click = false;
			second_click = false;
		}
		else
		{
		
			var success = whenUserSecondLeftClickOnLeftCanvas(e);
			if(success != -1)
			{	
				first_click = false;
				second_click = false;
			}
		
		}
		
		sound();
		
	}
	
	matrixmove();
	
}

//141283__alienxxx__bubblewrap-005.wav

function soundRem()
{
  if(glob_sound_off) 	return;
  var audio = new Audio(); // Создаём новый элемент Audio
  audio.src = 'audio/141283__alienxxx__bubblewrap-005.wav'; // Указываем путь к звуку "клика"
  audio.autoplay = true; // Автоматически запускаем
  //setTimeout(function(){audio.pause(); audio=null;},1000);
}

function soundKosh()
{
	if(glob_sound_off) 	return;
	return;
	
  var audio = new Audio(); // Создаём новый элемент Audio
  audio.src = 'audio/SHipenie_-_Koshki_(iPlayer.fm).mp3'; // Указываем путь к звуку "клика"
  audio.autoplay = true; // Автоматически запускаем
  //setTimeout(function(){audio.pause(); audio=null;},740);
  setTimeout(function(){audio.pause(); audio=null;},600);
}


function soundMurlMurl()
{
if(glob_sound_off) 	return;	
  var audio = new Audio(); // Создаём новый элемент Audio
  audio.src = 'audio/Murlykane._Kot_Mikki_-_gromkoe_murlykane_(iPlayer.fm).mp3'; // Указываем путь к звуку "клика"
  audio.autoplay = true; // Автоматически запускаем
  setTimeout(function(){audio.pause(); audio=null;},7000);
}



function sound()
{
	if(glob_sound_off) 	return;
  var audio = new Audio(); // Создаём новый элемент Audio
  audio.src = 'audio/click.mp3'; // Указываем путь к звуку "клика"
  audio.autoplay = true; // Автоматически запускаем
  setTimeout(function(){audio.pause(); audio=null;},1000);
}


function clear_right_canvas()
{
	var rcnv = document.getElementById("right_canvas");
	rcnv.width = 1;
	rcnv.height = 1;
}

function whenUserClickNext()
{
	clearAll();
	loadLabirint();
}


function whenUserLeftClickOnRightCanvas()
{
	
	return;
	
	if(global_selected_seed == null)	
	{
		clear_right_canvas();
		global_selected_seed = null;
	}
	
	if(second_selected_seed!=null && global_selected_seed!=null)
	{
	var n2 = second_selected_seed[2];
		var m2 = second_selected_seed[3];
		
		var n = global_selected_seed[2];
		var m = global_selected_seed[3];
		
		if(n==n2 && m==m2) 
		{
			//context.putImageData(global_first_seed_image_data,n2*global_seed_size,m2*global_seed_size);
			
			return;
		}
	}
	matrixmove();
}

function whenUserChangeSeedSize()
{
	//we need to remove prizrak
	if(global_red_ghost != null)
	{
		var context = document.getElementById("left_canvas").getContext("2d");
		context.putImageData(global_first_seed_image_data,global_red_ghost[0]*global_seed_size,global_red_ghost[1]*global_seed_size);	
		global_selected_seed = null;
		global_arr_objects = null;
		glob_colors = null;
		global_first_seed_image_data = null;
		global_bottom_selected = null;
		global_red_ghost = null;
		global_galerka_selected = null;
	}
	global_seed_size = Number(this.value);
	//alert(this.value);
}

function getRandomNM()
{
	var canvas = document.getElementById("left_canvas");
	var w = canvas.width;
	var h = canvas.height;
	var lim_n = w/global_seed_size;
	var n = getRandomInt(0,lim_n);
	var lim_m = h/global_seed_size;
	var m = getRandomInt(0,lim_m);
	
	return [n,m];
}

function getRandomGalerka()
{
	var counter = 0;
	var arr = [];
	var list = document.getElementsByTagName("CANVAS");
	for(var i=0;i<list.length;i++)
	{
		if(  (""+list[i].id).indexOf("galerka")==-1  ) continue; 
		
		if(arr.indexOf(list[i].id)==-1)		arr.push(list[i].id);
		else alert('Not unique ID ' + list[i].id);
		counter++;
	}
	
	return getRandomInt(0,arr.length);
}

function double_seed(f)
{
	
	var n = f[0];
	var m = f[1];
		
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var imgData = context.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
		
	if(inGalerkaNotExist(imgData)==true)	addInGalerka(imgData);
		
	return -1;
	
}

function pack_galerka_seed(num)
{
	var gc = document.getElementById("galerka_"+num);
	if(gc != null)
	{
		var gtx = gc.getContext("2d");
		image_data = gtx.getImageData(0,0, gc.width, gc.height);
		if(image_data != null)	
		{
			//try find image_data seed on left_canvas
			
			var index = findImageDataInArrObjects( global_arr_objects, image_data );
			if(index != null) document.getElementById("seeds").removeChild(gc);
			//console.log();
			//if found removeChild();
		}
	}
		
}

function swap_seeds(f,s)
{
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");

	var n = f[0];
	var m = f[1];
	var imgData = context.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
	
	//alert('test exch ok #2');
	var n2 = s[0];
	var m2 = s[1];
	var imgData2 = context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
	
	//if(is
	
	//if(isImageDataAllPointsSame(imgData) && isImageDataCellPatterned(imgData2)) return;
	
	//if(isImageDataAllPointsSame(imgData2) && isImageDataCellPatterned(imgData)) return;

	///if(( isAllPointsSame(imgData.data)==true ) || (isAllPointsSame(imgData2.data)==true )) 	return;
		
	
/****		
		if( document.getElementById("qflag1").checked == true )
		{
		
			var result = findAllCellByImgData( global_first_seed_image_data );
			if(result!=null)
			{
				
				var imgData2 = context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
				
				var result2 = findAllCellByImgData( imgData2 );
				if(result2!=null)
				{
					
					
					//console.log(result);
					
					//console.log(result2);
					
					return;
					
					
				}
				
			
			}
				
			
		}
		
	*****/			
		
		
		//var tImgData1 = global_first_seed_image_data;//context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
		
		//var imgData2 = context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
		
		var tImgData2 = cloneUnrealImageData(n2,m2,imgData2);
		
		///var tImgData1 = cloneUnrealImageData(n,m,imgData);
		
		//510 red
		context.putImageData(imgData,n2*global_seed_size,m2*global_seed_size);  //2 <= 1   1<=tim   2?
		
		context.putImageData(tImgData2,n*global_seed_size,m*global_seed_size);
		
		//global_red_ghost = null;
		
		
	
}

function getImageDataFromObject(obj)
{
	if(obj.frm.indexOf('left_canvas')!=-1)
	{
		var canvas = document.getElementById(obj.frm);
		var context = canvas.getContext("2d");
		var n = obj.nm[2];
		var m = obj.nm[3];
		
		return context.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);	
	}
	
	if( obj.frm.indexOf('kard_')!=-1) return getImageDataFromKoloda(obj.frm);
	
	
	return null;
			
	
}


function clone(obj1, obj2)
{
	/******
	var imgData1 = getImageDataFromObject(obj1);
	if(isAllPointsSame(imgData1.data)==true) return -1;
	
	var imgData2 = getImageDataFromObject(obj2);
	if(isAllPointsSame(imgData2.data)==false) return -1;
	
	var n = obj1.nm[2];
	var m = obj1.nm[3];
	var n2 = obj2.nm[2];
	var m2 = obj2.nm[3];
	
	if(n2 < n-1 || n2 > n+1) return -1;
			
	if(m2 < m-1 || m2 > m+1) return -1;
		
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	context.putImageData(imgData1, n2*global_seed_size, m2*global_seed_size );
		
	return 1;
	*******/
	
	return -1;
}

function clone_all(obj1, obj2)
{
	/**********
	var imgData1 = getImageDataFromObject(obj1);
	if(isAllPointsSame(imgData1.data)==true) return -1;
	if(obj1.frm.indexOf("canvas") == -1) return -1;
	
	var imgData2 = getImageDataFromObject(obj2);
	if(isAllPointsSame(imgData2.data)==false) return -1;
	if(obj1.frm.indexOf("canvas") == -1) return -1;
	
	var n = obj1.nm[2];
	var m = obj1.nm[3];
	var n2 = obj2.nm[2];
	var m2 = obj2.nm[3];
	
	if(n2 < n-1 || n2 > n+1) return -1;
			
	if(m2 < m-1 || m2 > m+1) return -1;
	
	var arr =  getExactOneColorSeedsNM(imgData2);
	if(arr.length != 0)
	{
		
		
			for(var t=0;t<arr.length;t++)
			{
				var n = arr[t][0]/global_seed_size;
				var m = arr[t][1]/global_seed_size;
				
				
				var canvas = document.getElementById("left_canvas");
				var context = canvas.getContext("2d");
				context.putImageData(imgData1, n*global_seed_size, m*global_seed_size );
			}
			
			return 1;
	}			
	
	
	/*****
	var imgData1 = getImageDataFromObject(obj1);
	if(isAllPointsSame(imgData1.data)==true) return -1;
	
	if(obj1.frm.indexOf("galerka_") == -1) return -1;
		
	var imgData2 = getImageDataFromObject(obj2);
	if(isAllPointsSame(imgData2.data)==false) return -1;
	
	var arr =  getExactOneColorSeedsNM(imgData2);
	if(arr != null)
	{
		
		
			for(var t=0;t<arr.length;t++)
			{
				var n = arr[t][0]/global_seed_size;
				var m = arr[t][1]/global_seed_size;
				
				
				var canvas = document.getElementById("left_canvas");
				var context = canvas.getContext("2d");
				context.putImageData(imgData1, n*global_seed_size, m*global_seed_size );
				
				
				
				
				****/
				
				
				
				/****
				var obj22 =  {};
				obj22.frm = obj2.frm;
				obj22.nm = [ arr[t][0], arr[t][1], n, m];
				
				var gc = findGalerkaCanvas(clonedImageData);
				if(gc==null) break;
				obj1.frm=gc.id;
				jump_back(obj1, obj22);
				****/
				
				/***
			}
			
			document.getElementById("seeds").removeChild(document.getElementById(obj1.frm));
			
			return 1;
	
	}
	****/	
	
	return -1;
}

function swap_move0(obj1, obj2, flag)
{
	var imgData1 = getImageDataFromObject(obj1);
	if(isAllPointsSame(imgData1.data)==true) return -1;
	
	var imgData2 = getImageDataFromObject(obj2);
	if(isAllPointsSame(imgData2.data)==false) return -1;
	
	var n = obj1.nm[2];
	var m = obj1.nm[3];
	var n2 = obj2.nm[2];
	var m2 = obj2.nm[3];
	
		
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var color = getMappedColor(n,m); 
	
	if(flag)
	{
		context.fillStyle = color;
		context.fillRect(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
		context.putImageData(imgData1, n2*global_seed_size, m2*global_seed_size );
	}
	return 1;
}

function swap_move(obj1, obj2, flag)
{
	var imgData1 = getImageDataFromObject(obj1);
	// if(isAllPointsSame(imgData1.data)==true) return -1;
	
	var imgData2 = getImageDataFromObject(obj2);
	// if(isAllPointsSame(imgData2.data)==true) return -1;
	
	var n = obj1.nm[2];
	var m = obj1.nm[3];
	var n2 = obj2.nm[2];
	var m2 = obj2.nm[3];
	
		
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	//var color = getMappedColor(n,m); 
	
	if(flag)
	{
		//context.fillStyle = color;
		//context.fillRect(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
		context.putImageData(imgData2, n*global_seed_size, m*global_seed_size );
		context.putImageData(imgData1, n2*global_seed_size, m2*global_seed_size );
	}
	return 1;
}

//двойное дно всего три слоя первый цвета фона, второй однотонный узор, третий сиды, маленькие узоры, фреглы
//из маленького узора делаем однотонный и его плашки потом суммируем с маленьким узором
//новости игры

function swap0(obj1, obj2, flag)
{
//	if(inExactPlaces(obj1)) return -1;
//	if(inExactPlaces(obj2)) return -1;

	if(obj2 == null) return -1;
	
	if(obj1.frm.indexOf("galerka_") != -1) return -1;
	if(obj2.frm.indexOf("galerka_") != -1) return -1;
	
	
	
	var imgData1 = getImageDataFromObject(obj1);
	var imgData2 = getImageDataFromObject(obj2);
	
	if(isImageDataCellPatterned(imgData1) && isImageDataCellPatterned(imgData2))
	{
	
		var tObj = getEmptyCellNear(obj1.frm, obj1, obj2);
		if(tObj == null) return -1;
		
		/****
		var n = obj1.nm[2];
		var m = obj1.nm[3];
		var n2 = obj2.nm[2];
		var m2 = obj2.nm[3];
		var n0 = tObj.nm[2];
		var m0 = tObj.nm[3];
		
		if( (n0 < n-1) || (n0 < n2-1)  ) return -1;
		if( (n0 > n+1) || (n0 > n2+1)  ) return -1;
		if( (m0 < m-1) || (m0 < m2-1)  ) return -1;
		if( (m0 > m+1) || (m0 > m2+1)  ) return -1;
		*****/
		
		var result = swap_move(obj1, tObj, flag);
		if(result != -1) 
		{
			result = swap_move(obj2, obj1, flag);
			if(result != -1) 
			{
				result = swap_move(tObj, obj2, flag);
				if(result != -1) return 1;
			}
		}
		
		}
	
	return -1;
	
}

function kosmik_swap(obj1, obj2, flag)
{
	
    if(obj1 == null) return null;
	
	if(obj2 == null) return null;
		
	var imgData1 = getImageDataFromObject(obj1);
	
	var imgData2 = getImageDataFromObject(obj2);
	
	
	
	if ( isImageDataAllPointsSame(imgData1) && isImageDataAllPointsSame(imgData2) )
	{
			
			var n = obj1.nm[2];
			var m = obj1.nm[3];
			
			var n2 = obj2.nm[2];
			var m2 = obj2.nm[3];
		
			var color1 = null;
			var color2 = null;
			
			var obj111 = null;
			var obj222 = null;
			
			
			var r1 = findNMinColoredSpecial(n,m);
			if(r1 != -1)
			{
				obj111 = glob_colored_special_arr[r1];
				
				color1 = obj111.color;
			}
			
			r2 = findNMinColoredSpecial(n2,m2);
			if(r2 != -1)
			{
				obj222 = glob_colored_special_arr[r2];
				
				color2 = obj222.color;	
			}
			
			
				obj111.color = color2; //getColorFromLeftCanvas (n2,m2,1,1);
				
				glob_colored_special_arr[r1] = obj111;
				
			
			
			
				
				obj222.color = color1; //getColorFromLeftCanvas (n,m,1,1);
				
				glob_colored_special_arr[r2] = obj222;
				
			
			
			
		
		
	}
	
	
	
	if     (
	
		(isImageDataCellPatterned(imgData1) && isImageDataCellPatterned(imgData2)) ||
		(isImageDataAllPointsSame(imgData1) && isImageDataAllPointsSame(imgData2))
		
    )	
	
	{
	
			var n = obj1.nm[2];
			var m = obj1.nm[3];
			var n2 = obj2.nm[2];
			var m2 = obj2.nm[3];
				
			var canvas = document.getElementById("left_canvas");
			var context = canvas.getContext("2d");
			
			if(flag)
			{
				context.putImageData(imgData2, n*global_seed_size, m*global_seed_size );
				context.putImageData(imgData1, n2*global_seed_size, m2*global_seed_size );
			}
			
			return obj2;
	
	}
	
	return null;
	
	
}

function swap(obj1, obj2, flag)
{
//	if(inExactPlaces(obj1)) return -1;
//	if(inExactPlaces(obj2)) return -1;

	if(obj2 == null) return -1;
	
	if(obj1.frm.indexOf("galerka_") != -1) return -1;
	if(obj2.frm.indexOf("galerka_") != -1) return -1;
	
	
	
	var imgData1 = getImageDataFromObject(obj1);
	var imgData2 = getImageDataFromObject(obj2);
	
	if(
	(isImageDataCellPatterned(imgData1) && isImageDataCellPatterned(imgData2)) ||
	(isImageDataAllPointsSame(imgData1) && isImageDataAllPointsSame(imgData2))
)	
	
	{
	
		//var tObj = getEmptyCellNear(obj1.frm, obj1, obj2);
		//if(tObj == null) return -1;
		
		/****
		var n = obj1.nm[2];
		var m = obj1.nm[3];
		var n2 = obj2.nm[2];
		var m2 = obj2.nm[3];
		var n0 = tObj.nm[2];
		var m0 = tObj.nm[3];
		
		if( (n0 < n-1) || (n0 < n2-1)  ) return -1;
		if( (n0 > n+1) || (n0 > n2+1)  ) return -1;
		if( (m0 < m-1) || (m0 < m2-1)  ) return -1;
		if( (m0 > m+1) || (m0 > m2+1)  ) return -1;
		*****/
		
		var result = swap_move(obj1, obj2, flag);
		if(result != -1) 
		{
			 return 1;
			
		
		
		}
	
	    return -1;
	}
	
}

function swap_all(obj1, obj2)
{
	if(obj1.frm.indexOf("galerka_") != -1) return -1;
	if(obj2.frm.indexOf("galerka_") != -1) return -1;
	
		
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	
	var imageData1 = getImageDataFromObject(obj1);
	var imageData2 = getImageDataFromObject(obj2);
	
	if(
	(isImageDataAllPointsSame(imageData1) && isImageDataAllPointsSame(imageData2) ) ||
	(isImageDataCellPatterned(imageData1) && isImageDataCellPatterned(imageData2) )    )
	{
	
			var result = findAllCellByImgData( imageData1 );
			if(result!=null)
			{
				
								
				var result2 = findAllCellByImgData( imageData2 );
				if(result2!=null)
				{
					
									
					/******/
					//console.log(result);
					
					//console.log(result2);
					
					var n1 = result[0][0]; 
					var m1 = result[0][1];
					var imgData1 = context.getImageData(n1*global_seed_size,m1*global_seed_size,global_seed_size,global_seed_size);
					
					var n2 = result2[0][0]; 
					var m2 = result2[0][1];
					var imgData2 = context.getImageData( n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size );
					var tImgData = cloneImageData( imgData2); 
					

					
					for(var j=0;j<result2.length;j++)
					{
						n2 = result2[j][0]; 
						m2 = result2[j][1]; 
						context.putImageData(imgData1,n2*global_seed_size,m2*global_seed_size);
							
					}
					
					
						for(var i =0;i<result.length;i++)
						{
							n1 = result[i][0]; 
							m1 = result[i][1]; 
							context.putImageData(tImgData,n1*global_seed_size,m1*global_seed_size);
							
							
							
						}
					
					
					
					 
					
				}
				
			 
			}
			
			return 1;
	}
	else
	{
		alert('not implemented exchange all');
		return -1;
	}
}
 

/*****
function move_colored(obj1, obj2)
{
	var canvas = document.getElementById(obj1.frm);
	var context = canvas.getContext("2d");
	
	var imgData1 = getImageDataFromObject(obj1);
	var imgData2 = getImageDataFromObject(obj2);
	
	var n = obj1.nm[2];
	var m = obj1.nm[3];
	var n2 = obj2.nm[2];
	var m2 = obj2.nm[3];
	
	if(n2 < n-1 || n2 > n+1) return -1;
			
	if(m2 < m-1 || m2 > m+1) return -1;
	
	
	
	
	context.putImageData(imgData2, n*global_seed_size, m*global_seed_size );
	context.putImageData(imgData1, n2*global_seed_size, m2*global_seed_size );
		
	return 1;
}
****/

function isImageDataCellPatterned(imgData)
{
	return ( isImageDataAllPointsSame(imgData)==false ) && ( isImageDataCellBackground(imgData)==false );
}

function getCellColored(n,m)
{
	var canvas = document.getElementById("center_canvas");
	var context = canvas.getContext("2d");
	return context.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
}
function getImageDataCellBackground()
{
	var canvas = document.createElement("canvas");
	var context = canvas.getContext("2d");
	context.fillStyle  = getBackgroundColor();
	context.fillRect(0,0,global_seed_size,global_seed_size);
	return context.getImageData(0,0,global_seed_size,global_seed_size);
}

function getImgDataFromColoredSpecial(n,m)
{
	
	var obj = glob_colored_special_arr[findNMinColoredSpecial(n,m)];//getCellColored(n,m);
	var canvas = document.createElement("canvas");
	var context = canvas.getContext("2d");
	context.fillStyle  = obj.color;
	context.fillRect(0,0,global_seed_size,global_seed_size);
	return context.getImageData(0,0,global_seed_size,global_seed_size);
	
}

function move(obj1, obj2)
{
	if(obj2 == null) return null;
	
	
	
	var imgData1 = getImageDataFromObject(obj1);
	var imgData2 = getImageDataFromObject(obj2);
	
	//if(inExactPlaces(obj1)) return -1; 
	//if(inExactPlaces(obj2)) return -1;
	
	var n = obj1.nm[2];
	var m = obj1.nm[3];
	var n2 = obj2.nm[2];
	var m2 = obj2.nm[3];
	
	
	
	//restrictions
	
	//if( isFreeze(imgData1, n,m, imgData2, n2, m2)==false ) return -1;
	//if( isFreeze(imgData1, n, m)) return -1;
	//if( isFreeze(imgData2, n2, m2)) return -1;
	
	if( (obj1.frm!=obj2.frm) || (obj1.frm.indexOf("_canvas")==-1) ) return null;
	
	var mg = magnito(obj1,obj2);
	if( mg != null ) return mg;
	
	if(n2 < n-1 || n2 > n+1) return null;
			
	if(m2 < m-1 || m2 > m+1) return null;
	
	if(isImageDataCellBackground(imgData1) ) return null; 
	if( isImageDataCellPatterned(imgData1)  && isImageDataCellPatterned(imgData2) ) return null; 
	if( isImageDataCellPatterned(imgData1)  && isImageDataCellBackground(imgData2) ) return null; 
	
	if ( isImageDataAllPointsSame(imgData1)  && isImageDataAllPointsSame(imgData2) )  return null;
	
		
	var canvas = document.getElementById(obj1.frm);
	var context = canvas.getContext("2d");
	if(isImageDataCellPatterned(imgData1) )
	{
		context.putImageData(imgData1, n2*global_seed_size, m2*global_seed_size );
		var imgData2 = getImgDataFromColoredSpecial(n,m);
		context.putImageData(imgData2, n*global_seed_size, m*global_seed_size );
	}
	else if(isImageDataAllPointsSame(imgData1))
	{
		context.putImageData(imgData1, n2*global_seed_size, m2*global_seed_size );
		var imgData2 = getImageDataCellBackground();
		context.putImageData(imgData2, n*global_seed_size, m*global_seed_size );
		
		
		
		var r = findNMinColoredSpecial(n2,m2);
		if(r != -1)
		{
			var obj22 = glob_colored_special_arr[r];
			/*****
			var obj2 = {};
			obj2.n = i/global_seed_size;
			obj2.m = j/global_seed_size;
			obj2.color = getBackgroundColor();
			obj2.obj = obj;
			*****/
			obj22.color = getColorFromLeftCanvas (obj22.obj.nm[0],obj22.obj.nm[1],1,1);
			glob_colored_special_arr[r] = obj22;
			
		}
		
		var r = findNMinColoredSpecial(n,m);
		if(r != -1)
		{
			var obj222 = glob_colored_special_arr[r];
			/*****
			var obj2 = {};
			obj2.n = i/global_seed_size;
			obj2.m = j/global_seed_size;
			obj2.color = getBackgroundColor();
			obj2.obj = obj;
			*****/
			obj222.color = getBackgroundColor(); // getColorFromLeftCanvas (obj2.obj.nm[0],obj2.obj.nm[1],1,1);
			glob_colored_special_arr[r] = obj222;
			
		}
		
		
		
	}		
	
		
	return obj2;
}

function pack(obj1, obj2)
{
	/*********
	if(obj1.frm.indexOf("galerka_" != -1) && obj2.frm.indexOf("galerka_") != -1) return -1;
	
	var imgData1 = getImageDataFromObject(obj1);
	if(isAllPointsSame(imgData1.data)==true) return -1;
	
	if(obj1.frm.indexOf("galerka_") != -1)
	{
			var imgData2 = getImageDataFromObject(obj2);
			if(isAllPointsSame(imgData2.data)==true) return -1;
			/****
			var n = obj1.nm[2];
			var m = obj1.nm[3];
			var n2 = obj2.nm[2];
			var m2 = obj2.nm[3];
			*****/
			/*********
			if(cmp(imgData1, imgData2))
			{
				document.getElementById("seeds").removeChild(document.getElementById(obj1.frm));
				
			}
			else return -1;			
			
			//if(n2 < n-1 || n2 > n+1) return -1;
					
			//if(m2 < m-1 || m2 > m+1) return -1;
				
			//var canvas = document.getElementById(obj);
			//var context = canvas.getContext("2d");
			//context.putImageData(imgData1, n2*global_seed_size, m2*global_seed_size );
	}
	else if(obj1.frm.indexOf("galerka_" == -1) && obj2.frm.indexOf("galerka_") == -1) 
	{
		var imgData2 = getImageDataFromObject(obj2);
			if(isAllPointsSame(imgData2.data)==true) return -1;
			
			var n = obj1.nm[2];
			var m = obj1.nm[3];
			
			var n2 = obj2.nm[2];
			var m2 = obj2.nm[3];
			
			if(n2 < n-1 || n2 > n+1) return -1;
					
			if(m2 < m-1 || m2 > m+1) return -1;
			
			if(n == n2 && m == m2) return -1;
			
			if(cmp(imgData1, imgData2))
			{
				var color = getMappedColor(n,m); 
				var canvas = document.getElementById("left_canvas");
				var context = canvas.getContext("2d");
				context.fillStyle = color;
				context.fillRect(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
			}	
			else return -1;	
	}
	else
	{
		/****
		var imgData2 = getImageDataFromObject(obj2);
			if(isAllPointsSame(imgData2.data)==true) return -1;
			
			var n = obj1.nm[2];
			var m = obj1.nm[3];
			
			if(cmp(imgData1, imgData2))
			{
				var color = getMappedColor(n,m); 
				context.fillStyle = color;
				context.fillRect(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
			}	
			*****/
			/*******
			console.log('pack: not implemented #1');
			return -1;
	}
	/*****
	var imgData2 = getImageDataFromObject(obj2);
	if(isAllPointsSame(imgData2.data)==false) return -1;
	
	var n = obj1.nm[2];
	var m = obj1.nm[3];
	var n2 = obj2.nm[2];
	var m2 = obj2.nm[3];
	
	if(n2 < n-1 || n2 > n+1) return -1;
			
	if(m2 < m-1 || m2 > m+1) return -1;
		
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	context.putImageData(imgData1, n2*global_seed_size, m2*global_seed_size );
********/
	//return 1;
	
	return -1;
}


function pack_all(obj)
{
	/********
	
	var imgData = getImageDataFromObject(obj);
	if(isAllPointsSame(imgData.data)==true) return -1;
	var clonedImageData = cloneImageData(imgData);
	
	var result = jump_all(obj);
	
	if(result == -1) return -1;
	
	
		var gc_arr = findAllGalerkaCanvas(clonedImageData);
		if(gc_arr.length==0) return -1;
		for(var t=0;t<gc_arr.length-1;t++)
		{
			document.getElementById("seeds").removeChild(gc_arr[t]);	
		}
		
	//var obj2 = {};
	//obj2.frm=gc_arr[gc_arr.length].id;
		
	//jump_back(obj,obj2);
	
	return 1;
	
	********/
	
	return -1;
	
	
}

function addPSamedInGalerka(imgData)
{
	if(isAllPointsSame(imgData.data)==false) return null;
	
	if(inGalerkaNotExist(imgData) == false) return null;
	
	var canvas2 = document.createElement("canvas");
	
	var nn = 0;
	while(true)
	{
		if(document.getElementById("galerka_"+nn)!=null) 
		{
			nn++;
			continue;
		}
		break;
	}
	
	
	
	canvas2.id = "galerka_"+nn;
	canvas2.width = global_seed_size;
	canvas2.height = global_seed_size;
	canvas2.getContext("2d").putImageData(imgData, 0,0);
	canvas2.onclick = function(e)
	{
		//alert(this.getAttribute("data-color"));
		//var points = findAllCellByColor(this, this.getAttribute("data-color"));
		//global_bottom_selected = this;
		whenUserClickedGalerka(e);
	}
	var red = imgData.data[0];
	var green = imgData.data[1];
	var blue = imgData.data[2];
	var alpha = imgData.data[3];
	var color = "rgba("+red+","+green+","+blue+","+alpha+")";
	
	canvas2.setAttribute("data-color", color);
	document.getElementById("seeds").appendChild(canvas2);
	
	return color;
}

function jump_psamed(obj)
{
	//if(inExactPlaces(obj1)) return -1;
		
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var n = obj.nm[2];
	var m = obj.nm[3];
	var imgData = getImageDataFromObject(obj);
	//if(m < (canvas.height/global_seed_size)-1) return -1;
		
	
	//var color = addPSamedInGalerka(imgData);
	//if(color!=null) 
	//{	
		context.fillStyle = getBackgroundColor();
		context.fillRect(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
		
		var result = put_kard_to_koloda(imgData,global_seed_size,global_seed_size);
		if(result==null) return null;
		
	//}
	
	var r = findNMinColoredSpecial(n,m);
		if(r != -1)
		{
			var obj222 = glob_colored_special_arr[r];
			/*****
			var obj2 = {};
			obj2.n = i/global_seed_size;
			obj2.m = j/global_seed_size;
			obj2.color = getBackgroundColor();
			obj2.obj = obj;
			*****/
			obj222.color = getBackgroundColor();//getColorFromLeftCanvas (obj2.obj.nm[0],obj2.obj.nm[1],1,1);
			glob_colored_special_arr[r] = obj222;
			
			
					var obj = {};
					obj.frm = result.id;
					obj.nm = [0,0,0,0];
					
					return obj;
					
					 
			
		}
		
		return null;
		
	
	
}


function jump(obj,last_line)
{
	//if(inExactPlaces(obj)) return -1;
	
	var imgData = getImageDataFromObject(obj);
	if(isCellBackground(obj.frm,obj.nm[2],obj.nm[3])) return null;
	
	if(isAllPointsSame(imgData.data)==true) 
	{
		return jump_psamed(obj);
	}
	
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var n = obj.nm[2];
	var m = obj.nm[3];
	
	if(last_line) if(m < (canvas.height/global_seed_size)-1) return null;
		
	//var color = getMappedColor(n,m);
	
	
	
	var objColor = null;
	var r = findNMinColoredSpecial(n,m);
		if(r != -1)
		{
			objColor = glob_colored_special_arr[r];
			
			
		}
	
	
	
	
	
	context.fillStyle = objColor.color;
	context.fillRect(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
	
	
	
	var result = put_kard_to_koloda(imgData,global_seed_size,global_seed_size);
	if(result==null) return null;
	
	var obj = {};
	obj.frm = result.id;
	obj.nm = [0,0,0,0];
					
	return obj;
	
}

function mjump(obj)
{
	
	
	var imgData = getImageDataFromObject(obj);
	
	if(isCellBackground(obj.frm,obj.nm[2],obj.nm[3])) return -1;
	
	if(isAllPointsSame(imgData.data)==true) 
	{
		var canvas = document.getElementById("left_canvas");
		var context = canvas.getContext("2d");
		var n = obj.nm[2];
		var m = obj.nm[3];
		var imgData = getImageDataFromObject(obj);
		//if(m < (canvas.height/global_seed_size)-1) return -1;
		
		/******

var objColor = null;
	var r = findNMinColoredSpecial(n,m);
		if(r != -1)
		{
			objColor = glob_colored_special_arr[r];
			
			
		}
	
		*****/
		
		var color = addPSamedInGalerka(imgData);
		//var color = objColor.color;
		if(color!=null) 
		{	
			context.fillStyle = getBackgroundColor();
			context.fillRect(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
		}
		else return -1;
		
		return 1;
	
	}
	
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var n = obj.nm[2];
	var m = obj.nm[3];
	
	var color = addImgDataToGalerka(n,m,imgData);
	/****
	var objColor = null;
	var r = findNMinColoredSpecial(n,m);
		if(r != -1)
		{
			objColor = glob_colored_special_arr[r];
			
			
		}
	
		
		***/
		//var color = addPSamedInGalerka(imgData);
		//var color = objColor.color;
	if(color!=null) 
	{	
		context.fillStyle = color;
		context.fillRect(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
	}
	
	return 1;	
}

function jump_all(obj)
{
	

	fill_global_arr_objects();
	
	var imgData = getImageDataFromObject(obj);
	if(isAllPointsSame(imgData.data)==true) return -1;
	
	
		var cell = findImageDataInGlobalArrObjects( imgData );
		if(cell != null)
		{
			
			var cells = cell.points;
			for(var t=0;t<cells.length;t++)
			{
				var arr = cells[t];
				var i = arr[0];
				var j = arr[1];
				
				var obj2 =  {};
				obj2.frm = obj.frm;
				obj2.nm = [i,j,i/global_seed_size,j/global_seed_size];
				
				jump(obj2);
			}
			  
			return 1;  
		}
		
	
	
	return -1;
}


function jump_all_back(obj1,obj2)
{
	
	//fill_global_arr_objects();
	
	var imgData1 = getImageDataFromObject(obj1);
	if(isAllPointsSame(imgData1.data)==true) 
	{
		
		if(isImageDataCellBackground(imgData1)==false) return -1;
	}
	
	
	var clonedImageData = cloneImageData(imgData1);
	
	if(obj1.frm.indexOf("galerka_") == -1) return -1;
	if(obj2.frm.indexOf("canvas") == -1) return -1;
	
	var imgData2 = getImageDataFromObject(obj2);
	if(isAllPointsSame(imgData2.data)==false) return -1;
		
	var arr =  getExactOneColorSeedsNM(imgData2);
	if(arr.length != 0)
	{
		
		
			for(var t=0;t<arr.length;t++)
			{
				var n = arr[t][0]/global_seed_size;
				var m = arr[t][1]/global_seed_size;
				
				var obj22 =  {};
				obj22.frm = obj2.frm;
				obj22.nm = [ arr[t][0], arr[t][1], n, m];
				
				var gc = findGalerkaCanvas(clonedImageData);
				if(gc==null) break;
				obj1.frm=gc.id;
				jump_back(obj1, obj22);
			}
			
			return 1;
		
	}
	

	
	return -1;
}



function inExactPlaces(obj1)
{
	var imgData1 = getImageDataFromObject(obj1);
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var ccanvas = document.getElementById("center_canvas");
	var ccontext = ccanvas.getContext("2d");
	var rcanvas = document.getElementById("right_canvas");
	var rcontext = rcanvas.getContext("2d");
	var n = obj1.nm[2];
	var m = obj1.nm[3];
	
	if(isImageDataCellBackground(imgData1)) return false;
	
	if(isImageDataAllPointsSame(imgData1))
	{
		var imgData = ccontext.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
		return cmp(imgData1,imgData);
	}
	
	var imgData = rcontext.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
	return cmp(imgData1,imgData);
	
}


function jump_psamed_back(obj1, obj2)
{
//	if(inExactPlaces(obj1)) return -1;
//	if(inExactPlaces(obj2)) return -1;
	
	var imgData1 = getImageDataFromObject(obj1);
	
	
	var imgData2 = getImageDataFromObject(obj2);
	
	
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var n = obj2.nm[2];
	var m = obj2.nm[3];
	
	context.putImageData(imgData1, n*global_seed_size, m*global_seed_size );
	
	var objColor = null;
	var r = findNMinColoredSpecial(n,m);
		if(r != -1)
		{
			objColor = glob_colored_special_arr[r];
			objColor.color = getColorFromLeftCanvas(n*global_seed_size,m*global_seed_size,1,1);
			glob_colored_special_arr[r] = objColor;
		}
	
		
		
		//var color = addPSamedInGalerka(imgData);
		var color = objColor.color;
	
	//document.getElementById("seeds").removeChild(document.getElementById(obj1.frm));
	
	
	
	return obj2;	
}

function magic_not_allowed(obj1,obj2)
{
	var imgData1 = getImageDataFromObject(obj1);
	if(isImageDataCellPatterned(imgData1)==false) return -1;
	
	var imgData2 = getImageDataFromObject(obj2);
	if(isImageDataAllPointsSame(imgData2)==false) return -1;
	
	var ccanvas = document.getElementById("center_canvas");
	var ccontext = ccanvas.getContext("2d");
	var nt = obj2.nm[2];
	var mt = obj2.nm[3];
	var cImgData = ccontext.getImageData(nt*global_seed_size, mt*global_seed_size, global_seed_size, global_seed_size );
	
	var rcanvas = document.getElementById("right_canvas");
	var rcontext = rcanvas.getContext("2d");
	var rImgData = rcontext.getImageData(nt*global_seed_size, mt*global_seed_size, global_seed_size, global_seed_size );
	
	
	return cmp(imgData1,rImgData) && cmp(imgData2,cImgData);
				 
	
	/*************
	
	for(var j=0;j< m*global_seed_size;j+=global_seed_size)
	{
		for(var i=0;i< n*global_seed_size;i+=global_seed_size)
		{
			
			var rImgData = rcontext.getImageData(i/global_seed_size, j/global_seed_size, global_seed_size, global_seed_size );
			if(cmp(rImgData,imgData1))
			{
				var imd = ccanvas.getContext("2d").getImageData(i*global_seed_size,j*global_seed_size,1,1);
				for(var nn=0;nn<imgData2.length-4;nn+=4)
				{
					var red = imgData2.data[nn+0];
					var green = imgData2.data[nn+1];
					var blue = imgData2.data[nn+2];
					var alpha = imgData2.data[nn+3];
					//var col = "rgba("+red+","+green+","+blue+","+alpha+")";
					
					if (
					(imd.data[0] == red) && (imd.data[1] == green) && (imd.data[2] == blue) && (imd.data[3]==alpha)
					)
					{
						
						return false;
					}
					
					
					
					
				}
				
				
				
			}
		}	
	}
	
	*******/
	
	//return true;
}

function jump_back(obj1, obj2)
{
		if(obj2 == null) return null;
	//if(inExactPlaces(obj1)) return -1;
	//if(inExactPlaces(obj2) && isImageDataCellPatterned(getImageDataFromObject(obj2))) return -1;
	
	var imgData1 = getImageDataFromObject(obj1);
	
	//if(isCellBackground(obj1.frm,obj1.nm[2],obj1.nm[3])) return -1;
	
	if((isAllPointsSame(imgData1.data)==true))
	{
		if( isCellBackground(obj2.frm,obj2.nm[2],obj2.nm[3]) ) 	return jump_psamed_back(obj1, obj2);
		return null;
	}
	
	var imgData2 = getImageDataFromObject(obj2);
	if( isCellBackground(obj2.frm,obj2.nm[2],obj2.nm[3]) ) 	return null;
	if(isAllPointsSame(imgData2.data)==false) return null;
	
	
	// if(magic_not_allowed(obj1,obj2)) return -1;
	
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var n = obj2.nm[2];
	var m = obj2.nm[3];
	
	context.putImageData(imgData1, n*global_seed_size, m*global_seed_size );
	
	var objColor = null;
	var r = findNMinColoredSpecial(n,m);
		if(r != -1)
		{
			objColor = glob_colored_special_arr[r];
			objColor.color = getColorFromLeftCanvas(n*global_seed_size,m*global_seed_size,1,1);
			glob_colored_special_arr[r] = objColor;
		}
	
		
		
		//var color = addPSamedInGalerka(imgData);
		var color = objColor.color;
	
	//document.getElementById("seeds").removeChild(document.getElementById(obj1.frm));
	
	return obj2;	
}


function mjump_psamed_back(obj1, obj2)
{
	
	var imgData1 = getImageDataFromObject(obj1);
	
	
	var imgData2 = getImageDataFromObject(obj2);
	
	
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var n = obj2.nm[2];
	var m = obj2.nm[3];
	
	context.putImageData(imgData1, n*global_seed_size, m*global_seed_size );
	
	document.getElementById("seeds").removeChild(document.getElementById(obj1.frm));
	
	return 1;	
}

function mjump_back(obj1, obj2)
{
	
	var imgData1 = getImageDataFromObject(obj1);
	
	//if(isCellBackground(obj1.frm,obj1.nm[2],obj1.nm[3])) return -1;
	
	if((isAllPointsSame(imgData1.data)==true))
	{
		if( isCellBackground(obj2.frm,obj2.nm[2],obj2.nm[3]) ) 	return mjump_psamed_back(obj1, obj2);
		return -1;
	}
	
	var imgData2 = getImageDataFromObject(obj2);
	if( isCellBackground(obj2.frm,obj2.nm[2],obj2.nm[3]) ) 	return -1;
	if(isAllPointsSame(imgData2.data)==false) return -1;
	
		
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var n = obj2.nm[2];
	var m = obj2.nm[3];
	
	context.putImageData(imgData1, n*global_seed_size, m*global_seed_size );
	
	document.getElementById("seeds").removeChild(document.getElementById(obj1.frm));
	
	return 1;	
}

/*****
function remove2(f)
{
	
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var n = f[0];
	var m = f[1];
	
	
	var imgData = context.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
		
	if(isImageDataCellBackground(imgData)==true) return;
	
	//var color = findColorOnGalerka(imgData);
	//if(color==null) color = getSeedColor(n,m); 
	//if(inGalerkaNotExist(imgData)) color = addInGalerka(null,color,imgData);
	
	var color = addImgDataToGalerka(n,m,imgData);
	if(color!=null) 
	{	
		context.fillStyle = color;
		context.fillRect(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
	}
		
	//context.fillStyle = color;
	//context.fillRect(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
	
		
}
*****/
function getOkrPlaceArray(n,m)
{
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var lim_n = canvas.width / global_seed_size - 1;
	var lim_m = canvas.height / global_seed_size - 1;
	
	var arr = [];
	if(n==0)
	{
		if(m==0)
		{
			arr.push([1,0]);
			arr.push([0,1]);
			arr.push([1,1]);
		}
		else if(m==lim_m)
		{
			arr.push([0,lim_m-1]);
			arr.push([1,lim_m]);
			arr.push([1,lim_m-1]);
		}
		else
		{
			arr.push([0,m-1]);
			arr.push([1,m-1]);
			arr.push([1,m]);
			arr.push([1,m+1]);
			arr.push([0,m+1]);
		}
		
	}
	else if(n == lim_n)
	{
		if(m==0)
		{
			arr.push([n-1,m]);
			arr.push([n,m+1]);
			arr.push([n-1,m+1]);
		}
		else if(m==lim_m)
		{
			arr.push([n,m-1]);
			arr.push([n-1,m]);
			arr.push([n-1,m-1]);
		}
		else
		{
			arr.push([n,m-1]);
			arr.push([n-1,m-1]);
			arr.push([n-1,m]);
			arr.push([n-1,m+1]);
			arr.push([n,m+1]);
		}
	}
	else
	{
		if(m==0)
		{
			arr.push([n-1,m]);
			arr.push([n-1,m+1]);
			arr.push([n+1,m]);
			arr.push([n+1,m+1]);
			arr.push([n,m+1]);
		}
		else if(m==lim_m)
		{
			arr.push([n-1,m]);
			arr.push([n-1,m-1]);
			arr.push([n,m-1]);
			arr.push([n+1,m-1]);
			arr.push([n+1,m]);
		}
		else
		{
			arr.push([n-1,m-1]);
			arr.push([n,m-1]);
			arr.push([n+1,m-1]);
			
			arr.push([n-1,m]);
			//arr.push([n,m]);
			arr.push([n+1,m]);
			
			arr.push([n-1,m+1]);
			arr.push([n,m+1]);
			arr.push([n+1,m+1]);
		}
	}
	
	return arr;
}

function getOnlyCellBackground(arr)
{
	var arr2 = [];
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	for(var j=0;j<arr.length;j++)
	{
		var n = arr[j][0];
		var m = arr[j][1];
		var imgData = context.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
		if(isImageDataCellBackground(imgData))
		{
			arr2.push([n,m]);
		}
	}
	
	return arr2;
	
}

function getOnlyCellBackground(arr)
{
	var arr2 = [];
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	for(var j=0;j<arr.length;j++)
	{
		var n = arr[j][0];
		var m = arr[j][1];
		var imgData = context.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
		if(isImageDataCellBackground(imgData))
		{
			arr2.push([n,m]);
		}
	}
	
	return arr2;
	
}

function getOnlyCellColored(arr)
{
	var arr2 = [];
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	for(var j=0;j<arr.length;j++)
	{
		var n = arr[j][0];
		var m = arr[j][1];
		var imgData = context.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
		if(isImageDataAllPointsSame(imgData))
		{
			arr2.push([n,m]);
		}
	}
	
	return arr2;
	
}

function getMovableCell()
{
	var arr4 = [];
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var nn = canvas.width / global_seed_size;
	var mm = canvas.height / global_seed_size;
	for(var j=0;j<nn;j++)
	{
		for(var i=0;i<mm;i++)
		{
			
			var imgData = context.getImageData(i*global_seed_size,j*global_seed_size,global_seed_size,global_seed_size);
			if(isImageDataCellPatterned(imgData))
			{
				var arr = getOnlyCellColored(getOkrPlaceArray(i,j));
				if(arr.length > 0) 
				{
					var obj = {};
					obj.mcell = [i,j];
					obj.wcell = arr[getRandomInt(0,arr.length)];
					arr4.push(obj);
				}
			}
			else if (isImageDataAllPointsSame(imgData))
			{
				var arr = getOnlyCellBackground(getOkrPlaceArray(i,j));
				if(arr.length > 0) 
				{
					var obj = {};
					obj.mcell = [i,j];
					obj.wcell = arr[getRandomInt(0,arr.length)];
					arr4.push(obj);
				}
			}
		}
	}
	
	if(arr4.length > 0) return arr4[getRandomInt(0,arr4.length)];
	
	return null;
}

function getRandomGalerka()
{
	var counter = 0;
	var list = document.getElementsByTagName("CANVAS");
	for(var i=0;i<list.length;i++)
	{
		if(  (""+list[i].id).indexOf("galerka")==-1  ) continue; 
		counter++;
	}
	
	var rnd_counter = getRandomInt(0,counter);
	
	list = document.getElementsByTagName("CANVAS");
	for(var i=0;i<list.length;i++)
	{
		if(  (""+list[i].id).indexOf("galerka")==-1  ) continue; 
		if(counter==rnd_counter) return list[i];
		counter++;
	}
	
	return null;
}

function executing(cmd)
{
	console.log("executing: " + cmd);
	//alert('executing: '+cmd);
	removeGhost();
	clearAll();
	fill_global_arr_objects();
	/********
	if (cmd == 0) //move
	{ 
		var obj = getMovableCell();	
		if(obj==null) { return executing(3); }
		
		var n = obj.mcell[0];
		var m = obj.mcell[1];
		
		var obj1 = {};
		obj1.nm = [n*global_seed_size,m*global_seed_size,n,m];
		obj1.frm = "left_canvas";
		
		var n2 = obj.wcell[0];
		var m2 = obj.wcell[1];
		
		var obj2 = {};
		obj2.nm = [n2*global_seed_size,m2*global_seed_size,n2,m2];
		obj2.frm = "left_canvas";
		
		//var obj2 = getAllowedPlace(obj);
		mmove(obj1,obj2);
	}
	else 
	**********/	
	if (cmd==0) //swap
	{
		var f = getRandomNM();	
		var s = getRandomNM();
		swap_seeds(f,s);
	}
	else if ( cmd == 1 )  //jump
	{
		var f = getRandomNM();	
		var obj = {};
		obj.nm = [f[0]*global_seed_size,f[1]*global_seed_size,f[0],f[1]];
		obj.frm = "left_canvas";
		mjump(obj,false);
	}
	else if (cmd == 2) //remove
	{
		var f = getRandomGalerka();
		if(f==null) return executing(1);
		var s = getRandomNM();	
		
		var obj = {};
		obj.nm = [0,0,0,0];
		obj.frm = f.id;
		
		var obj2 = {};
		obj2.nm = [s[0]*global_seed_size,s[1]*global_seed_size,s[0],s[1]];
		obj2.frm = "left_canvas";
		
		mjump_back(obj,obj2);
	}
	else
	{
		alert('not implemented yet')
	}
	
}
/***
игра проиграна, если на галерке все однотонные после хода игрока (0d1n is variants)
***/
function randomize(nn)
{
	//global_color_fields_array = [];
	var n=0;
	var lim = getRandomInt(nn,nn+10);
	if(nn==undefined)  lim = getRandomInt(0,1);
	//Number(document.getElementById("level").value);
	while(true)
	{
	
		var cmd = getRandomInt(0,3);
	
		executing(cmd);
		n++;
		if(n >= lim) break;
		
	}
	
	soundKosh();
}


function cloneCanvas(el)
{
	var tCanvas = document.createElement("canvas");
	tCanvas.width = el.width;
	tCanvas.height = el.height;
	var tContext = tCanvas.getContext("2d");
	tContext.putImageData(el.getContext("2d").getImageData(0,0,el.width,el.height),0,0);
	tCanvas.id = el.id;
	return tCanvas;
}


function clear_koloda()
{
	glob_koloda = null;
	glob_selected_kard = null;
	
	glob_koloda = [];
	var counter=0;
	var list = document.getElementsByTagName("CANVAS");
	for(var i=0;i<list.length;i++)
	{
		if(  (""+list[i].id).indexOf("galerka")==-1  ) continue; 
		
		document.body.removeChild(list[i]);
		
		
	}
		
	
	var myNode = document.getElementById("seeds");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
	
	var myNode = document.getElementById("first_kard");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
	
	
}

function getImageDataFromKoloda(id)
{
	for(var i=0;i<glob_koloda.length;i++)
	{
		var el = glob_koloda[i];
		if(el==null) continue;
		if(el.id==id)
		{
			return el.getContext("2d").getImageData(0,0,el.width,el.height);
		}
	}
	
	return null;
}

var glob_colored_adding_counter=0;
function take_a_fifty_colored()
{
	var res = false;
	glob_colored_adding_counter++;
	var cnt=0;
	for(var i=0;i<glob_koloda.length;i++)
	{
		var el = document.getElementById("first_kard").childNodes[0];
		var imgData = el.getContext("2d").getImageData(0,0,el.width,el.height);
		if(isImageDataAllPointsSame(imgData))
		{
			
			
			var result = jump_rnd_back(imgData);

			if(result != null)
			{
					
				remove_kard(el);
					
				shift_koloda_up();
				
				cnt++;
				
				res = true;
				
				if(cnt == glob_colored_adding_counter) return res;
				
			}	
			
			
			
	
		}
		else
		{
			next_rc_kard();
		}
		
		if(is_exist_background()==false) return res;
		
	}
	
	return res;
}

function take_a_fifty()
{
	
	for(var i=0;i<(glob_koloda.length/2|0);i++)
	{
		//setTimeout(
		//function()
		{
			var el = document.getElementById("first_kard").childNodes[0];
			var result  = jump_rnd_back(el.getContext("2d").getImageData(0,0,el.width,el.height));
			if(result!=null) 
			{
				remove_kard(el);
				
				shift_koloda_up();
				
				//execute_expected();
				
				
			}
			else
			{
				next_rc_kard();
			}
	
		}
		//,1000);
	}
}

function prepare_koloda()
{
	glob_koloda = null;
	glob_koloda = [];
	var counter=0;
	var list = document.getElementsByTagName("CANVAS");
	for(var i=0;i<list.length;i++)
	{
		if(  (""+list[i].id).indexOf("galerka")==-1  ) continue; 
		
		var cnv = cloneCanvas(list[i]);
		cnv.id = "kard_"+counter;
		counter++;
		cnv.onclick = function(e)
		{
		
			//console.log('test click on '+this);
			whenUserClickedKard(e);
		}
		
		cnv.oncontextmenu = function(e)
		{
			//console.log('test contextmenu on '+this);
			//document.getElementById("first_kard").removeChild(this);
			e.preventDefault();
			
			next_rc_kard();
		}
		
		glob_koloda.push(cnv);
		
	}
	
	shuffle(glob_koloda);
	
	var myNode = document.getElementById("seeds");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
	
	
	glob_selected_kard = glob_koloda.length-1;
	
	//var cnv = cloneCanvas(glob_koloda[glob_selected_kard]);
	/*****
	cnv.onclick = function(e)
	{
		var cnv = cloneCanvas(e.target);
		document.getElementById("first_kard").removeChild(e.target);
		document.getElementById("seeds").appendChild(cnv);	
		 
		next_kard(); 
		
	}
	****/
	document.getElementById("first_kard").appendChild(glob_koloda[glob_selected_kard]);
	
}

function moveFirstKardOnGalerka()
{
	//document.getElementById("first_kard").removeChild(document.getElementById("first_kard").childNodes[0]);
	//document.getElementById("seeds").appendChild(glob_koloda[glob_selected_kard]);
	//next_kard();
}

function remove_kard(el)
{
	if(el == null) return;
	
	if(glob_selected_kard == -10)  return;
	
	if( glob_selected_kard < 0 )  return;
	
	if( glob_selected_kard > glob_koloda.length-1 )  return;
	
	var ind = -10;
	for(var i=0;i<glob_koloda.length;i++)
	{
		if(glob_koloda[i] == null) continue;
		if(glob_koloda[i].id==el.id)
		{
			ind=i;
			break;
		}
	}
	
	if(ind == -10) return;
	
	glob_selected_kard	= ind;
	
	document.getElementById("first_kard").removeChild(el);
	
	glob_koloda[glob_selected_kard] = null;
	
	
}



function existKardNotNull()
{
	for(var i=0;i<glob_koloda.length;i++)
	{
		if(glob_koloda[i] != null) return true;
	}
	
	return false;
}

function findFirstNotNullIndex()
{
	if(existKardNotNull()==false) return -10;
	
	var i = glob_selected_kard-1;
	var lim = (glob_koloda.length-1)*3;
	var n = 0;
	while(n < lim)
	{
		if(i == -1) i = glob_koloda.length-1;
		
		if(glob_koloda[i] != null) return i;
		
		i--;
		
		n++;
	}
	
	return -10;
	
}


function next_rc_kard()
{
	
	if(glob_selected_kard == -10) return;
	
	if( glob_selected_kard < 0 )  return;
	
	if( glob_selected_kard > glob_koloda.length-1 )  
	{
		alert('glob_selected_kard > glob_koloda.length-1');
		return;
	}
	
	var myNode = document.getElementById("first_kard");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
			
	glob_selected_kard = findFirstNotNullIndex();
		
	if(glob_selected_kard == -10) return;
		
	document.getElementById("first_kard").appendChild(glob_koloda[glob_selected_kard]);
	
}

function getUniqKardId()
{
	
	var arr = [];
	
	for(var i=0;i<glob_koloda.length;i++)
	{
		if(glob_koloda[i] == null) continue;
		
		arr.push(glob_koloda[i].id);
		
		
	}
	
	
	var nn = 0;
	while(true)
	{
		if(arr.indexOf("kard_"+nn)==-1)
		{
			return "kard_"+nn;
		}
		
		nn++;
		
		if(nn > arr.length+5) break;
			
		
	}
	
	return null;
	
}


function shift_koloda_up()
{
	for( var n = glob_koloda.length-2; n < 1; n--)
	{
		glob_koloda[n] = glob_koloda[n-1];
	}	
	
	glob_selected_kard = findFirstNotNullIndex();
	
	if(glob_selected_kard==-10) return;
	
	document.getElementById("first_kard").appendChild(glob_koloda[glob_selected_kard]);
	
}

function put_kard_to_koloda(imgData, w, h )
{
	
	var id = getUniqKardId();
	if(id==null) return null;
	
	var tCanvas = document.createElement("canvas");
	tCanvas.width = w;
	tCanvas.height = h;
	var tContext = tCanvas.getContext("2d");
	tContext.putImageData(imgData,0,0);
	tCanvas.id = id;
		
	tCanvas.onclick = function(e)
	{
		//console.log('test click on '+this);
		whenUserClickedKard(e);
	}
	
	tCanvas.oncontextmenu = function(e)
	{
		//console.log('test contextmenu on '+this);
		//document.getElementById("first_kard").removeChild(this);
		e.preventDefault();
		
		next_rc_kard();
	}
	
	
	//найти в глубине нулевой
	//сдвинуть остальные 
	//на самый верхний налепить эту новую карту
	var ind= -1;
	for(var i=0;i<glob_koloda.length;i++)
	{
		if(glob_koloda[i] == null) ind=i;
	}
	
	
	if(ind < glob_koloda.length-1)
	{
		//from ind to tile
		var n=ind+1;
		while(true)
		{		
			//each n+1
			glob_koloda[n-1] = glob_koloda[n];
			
			n++;
			
			if( n == glob_koloda.length ) break;
			
			
		}
	}
	
	var myNode = document.getElementById("first_kard");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
	
	glob_koloda[glob_koloda.length-1] = tCanvas;
	
	glob_selected_kard = glob_koloda.length-1;
	
	document.getElementById("first_kard").appendChild(glob_koloda[glob_selected_kard]);
	
	return glob_koloda[glob_selected_kard];
	
}

function is_exist_background( )
{
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var nn = canvas.width / global_seed_size;
	var mm = canvas.height / global_seed_size;
	var arrP = [];
	for(var j=0;j<nn;j++)
	{
		for(var i=0;i<mm;i++)
		{
			var obj = {};
			obj.nm = [i*global_seed_size,j*global_seed_size,i,j];
			obj.frm = "left_canvas";
			
			var imgData = getImageDataFromObject(obj);
			if(isImageDataCellBackground(imgData))	return true;
			
		}
	} 
	
	return false;
}

function check_not_exist_colored( success )
{
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var nn = canvas.width / global_seed_size;
	var mm = canvas.height / global_seed_size;
	var arrP = [];
	for(var j=0;j<nn;j++)
	{
		for(var i=0;i<mm;i++)
		{
			var obj = {};
			obj.nm = [i*global_seed_size,j*global_seed_size,i,j];
			obj.frm = "left_canvas";
			
			var imgData = getImageDataFromObject(obj);
			if(isImageDataAllPointsSame(imgData))	arrP.push(obj);
			
		}
	} 
	
	if(arrP.length == 0)  return true; 
	
	return false;
}


function all_down()
{
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var nn = canvas.width / global_seed_size;
	var mm = canvas.height / global_seed_size;
	for(var j=0;j<nn;j++)
	{
		for(var i=0;i<mm;i++)
		{
			var obj = {};
			obj.nm = [i*global_seed_size,j*global_seed_size,i,j];
			obj.frm = "left_canvas";
			mjump(obj,false);
			//setTimeout( function() { }, 500);
		}
	} 
	//sound();
	for(var j=0;j<nn;j++)
	{
		for(var i=0;i<mm;i++)
		{
			var obj = {};
			obj.nm = [i*global_seed_size,j*global_seed_size,i,j];
			obj.frm = "left_canvas";
			mjump(obj,false);
			//setTimeout( function() { }, 500);
		}
	} 
	soundKosh();
}

function all_down2()
{
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var nn = canvas.width / global_seed_size;
	var mm = canvas.height / global_seed_size;
	for(var j=0;j<nn;j++)
	{
		for(var i=0;i<mm;i++)
		{
			var obj = {};
			obj.nm = [i*global_seed_size,j*global_seed_size,i,j];
			obj.frm = "left_canvas";
			mjump(obj,false);
			//setTimeout( function() { }, 500);
		}
	} 
	//sound();
	for(var j=0;j<nn;j++)
	{
		for(var i=0;i<mm;i++)
		{
			var obj = {};
			obj.nm = [i*global_seed_size,j*global_seed_size,i,j];
			obj.frm = "left_canvas";
			mjump(obj,false);
			//setTimeout( function() { }, 500);
		}
	} 
	soundKosh();
}


/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

function getOkrPlaceArray0(n,m)
{
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var lim_n = canvas.width / global_seed_size - 1;
	var lim_m = canvas.height / global_seed_size - 1;
	
	var arr = [];
	if(n==0)
	{
		if(m==0)
		{
			arr.push([1,0]);
			arr.push([0,1]);
			arr.push([1,1]);
		}
		else if(m==lim_m)
		{
			arr.push([0,lim_m-1]);
			arr.push([1,lim_m]);
			arr.push([1,lim_m-1]);
		}
		else
		{
			arr.push([0,m-1]);
			arr.push([1,m-1]);
			arr.push([1,m]);
			arr.push([1,m+1]);
			arr.push([0,m+1]);
		}
		
	}
	else if(n == lim_n)
	{
		if(m==0)
		{
			arr.push([n-1,m]);
			arr.push([n,m+1]);
			arr.push([n-1,m+1]);
		}
		else if(m==lim_m)
		{
			arr.push([n,m-1]);
			arr.push([n-1,m]);
			arr.push([n-1,m-1]);
		}
		else
		{
			arr.push([n,m-1]);
			arr.push([n-1,m-1]);
			arr.push([n-1,m]);
			arr.push([n-1,m+1]);
			arr.push([n,m+1]);
		}
	}
	else
	{
		if(m==0)
		{
			arr.push([n-1,m]);
			arr.push([n-1,m+1]);
			arr.push([n+1,m]);
			arr.push([n+1,m+1]);
			arr.push([n,m+1]);
		}
		else if(m==lim_m)
		{
			arr.push([n-1,m]);
			arr.push([n-1,m-1]);
			arr.push([n,m-1]);
			arr.push([n+1,m-1]);
			arr.push([n+1,m]);
		}
		else
		{
			arr.push([n-1,m-1]);
			arr.push([n,m-1]);
			arr.push([n+1,m-1]);
			
			arr.push([n-1,m]);
			//arr.push([n,m]);
			arr.push([n+1,m]);
			
			arr.push([n-1,m+1]);
			arr.push([n,m+1]);
			arr.push([n+1,m+1]);
		}
	}
	/****
	for(var i=0;i<arr.length;i++)
	{
		context.lineWidth = 2;
		context.fillStyle = "black";
		context.fillRect(arr[i][0]*global_seed_size+5,arr[i][1]*global_seed_size+5,global_seed_size-20,global_seed_size-20);
	}
	****/
	return arr;
}

function get_allowed_swap(obj)
{
	var imgData0 = getImageDataFromObject(obj);
	if(isImageDataCellPatterned(imgData0))
	{
		var arrP = [];
		var arrA = [];
		var arr = getOkrPlaceArray0(obj.nm[2],obj.nm[3]);
		for(var i=0;i<arr.length;i++)
		{
			var n = arr[i][0];
			var m = arr[i][1];
			var obj2 = {};
			obj2.nm = [n*global_seed_size,m*global_seed_size,n,m];
			obj2.frm = "left_canvas";
			
			var imgData = getImageDataFromObject(obj2);
			if(isImageDataCellPatterned(imgData))
			{
				if(cmp(imgData0,imgData)==false) arrP.push(obj2);
				
			}	
			//else if(isImageDataAllPointsSame(imgData)) arrA.push(obj2);
			
			//var tObj = getEmptyCellNear(obj1.frm, obj1, obj2);
			//if(tObj == null) return -1;
			
			
			
			//if(swap(obj,obj2,false)==1) arr2.push(obj2);
		}
		
		
		
		if((arrP.length > 0) 
	//		&& (arrA.length > 0))
		) return arrP[getRandomInt(0,arrP.length)];
		return null;
	}
	
	
	if(isImageDataAllPointsSame(imgData0))
	{
		var arrP = [];
		var arrA = [];
		var arr = getOkrPlaceArray0(obj.nm[2],obj.nm[3]);
		for(var i=0;i<arr.length;i++)
		{
			var n = arr[i][0];
			var m = arr[i][1];
			var obj2 = {};
			obj2.nm = [n*global_seed_size,m*global_seed_size,n,m];
			obj2.frm = "left_canvas";
			
			var imgData = getImageDataFromObject(obj2);
			if(isImageDataAllPointsSame(imgData))
			{
				if(cmp(imgData0,imgData)==false) arrP.push(obj2);
				
			}	
			//else if(isImageDataAllPointsSame(imgData)) arrA.push(obj2);
			
			//var tObj = getEmptyCellNear(obj1.frm, obj1, obj2);
			//if(tObj == null) return -1;
			
			
			
			//if(swap(obj,obj2,false)==1) arr2.push(obj2);
		}
		
		
		
		if((arrP.length > 0) 
	//		&& (arrA.length > 0))
		) return arrP[getRandomInt(0,arrP.length)];
		return null;
	}
	
}


function findAllColoredCell()
{
	var arr = [];
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var nn = canvas.width;
	var mm = canvas.height;
	for(var j=0;j<mm;j+=global_seed_size)
	{
		for(var i=0;i<nn;i+=global_seed_size)
		{
			var imgData = context.getImageData(i,j,global_seed_size,global_seed_size);
			if(isImageDataAllPointsSame(imgData))
			{
				arr.push([i/global_seed_size,j/global_seed_size]);
			}
		}
	}
		
	return arr;
}

function findAllBackgroundCell()
{
	var arr = [];
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var nn = canvas.width;
	var mm = canvas.height;
	for(var j=0;j<mm;j+=global_seed_size)
	{
		for(var i=0;i<nn;i+=global_seed_size)
		{
			var imgData = context.getImageData(i,j,global_seed_size,global_seed_size);
			if(isImageDataCellBackground(imgData))
			{
				arr.push([i/global_seed_size,j/global_seed_size]);
			}
		}
	}
		
	return arr;
}

function findAllBackgroundCellInArray(arr)
{
	var arr2 = [];
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	for(var i=0;i<arr.length;i++)
	{
		var n = arr[i][0];
		var m = arr[i][1];
		var imageData = context.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
		if(isImageDataCellBackground(imageData)) arr2.push(arr[i]);
	}			
	return arr2;
}


function findAllColoredCellInArray(arr)
{
	var arr2 = [];
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	for(var i=0;i<arr.length;i++)
	{
		var n = arr[i][0];
		var m = arr[i][1];
		var imageData = context.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
		if(isImageDataAllPointsSame(imageData)) arr2.push(arr[i]);
	}			
	return arr2;
}

function findAllPatternedCellInArray(arr)
{
	var arr2 = [];
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	for(var i=0;i<arr.length;i++)
	{
		var n = arr[i][0];
		var m = arr[i][1];
		var imageData = context.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
		if(isImageDataCellPatterned(imageData)) arr2.push(arr[i]);
	}			
	return arr2;
}

function get_allowed_move(obj)
{
	var imgData0 = getImageDataFromObject(obj);
	var arrOkr = getOkrPlaceArray0(obj.nm[2],obj.nm[3]);
	
	if(isImageDataCellPatterned(imgData0))
	{
		var arrA = [];
		var arr = findAllColoredCellInArray(arrOkr); //getOkrPlaceArray0(obj.nm[2],obj.nm[3]);
		for(var i=0;i<arr.length;i++)
		{
			var n = arr[i][0];
			var m = arr[i][1];
			var obj2 = {};
			obj2.nm = [n*global_seed_size,m*global_seed_size,n,m];
			obj2.frm = "left_canvas";
			
			//var imgData = getImageDataFromObject(obj2);
			
			arrA.push(obj2);
			
			
		}
		
		if (arrA.length > 0) return arrA[getRandomInt(0,arrA.length)];
		return null;
		
		
		
	}
    
	else if(isImageDataAllPointsSame(imgData0))
	{
		var arrG = [];
		var arr = findAllBackgroundCellInArray(arrOkr); //getOkrPlaceArray0(obj.nm[2],obj.nm[3]);
		for(var i=0;i<arr.length;i++)
		{
			var n = arr[i][0];
			var m = arr[i][1];
			var obj2 = {};
			obj2.nm = [n*global_seed_size,m*global_seed_size,n,m];
			obj2.frm = "left_canvas";
			
			//var imgData = getImageDataFromObject(obj2);
			
			arrG.push(obj2);
			
			
		}
		
		if (arrG.length > 0) return arrG[getRandomInt(0,arrG.length)];
		return null;		
	}
	
	else return null;
}

function get_allowed_jump_back(obj)
{
	var imgData0 = getImageDataFromObject(obj);
	if(isImageDataCellPatterned(imgData0))
	{
		
	var arrP = [];
	var arrA = [];
	var arr = findAllColoredCell(); //getOkrPlaceArray0(obj.nm[2],obj.nm[3]);
	for(var i=0;i<arr.length;i++)
	{
		var n = arr[i][0];
		var m = arr[i][1];
		var obj2 = {};
		obj2.nm = [n*global_seed_size,m*global_seed_size,n,m];
		obj2.frm = "left_canvas";
		
		//var imgData = getImageDataFromObject(obj2);
		
		//if(isImageDataCellPatterned(imgData))
		//{
		//	if(cmp(imgData0,imgData)==false) arrP.push(obj2);
			
		//}	
		//else 
		//if(isImageDataAllPointsSame(imgData)) 
			arrA.push(obj2);
		
		//var tObj = getEmptyCellNear(obj1.frm, obj1, obj2);
		//if(tObj == null) return -1;
		
		
		
		//if(swap(obj,obj2,false)==1) arr2.push(obj2);
	}
	
	
	
	//if((arrP.length > 0)  && 
	if (arrA.length > 0) return arrA[getRandomInt(0,arrA.length)];
	return null;
	
	}
	else if (isImageDataAllPointsSame(imgData0))
	{
		//var arrP = [];
	var arrA = [];
	var arr = findAllBackgroundCell(); //getOkrPlaceArray0(obj.nm[2],obj.nm[3]);
	for(var i=0;i<arr.length;i++)
	{
		var n = arr[i][0];
		var m = arr[i][1];
		var obj2 = {};
		obj2.nm = [n*global_seed_size,m*global_seed_size,n,m];
		obj2.frm = "left_canvas";
		
		//var imgData = getImageDataFromObject(obj2);
		
		//if(isImageDataCellPatterned(imgData))
		//{
		//	if(cmp(imgData0,imgData)==false) arrP.push(obj2);
			
		//}	
		//else 
		//if(isImageDataAllPointsSame(imgData)) 
			arrA.push(obj2);
		
		//var tObj = getEmptyCellNear(obj1.frm, obj1, obj2);
		//if(tObj == null) return -1;
		
		
		
		//if(swap(obj,obj2,false)==1) arr2.push(obj2);
	}
	
	
	
	//if((arrP.length > 0)  && 
	if (arrA.length > 0) return arrA[getRandomInt(0,arrA.length)];
	return null;
	}
	
	return null;
	
}


function getImageDataFrom(id,n,m)
{
	if (id.indexOf('stop_symbol')!=-1)
	{
		var tCanvas = document.createElement("canvas");
		tCanvas.width = global_seed_size;
		tCanvas.height = global_seed_size;
		var tContext = tCanvas.getContext("2d");
		tContext.fillStyle = "#8F8F8F";
		tContext.fillRect(0,0,tCanvas.width,tCanvas.height);
		return tContext.getImageData(0,0,tCanvas.width,tCanvas.height);
	}
	if(id.indexOf('left_canvas')!=-1)
	{
	
	var canvas = document.getElementById(id);
	var context = canvas.getContext("2d");
	
	return context.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
	}
	
		if(id.indexOf('center_canvas')!=-1)
	{
	
	var canvas = document.getElementById(id);
	var context = canvas.getContext("2d");
	
	return context.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
	}
	

		if(id.indexOf('right_canvas')!=-1)
	{
	
	var canvas = document.getElementById(id);
	var context = canvas.getContext("2d");
	
	return context.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
	}
	if( id.indexOf('kard_')!=-1) return getImageDataFromKoloda(id);
	
	
	return null;
	
	
}

function isFreeze(imgData, n, m, imgData2, n2, m2 )  //фрегл ставится только на свою плашку
{
	
	if(isImageDataCellPatterned(imgData) && isImageDataAllPointsSame(imgData2))
	{
		var col = getStrColorFromImageData(imgData2);
		for(var i=0;i<global_mapped_colors.length;i++)
		{
			if(cmp(imgData,global_mapped_colors[i].imgData))
			{
				if(global_mapped_colors[i].color == col) return true;
			}
		}
		
		return false;	
		
		//var imgData4 = getImageDataFrom("center_canvas",n,m);
		
		//var imgData3 = getImageDataFrom("right_canvas",n,m);
		///cmp(imgData,imgData3);
		
		//global_mapped_colors
		//imgData, color, n, m
	}
	else return true;
	
	/***********/
}

/****	
	if()
	{
		
		var imgData2 = getImageDataFrom("center_canvas",n,m);
		return cmp(imgData,imgData2);
		
	}
	
	if(isImageDataCellPatterned(imgData))
	{
		return false;
		//var imgData2 = getImageDataFrom("right_canvas",n,m);
		//return cmp(imgData,imgData2);
		
	}
	
	return true;
}


****/



var arr_gun = null;


function jump_rnd_back2(obj1, obj2)
{
	var arr = null;
	
	var imgData = getImageDataFromObject(obj1);
	
	if(isImageDataAllPointsSame(imgData))
	{
		//get all bgcolor
		//if list == null return -1
		arr =  findAllBackgroundCell();
		if (arr.length==0) return null;
		
		var i = getRandomInt(0,arr.length);
		//var n = arr[i][0];
		//var m = arr[i][1];
		
		var n = obj2.nm[2];
		var m = obj2.nm[3];
		
		var imgData2 = getImageDataFromObject(obj2); //;getImageDataFrom("left_canvas", n, m);
		
		if(isImageDataCellBackground(imgData2))
		{
				
		
			var canvas = document.getElementById("left_canvas");
			var context = canvas.getContext("2d");
			
			
			
			var r = findNMinColoredSpecial(n,m);
			if(r != -1)
			{
				var obj27 = glob_colored_special_arr[r];
				/*****
				var obj2 = {};
				obj2.n = i/global_seed_size;
				obj2.m = j/global_seed_size;
				obj2.color = getBackgroundColor();
				obj2.obj = obj;
				*****/
				
				context.putImageData(imgData, n*global_seed_size, m*global_seed_size );
				
				obj27.color = getColorFromLeftCanvas (n*global_seed_size,m*global_seed_size,1,1);
				glob_colored_special_arr[r] = obj27;
				
				return obj2; //.obj;
				
			}
		
		}
		
		return null;
	
		
	}
	
	
	if(isImageDataCellPatterned(imgData))
	{
		//get all bgcolor
		arr =  findAllColoredCell();
		if (arr.length==0) return null;
		
		//var i = getRandomInt(0,arr.length);
		//var n = arr[i][0];
		//var m = arr[i][1];
		
		var n = obj2.nm[2];
		var m = obj2.nm[3];
		
		var imgData2 = getImageDataFromObject(obj2); //;getImageDataFrom("left_canvas", n, m);
		
		if(isImageDataAllPointsSame(imgData2))
		{
			
		//var imgData2 = getImageDataFrom("left_canvas", n, m);
		
	
	// if(magic_not_allowed(obj1,obj2)) return -1;
	
		var canvas = document.getElementById("left_canvas");
		var context = canvas.getContext("2d");
		
		context.putImageData(imgData, n*global_seed_size, m*global_seed_size );
		
		//document.getElementById("seeds").removeChild(document.getElementById(obj1.frm));
		//var obj = {};
		//obj.frm = "left_canvas";
		//obj.nm = [n*global_seed_size+1,m*global_seed_size+1,n,m];
		
		return obj2;	
		
		}
	
		
	}
	
	return null;
	
		
}

function jump_rnd_back(imgData)
{
	var arr = null;
	if(isImageDataAllPointsSame(imgData))
	{
		//get all bgcolor
		//if list == null return -1
		arr =  findAllBackgroundCell();
		if (arr.length==0) return null;
		
		var i = getRandomInt(0,arr.length);
		var n = arr[i][0];
		var m = arr[i][1];
		
		var imgData2 = getImageDataFrom("left_canvas", n, m);
				
		
		var canvas = document.getElementById("left_canvas");
		var context = canvas.getContext("2d");
		
		context.putImageData(imgData, n*global_seed_size, m*global_seed_size );
		
		var r = findNMinColoredSpecial(n,m);
		if(r != -1)
		{
			var obj2 = glob_colored_special_arr[r];
			/*****
			var obj2 = {};
			obj2.n = i/global_seed_size;
			obj2.m = j/global_seed_size;
			obj2.color = getBackgroundColor();
			obj2.obj = obj;
			*****/
			obj2.color = getColorFromLeftCanvas (n*global_seed_size,m*global_seed_size,1,1);
			glob_colored_special_arr[r] = obj2;
			
			return obj2.obj;
			
		}
		
		return null;
	
		
	}
	
	
	if(isImageDataCellPatterned(imgData))
	{
		//get all bgcolor
		arr =  findAllColoredCell();
		if (arr.length==0) return null;
		
		var i = getRandomInt(0,arr.length);
		var n = arr[i][0];
		var m = arr[i][1];
		
		var imgData2 = getImageDataFrom("left_canvas", n, m);
		
	
	// if(magic_not_allowed(obj1,obj2)) return -1;
	
		var canvas = document.getElementById("left_canvas");
		var context = canvas.getContext("2d");
		
		context.putImageData(imgData, n*global_seed_size, m*global_seed_size );
		
		//document.getElementById("seeds").removeChild(document.getElementById(obj1.frm));
		var obj = {};
		obj.frm = "left_canvas";
		obj.nm = [n*global_seed_size+1,m*global_seed_size+1,n,m];
		
		return obj;	
	
		
	}
	
	return null;
	
		
}
//empty cell instead null


function whenUserClickedKard(e)
{
	e.preventDefault();
	
	if(global_game_finished) return;
	
	if(global_inverse_mode) return;
	
	sound();
	
		
	if(e.target.parentElement == document.getElementById("first_kard")) 
	{
		
		var obj = {};
		obj.frm = e.target.id;
		obj.nm = [0,0,0,0];
		
		
		if( arr_gun == null) arr_gun = [];
		
		
		
		
		
		
		arr_gun.push(obj);
				
		/****
		if(arr_gun != null)
		{
			if(arr_gun.length == 1)
			{
				//mjhgk 
				var obj = {};
				obj.frm = arr_gun[0].frm;
				obj.nm = [arr_gun[0].nm[0],arr_gun[0].nm[1],arr_gun[0].nm[2],arr_gun[0].nm[3]];
				
				arr_gun.push(obj);
				
				multy_shoot();
				
				return;
			}
		}
		
		var result = jump_rnd_back(e.target.getContext("2d").getImageData(0,0,e.target.width,e.target.height));
		
		//we need to shift up наверх всю колоду сдвинуть
		
		
		if( result!= null ) 
		{
			remove_kard(e.target);
			
			shift_koloda_up();
			
			
			if(arr_gun==null) { arr_gun = null; arr_gun = []; }
			
	//		arr_gun.push(result);
			
	//		if(arr_gun.length==2) return multy_shoot();
			
			
			
			//execute_expected();
			
			
		}
		else
		{
			next_rc_kard();
		}
			
		******/
		
		render();
		
		// if(is_game_finished()) { finish_game(); return; }
		
		
	
	}

}

/*****
function whenUserClickedGalerka(e)
{
	e.preventDefault();
	
	if(arr_gun==null) arr_gun = [];
	
		
	if( arr_gun.length > 3 ) { arr_gun=null; arr_gun=[];}
	//а чебы не показывать? вот и будет тебе магия

	arr_gun.push(get_selected_object(e));
	
	shoot();
}
****/

function check_prizrak()
{
	var obj = arr_gun[0];
	var imgData = getImageDataFromObject(obj);
	if(isImageDataCellBackground(imgData)) return true;
	return false;
}

function whenUserLeftClickOnLeftCanvas(e)
{
	
	if(global_game_finished) return;
	
	if(global_inverse_mode) return;
		
	e.preventDefault();
	
	if(arr_gun==null) { arr_gun = null; arr_gun = []; }
	
	var obj = get_selected_object(e);
	//if(check_own_place2(obj)==true)
	{
	//	if (arr_gun.length==0) { soundKosh(); return; }
		
	}
	
	arr_gun.push(obj);
	
	if(arr_gun.length>=2) 
	{
		multy_shoot();
		//if(arr_gun != null)
		//if(arr_gun.length==1) if(check_prizrak()) 
			
		// { arr_gun = null; arr_gun = []; }
	}
	else
	{
		render();
		
		sound();
	}

	//sound();
	
	// render();
	
	// if(is_game_finished()) { finish_game(); return; }
	
	
	
	/****
	if( arr_gun.length == 2 )
	{
		
		multy_shoot();
		
	}
	else if(arr_gun.length < 2)
	{
		return;
	}
	else 
	{ 
		
		arr_gun=null; 
		
		arr_gun=[];
	}
	****/
	
	//а чебы не показывать? вот и будет тебе магия
	
	// render();
	
	
	
	/*****
	
	e.preventDefault();
	
	var nm = get_selected_seed(e);
	var obj = {};
	obj.frm = 'left_canvas';
	obj.nm = nm;
	
	addMagik(obj);
	
	******/
	
	//return;
	
	
	
}

var all_checked=false;

function user_move(obj1, obj2)
{
	if(obj1 == null) return -1;
	if(obj2 == null) return -1;
	
	//alert('todo://jump pattern and colored Only not exact places! krepostnoe pravo eto kogda jump bacn on own color');
	
//	if(document.getElementById("qflag1").checked == true ) all_checked=true;
	
	var imgData1 = getImageDataFromObject(obj1);
	var n1 = obj1.nm[2];
	var m1 = obj1.nm[3];
	
	var imgData2 = getImageDataFromObject(obj2);
	var n2 = obj2.nm[2];
	var m2 = obj2.nm[3];
	
	if( (obj1.frm.indexOf("galerka")!= -1 ) && (obj2.frm.indexOf("left_canvas")!= -1 ) )
	{
		if(all_checked) 
		{
			all_checked=false;
			
			return jump_all_back(obj1, obj2);
		}
		
		if( isImageDataAllPointsSame(imgData1) )
		{
		//	var imgData3 = getImageDataFrom("center_canvas",n2,m2);
		//	if(cmp(imgData1,imgData3)) 
		//	{
		//		if(glob_float_mode==true)  return jump_back(obj1, get_allowed_jump_back(obj1));
				return jump_back(obj1, obj2);
		//	}
		//	else
		//	{
		//		return jump_back(obj1, obj2);
		//	}
				
			//if obj2 in center_canvas == imgData1 then float jump
			//else exact jump
		}
		
		//krepostnoe pravo
		if( isImageDataCellPatterned(imgData1) ) //krepostnoe pravo
		{
			//if obj2 in right_canvas == imgData1 then float jump
			//else exact jump
		} //krepostnoe pravo
		
		if(glob_float_mode==true)  return jump_back(obj1, get_allowed_jump_back(obj1));
		
		return jump_back(obj1, obj2);
		
	}
	else if ( (obj1.frm.indexOf("left_canvas")!= -1 ) && (obj2.frm.indexOf("left_canvas")!= -1 ) )
	{
		if((n1 == n2) && (m1==m2))
		{
			if(all_checked)
			{
				all_checked=false;
				return jump_all(obj1);
			}
			
			//if(glob_float_mode==true) return jump(obj1, get_allowed_jump(obj1));
			
			return jump(obj1);
		}
		
		if( isImageDataCellPatterned(imgData1) && isImageDataCellPatterned(imgData2) )
		{
			if(cmp(imgData1, imgData2)) 
			{
				all_checked = true;
				return 1; 
			}
			
			if(all_checked) 
			{
				all_checked=false;
				return swap_all(obj1, obj2, true);
			}
			
			var imgData3 = getImageDataFrom("right_canvas",n2,m2);
			if(cmp(imgData1,imgData3)) 
			{
				return swap(obj1, obj2, true);
			}
			
			return -1;
			
			// if(glob_float_mode==true) return  swap(obj1,  get_allowed_swap(obj1), true);
			
			// return swap(obj1, obj2, true);
		}
		
		if( isImageDataAllPointsSame(imgData1) && isImageDataAllPointsSame(imgData2) )
		{
			if(cmp(imgData1, imgData2)) 
			{
				all_checked = true;
				return 1; 
			}
			
			if(all_checked) 
			{
				all_checked=false;
				
				return -1;
				//return swap_all(obj1, obj2, true);
			}
			
			var imgData3 = getImageDataFrom("center_canvas",n2,m2);
			if(cmp(imgData1,imgData3)) 
			{
				return swap(obj1, obj2, true);
			}
			
			return -1;
			
		//	if(glob_float_mode==true) return  swap(obj1,  get_allowed_swap(obj1), true);
			
		//	return swap(obj1, obj2, true);
			
		}
		
		
		if(isImageDataCellPatterned(imgData1) && isImageDataAllPointsSame(imgData2))
		{
			
			var imgData3 = getImageDataFrom("right_canvas",n2,m2);
			if(cmp(imgData1,imgData3)) 
			{
				//return user_move(obj1, get_allowed_move(obj1));
			}
			
			return move(obj1, obj2);
			
			
			//if(glob_float_mode==true) return  move(obj1,  get_allowed_move(obj1), true);
			
			//
		}
		
		if( isImageDataAllPointsSame(imgData1) && isImageDataCellBackground(imgData2)  )
		{
			//if(glob_float_mode==true) return  move(obj1,  get_allowed_move(obj1), true);
			
			var arrOkr = getOkrPlaceArray0(obj1.nm[2],obj1.nm[3]);
		
			var arr = findAllColoredCellInArray(arrOkr);
			if(arr.length > 0) return move(obj1, obj2);
		
		
		
    	}
	}
	 
}

function getLastMagikId()
{
	var arr = [];
	var list = document.getElementsByTagName("CANVAS");
	for(var i=0;i<list.length;i++)
	{
		if(  (""+list[i].id).indexOf("_magik_")!=-1  ) continue; 
		if(  (""+list[i].id).indexOf("magik_")==-1  ) continue; 
		arr.push(list[i].id);
		
	}
	
	if(arr.length == 0) return null;
	return arr[arr.length-1];
	
}

function render()
{
	//var nnn7 = 0;
	//while(true)
	{
		var myNode = document.getElementById("magik_line0");
		if(myNode != null)
		{
			while (myNode.firstChild) {
				myNode.removeChild(myNode.firstChild);
			}
		}
		
	}
	
	if(arr_gun != null)
	{
		
		if(arr_gun.length > 0)
		{
			
			process_stop_symbol();
				
			
			for(var i=0;i<arr_gun.length;i++)
			{
				
				if(arr_gun[i] == null) continue;
				
				var tCanvas = document.createElement("canvas");
				tCanvas.width = global_seed_size;
				tCanvas.height = global_seed_size;
				var tContext = tCanvas.getContext("2d");
				
				var imgData = getImageDataFrom(arr_gun[i].frm, arr_gun[i].nm[2], arr_gun[i].nm[3]);
				
				if(imgData == null)
				{
					alert("Error: not found imgData for: ["+arr_gun[i].frm+"]");
					console.log("Error: not found imgData for: ["+arr_gun[i].frm+"]");
					continue;
				}				
					
				tContext.putImageData(imgData,0,0);
				tContext.globalAlpha = 0.5;
				tCanvas.id = "magik_"+i;
				tCanvas.onclick = function(e)
				{
					/*****/
					
					var last_id = getLastMagikId();
					if(last_id==null) return;
					if(this.id == last_id)
					{
						
						// execute_expected();
						
						// magic_processing();
						
						multy_shoot();
						
					}
					else
					{
						/****
						document.getElementById("magik_line0").removeChild(this);
						
						if(arr_gun.length>0) arr_gun.splice(arr_gun.length-1,1);
						
						else { arr_gun = null; arr_gun = []; }
						***/
					}
					/****/
					
					e.preventDefault();
					
					if(arr_gun.length == 1)
					{
						//e.target.parentElement.removeChild(e.target);
					
						arr_gun.splice(0,1);
						render();
					}
					
				}
				
				tCanvas.oncontextmenu = function(e)
				{
					
					e.preventDefault();
					 
					
					var myNode = document.getElementById("magik_line0");
					for(var i=0;i<myNode.childNodes.length;i++)
					{
						if(myNode.childNodes[i].id==e.target.id)
						{
							arr_gun.splice(i,1);
							break;
						}
					}
					
					
					e.target.parentElement.removeChild(e.target);
					 
				}
				
				document.getElementById("magik_line0").appendChild(tCanvas);
				
			}
			
	    }
		
		// document.getElementById("magik_line0").appendChild(create_button(1,1,"+"));
		
	
	}
	else arr_gun = [];
	
	
}

function execute_expected()
{
	var eml = document.getElementById("expected_magik_list");
	if(eml == null) return;
	
	eml = eml.childNodes;
	
	for (var i=0;i<eml.length;i++)
	{
		//console.log(""+eml[i]); //awaiting_magik_line
		var arr_gun2 = [];
		var list2 = eml[i].childNodes; //document.getElementById("expected_magik_list");
		for(var j=0;j<list2.length;j++)
		{
			arr_gun2.push(list2[j].childNodes[0].obj);
		}
		var result = shoot_magik(arr_gun2);
		if(result==1) { 
		
			var myNode = document.getElementById(eml[i].id);
			while (myNode.firstChild) {
				myNode.removeChild(myNode.firstChild);
			}
			execute_expected();
		}
	}
}

function getNewUniqMagikLineId()
{
	var arr = [];
	var list = document.getElementsByTagName("div");
	for(var i=0;i<list.length;i++)
	{
		if(  (""+list[i].id).indexOf("awaiting_magik_line_")==-1  ) continue; 
		arr.push(list[i].id);
		
	}
	
	if(arr.length == 0) return "awaiting_magik_line_0";
	var n=0;
	while(true)
	{
		var id = "awaiting_magik_line_"+n;
		if(arr.indexOf(id)== -1) return id;
		n++;
	}
}

var global_selected_awaiting_magik_line = null;

function addMagik(obj)
{
	var arr = [];
	arr.push(obj);
	
	var eml = document.getElementById("expected_magik_list");
	if(eml == null) 
	{
		eml = document.createElement("div");
		eml.id  = "expected_magik_list";
		document.body.appendChild(eml);
		addMagik(obj);
	}
	
	
	
	if(global_selected_awaiting_magik_line==null) global_selected_awaiting_magik_line=getNewUniqMagikLineId();
	
	var elm = document.getElementById(global_selected_awaiting_magik_line);
	if(elm == null)
	{
		var elm = document.createElement("div");
		elm.id = global_selected_awaiting_magik_line;//document.getElementById("awaiting_magik_line")
		elm.onclick = function(e)
		{
			e.preventDefault();
			
			if(global_selected_awaiting_magik_line==null)
			{
				global_selected_awaiting_magik_line = this.id;
			
				//this.style.border = "1px solid red";
				this.style['background-color'] = "lightgray";
				///////////////////
			}
			else if(global_selected_awaiting_magik_line==this.id)
			{
				global_selected_awaiting_magik_line = null;
			
				//this.style.border = "";
				this.style['background-color'] = "";
				//////////////////
			}
			else
			{
				global_selected_awaiting_magik_line = this.id;
			
				//this.style.border = "1px solid red";
				this.style['background-color'] = "lightgray";
				///////////////////
			}
			
		}
		elm.oncontextmenu = function(e)
		{
			
			
			
			
		}
		
		//elm.style.border = "1px solid red";
		//this.style.border = "1px solid red";
		elm.style['background-color'] = "lightgray";
		///////////////////
		//global_selected_awaiting_magik_line = elm.id;
	}
	
	elm.style.margin = "0px";
	
	for(var i=0;i<arr.length;i++)
	{
		var tSpan = document.createElement("span");
		tSpan.style = "display:inline-block; vertical-align:middle";
		//tSpan.style.border = "1px solid gray";
		var tCanvas = document.createElement("canvas");
		tCanvas.width = global_seed_size;
		tCanvas.height =  global_seed_size;
		var tContext = tCanvas.getContext("2d");
		tContext.putImageData(getImageDataFromObject(arr[i]),0,0);
		tCanvas.id = "awaiting_magik_element_"+i;
		tCanvas.obj = arr[i];
		
		tCanvas.oncontextmenu = function(e)
		{
			e.preventDefault();
			
			var t = this.parentElement;
			t.removeChild(this);
			t.parentElement.removeChild(t);
			
			if(elm.childNodes.length==0)
			{
				global_selected_awaiting_magik_line = null;
				
				//elm.style.border = "";
				elm.style['background-color'] = "";
				///////////////////
			}
			
		}
		
		
		tSpan.appendChild(tCanvas);
		
		elm.appendChild(tSpan);
	}
	eml.appendChild(elm);
}

function whenResultMinusOne()
{
	var eml = document.getElementById("expected_magik_list");
	if(eml == null) 
	{
		eml = document.createElement("div");
		eml.id  = "expected_magik_list";
		document.body.appendChild(eml);
		whenResultMinusOne();
	}
	
	var elm = document.createElement("div");
	elm.id = getNewUniqMagikLineId();//document.getElementById("awaiting_magik_line")
	for(var i=0;i<arr_gun.length;i++)
	{
		var tSpan = document.createElement("span");
		var tCanvas = document.createElement("canvas");
		tCanvas.width = global_seed_size;
		tCanvas.height =  global_seed_size;
		var tContext = tCanvas.getContext("2d");
		tContext.putImageData(getImageDataFromObject(arr_gun[i]),0,0);
		tCanvas.id = "awaiting_magik_element_"+i;
		tCanvas.obj = arr_gun[i];
		
		tSpan.appendChild(tCanvas);
		
		elm.appendChild(tSpan);
	}
	eml.appendChild(elm);
}

/****
function arr_gun_null()
{
	setTimeout( function() {
		
	all_checked=false;
				
	arr_gun = null;
	
	render();
	
	}, 1000 );
}
****/

function _msht( t_arg, n )
{
	
	var obj = shoot(t_arg);
	
	if(obj == null)
	{
		arr_gun_null();
		return;
	}
	
	n++;
	
	if(n >= arr_gun.length) 
	{
		arr_gun_null();
		return obj;
	}
	
	t_arg =  null;
	t_arg = [];
	t_arg.push(obj);
	t_arg.push(arr_gun[n]);
	
	setTimeout( function()	{	_msht( t_arg, n );  },  1000 );
	
}

function rem_multy_shoot()
{
	if(arr_gun == null) return;
	if(arr_gun.length == 0) return;
	if(arr_gun.length == 1) return;
	
	
	var n = 1;
	
	var t_arg =  null;
	t_arg = [];
	t_arg.push(arr_gun[0]);
	t_arg.push(arr_gun[n]);
		
	
	setTimeout( function()	{	_msht( t_arg, n );  },  1000 );
		
	
	
	
}



function rem_multy_shoot()
{
	
	if(arr_gun == null) return;
	
	if(arr_gun.length == 0) return;
	
	render();
	
	if(is_game_finished()) { finish_game(); return; }
	
	if(arr_gun.length == 1) return;
	
	while(true)
	{
		
		//break;
		
		render();
		
		//setTimeout( function()	{	render();  },  300 );
			
		var t_arg =  null;
		
		t_arg = [];
		t_arg.push(arr_gun[0]);
		t_arg.push(arr_gun[1]);
		
		var next=false;
		//if((arr_gun[0].nm[2]==arr_gun[1].nm[2])&&(arr_gun[0].nm[3]==arr_gun[1].nm[3])) next=true;
		if(arr_gun[0].frm.indexOf("kard_")!=-1) next=true;
		
		var obj = shoot(t_arg);
		
		if(next)
		{
			
			if( obj != null ) 
			{
				remove_kard(document.getElementById(arr_gun[0].frm));
				
				shift_koloda_up();
				
				
				if(arr_gun==null) { arr_gun = null; arr_gun = []; }
				
		//		arr_gun.push(result);
				
		//		if(arr_gun.length==2) return multy_shoot();
				
				// sound();
				
				//execute_expected();
				
				
			}
			else
			{
				//soundKosh(); //next_rc_kard();
			}
				
		}
		
		
		

			//cp_why_null(t_arg);
			var obj2 = arr_gun[1];
		
			//if(arr_gun[0].frm.indexOf("kard_")!=-1) next=true;
		
			arr_gun.splice(0,2);
	
			if(obj == null)  
			{ 
				arr_gun = [obj2].concat(arr_gun); 
				//arr_gun.push(obj2); //we should to add in fisrt position (may be with shift to end)
				soundKosh();
			} 
				
			else
			{			
				//arr_gun = [obj].concat(arr_gun); //arr_gun.push(obj); //we should to add in fisrt position (may be with shift to end)
				
				arr_gun = [obj2].concat(arr_gun);
				
				/***
				if(next==false) 
				{ 
					next_rc_kard(); 
				}
				else 
				{ 
					//if(arr_gun.length == 1)  { arr_gun.splice(0,1); break; } 
				}
				****/
				
				sound();
				
			}

		
		if(is_game_finished()) { finish_game(); return; } 
		
		
		
		if(arr_gun.length <= 1) break;
	
	}
	
	render();
	
	if (check_own_place()) 
	{
		arr_gun = null;
		arr_gun = [];
		render();
		setTimeout( function()	{	sound();  },  300 );
	}
	
	// setTimeout( function()	{	render();  },  300 );
	
	/******
	
	setTimeout( function()
	{
		if(arr_gun.length==1) arr_gun.splice(0,1);
		
		render();
		
	}, 3000 ) ;
	
	******/
	
	// setTimeout( function()	{	put_new_kard_on_left_canvas()  },  1000 );
		
	// setTimeout( function()	{	_msht( t_arg, n );  },  1000 );
	
}

function addStopSymbol(e)
{
	
	e.preventDefault();
	
	if(arr_gun == null) 
	{
		arr_gun = [];
		return;
	}
	if(arr_gun.length < 2) return;
	
	if(arr_gun[arr_gun.length-1] == null) 
	{
		arr_gun.splice(arr_gun.length-1,1);
		addStopSymbol();
		
	}
	else if(arr_gun[arr_gun.length-1].frm == "stop_symbol")
	{
		return;
	}
	
	var obj = {};
	obj.frm = "stop_symbol";
	obj.nm = [0,0,0,0];
	
	arr_gun.push(obj);
	
	render();
	
	sound();
}

function process_stop_symbol()
{
	if(arr_gun == null) return;
	if(arr_gun.length==0) return;
	
	if(arr_gun[0] == null) return;
	
	if(arr_gun[0].frm == "stop_symbol")
	{
		arr_gun.splice(0,1);
		return;
	}
	
	if(arr_gun[1] == null) return;
	
	if(arr_gun[1].frm == "stop_symbol")
	{
		arr_gun.splice(0,2);
		return;
	}
		
	return;
		
	
}

function _set_on_own_place_patterned(obj, imgData0)
{
	var imgData27 = getImageDataFrom("right_canvas",obj.nm[2],obj.nm[3]);
							
	var arr = findAllCellByImgData(imgData0);
	var arr2 = [];


	for(var i4=0;i4<arr.length;i4++)
	{
		var n = arr[i4][0];
		var m = arr[i4][1];
		var obj77 = {};
		obj77.frm = "left_canvas";
		obj77.nm = [0,0,n,m];
		if(check_own_place2(obj77)==true) //for colored only
		{
			arr2.push(obj77);
		}
	}


	var counter = arr2.length;
	var counter2 = 0;
	for(var i=0;i<glob_koloda.length;i++)
	{
		if(glob_koloda[i]==null) continue;
		
		var imgData = glob_koloda[i].getContext("2d").getImageData(0,0,glob_koloda[i].width,glob_koloda[i].height);
		if(cmp(imgData,imgData27) && (counter>0))
		{
			glob_koloda[i]=null;
			counter2++;
			// render_koloda();
			
			counter--;
		}
	}

	
			
			
			





		var canvas = document.getElementById("left_canvas");
		var context = canvas.getContext("2d");
	
		for(var i=0;i<arr2.length;i++)
		{
			//var imgData2 = cnv.getContext("2d").getImageData(0,0,cnv.width,cnv.height);
			context.putImageData(imgData27, arr2[i].nm[2]*global_seed_size, arr2[i].nm[3]*global_seed_size);
		}
				
		
		render();
		
		sound();									
			
									
}

function set_on_own_place_patterned()
{
	
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var nn = canvas.width / global_seed_size;
	var mm = canvas.height / global_seed_size;
	var arrP = [];
	for(var j=0;j<nn;j++)
	{
		for(var i=0;i<mm;i++)
		{
			var obj = {};
			obj.nm = [i*global_seed_size,j*global_seed_size,i,j];
			obj.frm = "left_canvas";
			
			var imgData = getImageDataFromObject(obj);
			if(isImageDataAllPointsSame(imgData))	arrP.push(obj);
			
		}
	} 
	
	if(arrP.length == 0)  return false; 
	
	var found = false;
	for(var i=0;i<arrP.length;i++)
	{
		var obj = arrP[i];
		
					if(check_own_place2(obj)==true) //for colored only
					{
						var imgData0 = getImageDataFromObject(obj);
						if(isImageDataAllPointsSame(imgData0))
						{
							
							_set_on_own_place_patterned(obj, imgData0);
							
							
						}
						else if (isImageDataCellPatterned(imgData0))
						{
							
							var imgDataColored = getImageDataFrom("center_canvas",obj.nm[2],obj.nm[3]);
							
							_set_on_own_place_patterned(obj, imgDataColored);
						}
							
						found=true; 				
								
					}
					
	}			

		return found;
}

function recursive_shoot( callback )
{
		if(is_game_finished()) {  finish_game(); return; } 
		
		process_stop_symbol();
	
		render();
		
		if(arr_gun == null)  arr_gun = []; 
		
		if(arr_gun.length <= 1) 
		{
			
			return;
		}
		
		/******
		
		do
		{
			var result = isMagik();
			if(result) 
			{
				if(magic_processing()==false) break;
				
				if(is_game_finished()) {  finish_game(); return; } 
				
				process_stop_symbol();
				render();
			}
		}
		
		while(  result );
		
		******/
				
		
		if(arr_gun == null) { arr_gun = []; return;}
		
		if(arr_gun.length == 0) return;
		
		if(arr_gun.length == 1) return;
		
		if(is_game_finished()) {  finish_game(); return; } 
		
		//setTimeout( function()	{	render();  },  300 );
			
		var t_arg =  null;
		
		t_arg = [];
		t_arg.push(arr_gun[0]);
		t_arg.push(arr_gun[1]);
		
		var next=false;
		//if((arr_gun[0].nm[2]==arr_gun[1].nm[2])&&(arr_gun[0].nm[3]==arr_gun[1].nm[3])) next=true;
		//if(arr_gun[0].frm.indexOf("kard_")!=-1) next=true;
		
		var obj = shoot(t_arg);
			
				/**************************************/
			do
			{
				
				
				
				var result = set_on_own_place_patterned();
				
				if(result == false) break;
				
				if(is_game_finished()) {  finish_game(); return; } 
				
				if( check_not_exist_colored() ) 
				{
					take_a_fifty_colored ();
				}
				else break;
				
			
			}
			
			while( true );
			
			/***************************************/
		
			
			if( obj != null ) 
			{
				
				
				
				if(obj.frm.indexOf("kard_")!=-1)
				{					
					
					arr_gun.splice(0,2);
					
					if(arr_gun==null) { arr_gun = null; arr_gun = []; }
					
					arr_gun = [obj].concat(arr_gun); 
					
				}	
				else
				{
					
					
					var obj2 = arr_gun[1];
				
					arr_gun.splice(0,2);
					
					arr_gun = [obj2].concat(arr_gun);
			
				}
				
				render();
				
				sound();
			}
			else
			{
				
				var obj2 = arr_gun[1];
				
				arr_gun.splice(0,2);
					
				arr_gun = [obj2].concat(arr_gun); 
				
				render();
				
				soundKosh();
				
			}
			

		
		if(is_game_finished()) {  finish_game(); return; } 
		
		
		
		if(arr_gun.length <= 1) 
		{

			arr_gun = null;
			arr_gun = [];
			
			render();
			
			return; 
		}
	
	
		setTimeout( function() { recursive_shoot(); }, 1000 );
		
}

function get_half_colored()
{
	return false;
	
	if(arr_gun.length >= 3)
	{
		var f = arr_gun[0];
		var imgDataF = getImageDataFromObject(f);
		var s = arr_gun[1];
		var imgDataS = getImageDataFromObject(s);
		var t = arr_gun[2];
		var imgDataT = getImageDataFromObject(t);
		
		if( cmp (imgDataF, imgDataS) ) return false;
		if( cmp (imgDataF, imgDataT) ) return false;
		if( cmp (imgDataS, imgDataT) ) return false;
		
			
		for(var i=0;i<glob_koloda.length;i++)
		{
			if(glob_koloda[i]==null) continue;
			
			
				var el = document.getElementById("first_kard").childNodes[0];//glob_koloda[i];
				var imgDataK = el.getContext("2d").getImageData(0,0,el.width,el.height);
				if(isImageDataAllPointsSame(imgDataK))
				{
					var result  = jump_rnd_back(imgDataK);
					if(result!=null) 
					{
						remove_kard(el);
						
						shift_koloda_up();
						
						//execute_expected();
						
						
					}
					
				}
				else
				{
						next_rc_kard();
				}
			
		}
		
		arr_gun.splice(0,3);
		
		render();
		
		sound();
		
		return true;
	}
	
	return false;
}

function put_all_patterned()
{
	if(arr_gun.length >= 3)
	{
		var f = arr_gun[0];
		var s = arr_gun[1];
		var t = arr_gun[2];
		
		if((f.nm[2] == s.nm[2] && s.nm[2] == t.nm[2] ) 	&& (f.nm[3] == s.nm[3] && s.nm[3] == t.nm[3] ))
		{
			var imgData0 = getImageDataFromObject(f);
			if(isImageDataCellPatterned(imgData0))
			{
				//var imgData2 = getImageDataFrom("right_canvas",f.nm[2],f.nm[3]);
				
				var arr = findAllCellByImgData(imgData0); //[n,m]
				
				for(var i=0;i<arr.length;i++)
				{
					var obj = {};
					obj.frm="left_canvas";
					obj.nm = [0,0,arr[i][0],arr[i][1]];
					var arrShot = [ obj, obj ];
					shoot(arrShot);
					
				}
				
				arr_gun.splice(0,3);
				
				render();
				
				sound();
				
				return true;
			
			}
			
		}
		
		 
		
	}
	
	return false;
}

function fill_all_squares()
{
	if(arr_gun.length >= 3)
	{
		var f = arr_gun[0];
		var s = arr_gun[1];
		var t = arr_gun[2];
		
		if((f.nm[2] == s.nm[2] && s.nm[2] == t.nm[2] ) 	&& (f.nm[3] == s.nm[3] && s.nm[3] == t.nm[3] ))
		{
			var imgData0 = getImageDataFromObject(f);
			if(isImageDataAllPointsSame(imgData0))
			{
				var imgData2 = getImageDataFrom("right_canvas",f.nm[2],f.nm[3]);
				
				var arr = findAllCellByImgData(imgData0); //[n,m]
				var counter = arr.length;
				var counter2 = 0;
				for(var i=0;i<glob_koloda.length;i++)
				{
					if(glob_koloda[i]==null) continue;
					var imgData = glob_koloda[i].getContext("2d").getImageData(0,0,glob_koloda[i].width,glob_koloda[i].height);
					if(cmp(imgData,imgData2) && (counter>0))
					{
						glob_koloda[i]=null;
						counter2++;
						// render_koloda();
						
						counter--;
					}
				}
				
				var canvas = document.getElementById("left_canvas");
				var context = canvas.getContext("2d");
			
				for(var i=0;i<arr.length;i++)
				{
					//var imgData2 = cnv.getContext("2d").getImageData(0,0,cnv.width,cnv.height);
					context.putImageData(imgData2, arr[i][0]*global_seed_size, arr[i][1]*global_seed_size);
				}
				
				
				arr_gun.splice(0,3);
				
				if(arr.length == counter2) next_rc_kard();
				
				render();
				
				sound();
				
				return true;
			
			}
			
		}
		
		 
		
	}
	
	return false;
}

function isMagik()
{
	if(arr_gun.length >= 3)
	{
		if((arr_gun[2]!=null) && (arr_gun[2].frm == "stop_symbol")) return false;
		
		return true;
	}
	
	return false;
}

function magic_processing()
{
	
		
	var result = fill_all_squares();
	if(result==false) 
	{
		result = 	get_half_colored();
		if(result==false) result = 	put_all_patterned();
	}
	return result;
	
}

function multy_shoot()
{
	if(is_game_finished()) { render(); finish_game(); return; }
	
	if(arr_gun == null) { arr_gun = []; render(); return; }
	
	if(arr_gun.length == 0) { render();  return; }
		
	if(arr_gun.length == 1) { render(); return; }
	
	//render();
	
	//magic_processing();
	
	//if(is_game_finished()) { render(); finish_game(); return; }
	
	//render();
	
	if(arr_gun.length >= 2) recursive_shoot();
	
	
	// setTimeout( function()	{	render();  },  300 );
		
	// setTimeout( function()	{	put_new_kard_on_left_canvas()  },  1000 );
		
	// setTimeout( function()	{	_msht( t_arg, n );  },  1000 );
	
	
}















function put_new_kard_on_left_canvas()
{
	var list = document.getElementsByTagName("canvas");
	var ind= -1;
	for(var i=0;i<list.length;i++)
	{
		if(list[i].id.indexOf("kard_")!=-1)
		{
			ind = i;
			break;
		}
	}
	if(ind==-1) return;
	var imgData = list[ind].getContext("2d").getImageData(0,0,list[ind].width, list[ind].height);
	
	var result = jump_rnd_back(imgData);
	if(result != null) soundKosh;
	
	
		if( result!= null ) 
		{
			remove_kard(list[ind]);
			
			shift_koloda_up();
			
			
			if(arr_gun==null) { arr_gun = null; arr_gun = []; }
			
	//		arr_gun.push(result);
			
	//		if(arr_gun.length==2) return multy_shoot();
			
			
			
			//execute_expected();
			
			
		}
		else
		{
			next_rc_kard(); //tak pomogat ne budet
			// next_rc_kard(); //a tak pomogat budet
		}
			
		
		render();
		
		if(is_game_finished()) { finish_game(); return; }
	
}


function shoot(arr_gun4)
{
	//if(obj1 == null) return -1;
	//if(obj2 == null) return -1;
	
	var result = null;
	
	if(arr_gun4 == null) return null;
	
	
	if(arr_gun4.length == 2 )
	{
		var obj1 = arr_gun4[0];
		
		var obj2 = arr_gun4[1];
	
		//alert('todo://jump pattern and colored Only not exact places! krepostnoe pravo eto kogda jump bacn on own color');
		
	//	if(document.getElementById("qflag1").checked == true ) all_checked=true;
		
		var imgData1 = getImageDataFromObject(obj1);
		var n1 = obj1.nm[2];
		var m1 = obj1.nm[3];
		
		var imgData2 = getImageDataFromObject(obj2);
		var n2 = obj2.nm[2];
		var m2 = obj2.nm[3];
		
		if ( (obj1.frm.indexOf("kard_")!= -1 ) && (obj2.frm.indexOf("left_canvas")!= -1 ) )
		{
			
			var result =  jump_rnd_back2(obj1, obj2);
			if(result != null)
			{
				
				remove_kard(document.getElementById(obj1.frm));
					
				shift_koloda_up();
				
			}
			
			return result;
		}
		
		
		if ( (obj2.frm.indexOf("kard_")!= -1 ) && (obj1.frm.indexOf("left_canvas")!= -1 ) )
		{
							
				var result = jump(obj1);
				/***
				if(result != null)
				{
					var kard = put_kard_to_koloda(imgData1, global_seed_size, global_seed_size); 
					
					
					
				}
				****/
				
				return result;
		}
		
		if ( (obj1.frm.indexOf("left_canvas")!= -1 ) && (obj2.frm.indexOf("left_canvas")!= -1 ) )
		{
			
			if((n1 == n2) && (m1==m2))
			{
				
				//return null;
				
				/******
				if(all_checked)
				{
					
					
					jump_all(obj1);
					
					
					
					return;
				}
				
				
				//if(glob_float_mode==true) return jump(obj1, get_allowed_jump(obj1));
				
				//return 
				
				******/
				
				var result = jump(obj1);
			
				
				return result;
			}
			
			/*****/
			
			if( isImageDataCellPatterned(imgData1) && isImageDataCellPatterned(imgData2) )
			{
				if(cmp(imgData1, imgData2)) 
				{
					//arr_gun_null();
					
					//return 1; 
					
					return null;
					
				}
				
				/*****
				if(all_checked) 
				{
					arr_gun_null();
					
					return;
					
				}
				*****/
				
				/*****
				var imgData3 = getImageDataFrom("right_canvas",n2,m2);
				if(cmp(imgData1,imgData3)) 
				{
					return swap(obj1, obj2, true);
				}
				*****/
				
				return kosmik_swap(obj1, obj2, true);
				
				// arr_gun_null();
				
				//return -1;
				
				// if(glob_float_mode==true) return  swap(obj1,  get_allowed_swap(obj1), true);
				
				// return swap(obj1, obj2, true);
				
				// return;
			}
			
			if( isImageDataAllPointsSame(imgData1) && isImageDataAllPointsSame(imgData2) )
			{
				
				if(cmp(imgData1, imgData2)) 
				{
					// all_checked = true;
					
					// arr_gun_null();
					
					// return 1; 
					
					return null;
				}
				
				/******
				if(all_checked) 
				{
					all_checked=false;
					
					arr_gun_null();
					
					return -1;
					
					//return swap_all(obj1, obj2, true);
				}
				*******/
				
				return kosmik_swap(obj1, obj2, true);
				
				// arr_gun_null();
				
				/*****
				
				var imgData3 = getImageDataFrom("center_canvas",n2,m2);
				if(cmp(imgData1,imgData3)) 
				{
					return swap(obj1, obj2, true);
				}
				
				return -1;
				
				******/
				
			//	if(glob_float_mode==true) return  swap(obj1,  get_allowed_swap(obj1), true);
				
			//	return swap(obj1, obj2, true);
			
			//	return;
				
			}
			
			
			if(isImageDataCellPatterned(imgData2) && isImageDataAllPointsSame(imgData1))
			{
				/*****
				
				var imgData3 = getImageDataFrom("right_canvas",n2,m2);
				if(cmp(imgData1,imgData3)) 
				{
					//return user_move(obj1, get_allowed_move(obj1));
				}
				
				return 
				
				******/
				
				return move(obj2, obj1);
				
				
				// arr_gun_null();
				
				
				//if(glob_float_mode==true) return  move(obj1,  get_allowed_move(obj1), true);
				
				//
				
				// return;
			}
			
			if(isImageDataCellPatterned(imgData1) && isImageDataAllPointsSame(imgData2))
			{
				/*****
				
				var imgData3 = getImageDataFrom("right_canvas",n2,m2);
				if(cmp(imgData1,imgData3)) 
				{
					//return user_move(obj1, get_allowed_move(obj1));
				}
				
				return 
				
				******/
				
				return move(obj1, obj2);
				
				
				// arr_gun_null();
				
				
				//if(glob_float_mode==true) return  move(obj1,  get_allowed_move(obj1), true);
				
				//
				
				// return;
			}
			
			if( isImageDataAllPointsSame(imgData2) && isImageDataCellBackground(imgData1)  )
			{
				return move(obj1, obj2);
			}
			
			if( isImageDataAllPointsSame(imgData1) && isImageDataCellBackground(imgData2)  )
			{
				//if(glob_float_mode==true) return  move(obj1,  get_allowed_move(obj1), true);
				
				// var arrOkr = getOkrPlaceArray0(obj1.nm[2],obj1.nm[3]);
			
				//var arr = findAllBackgroundCellInArray(arrOkr);
				//if(arr.length > 0) 
				{
					return move(obj1, obj2);
					//if(result ==  -1) whenResultMinusOne();
					
				}	
				//else 
				{
				//	var arr2 = findAllPatternedCellInArray(arrOkr);
				//	if(arr2.length > 0) 
					{
				//		return move(obj1, obj2);
						//if(result ==  -1) whenResultMinusOne();
					}
				}
				
			
				// arr_gun_null();
				
				
				//return null;
			
			}
		
			
		}
		
		
		
			
		
	}	
	
	
	return null;
	 
	
}

function arr_gun2_null(r)
{
	//if(r == -1) whenResultMinusOne();
}


function shoot_magik(arr_gun2)
{
	
	if(arr_gun2 == null) return -1;
	
	if(arr_gun2.length == 0) return -1;
	
	var result = -1;
	
	if(arr_gun2.length == 2 )
	{
		var obj1 = arr_gun2[0];
		
		var obj2 = arr_gun2[1];
		
		if(obj1 == null) return -1;
		
		if(obj2 == null) return -1;
	
	
		//alert('todo://jump pattern and colored Only not exact places! krepostnoe pravo eto kogda jump bacn on own color');
		
	//	if(document.getElementById("qflag1").checked == true ) all_checked=true;
		
		var imgData1 = getImageDataFromObject(obj1);
		var n1 = obj1.nm[2];
		var m1 = obj1.nm[3];
		
		var imgData2 = getImageDataFromObject(obj2);
		var n2 = obj2.nm[2];
		var m2 = obj2.nm[3];
		
		
		
		if ( (obj1.frm.indexOf("left_canvas")!= -1 ) && (obj2.frm.indexOf("left_canvas")!= -1 ) )
		{
			if((n1 == n2) && (m1==m2))
			{
				if(all_checked)
				{
					
					
					result = jump_all(obj1);
					
					arr_gun2_null(result);
					
					return result;
				}
				
				
				
				result = jump(obj1);
				
				arr_gun2_null(result);
				
				return result;
			}
			
			if( isImageDataCellPatterned(imgData1) && isImageDataCellPatterned(imgData2) )
			{
				if(cmp(imgData1, imgData2)) 
				{
					result = -1;
					
					arr_gun2_null(result);
					
					return result; 
				}
				
				
				if(all_checked) 
				{
					
					result = -1;
					
					arr_gun2_null(result);
					
					return result;
					
				}
				
				
				result = kosmik_swap(obj1, obj2, true);
				
				arr_gun2_null(result);
								
				return result;
			}
			
			if( isImageDataAllPointsSame(imgData1) && isImageDataAllPointsSame(imgData2) )
			{
				if(cmp(imgData1, imgData2)) 
				{
					all_checked = true;
					
					result = 1;
					
					arr_gun2_null(result);
					
					return result; 
				}
				
				if(all_checked) 
				{
					all_checked=false;
					
					result = 1;
					
					arr_gun2_null(result);
					
					return result;
					
					//return swap_all(obj1, obj2, true);
				}
				
				result = kosmik_swap(obj1, obj2, true);
				
				arr_gun2_null(result);
											
				return result;
				
			}
			
			
			if(isImageDataCellPatterned(imgData1) && isImageDataAllPointsSame(imgData2))
			{
				
				
				result = move(obj1, obj2);
				
				
				arr_gun2_null(result);
								
				return result;
				
			}
			
			if( isImageDataAllPointsSame(imgData1) && isImageDataCellBackground(imgData2)  )
			{
				//if(glob_float_mode==true) return  move(obj1,  get_allowed_move(obj1), true);
				
				var arrOkr = getOkrPlaceArray0(obj1.nm[2],obj1.nm[3]);
			
				var arr = findAllColoredCellInArray(arrOkr);
				if(arr.length > 0) 
				{
					result = move(obj1, obj2);
					arr_gun2_null(result);
					//if(result ==  -1) whenResultMinusOne();
					return result;
					
				}	
				else 
				{
					var arr2 = findAllPatternedCellInArray(arrOkr);
					if(arr2.length > 0) 
					{
						result = move(obj1, obj2);
						arr_gun2_null(result);
						//if(result ==  -1) whenResultMinusOne();
						return result;
					}
				}
				
			
				arr_gun2_null(result);
				
				
				return result;
			
			}
		
			arr_gun2_null(result);
				
			return result;
			
		}
		
		
		arr_gun2_null(result);
				
		return result;
		
	}	
	 
	
}

/********

var script = document.createElement('script');
script.src = something;
script.onload = function () {
    //do stuff with the script
};

document.head.appendChild(script); //or something of the likes

***********/
var global_inverse_mode=false;
function inverse(e)
{
	e.preventDefault();
	
	//alert('Show back of pattern');//. Not implemented yet');
	if(global_inverse_mode) return false;
	
		
	if(glob_colored_special_arr == null) return false;
	
	global_inverse_mode=true;
	sound();
	
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	
	var cnv = document.createElement("canvas");
	cnv.width = canvas.width;
	cnv.height = canvas.height;
	var cnt = cnv.getContext("2d");
	cnt.putImageData(context.getImageData(0,0,canvas.height, canvas.width),0,0);
	
	setTimeout(
	
	function() {
	
	canvas.width=1;
	canvas.height=1;
	
	canvas.width=cnv.width;
	canvas.height=cnv.height;
	
	for(var i=0;i<glob_colored_special_arr.length;i++)
	{
		/******
		obj = {};
		obj.frm = "left_canvas";
		obj.nm = [i,j,i/global_seed_size,j/global_seed_size];
			
		var obj2 = {};
		obj2.n = i/global_seed_size;
		obj2.m = j/global_seed_size;
		obj2.color = getBackgroundColor();
		obj2.obj = obj;
			
		glob_colored_special_arr.push(obj2);
		***/
		var obj2 = glob_colored_special_arr[i];
		context.fillStyle = obj2.color;
		context.fillRect(obj2.n*global_seed_size,obj2.m*global_seed_size,global_seed_size,global_seed_size);
	}
	
	}, 1000 );
	
	setTimeout(
	
	function()
	{
		canvas.width=cnv.width;
	canvas.height=cnv.height;
		context.putImageData(cnt.getImageData(0,0,cnv.height, cnv.width),0,0);
		global_inverse_mode=false;
		sound();
	}
	
	, 6000);
			
	return false;		
}


function findNMinColoredSpecial(n,m)
{
	if(glob_colored_special_arr==null) return -1;
	for(var i=0;i<glob_colored_special_arr.length;i++)
	{
		var obj2 = glob_colored_special_arr[i];
		
		if((obj2.n==n) && (obj2.m==m)) return i;
		
	}
	return -1;
}

var glob_plus_button = null;
/*****************  buttons from canvas *************/

function create_button(w,h,s)
{
	var w = global_seed_size;
	var h = global_seed_size;
	var canvas = document.createElement("canvas");
	canvas.width = global_seed_size;
	canvas.height = global_seed_size;
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "#00F";
    ctx.font = "bold 20px Tahoma";
	ctx.textBaseline = "center";
	var n = ctx.measureText(s).width;
    ctx.fillText(s, (w/2|0)-(n/2|0), h/2+5);
	canvas.style.border = "1px solid red";
	
	return canvas;
}


//todo lasso

//todo if not lasso then magnito 

function magnito(obj1, obj2)
{
	var imgData1 = getImageDataFromObject(obj1);
	var imgData2 = getImageDataFromObject(obj2);
	
	var n = obj1.nm[2];
	var m = obj1.nm[3];
	var n2 = obj2.nm[2];
	var m2 = obj2.nm[3];
	
	if( isImageDataCellPatterned(imgData1)  && isImageDataCellBackground(imgData2) ) return null; 
	
	if ( isImageDataAllPointsSame(imgData1)  && isImageDataAllPointsSame(imgData2) )  return null;
	
	
	
	
	
	if( isImageDataCellPatterned(imgData1)  && isImageDataAllPointsSame(imgData2) )
	{
		
	}
	else if( isImageDataCellPatterned(imgData2)  && isImageDataAllPointsSame(imgData1) )
	{
		
	}
	else  if(isImageDataCellBackground(imgData1) && isImageDataAllPointsSame(imgData2) ) 
	{
		//check if exist some clear allowed line for moving
		
		if( n==n2 ) //up or down
		{
			//check if exist some clear allowed vertical line for moving
			
			//function check_vertical_cell_background(obj1, m, obj2, m2 ) //when first is bgcolor
			
			if( check_vertical_cell_background(n, obj1, m, obj2, m2 ))
			{
				
				
				var canvas = document.getElementById(obj1.frm);
				var context = canvas.getContext("2d");
				
				//find in colored special n,m = 
				
				var r = findNMinColoredSpecial(n,m);
				
				glob_colored_special_arr[r].color = getColorFromLeftCanvas (n2*global_seed_size,m2*global_seed_size,1,1);
				
				r = findNMinColoredSpecial(n2,m2);
								
				glob_colored_special_arr[r].color =  getBackgroundColor();
				
				context.putImageData(imgData2, n*global_seed_size, m*global_seed_size );
				
				context.putImageData(imgData1, n2*global_seed_size, m2*global_seed_size );
				
		//var imgData2 = getImgDataFromColoredSpecial(n,m);
		//context.putImageData(imgData2, n*global_seed_size, m*global_seed_size );
				
				
				return obj2;
				
				
				
				
				
				
			}
			
			
			
		}
		else if(m==m2)
		{
			//check if exist some clear allowed  horizontal line for moving
			
			
			
			if( check_horizontal_cell_background(m, obj1, n, obj2, n2 ))
			{
				
				
				var canvas = document.getElementById(obj1.frm);
				var context = canvas.getContext("2d");
				
				//find in colored special n,m = 
				
				var r = findNMinColoredSpecial(n,m);
				
				glob_colored_special_arr[r].color = getColorFromLeftCanvas (n2*global_seed_size,m2*global_seed_size,1,1);
				
				r = findNMinColoredSpecial(n2,m2);
								
				glob_colored_special_arr[r].color =  getBackgroundColor();
				
				context.putImageData(imgData2, n*global_seed_size, m*global_seed_size );
				
				context.putImageData(imgData1, n2*global_seed_size, m2*global_seed_size );
				
		//var imgData2 = getImgDataFromColoredSpecial(n,m);
		//context.putImageData(imgData2, n*global_seed_size, m*global_seed_size );
				
				
				return obj2;
				
				
				
				
				
				
			}
			
			
			
			
			
			
			
			
			
			
		}
	}
	else  if(isImageDataCellBackground(imgData2) && isImageDataAllPointsSame(imgData1) ) 
	{
		//check if exist some clear allowed line for moving
		
		if( n==n2 )
		{
			//check if exist some clear allowed vertical line for moving
		}
		else if(m==m2)
		{
			//check if exist some clear allowed  horizontal line for moving
		}
		
		
		
	}
	
	return null;
	
	
	/*****
		
	var canvas = document.getElementById(obj1.frm);
	var context = canvas.getContext("2d");
	if(isImageDataCellPatterned(imgData1) )
	{
		context.putImageData(imgData1, n2*global_seed_size, m2*global_seed_size );
		var imgData2 = getImgDataFromColoredSpecial(n,m);
		context.putImageData(imgData2, n*global_seed_size, m*global_seed_size );
	}
	else if(isImageDataAllPointsSame(imgData1))
	{
		context.putImageData(imgData1, n2*global_seed_size, m2*global_seed_size );
		var imgData2 = getImageDataCellBackground();
		context.putImageData(imgData2, n*global_seed_size, m*global_seed_size );
		
		
		
		var r = findNMinColoredSpecial(n2,m2);
		if(r != -1)
		{
			var obj22 = glob_colored_special_arr[r];
			
			obj22.color = getColorFromLeftCanvas (obj22.obj.nm[0],obj22.obj.nm[1],1,1);
			glob_colored_special_arr[r] = obj22;
			
		}
		
		var r = findNMinColoredSpecial(n,m);
		if(r != -1)
		{
			var obj222 = glob_colored_special_arr[r];
			
			obj222.color = getBackgroundColor(); // getColorFromLeftCanvas (obj2.obj.nm[0],obj2.obj.nm[1],1,1);
			glob_colored_special_arr[r] = obj222;
			
		}
		
		
		
	}		
	
	*****/
		
	//return obj2;
}


function check_vertical_cell_background(n, obj1, m, obj2, m2 ) //when first is bgcolor
			{
				//jhgkj
				
				if(m > m2) m2++;
				else if (m2 > m) m2--;
				
				var arr = [];
				if(m > m2)
				{
					for(var mm = m2; mm<=m; mm++) arr.push([n,mm]);
					
				}
				else if(m2 > m)
				{
					for(var mm = m; mm<=m2; mm++) arr.push([n,mm]);
					
				}
				
				var res = findAllBackgroundCellInArray(arr);
				
				if(res.length == arr.length) return true;
				
				return false;
			}




function check_horizontal_cell_background(m, obj1, n, obj2, n2 ) //when first is bgcolor
			{
				//jhgkj
				
				if(n > n2) n2++;
				else if (n2 > n) n2--;
				
				var arr = [];
				if(n > n2)
				{
					for(var nn = n2; nn<=n; nn++) arr.push([nn,m]);
					
				}
				else if(n2 > n)
				{
					for(var nn = n; nn<=n2; nn++) arr.push([nn,m]);
					
				}
				
				var res = findAllBackgroundCellInArray(arr);
				
				if(res.length == arr.length) return true;
				
				return false;
			}





function check_own_place(obj)
{
		
		
		var imgData = getImageDataFromObject(obj);
		if(isImageDataAllPointsSame(imgData))
		{
			//get from center canvas cell n,m
			var imgData2 = getImageDataFrom("center_canvas",n,m);
			return cmp(imgData, imgData2);
			
		}
		
		if (isImageDataCellPatterned(imgData))
		{

			var r = findNMinColoredSpecial(n,m);
			
			var canvas2 = document.createElement("canvas");
			canvas2.width = global_seed_size;
			canvas2.height = global_seed_size;
			canvas2.getContext("2d").fillStyle = glob_colored_special_arr[r].color;
			canvas2.getContext("2d").fillRect(0,0,global_seed_size,global_seed_size);
			var imgData0 = canvas2.getContext("2d").getImageData( 0,0,global_seed_size,global_seed_size);
			
			
			
			var imgData2 = getImageDataFrom("center_canvas",n,m);
			
			if(cmp(imgData0,imgData2))
			{
				var imgData4 = getImageDataFrom("right_canvas",n,m);
				return cmp(imgData4, imgData);
			}
		}
		
		
	
	
    return false;	
}


function check_own_place2(obj)
{
		
	
		var n = obj.nm[2];
		var m = obj.nm[3];
		
		var imgData = getImageDataFromObject(obj);
		if(isImageDataAllPointsSame(imgData))
		{
			if(arr_gun.length == 1)
			{
				var imgDataPro = getImageDataFromObject(arr_gun[0]);
				if(isImageDataCellPatterned(imgDataPro))
				{
					return false;
					/***
					var imgDataPro2 = getImageDataFrom("right_canvas",n,m);
					if(cmp(imgDataPro,imgDataPro2)==true) return false;
					
					else return true;
					****/
				}
				
				
				
			}
			//get from center canvas cell n,m
			var imgData2 = getImageDataFrom("center_canvas",n,m);
			
		}
		else if (isImageDataCellPatterned(imgData))
		{
			//get from special colored cell n,m
			
			var color = getColorFromCenterCanvas(n*global_seed_size,m*global_seed_size,1,1);	
			if(color != glob_colored_special_arr[findNMinColoredSpecial(n,m)].color) return false;
			//get from rigth canvas cell n,m
			var imgData2 = getImageDataFrom("right_canvas",n,m);
		}
		else
		{
			return false;
		}
		
		return cmp(imgData, imgData2);
		
	
}
