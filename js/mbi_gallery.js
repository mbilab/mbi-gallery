/**
 * @summary     mbi-gallery
 * @description Gallery
 * @version     0.1.1
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
			var $el=$(this);
			//grab data and insert image
			//!reduce indent
			if(1===opt.stage||''===$el.html()){//first stage or empty $el do ajax
				$.ajax({//get description //! why ajax()?
					type:'GET',//!single or double quote?
					url:opt.descriptionUrl,
					success:function(desc){
						var tmp=desc.match(/^([^#\n\r].*)/gm).map(function(i){return i.split(opt.separator)});
						desc={};for(var i=0;i<tmp.length;++i)(desc[tmp[i][0]]=tmp[i]).splice(0,1);
						$.get(opt.photoFolderUrl,function(img){//get img href //! why get()?
							img=img.match(/href=".*?\.(jpg|png)(?=")/gi).map(function(i){return i.replace(/^href="/,'')});
//							var $ul=$('<ul/>').appendTo($el);
							$el.append('<ul></ul>');
							var $ul=$el.find('ul');
							var end=(-1===opt.numLoadingImg||img.length<opt.numLoadingImg)?img.length:opt.numLoadingImg;
							end=2;
							var count=0;
							for(var i=0;i<end;i++){
								$.ajax({//ajax loading img //! why ajax()?
									type:'GET',
									url:opt.photoFolderUrl+img[i],
									success:function(data){
										var fn=(this.url).match(/[^\/]+$/i)[0];//!better than comment
										count++;
										if(desc[fn]){//!hash instaead of array
											//!why need a further if?
											html='<li class="mbi_gallery_animateLi"><div class="mbi_gallery_imageDescription"><div class="mbi_gallery_des0">'+desc[fn][0]+'</div>';
											if(desc[fn].length>1)for(var j=1;j<desc[fn].length;j++)html+='<div class="mbi_gallery_des'+j+'">'+desc[fn][j]+'</div>';
											html+='</div><img class="mbi_gallery_moveInImage" src="'+this.url+'" style="height:'+opt.imgInitialHeight+'px" /></li>';
											$ul.append(html);
										}else $ul.append('<li><img src="'+this.url+'"/ style="height:"'+opt.imgInitialHeight+'"px"></li>');
										if(opt.stage!=1&&count%20==0)resize();//! 20 should be a opt
										if(count==end){
											if(opt.stage==1)$el.prepend("<div id=\'mbi-export\'>export</div>");//!discuss
											else{
												resize();
												setTimeout(function(){resize();},1000);
												setTimeout(function(){resize();},2000);
												setTimeout(function(){resize();},3000);
												//delay resizing for img loading time //! three required??
											}
										}	
									}
								});
							}
						});
					}
				});
				$el.on('click','#mbi-export',function(){//export html
					uriContent = "data:text/plain,"+encodeURIComponent("<html>"+$('html').html())+"</html>";
					newWindow=window.open(uriContent, 'neuesDokument');
				});
			}
			//animate process
			if(opt.stage!=1){
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
								$el.find("ul li:nth-child("+(j+1)+") img").height(resizeHeight);
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
		stage:2,
		separator:'\t',
		numLoadingImg:-1,
		imgInitialHeight:300,	
		animateSpeed:'fast'
	};
})(jQuery);
// vi:nowrap:sw=4:ts=4
