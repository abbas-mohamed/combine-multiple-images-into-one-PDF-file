<?php
	ini_set("error_reporting", 1);
	if(isset($_POST['submit']))
	{
		
		$images[0]="zero";
		for ($i = 1; $i< count($_FILES['img_file']['name']); $i++)
		{
			
				$temp = $_FILES["img_file"]["tmp_name"][$i];
				$name = $_FILES["img_file"]["name"][$i];
				$images[$i-1]=$temp;		
		}
		$dir = dirname(__FILE__);
		$im = new Imagick($images);
		
		foreach ($im as $item) {
				$item-> resizeImage( 350, 700, Imagick::FILTER_LANCZOS, 1); 
				
				}
				$im->setImageFormat('pdf');    
				if($im->writeImages($dir.'\thumb2.pdf', true))
				{
					echo "convet done";
					$im->clear(); 
					$im->destroy();	
				}
		
	}
?>