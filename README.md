# combine-multiple-images-into-one-PDF-file
using imagick with php  to combine multiple images into one PDF file 
first of all 

          <form method='post' enctype='multipart/form-data' action="compain.php">		
          <div class="form-group panel panel-primary"  > 
          <div class="panel-heading ">
          <label >  المرفقات </label>
          </div>
          <div class="panel-body">
          <div class="upload-btn-wrapper col-xs-8" id="insert">
          <div class="btn2 btn-lg btn-success btn-block">
          اضغط هنا لتحميل مستند
          </div>
          <!-- this our base input witch every time load file we must click on it-->
          <input type="file" name="img_file[]" id="img_file"  class="form-control input-lg block"         onchange="loadFile(event)" />
          </div>
          <div class="upload-btn-wrapper col-xs-4"  >
          <!-- to clear file input and remove image that show to user -->
          <div class="btn2 btn-lg btn-danger btn-block del" style="background-color:#d9534f;color:white" onclick="clear_all();">
          حذف الصور
          </div>
          </div>
          <div class="col-lg-12">	</br></div>
          <div class="img-responsive" id="base_parent"></div>
          </div>
          </div>

          <div class="form-group"> 
          <input class="btn  btn-success btn-lg pull-left col-lg-4"  type="submit"  name="submit" value="ارسال"  /> 
          </div>
          </form>


javascript file

          var i=0; // counter to generate id 
          var loadFile = function(event) {  // when load new file
          i=i+1; // increase counter
          var div = document.getElementById('base_parent'); // access to continer div
          var root = document.createElement("div"); // create div
          var node = document.createElement("IMG"); // create img
          var btn = document.createElement("BUTTON");   // create btn

          root.setAttribute("class", "col-lg-3 col-xs-6 contain" );   // set classes to created div
          btn.setAttribute("class", "rm_btn btn btn-lg btn-danger" ); // set classes to created btn
          btn.setAttribute("type", "button" );
          node.setAttribute("height", "30%" );
          node.setAttribute("width", "100%" );

          root.setAttribute("id", "div_"+i);    // set id

          node.src = URL.createObjectURL(event.target.files[0]);    // show img
          btn.innerHTML="حذف" + "div_"+i;   
          btn.setAttribute("onclick","delImg("+i+")");    // create handler witch is delete img and file input 
          var base_image_file = document.getElementById('img_file');  // access to base file input
          var new_image = base_image_file.cloneNode(true);    // clone it
          new_image.setAttribute("class","visuallyhidden"); // hidden new file input
          new_image.name=base_image_file.name;    // set same name to all file input
          new_image.required = true;    
          root.appendChild(new_image);  // add img to div
          base_image_file.value="";  // cleaer base file input

          root.appendChild(node);   // add img to div
          root.appendChild(btn);  // add btn to div

          document.getElementById("base_parent").appendChild(root);   // add div to base div
          };

          function clear_all() // optional   delete all img and clear base file input witch is cleared 
          {
          var div = document.getElementById('base_parent');
          div.innerHTML = "";
          var img_file = document.getElementById('img_file');
          img_file.value="";
          }
          function delImg(id)     // this function work when click any button , id is the id of clicked btn
          {
          // we set all id counter to div and btn as same 
          alert ("you will delete div with id  ( div_" + id + ")")
          document.getElementById("div_"+id).remove(); // this will delete parent of clicked btn witch is contain file input and img 
          }

php file

          <?php
          ini_set("error_reporting", 1);
          if(isset($_POST['submit'])) // is we click send post
          {

          $images[0]="zero";  // init array to save all image
          // loop for all file in input file
          for ($i = 1; $i< count($_FILES['img_file']['name']); $i++)
          {
          // we start from 1 to pass base input file witch is empty
          $temp = $_FILES["img_file"]["tmp_name"][$i]; // get file path one by one
          $name = $_FILES["img_file"]["name"][$i];// get file name one by one , you can pass this step if you generate random name
          $images[$i-1]=$temp;  // store img into array		
          }
          $dir = dirname(__FILE__); // get path to uplaod , note  i use this because i have problem with direct path
          $im = new Imagick($images); // creat imagick object and set the array of image inside it
          // loop on image to decrease size 
          foreach ($im as $item) {
          $item-> resizeImage( 350, 700, Imagick::FILTER_LANCZOS, 1); 
          }
          // change imagick format to pdf
          $im->setImageFormat('pdf');
          // upload pdf file
          if($im->writeImages($dir.'\thumb2.pdf', true))
          {
          echo "convet done";
          $im->clear(); 
          $im->destroy();	
          }
          }
          ?>
          }
