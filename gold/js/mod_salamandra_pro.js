
var mod_salamander_last_x=null;
var mod_salamander_last_y=null;
var mod_salamandra_nn=3;
var mod_salamandra_mm=3;
function zala_mander17()
{
	var x=-1;
	var y=-1;
	
	//if(global_state!=null) return;
	global_state=SALAMANDER_WORKS;
	
	mod_canvas_get_all_image_data( function( im )
	{
			
			
				
			try
			{
			
			
			
				mod_salamander_global_dummy_fast_thread_imgData = im;
			
				// if((mod_salamandra_center_x==undefined)&&(mod_salamandra_center_y==undefined))
				// {
					// mod_salamander_generate_xy();
				// }
				// else{
					
					
						// /////////////////////////////////////////////////var xy=getTheBestFromRukzak();//check for not white
						
						// //mod_salamandra_center_x=xy[0];
						// //mod_salamandra_center_y=xy[1];									
					
	 
				// }
			var pf=null;
			if(document.getElementById("moves").childNodes.length>0)
			{
				
				pf=get_first_moves_child_xy_array();
				
				//setTimeout(()=>{
				//if(document.getElementById("moves").childNodes.length>0)
				//{
					
				var color =  mod_salamander_getColorArrayFromImageData(mod_salamander_global_dummy_fast_thread_imgData,pf[0],pf[1]);
				if(is_white(color)) document.getElementById("moves").removeChild(document.getElementById("moves").childNodes[0]);
				
					
			//	}},5000);
			
				mod_salamandra_center_x=pf[0];
				mod_salamandra_center_y=pf[1];
				
				
				
				var arr = dummy_fast(pf[0],pf[1]);
				if((arr[0].length==0)&&(arr[1].length==0)) arr[1].push(pf);
				//post_bubabu(arr[0],[255,255,255,255]);
				post_bubabu(arr[1],[255,255,255,255]);
				
			
			
				
			 // pf = get_from_rukzak_point_food();
			 
			// if(pf.length==0)
			// {
					// global_state=null;
			// }
			// else
			// {
				
				// mod_salamandra_center_x=pf[0];
				// mod_salamandra_center_y=pf[1];
				
			// //setPixel(pf[0],pf[1],mod_salamander_global_food_color).then( () => {
							
							
					// mod_canvas_compare_image_data(mod_salamander_global_dummy_fast_thread_imgData, function(result){
						
					

					
					// if(result==true)
					// {mod_salamandra_center_x=undefined;
								// mod_salamandra_center_y=undefined;
								// mod_salamandra_nn=3;
								// mod_salamandra_mm=3;
								// global_state=null;
								// return;
					// }
					
					
					
					



	
						//	do{
							
							
							// if(document.getElementById("moves").childNodes.length>0)
							// {
								// mod_salamandra_center_x=undefined;
								// mod_salamandra_center_y=undefined;
								// mod_salamandra_nn=3;
								// mod_salamandra_mm=3;
								// global_state=null;
								// return;
							// }
							
							// mod_salamandra_center_x+= (mod_salamander_getRandomInt(0,2)==1)?mod_salamander_getRandomInt(0,2):mod_salamander_getRandomInt(0,2)*-1;
							// mod_salamandra_center_y+= (mod_salamander_getRandomInt(0,2)==1)?mod_salamander_getRandomInt(0,2):mod_salamander_getRandomInt(0,2)*-1;
					




					//	}
						//	while(true);
							
										
						//						mod_salamander_global_need_white_point_array.push(pf);
									
					//		clear_all_executed_tasks(callback);		
						
												 // setTimeout( function(x1, y1 ){
													
													// return function () {		mod_salamander_motion_animate(x1,y1,function(){
														
														
														// //show_on_debug_canvas(part_image);
					
														
													// }); 	}
													
													 // }(pf[0],pf[1]),SALAMANDER_ANIMATING_VELOCITY);
					

					
					
					
					}	

			//	mod_salamander_clear_riffle();
			
if(	mod_salamander_check_all_white()	) throw new UserException("error: all white");	
					//save_all_settings_on_server(function(){location.reload();});
					
					
					
						
			global_state=null;
			
			
			
			
			} 
			catch (e) 
			{
		  
				if(e.message=="error: all white")
				{
					//
					save_all_settings_on_server(()=>{localStorage.removeItem('last_session_md5');location.reload()});
				}
			
			}
			
	});
			

			
	
}

function mod_salamander_clear_riffle()
{
var points=[];
for(let nk=0;nk<document.getElementById("moves").childNodes.length;nk++)
{
	
	var arr = document.getElementById("moves").childNodes[0].id.split('_');
	points.push( [Number(arr[1]),Number(arr[2]), color] );
}

var el = document.getElementById("moves");
			while(el.hasChildNodes()  )
			{
				var canvas1 = el.childNodes[0];
										if(canvas1!=null)
										{
											document.getElementById("moves").removeChild(canvas1);
											//sound();
											
										}
										
			//	el.removeChild(el.childNodes[0]);
			}
			
			for(let nk=0;nk<points.length;nk++)
			{
				
				var color =  mod_salamander_getColorArrayFromImageData(mod_salamander_global_dummy_fast_thread_imgData,points[nk][0],points[nk][1]);
				if(is_white(color)) continue;
				
				 riffle_charge(points[nk][0],points[nk][1],color);
				
			}
}

function old_mod_salamander_pro_processing_avto_click(){
	 
	 if(document.getElementById("robot_work").checked)
	 {
	 
	var canvas0 = document.getElementById("canvas0");
	var context0 = canvas0.getContext("2d");
	var rc = get_near_first_non_white(glob_x_left_top,glob_y_left_top);
	if(rc==null) { 
	
	console.log("rc == null");
	robot_home();
	return;
	
	}
	
	var arr = get_neighbours_points_pro(glob_x_left_top,glob_y_left_top);
	
	var colors = arr[1];
	var points = arr[0];
	
		var i=0;
		for(;i<colors.length;i++)
		{
			if(compareColors(colors[i],rc)) { break;}
		}
		if(points.length==0 || i>= points.length) 
		{
			location.reload();
		}
		riffle_charge(points[i][0],points[i][1],rc);
		
		setTimeout(processing_click, 100);
	 }	
	
}

function mod_salamander_pro_processing_avto_click(){
	 
	 if(document.getElementById("free_robot_mode").checked)
	 {
		 old_mod_salamander_pro_processing_avto_click();
		 return;
	 }
	 
	 if(document.getElementById("robot_work").checked)
	 {
		 
		 var canvas0 = document.getElementById("canvas0");
		 var context0 = canvas0.getContext("2d");
		 var im = context0.getImageData(0,0,canvas0.width,canvas0.height);
	
		var xr=1;
		var yr=1;
		var rc=null;
		var nn=0;
		 do {
			 
			 nn++;
			 if(nn>1000) break;
			 xr = getRandomInt(1,canvas0.width-1);
			 yr = getRandomInt(1,canvas0.width-1);
			 
			
				
			    rc = get_near_first_non_white_full(xr,yr);
				if(rc.length==0) continue;
				
				if(is_gold_inside(rc[0],rc[1])) continue;

					
				break;
		 }
		 while(true);
		 if(nn>1000)
		 {
			 document.getElementById("robot_work").checked=false;
			 return;
		 }
		 glob_x_left_top=rc[0];
		 glob_y_left_top=rc[1];
		// if(is_gold_inside(rc[0],rc[1])) mod_salamander_pro_processing_avto_click();
		//else
		{
			
			riffle_charge(rc[0],rc[1],rc[2]);
		//try_to_fly();
		setTimeout(processing_click, 100);
		}
	 }	
	
}


function goto_center()
{
	var center_x=(mod_salamander_global_dummy_fast_thread_imgData.width/2|0);
	var center_y=(mod_salamander_global_dummy_fast_thread_imgData.height/2|0);
		
	if((mod_salamandra_center_x-center_x)>0) mod_salamandra_center_x-=1;
	else if((mod_salamandra_center_x-center_x)<0)mod_salamandra_center_x+=1;
	if((mod_salamandra_center_y-center_y)>0) mod_salamandra_center_y-=1;
	else  if((mod_salamandra_center_y-center_y)<0)mod_salamandra_center_y+=1;
	return [mod_salamandra_center_x,mod_salamandra_center_y];
}


				
		function get_from_rukzak_point_food()
		{
				
				var n=0;
			if(mod_salamandra_nn==3) n=1;
			else if(mod_salamandra_nn==5) n=2;
			else if(mod_salamandra_nn==7) n=3;
			else n=(mod_salamandra_nn/2|0);
					
			var m=n;
			
			
			var x0=mod_salamandra_center_x;
			var y0=mod_salamandra_center_y;
			
				var food_array=[];
				var part_image=mod_salamander_getPartImageData(mod_salamandra_center_x,mod_salamandra_center_y,mod_salamandra_nn,mod_salamandra_mm);
				
				show_on_debug_canvas(part_image);
				var border_in_rukzak=false;
				for(var j=0;j<mod_salamandra_mm;j++)
				{
					for(var i=0;i< mod_salamandra_nn;i++)
					{
						
							var color =  mod_salamander_getColorArrayFromImageData(part_image, i,j);
							if(mod_salamander_white(color)==true) continue; 
							if(mod_salamander_isColor_mod_salamander_global_fill_color(color,mod_salamander_global_fill_color)) continue;
							let cx=x0-n+i;
							let cy=y0-m+j;
							if(cx<5) border_in_rukzak=true;
							if(cy<5)  border_in_rukzak=true;
							if(cx>(mod_salamander_global_dummy_fast_thread_imgData.width-5)) border_in_rukzak=true;
							if(cy>(mod_salamander_global_dummy_fast_thread_imgData.height-5)) border_in_rukzak=true;
							
							if((cx==x0)&&(cy==y0)) if(mod_salamander_getRandomInt(0,food_array.length)==1)  continue;
							
							food_array.push( [cx,cy,color]); 
							
						
					}
				}
				
				
			
				
				
				if(border_in_rukzak) return goto_center();
				
				
				
				if( food_array.length>0 )  
				{
						
						shuffle(food_array);
						
		
						let nnn= null; 
						let M = 0; 
						let M_nnn=0;
						let cnt=0;
						do
						{
					
							nnn=mod_salamander_getRandomInt(0,food_array.length);
							
							mod_salamander_global_food_color=food_array[nnn][2];
							mod_salamander_last_cell_with_food_x=food_array[nnn][0];
							mod_salamander_last_cell_with_food_y=food_array[nnn][1];
							
							x0=mod_salamander_last_cell_with_food_x;
							y0=mod_salamander_last_cell_with_food_y;
							
							let r=mod_salamander_get_near_not_stones_future(x0,y0,mod_salamandra_nn,mod_salamandra_mm);
							if(r>M) {M=r;M_nnn=nnn;}
							cnt++;
							
						}
						while(cnt<18);
						
						
						
						nnn=M_nnn;
						
							mod_salamander_global_food_color=food_array[nnn][2];
							mod_salamander_last_cell_with_food_x=food_array[nnn][0];
							mod_salamander_last_cell_with_food_y=food_array[nnn][1];
						
						mod_salamandra_nn=3;
						mod_salamandra_mm=3;
						return food_array[nnn];
				}
				else {
					mod_salamandra_nn+=2;
					mod_salamandra_mm+=2;
					if(mod_salamandra_nn>17)
					{
						mod_salamandra_nn=3;
						mod_salamandra_mm=3;
						mod_salamandra_center_x=undefined;
								mod_salamandra_center_y=undefined;
						return [];
					}
					return [];
				}
				
				
				
}