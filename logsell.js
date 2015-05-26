﻿
$(function(){
     jsonajax1();
 });
 
 //这里就要进行计算滚动条当前所在的位置了。如果滚动条离最底部还有100px的时候就要进行调用ajax加载数据
 $(window).scroll(function(){    
     //此方法是在滚动条滚动时发生的函数
     // 当滚动到最底部以上100像素时，加载新内容
     var $doc_height,$s_top,$now_height;
     $doc_height = $(document).height();        //这里是document的整个高度
     $s_top = $(this).scrollTop();            //当前滚动条离最顶上多少高度
     $now_height = $(this).height();            //这里的this 也是就是window对象
     if(($doc_height - $s_top - $now_height) < 100) jsonajax1();    
 });
 
 
 //做一个ajax方法来请求data.php不断的获取数据
 var $num = -1;
 var $pagecount = 0;

function start(type,page){	

	$num = 0;
	$pagecount = 0;

	var stuffselect=0,productlen=0;

	timber=document.getElementById("timber").value;
	stuffselect = document.getElementById("stuffselect").value;

	if(document.getElementById("productlen").value.length == 0){
		productlen=0;
	}else{
		productlen=document.getElementById("productlen").value;
	}

	if($pagecount >= $num){

		 $.ajax({
			 url:'getloglist.php',
			 type:'POST',
			 data:"num="+($num++)+"&stuffselect="+stuffselect+"&productlen="+productlen+"&timber="+timber,

			 dataType:'json',
			 success:function(json){
				 if(typeof json == 'object'){

					 var neirou,$row,iheight,$item;
					 $row =$("#goodslist").empty();
					 if(json.length == 0){

						$("#goodslist").empty().append("<p class='no_result'>没有查询到您所要的内容</p>");
					 }else{
						 
						$pagecount = json[0].pagecount;
						for(var i=1;i<json.length;i++){
							neirou = json[i];    //当前层数据

							if(neirou.diameterlen == 0) {
								$bianhua = neirou.kindname;
							}else{
								$bianhua = neirou.diameterlen + "φ " + neirou.timber;
							 }

							 $item = $(
								"<tr><th>"+neirou.carnum+"</th><th>"+neirou.stuffname+"</th><th>"+neirou.productlen+"米</th><th>"+$bianhua+"</th><th>"+neirou.portname+"</th><th>"+neirou.updatetime+"</th></tr>"				 
							 );	
							 $(".no_result").empty();
							 $row.append($item);
							 $item.fadeIn();
						}
					 }
				}
			 }
		 });
	}
}


 function jsonajax1(){

	var stuffselect=0,productlen=0;

	timber=document.getElementById("timber").value;
	stuffselect = document.getElementById("stuffselect").value;

	if(document.getElementById("productlen").value.length == 0){
		productlen=0;
	}else{
		productlen=document.getElementById("productlen").value;
	}
		

	if($pagecount > $num){
		 $.ajax({
			 url:'getloglist.php',
			 type:'POST',
			 data:"num="+($num=($num+1))+"&stuffselect="+stuffselect+"&productlen="+productlen+"&timber="+timber,

			 dataType:'json',
			 success:function(json){
				 if(typeof json == 'object'){
					 var neirou,$row,iheight,$item,$bianhua;
					 $pagecount = json[0].pagecount;
					 for(var i=1;i<json.length;i++){
						 neirou = json[i];    //当前层数据
						
						 if(neirou.diameterlen == 0) {
							$bianhua = neirou.kindname;
						 }else{
							$bianhua = neirou.diameterlen + "φ " + neirou.timber;
						 }

						 $row =$("#goodslist");
						  $item = $(
								"<tr><th>"+neirou.carnum+"</th><th>"+neirou.stuffname+"</th><th>"+neirou.productlen+"米</th><th>"+$bianhua+"</th><th>"+neirou.portname+"</th><th>"+neirou.updatetime+"</th></tr>"		 
						  );	
						 $(".no_result").empty();
						 $row.append($item);
						 $item.fadeIn();
					 }

				}
			 }
		 });
	}
 }