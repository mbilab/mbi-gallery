# MBI-Gallery jquery Plugin
## Features

What this plugin can do is:

 * Auto fetch for images in a given folder and insert them into the given element
 * Resize the images to fit in the element when image loading or window resizing
 * Enable simple animation with image descriptions from the given txt file

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
	[image2 file name][separator][description1][separator][description2]
    ...
		    
    example:(with default option of separator)
    mg1.JPG	SomeDescription	Another Description
    mg2.JPG	SomeDescription

###numLoadingImg###
(Default option:-1)
The number of images will be loaded into the element of the site
-1 means all image in the folder will be loaded

###imgInitialHeight###
The initial height of the image before resize
Larger height means less images per row

###animateSpeed###
Speed of the animate
