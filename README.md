# MBI-Gallery jquery Plugin
## Features

What this plugin can do is:

 * Auto fetch for images in a given folder and insert them into the given element
 * Resize the images to fit in the element when image loading or window resizing
 * Enable simple animation with image descriptions from the given txt file

## Usage
###Normal Usage###
Call the plugin with the target element you want to insert.
And you don't have to set the option stage to any value.
	ex.
	$('#mydiv').mbi_gallery(//options);
###Special function###
After the page is loaded, press 'Alt+F5' and a page of html code will be created in a new page.
(That html can be used with this jquery plugin, and will just enable animate and resizing)
(No ajax code if be executed with this usage)


## Options
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

###resizePeriod###
(Default option:20)
The number of img loaded between two resizing operations

###imgInitialHeight###
(Default option:300)  
(Unit:px)  
The initial height of the image before resize
Larger height means less images per row

###animateSpeed###
(Default option:'fast')  
Speed of the animate
