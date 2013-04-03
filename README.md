# MBI-Gallery jquery Plugin
## Features

What this plugin can do is:

 * Auto fetch for images in a given folder and insert them into the given element
 * Resize the images to fit in the element when image loading or window resizing
 * Enable simple animation with image descriptions from the given txt file

## Usage
###Stage 1:Generating html from img folder and description file###
1.	Call the plugin with the target element you want to insert.

		ex. 
		$('#mydiv').mbi_gallery(//options);

2.	Set the option "stage" to 1, and fill in other options. 

		ex.   
		$('#mydiv').mbi_gallery({  
			stage:1,  
			photoFolderUrl:"../demophotos/",  
			descriptionUrl:"../des.txt",  
			imgInitialHeight:"300"  
		});  

3.	Run the site, and after loading, there would be a 'export' on top of the target element.
4.	Click the 'export', and it will have a new tag (or window) on the browser with some html code.
5.	Download that file, and save it as html file

###Stage 2:Operate(Animating and Resizing)###
1.	Modify the downloaded html file(or other .js that call this plugin)'s option stage to 2

		ex.  
		$('#mydiv').mbi_gallery({  
			stage:2,  
			...//other options  
		});  

2.	Replace the original html file(in stage 1) with this one.
3.	Complete!

## Options
###stage###
(Default:1)  
Indicate the operation of this plugin. Take a look at Usage for more information.
###photoFolderUrl###
The address of the folder containing the images been put in the div 
###descriptionUrl###
The address of the txt file that contains the image and its description
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

###numLoadingImg###
(Default option:-1)  
The number of images will be loaded into the element of the site
-1 means all image in the folder will be loaded

###imgInitialHeight###
(Default option:300)  
(Unit:px)  
The initial height of the image before resize
Larger height means less images per row

###animateSpeed###
(Default option:'fast')  
Speed of the animate
