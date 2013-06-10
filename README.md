# MBI-Gallery jquery Plugin
## Features

What this plugin can do is:

 * Auto fetch for images in a given folder and insert them into the given element
 * Resize the images to fit in the element when image loading or window resizing
 * Enable simple animation with image descriptions from the given txt file
 * (Chrome only)The generated html code can be downloaded with Alt+F5

## Demo Page
http://zoro.ee.ncku.edu.tw/wp2012/final/photo.html  
Note that the function of lightbox in this page isn't provided by this plugin. 

## Usage
###Normal Usage###
Call the plugin with the target element you want to insert.  
		ex. 
		$('#mydiv').mbi_gallery(//options);  
Some default style is in 'css/mbi_gallery.css', which could makes the gallery works normally.  
Some settings, such as colors, fonts setting can be changed to fit your need.
###Special function(can be used only in Chrome for current version)###
After the page is loaded, press 'Alt+F5' and a page of html code will be created in a new page.  
(That html can be used with this jquery plugin, and will just enable animate and resizing)  
(No ajax call in this usage)


## Options
###rawFolderUrl###
The address of the folder containing the raw images

###previewFolderUrl###
(Default:equals to 'rawFolderUrl')
The address of the folder containing the preview images inserted in the div

###descriptionUrl###
The address of the txt file that contains the image name and its description

###separator###
(Default:'\t')[Tab]  
The symbol used to separate the file name and the description or two descriptions
Description file Format

    [image1 file name][separator][description1][separator][description2]...
	[image2 file name][separator][description1][separator][description2]..,
    ...
		    
    example:(with default option of separator[Tab])
     mg1.JPG	SomeDescription 	AnotherDescription
     mg2.JPG	SomeDescription

###resizePeriod###
(Default option:20) 
The number of images loaded between two resizing operations

###imgInitialHeight###
(Default option:300)  
(Unit:px)  
The initial height of the images before resize
Larger height means less images per row

###animateSpeed###
(Default option:'fast')  
Speed of the animate

###onDone
A function to add more action after the code is generated, defined by user.  
For example, if you want to add [this lightbox plugin](http://lokeshdhakar.com/projects/lightbox2/),  
the function could be:  

    onDone:function(){  
	    $('a').attr('rel','lightbox');      
	}  

(You need to include the required file before this.)  
### The structure of generated code
####Classes in the generated code  
ul.mbi_gallery_outerUl : `<ul>` that wraps the whole gallery  
li.animatedLi : `<li>` that have hover animate  
div.mbi_gallery_imageDescription : `<div>` containing all of the descriptions  
div.mbi_gallery_desx : `<div>` of the x-th description(x start from zero)  
a:`<a>` that wrap the img, designed for working with lightbox easily. It would link to the raw version of corresponding image
img.mbi_gallery_animatedImage: `<img>` in li.animatedLi  
li.mbi_gallery_noAnimate: `<li>` that do not have hover animate  
####Whole architecture of the generated code  
    <ul class="mbi_gallery_outerUl">
	    <li class="mbi_gallery_animateLi">
		    <div class="mbi_gallery_imageDescription">
			     <div class="mbi_gallery_des0"></div>
			     <div class="mbi_gallery_des1"></div>
			     <div class="mbi_gallery_des2"></div>
				 ...//depends on how many description of the image in the description file 
			</div>
			<a>
				<img class="mbi_gallery_animatedImage"/>
			</a>
		</li>
		<li class="mbi_gallery_noAnimate">
		    <img>
		</li>
	<ul>
