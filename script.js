			var i=0;
					var loadFile = function(event) {
								i=i+1;
								var div = document.getElementById('base_parent');
								var root = document.createElement("div");
								var node = document.createElement("IMG");
								var btn = document.createElement("BUTTON");
						
								root.setAttribute("class", "col-lg-3 col-xs-6 contain" ); 
								btn.setAttribute("class", "rm_btn btn btn-lg btn-danger" );
								btn.setAttribute("type", "button" );
								node.setAttribute("height", "30%" );
								node.setAttribute("width", "100%" );
								
								root.setAttribute("id", "div_"+i);
								
								node.src = URL.createObjectURL(event.target.files[0]);
								btn.innerHTML="حذف" + "div_"+i;
								btn.setAttribute("onclick","delImg("+i+")");
								var base_image_file = document.getElementById('img_file');
								var new_image = base_image_file.cloneNode(true);
								new_image.setAttribute("class","visuallyhidden");
								new_image.name=base_image_file.name;
								new_image.required = true;
								root.appendChild(new_image);
								 var img_file = document.getElementById('img_file');
							     img_file.value="";
								
								root.appendChild(node); 
								root.appendChild(btn); 
								
								document.getElementById("base_parent").appendChild(root); 
					};
					function clear_all()
					{
							var div = document.getElementById('base_parent');
							div.innerHTML = "";
							var img_file = document.getElementById('img_file');
							img_file.value="";
					}
					function delImg(id)
						{
								alert ("you will delete div with id  ( div_" + id + ")")
								document.getElementById("div_"+id).remove();

						}