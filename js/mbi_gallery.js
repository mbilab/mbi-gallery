/**
 * @summary     mbi-gallery
 * @description Gallery
 * @version     0.1.3
 * @file        jquery.mbi_gallery.js
 * @author      Tangent Chang and Tien-Hao Chang (Darby Chang)
 * @contact     darby@mail.ncku.edu.tw
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
			var desc={};//des hash
			var $el=$(this);
			//grab data and insert image
			if(''===$el.html()){//empty $el do ajax
				$.get(//get description
					opt.descriptionUrl,
					function(des){//des output
						var tmp=des.match(/^([^#\n\r].*)/gm).map(function(i){return i.split(opt.separator)});
						for(var i=0;i<tmp.length;++i)(desc[tmp[i][0]]=tmp[i]).splice(0,1);
						get_folder();
					});
					var isAlt = false;
					$(document).keydown(function (e) {
						if (e.keyCode == 18) {
							isAlt = true;
						}
						if (e.keyCode == 116 && isAlt) {//alt+F5 to save html code
							downloadWithName("data:text/html,"+encodeURIComponent("<html>"+$('html').html()+"</html>"),"output.html");
						}
					});
					$(document).keyup(function (e) {
						if (e.keyCode == 18) {
							isAlt = false;
						}
					});
			}
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
			window.onload=resize();
			$('img').load(function(){resize();});
			setTimeout(function(){resize();},1000);
			setTimeout(function(){resize();},2000);
			setTimeout(function(){resize();},3000);
			function get_folder(){
				$.get(opt.photoFolderUrl,function(img){//get img href 
					img=img.match(/href=".*?\.(jpg|png)(?=")/gi).map(function(i){return i.replace(/^href="/,'')});
					$ul=$('<ul/>').appendTo($el).addClass('mbi_gallery_outerUl');
					get_img(img);
				});
			}
			function get_img(img){
				console.log(desc);
				var count=0;
				var end=img.length;
				for(var i=0;i<end;i++){
					$.get(//ajax loading img
						opt.photoFolderUrl+img[i],
						function(data){
							var fn=(this.url).match(/[^\/]+$/i)[0];
							count++;
							if(desc[fn]){
								html='<li class="mbi_gallery_animateLi"><div class="mbi_gallery_imageDescription">';
								if(desc[fn].length>0)for(var j=0;j<desc[fn].length;j++)html+='<div class="mbi_gallery_des'+j+'">'+desc[fn][j]+'</div>';
								html+='</div><img class="mbi_gallery_animatedImage" src="'+this.url+'" style="height:'+opt.imgInitialHeight+'px" /></li>';
								$ul.append(html);
							}else $ul.append('<li class="mbi_gallery_noAnimate"><img src="'+this.url+'"/ style="height:"'+opt.imgInitialHeight+'"px"></li>');
							if(count%opt.resizePeriod==0)resize();
							if(count===end){
								resize();
								setTimeout(function(){resize();},1000);
								setTimeout(function(){resize();},2000);
								setTimeout(function(){resize();},3000);
								//delay resizing for img loading time 
							}	
						}
					);
				}

			}
			//resize function
			function resize(){
				var rowWidth=0;
				var resizeRatio;
				var rowImageCount=0;
				var front=0;
				var divSize=$el.find("ul").width();
				console.log(divSize);
				var gap=$('ul li').outerWidth(true)-$('ul li').width();
				console.log(gap);
				$el.find("ul li").each(function(i){
					rowWidth+=(($(this).width())*(opt.imgInitialHeight)/($(this).height()));
					rowImageCount++;
					if(rowWidth+(rowImageCount)*gap>=divSize){
						resizeHeight=opt.imgInitialHeight*(divSize-((rowImageCount+1)*gap))/(rowWidth);
					if(Math.abs(resizeHeight-$el.find("ul li:nth-child("+(front+1)+")").height())>0.1){
							for(var j=front;j<=i;j++){
								$el.find("ul li:nth-child("+(j+1)+") img").height(resizeHeight);
							}
						}
						front=i+1;
						rowImageCount=0;
						rowWidth=0;
					}
				});
			};
			function downloadWithName(uri, name) {
				function eventFire(el, etype){
					if (el.fireEvent) {
						(el.fireEvent('on' + etype));
					} else {
						var evObj = document.createEvent('Events');
						evObj.initEvent(etype, true, false);
						el.dispatchEvent(evObj);
					}
				}
				var link = document.createElement("a");
				link.download = name;
				link.href = uri;
				eventFire(link, "click");
			}
		});//end of return this.each
	};
	$.fn[plugin].dft={
		separator:'\t',
		resizePeriod:20,
		imgInitialHeight:300,	
		animateSpeed:'fast'
	};
})(jQuery);
// vi:nowrap:sw=4:ts=4
