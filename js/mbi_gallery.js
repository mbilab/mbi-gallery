/**
 * @summary     mbi-gallery
 * @description Gallery
 * @version     0.0.1
 * @file        jquery.mbi-gallery.js
 * @author      xxx
 * @contact     xxx
 * 
 * @copyright Copyright 2013 MBI Lab, all rights reserved.
 * 
 * For details please refer to: https://github.com/mbilab/mbi-gallery
 */
;(function($,undefined){
	var plugin='mbi_gallery';//pluginname
	$.fn[plugin]=function(opt){//set jquery plugin
		var opt=$.extend({},$.fn[plugin].dft,opt);//option
		return this.each(function(){
			var $el=$(this);
			//grab data and insert image
			if(opt.stage==1){
				$.ajax({//get description
					type: "GET",
					url: opt.descriptionUrl,
					success: function(re){
						var str=re;
						n=str.split("\n");
						var o=new Array();
						for(var i=0;i<n.length;i++){
							n[i]=n[i].split(opt.separator);
							o[i]=n[i][0];
						}
						$.get(opt.photoFolderUrl, function(re){//get images 
							var str=re;
							$el.append('<ul></ul>');
							var html="";
							var $ul=$el.find('ul');
							var r=str.match(/href="(.*?\.(jpg|png))"/gi);
							var end=(opt.numLoadingImg==-1||r.length<opt.numLoadingImg)?r.length:opt.numLoadingImg;
							var count=0;
							for(var i=0;i<r.length;i++)r[i]=r[i].match(/"(.*?)"/gi)[0].replace(/"/g,"");
							for(var i=0;i<end;i++){
								$.ajax({
									type:'GET',
									url: opt.photoFolderUrl+r[i],
									success: function(data){
										k=(this.url).match(/[^\/]+$/i)[0];
										count++;
										if(o.indexOf(k)!=-1){
											html="<li class=\" mbi_gallery_animateLi\" style=\"height:"+opt.imgInitialHeight+"px\"><div class=\"mbi_gallery_imageDescription\"><div class=\"mbi_gallery_des1\">"+n[o.indexOf(k)][1]+"</div>";
											if(n[o.indexOf(k)].length>2)for(var j=2;j<n[o.indexOf(k)].length;j++)html+="<div class=\"mbi_gallery_des"+j+"\">"+n[o.indexOf(k)][j]+"</div>";
											html+="</div><img class=\"mbi_gallery_moveInImage\" src=\""+this.url+"\"/></li>";
											$ul.append(html);
										}	
										else $ul.append("<li style=\"height:"+opt.imgInitialHeight+"px\"><img src=\""+this.url+"\"/></li>");
										if(count%20==0)/*resize()*/;
										if(count==end){
											$el.prepend("<div id=\'mbi-export\'>export</div>");
											resize();/*
											setTimeout(function(){resize();},1000);
											setTimeout(function(){resize();},2000);
											setTimeout(function(){resize();},3000);*/
										}	
									}
								});
							}
						});
					}
				});
				$el.on('click','#mbi-export',function(){
					uriContent = "data:text/plain,"+encodeURIComponent("<html>"+$('html').html())+"</html>";
					newWindow=window.open(uriContent, 'neuesDokument');
				});
			}
			//animate process
			else{
			    $('#mbi-export').css('display','none');
				$el.on('mouseenter','.mbi_gallery_animateLi',function(){
					$(this).children('.mbi_gallery_imageDescription').stop().animate({opacity:'0'},'fast');
				});
				$el.on('mouseleave','.mbi_gallery_animateLi',function(){
					$(this).children('.mbi_gallery_imageDescription').stop().animate({opacity:'.8'},'fast');
				});
				//resize event
				$(window).resize(function(){
					resize();
				});
				window.onload=resize();
				$('img').load(function(){resize();});
			}
			//resize function
			function resize(){
				var rowWidth=0;
				var resizeRatio;
				var rowImageCount=0;
				var front=0;
				var divSize=$el.find("ul").width();
				var gap=$('ul li').outerWidth(true)-$('ul li').width();
				$el.find("ul li").each(function(i){
					rowWidth+=(($(this).width())*(opt.imgInitialHeight)/($(this).height()));
					rowImageCount++;
					if(rowWidth+(rowImageCount)*gap>=divSize){
						resizeHeight=opt.imgInitialHeight*(divSize-((rowImageCount+1)*gap))/(rowWidth);
						if(Math.abs(resizeHeight-$el.find("ul li:nth-child("+(front+1)+")").height())>2){
							for(var j=front;j<=i;j++){
								$el.find("ul li:nth-child("+(j+1)+")").height(resizeHeight);
							}
						}
						front=i+1;
						rowImageCount=0;
						rowWidth=0;
					}
				});
			};
		});//end of return this.each
	};
	$.fn[plugin].dft={
		stage:1,
		separator:'\t',
		numLoadingImg:-1,
		imgInitialHeight:300,	
		animateSpeed:'fast'
	};
})(jQuery);
// vi:nowrap:sw=4:ts=4
