;(function($,undefined){
	var plugin='mbi_gallery';//pluginname
	$.fn[plugin]=function(opt){//set jquery plugin
		var opt=$.extend({},$.fn[plugin].dft,opt);//option
		return this.each(function(){
			var $el=$(this);
				//grab data and insert image
			$.ajax({//get description
				type: "GET",
				url: opt.descriptionUrl,
				success: function(re){
					var str=re;
					n=str.replace(/\n/g," ").split(" ");
					$.get(opt.photoFolderUrl, function(re){//get images 
						var str=re;
						$el.append('<ul></ul>');
						var html="";
						var $ul=$el.find('ul');
						var r=str.match(/href="(.*?\.(jpg|png))"/gi);
						for(var i=0;i<r.length;i++)r[i]=r[i].match(/"(.*?)"/gi)[0].replace(/"/g,"");
						var imageCount=0;
						for(var i=0;i<r.length;i++){
							preload([opt.photoFolderUrl+r[i]]);
							imageCount++;
							if(n.indexOf(r[i])!=-1)html+="<li class=\" mbi_gallery_animateLi\" style=\"height:"+opt.imgInitialHeight+"px\"><div class=\"mbi_gallery_imageDescription\"><span class=\"mbi_gallery_descriptionText\">"+n[n.indexOf(r[i])+1]+"</span></div><img class=\"mbi_gallery_moveInImage\" src=\""+opt.photoFolderUrl+r[i]+"\"/></li>";
							else html+="<li style=\"height:"+opt.imgInitialHeight+"px\"><img src=\""+opt.photoFolderUrl+r[i]+"\"/></li>";
							if(i%10==9||imageCount==opt.numLoadingImg||i==r.length-1){
								$ul.append(html);
							    html=''; 
							}
							if(imageCount==opt.numLoadingImg)break;
						}
						$('img').load(function(){resize()
						});
					});
				}
			});
				//animate process
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
						for(var j=front;j<=i;j++){
							$el.find("ul li:nth-child("+(j+1)+")").height(resizeHeight);
						}
						front=i+1;
						rowImageCount=0;
						rowWidth=0;
					}
				});
			};
			function preload(arrayOfImages){
				$(arrayOfImages).each(function(){
					$('<img/>')[0].src = this;
				});
			}
		});//end of return this.each
	};
	$.fn[plugin].dft={
		numLoadingImg:-1,
	};
})(jQuery);
// vi:nowrap:sw=4:ts=4
