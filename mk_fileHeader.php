<?php

function getFileHeader($uri){
	$headers = get_headers($uri, 1);        
	if((!array_key_exists('Content-Length', $headers))){
		return false;
	}
	return $headers;
}

if($_GET['path']){
	$filePath = $_GET['path'];
	header('Content-Type: application/javascript; charset=utf-8');
	if(@fopen($filePath, "r")){
		$fileHeader = getFileHeader($filePath);
		
		/*
		$encode = json_encode($fileHeader);
		echo $encode;
		*/
		
		echo $_GET['callback'].'('.json_encode($fileHeader).')';
	}else{
		echo($_GET['callback'].'('.json_encode(array('request'=>'error')).')');
	}
}

?>